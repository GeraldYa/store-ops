const { STORES, PNL, INVENTORY, EMPLOYEES_STORE, TRAFFIC_PATTERN, DAYS } = require('./mock');

function getStoreData(storeId) {
  const store = STORES.find(s => s.id === storeId) || STORES[0];
  const pnl = PNL[storeId] || PNL.S001;
  return { store, pnl };
}

function getAllStoresComparison() {
  return STORES.map(s => ({
    ...s,
    revenue: PNL[s.id].revenue.current,
    grossMargin: PNL[s.id].grossMargin.current,
    shrink: PNL[s.id].shrink.current,
    conversionRate: PNL[s.id].conversionRate.current,
    netProfit: PNL[s.id].netProfit.current,
  }));
}

function getInventoryAlerts(storeId) {
  const alerts = [];
  INVENTORY.forEach(item => {
    const stock = item.stock[storeId] || 0;
    const velocity = item.weeklyVelocity[storeId] || 0;
    const daysOfStock = velocity > 0 ? (stock / velocity) * 7 : 999;
    const shrink = item.shrinkUnits[storeId] || 0;

    if (stock === 0 && velocity > 0) {
      alerts.push({ type: 'stockout', severity: 'critical', item, stock, velocity, daysOfStock: 0 });
    } else if (stock <= item.reorderPoint) {
      alerts.push({ type: 'low_stock', severity: 'warning', item, stock, velocity, daysOfStock: Math.round(daysOfStock) });
    }
    if (shrink > 0) {
      const shrinkValue = shrink * item.cost;
      alerts.push({ type: 'shrink', severity: shrinkValue > 500 ? 'warning' : 'info', item, shrinkUnits: shrink, shrinkValue });
    }
  });
  return alerts.sort((a, b) => {
    const sev = { critical: 0, warning: 1, info: 2 };
    return sev[a.severity] - sev[b.severity];
  });
}

function getInventoryOverview(storeId) {
  let totalValue = 0, totalItems = 0, totalShrinkValue = 0, reorderNeeded = 0, stockouts = 0;
  const byCategory = {};

  INVENTORY.forEach(item => {
    const stock = item.stock[storeId] || 0;
    const velocity = item.weeklyVelocity[storeId] || 0;
    const shrink = item.shrinkUnits[storeId] || 0;
    totalValue += stock * item.cost;
    totalItems += stock;
    totalShrinkValue += shrink * item.cost;
    if (stock <= item.reorderPoint && velocity > 0) reorderNeeded++;
    if (stock === 0 && velocity > 0) stockouts++;

    if (!byCategory[item.category]) byCategory[item.category] = { value: 0, items: 0, shrink: 0 };
    byCategory[item.category].value += stock * item.cost;
    byCategory[item.category].items += stock;
    byCategory[item.category].shrink += shrink * item.cost;
  });

  return { totalValue, totalItems, totalShrinkValue, reorderNeeded, stockouts, byCategory };
}

function getInventoryTable(storeId) {
  return INVENTORY.map(item => {
    const stock = item.stock[storeId] || 0;
    const velocity = item.weeklyVelocity[storeId] || 0;
    const daysOfStock = velocity > 0 ? Math.round((stock / velocity) * 7) : null;
    const shrink = item.shrinkUnits[storeId] || 0;
    const needsReorder = stock <= item.reorderPoint && velocity > 0;
    const suggestedOrder = needsReorder ? Math.ceil(velocity * (item.leadDays + 7)) - stock : 0;

    return {
      ...item,
      currentStock: stock,
      velocity,
      daysOfStock,
      shrinkUnits: shrink,
      shrinkValue: shrink * item.cost,
      needsReorder,
      suggestedOrder,
      stockValue: stock * item.cost,
      status: stock === 0 && velocity > 0 ? 'stockout' : needsReorder ? 'low' : 'ok',
    };
  });
}

function generateSchedule(storeId) {
  const employees = EMPLOYEES_STORE[storeId] || EMPLOYEES_STORE.S001;
  const schedule = [];

  DAYS.forEach((day, dayIdx) => {
    const isWeekend = dayIdx >= 5;
    const pattern = isWeekend ? TRAFFIC_PATTERN.weekend : TRAFFIC_PATTERN.weekday;

    // Calculate needed staff per hour (1 staff per 12 customers)
    const hours = [];
    for (let h = 0; h < pattern.length; h++) {
      const traffic = Math.round(TRAFFIC_PATTERN.baseTrafficPerHour * pattern[h]);
      const needed = Math.max(2, Math.ceil(traffic / 12));
      hours.push({ hour: 10 + h, traffic, needed });
    }

    // Assign available employees
    const available = employees.filter(e => e.availability[dayIdx] === 1);
    const assigned = [];

    // Manager always gets full shift
    const managers = available.filter(e => e.role.includes('Manager'));
    const nonManagers = available.filter(e => !e.role.includes('Manager'));

    managers.forEach(m => {
      assigned.push({ employee: m, start: 10, end: 18, hours: 8 });
    });

    // Assign others based on traffic peaks
    const peakHours = hours.filter(h => h.needed > managers.length);
    nonManagers.forEach(emp => {
      // Find best shift window
      const maxH = Math.min(emp.maxHours / 5, 8);
      let bestStart = 10;
      let bestScore = 0;
      for (let s = 10; s <= 21 - maxH; s++) {
        let score = 0;
        for (let h = s; h < s + maxH; h++) {
          const idx = h - 10;
          if (idx >= 0 && idx < hours.length) score += hours[idx].traffic;
        }
        if (score > bestScore) { bestScore = score; bestStart = s; }
      }
      assigned.push({ employee: emp, start: bestStart, end: bestStart + maxH, hours: maxH });
    });

    // Coverage analysis
    const coverage = hours.map(h => {
      const staffAtHour = assigned.filter(a => a.start <= h.hour && a.end > h.hour).length;
      return { ...h, staffed: staffAtHour, gap: Math.max(0, h.needed - staffAtHour) };
    });

    const totalLabor = assigned.reduce((s, a) => s + a.hours * a.employee.hourlyRate, 0);
    const totalHours = assigned.reduce((s, a) => s + a.hours, 0);

    schedule.push({ day, dayIdx, isWeekend, assigned, coverage, totalLabor, totalHours, available: available.length });
  });

  const weeklyLabor = schedule.reduce((s, d) => s + d.totalLabor, 0);
  const weeklyHours = schedule.reduce((s, d) => s + d.totalHours, 0);
  const totalGaps = schedule.reduce((s, d) => s + d.coverage.reduce((ss, c) => ss + c.gap, 0), 0);
  const pnl = PNL[storeId] || PNL.S001;
  const laborBudget = pnl.laborCost.budget / 4; // weekly

  return {
    schedule,
    summary: {
      weeklyLabor,
      weeklyHours,
      laborBudget: Math.round(laborBudget),
      laborVariance: Math.round(weeklyLabor - laborBudget),
      coverageGaps: totalGaps,
      avgStaffPerDay: (weeklyHours / 7 / 8).toFixed(1),
    },
    employees: EMPLOYEES_STORE[storeId] || EMPLOYEES_STORE.S001,
  };
}

function generateInsights(storeId) {
  const pnl = PNL[storeId] || PNL.S001;
  const invOverview = getInventoryOverview(storeId);
  const invAlerts = getInventoryAlerts(storeId);
  const schedule = generateSchedule(storeId);

  const insights = { pnl: [], inventory: [], workforce: [] };

  // P&L Insights
  if (pnl.revenue.current < pnl.revenue.target) {
    const gap = pnl.revenue.target - pnl.revenue.current;
    insights.pnl.push({ severity: 'warning', title: 'Revenue below target', detail: `$${(gap/1000).toFixed(0)}K short of $${(pnl.revenue.target/1000).toFixed(0)}K target. Conversion rate at ${pnl.conversionRate.current}% — consider promotional push or staffing adjustment during peak hours.` });
  }
  if (pnl.grossMargin.current < pnl.grossMargin.target) {
    insights.pnl.push({ severity: 'warning', title: 'Gross margin below target', detail: `At ${pnl.grossMargin.current}% vs ${pnl.grossMargin.target}% target. Review discounting practices and product mix. High-margin accessories may be under-promoted.` });
  }
  if (pnl.shrink.current > pnl.shrink.target) {
    insights.pnl.push({ severity: 'critical', title: 'Shrink exceeds threshold', detail: `${pnl.shrink.current}% vs ${pnl.shrink.target}% target. High-risk SKUs: mobile accessories, small electronics. Recommend cycle count blitz and LP review.` });
  }
  if (pnl.laborCost.current > pnl.laborCost.budget) {
    const over = pnl.laborCost.current - pnl.laborCost.budget;
    insights.pnl.push({ severity: 'warning', title: 'Labor cost over budget', detail: `$${(over/1000).toFixed(1)}K over budget. Review overtime hours and part-time scheduling efficiency.` });
  }
  if (pnl.conversionRate.current < 30) {
    insights.pnl.push({ severity: 'info', title: 'Low conversion opportunity', detail: `Conversion at ${pnl.conversionRate.current}% with ${pnl.footTraffic.current.toLocaleString()} visitors. A 2% improvement = ~${Math.round(pnl.footTraffic.current * 0.02 * pnl.avgTransaction.current / 1000)}K additional revenue.` });
  }
  if (pnl.revenue.current > pnl.revenue.target) {
    insights.pnl.push({ severity: 'positive', title: 'Revenue exceeds target', detail: `$${((pnl.revenue.current - pnl.revenue.target)/1000).toFixed(0)}K above target. Strong performance — analyze which categories/promotions drove the lift for replication.` });
  }

  // Inventory Insights
  if (invOverview.stockouts > 0) {
    const stockoutItems = invAlerts.filter(a => a.type === 'stockout');
    insights.inventory.push({ severity: 'critical', title: `${invOverview.stockouts} stockout(s) detected`, detail: `Out of stock: ${stockoutItems.map(a => a.item.name).join(', ')}. Lost sales estimated at $${stockoutItems.reduce((s,a) => s + a.velocity * a.item.price, 0).toFixed(0)}/week.` });
  }
  if (invOverview.reorderNeeded > 0) {
    insights.inventory.push({ severity: 'warning', title: `${invOverview.reorderNeeded} items need reorder`, detail: `Below reorder point with active demand. Auto-generated purchase suggestions available in the table below.` });
  }
  if (invOverview.totalShrinkValue > 500) {
    insights.inventory.push({ severity: 'warning', title: 'Notable shrink detected', detail: `$${invOverview.totalShrinkValue.toLocaleString()} in shrink losses this period. Top shrink categories: ${Object.entries(invOverview.byCategory).filter(([,v]) => v.shrink > 0).sort((a,b) => b[1].shrink - a[1].shrink).slice(0,3).map(([k,v]) => `${k} ($${v.shrink.toLocaleString()})`).join(', ')}.` });
  }
  const slowMovers = INVENTORY.filter(i => {
    const v = i.weeklyVelocity[storeId] || 0;
    const s = i.stock[storeId] || 0;
    return v > 0 && s > 0 && (s / v) * 7 > 30;
  });
  if (slowMovers.length > 0) {
    insights.inventory.push({ severity: 'info', title: `${slowMovers.length} slow-moving items`, detail: `Over 30 days of stock on hand: ${slowMovers.map(i => i.name).join(', ')}. Consider markdown or transfer to higher-velocity store.` });
  }

  // Workforce Insights
  if (schedule.summary.coverageGaps > 0) {
    const worstDay = schedule.schedule.reduce((w, d) => {
      const gaps = d.coverage.reduce((s, c) => s + c.gap, 0);
      return gaps > w.gaps ? { day: d.day, gaps } : w;
    }, { day: '', gaps: 0 });
    insights.workforce.push({ severity: 'critical', title: `${schedule.summary.coverageGaps} coverage gaps this week`, detail: `Worst day: ${worstDay.day} with ${worstDay.gaps} understaffed hours. Peak traffic periods without adequate floor coverage directly impact conversion rate.` });
  }
  if (schedule.summary.laborVariance > 0) {
    insights.workforce.push({ severity: 'warning', title: 'Labor spend over weekly budget', detail: `$${schedule.summary.laborVariance.toFixed(0)} over the $${schedule.summary.laborBudget.toLocaleString()} weekly budget. Review shift lengths for part-time staff.` });
  }
  const weekendCoverage = schedule.schedule.filter(d => d.isWeekend);
  const weekendGaps = weekendCoverage.reduce((s, d) => s + d.coverage.reduce((ss, c) => ss + c.gap, 0), 0);
  if (weekendGaps > 5) {
    insights.workforce.push({ severity: 'warning', title: 'Weekend understaffing', detail: `${weekendGaps} coverage gaps on Sat/Sun when traffic is highest. Consider cross-training weekday staff or hiring weekend part-timers.` });
  }

  return insights;
}

module.exports = { getStoreData, getAllStoresComparison, getInventoryAlerts, getInventoryOverview, getInventoryTable, generateSchedule, generateInsights };
