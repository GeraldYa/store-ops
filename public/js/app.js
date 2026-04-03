/* ============================================
   StoreOps — Frontend Application
   ============================================ */

window.onerror = function(msg, src, line, col, err) {
  document.body.insertAdjacentHTML('beforeend',
    '<pre style="color:red;padding:20px;position:fixed;bottom:0;left:0;right:0;background:#111;z-index:9999;font-size:12px">ERROR: ' + msg + '\nLine: ' + line + ' Col: ' + col + '\n' + (err && err.stack || '') + '</pre>');
};

(function () {
  'use strict';

  // -------------------------------------------
  // i18n — use `tr` to avoid conflicts
  // -------------------------------------------
  const LANGS = ['EN', 'FR', 'ES', '中'];
  let langIdx = 0;

  const I18N = {
    EN: {
      pnlTab: 'P&L Dashboard',
      inventoryTab: 'Inventory',
      workforceTab: 'Workforce',
      disclaimer: '⚠️ All data shown is fictional and for demonstration purposes only.',
      actionableInsights: 'Actionable Insights',
      weeklyTrend: 'Weekly Revenue Trend',
      comparison: 'Multi-Store Comparison',
      alerts: 'Inventory Alerts',
      invItems: 'Inventory Items',
      schedule: 'Weekly Schedule',
      coverage: 'Daily Coverage',
      employees: 'Employee Roster',
      // P&L stat labels
      revenue: 'Revenue',
      grossMargin: 'Gross Margin %',
      laborCost: 'Labor Cost',
      shrinkPct: 'Shrink %',
      netProfit: 'Net Profit',
      conversionRate: 'Conversion Rate',
      footTraffic: 'Weekly Foot Traffic',
      transactions: 'transactions',
      avgTransaction: 'avg transaction',
      visitors: 'visitors this week',
      // Comparison headers
      store: 'Store',
      region: 'Region',
      // Inventory stat labels
      totalValue: 'Total Value',
      totalItems: 'Total Items',
      stockouts: 'Stockouts',
      reorderNeeded: 'Reorder Needed',
      shrinkLoss: 'Shrink Loss',
      // Inventory table headers
      sku: 'SKU',
      name: 'Name',
      category: 'Category',
      price: 'Price',
      stock: 'Stock',
      velocity: 'Velocity/wk',
      daysOfStock: 'Days Stock',
      shrink: 'Shrink',
      status: 'Status',
      suggestedOrder: 'Suggested Order',
      // Workforce stat labels
      weeklyLabor: 'Weekly Labor Cost',
      budgetVariance: 'Budget Variance',
      coverageGaps: 'Coverage Gaps',
      avgStaff: 'Avg Staff/Day',
      // Employee table headers
      employee: 'Employee',
      role: 'Role',
      skills: 'Skills',
      availability: 'Availability',
      hourlyRate: 'Hourly Rate',
      // Alert types
      alertStockout: 'STOCKOUT',
      alertLow: 'LOW STOCK',
      alertShrink: 'SHRINK',
      // Schedule
      off: 'OFF',
      // Days
      mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
      // Coverage
      staffed: 'Staffed',
      needed: 'Needed',
      // previous
      prev: 'prev',
      vs: 'vs',
    },
    FR: {
      pnlTab: 'Tableau P&L',
      inventoryTab: 'Inventaire',
      workforceTab: 'Effectifs',
      disclaimer: '⚠️ Toutes les données sont fictives et uniquement pour démonstration.',
      actionableInsights: 'Points d\'action',
      weeklyTrend: 'Tendance Hebdomadaire',
      comparison: 'Comparaison Multi-Magasins',
      alerts: 'Alertes Inventaire',
      invItems: 'Articles en Stock',
      schedule: 'Horaire Hebdomadaire',
      coverage: 'Couverture Quotidienne',
      employees: 'Liste des Employés',
      revenue: 'Revenu',
      grossMargin: 'Marge Brute %',
      laborCost: 'Coût Main-d\'œuvre',
      shrinkPct: 'Démarque %',
      netProfit: 'Bénéfice Net',
      conversionRate: 'Taux de Conversion',
      footTraffic: 'Fréquentation Hebdomadaire',
      transactions: 'transactions',
      avgTransaction: 'transaction moy.',
      visitors: 'visiteurs cette semaine',
      store: 'Magasin',
      region: 'Région',
      totalValue: 'Valeur Totale',
      totalItems: 'Articles Totaux',
      stockouts: 'Ruptures',
      reorderNeeded: 'Réappro. Nécessaire',
      shrinkLoss: 'Perte Démarque',
      sku: 'SKU',
      name: 'Nom',
      category: 'Catégorie',
      price: 'Prix',
      stock: 'Stock',
      velocity: 'Vélocité/sem',
      daysOfStock: 'Jours Stock',
      shrink: 'Démarque',
      status: 'Statut',
      suggestedOrder: 'Commande Suggérée',
      weeklyLabor: 'Coût Hebdo. Main-d\'œuvre',
      budgetVariance: 'Écart Budget',
      coverageGaps: 'Lacunes Couverture',
      avgStaff: 'Personnel Moy./Jour',
      employee: 'Employé',
      role: 'Rôle',
      skills: 'Compétences',
      availability: 'Disponibilité',
      hourlyRate: 'Taux Horaire',
      alertStockout: 'RUPTURE',
      alertLow: 'STOCK BAS',
      alertShrink: 'DÉMARQUE',
      off: 'REPOS',
      mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam', sun: 'Dim',
      staffed: 'Présent',
      needed: 'Requis',
      prev: 'préc.',
      vs: 'vs',
    },
    ES: {
      pnlTab: 'Tablero P&L',
      inventoryTab: 'Inventario',
      workforceTab: 'Personal',
      disclaimer: '⚠️ Todos los datos son ficticios y solo para demostración.',
      actionableInsights: 'Puntos de acción',
      weeklyTrend: 'Tendencia Semanal',
      comparison: 'Comparación Multi-Tienda',
      alerts: 'Alertas de Inventario',
      invItems: 'Artículos de Inventario',
      schedule: 'Horario Semanal',
      coverage: 'Cobertura Diaria',
      employees: 'Lista de Empleados',
      revenue: 'Ingresos',
      grossMargin: 'Margen Bruto %',
      laborCost: 'Costo Laboral',
      shrinkPct: 'Merma %',
      netProfit: 'Beneficio Neto',
      conversionRate: 'Tasa de Conversión',
      footTraffic: 'Tráfico Semanal',
      transactions: 'transacciones',
      avgTransaction: 'transacción prom.',
      visitors: 'visitantes esta semana',
      store: 'Tienda',
      region: 'Región',
      totalValue: 'Valor Total',
      totalItems: 'Artículos Totales',
      stockouts: 'Agotados',
      reorderNeeded: 'Reorden Necesario',
      shrinkLoss: 'Pérdida Merma',
      sku: 'SKU',
      name: 'Nombre',
      category: 'Categoría',
      price: 'Precio',
      stock: 'Stock',
      velocity: 'Velocidad/sem',
      daysOfStock: 'Días Stock',
      shrink: 'Merma',
      status: 'Estado',
      suggestedOrder: 'Orden Sugerida',
      weeklyLabor: 'Costo Laboral Semanal',
      budgetVariance: 'Varianza Presupuesto',
      coverageGaps: 'Brechas Cobertura',
      avgStaff: 'Personal Prom./Día',
      employee: 'Empleado',
      role: 'Rol',
      skills: 'Habilidades',
      availability: 'Disponibilidad',
      hourlyRate: 'Tarifa Hora',
      alertStockout: 'AGOTADO',
      alertLow: 'STOCK BAJO',
      alertShrink: 'MERMA',
      off: 'LIBRE',
      mon: 'Lun', tue: 'Mar', wed: 'Mié', thu: 'Jue', fri: 'Vie', sat: 'Sáb', sun: 'Dom',
      staffed: 'Asignado',
      needed: 'Necesario',
      prev: 'ant.',
      vs: 'vs',
    },
    '中': {
      pnlTab: '损益看板',
      inventoryTab: '库存管理',
      workforceTab: '人力排班',
      disclaimer: '⚠️ 所有数据均为虚构，仅供演示用途。',
      actionableInsights: '可执行洞察',
      weeklyTrend: '每周营收趋势',
      comparison: '多门店对比',
      alerts: '库存警报',
      invItems: '库存商品',
      schedule: '周排班表',
      coverage: '每日覆盖率',
      employees: '员工花名册',
      revenue: '营收',
      grossMargin: '毛利率 %',
      laborCost: '人工成本',
      shrinkPct: '损耗率 %',
      netProfit: '净利润',
      conversionRate: '转化率',
      footTraffic: '每周客流量',
      transactions: '笔交易',
      avgTransaction: '笔均消费',
      visitors: '本周访客数',
      store: '门店',
      region: '区域',
      totalValue: '库存总值',
      totalItems: '商品总数',
      stockouts: '缺货',
      reorderNeeded: '需补货',
      shrinkLoss: '损耗金额',
      sku: 'SKU',
      name: '名称',
      category: '品类',
      price: '价格',
      stock: '库存',
      velocity: '周销量',
      daysOfStock: '可售天数',
      shrink: '损耗',
      status: '状态',
      suggestedOrder: '建议采购',
      weeklyLabor: '周人工成本',
      budgetVariance: '预算偏差',
      coverageGaps: '覆盖缺口',
      avgStaff: '日均在岗',
      employee: '员工',
      role: '岗位',
      skills: '技能',
      availability: '出勤',
      hourlyRate: '时薪',
      alertStockout: '缺货',
      alertLow: '低库存',
      alertShrink: '损耗',
      off: '休',
      mon: '周一', tue: '周二', wed: '周三', thu: '周四', fri: '周五', sat: '周六', sun: '周日',
      staffed: '在岗',
      needed: '需求',
      prev: '上期',
      vs: 'vs',
    },
  };

  function tr(key) {
    const lang = LANGS[langIdx];
    return (I18N[lang] && I18N[lang][key]) || I18N.EN[key] || key;
  }

  // -------------------------------------------
  // DOM refs
  // -------------------------------------------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const elStoreSelect = $('#storeSelect');
  const elNavDate = $('#navDate');
  const elLangToggle = $('#langToggle');
  const elThemeToggle = $('#themeToggle');
  const elDisclaimer = $('#disclaimer');
  const elDisclaimerText = $('#disclaimerText');
  const elDisclaimerClose = $('#disclaimerClose');
  const elLoading = $('#loadingOverlay');

  // Tab elements
  const elTabPnl = $('#tabPnl');
  const elTabInventory = $('#tabInventory');
  const elTabWorkforce = $('#tabWorkforce');

  // P&L
  const elPnlStats = $('#pnlStats');
  const elWeeklyTrendTitle = $('#weeklyTrendTitle');
  const elWeeklyChart = $('#weeklyChart');
  const elConversionCard = $('#conversionCard');
  const elFootTrafficCard = $('#footTrafficCard');
  const elComparisonTitle = $('#comparisonTitle');
  const elComparisonHead = $('#comparisonHead');
  const elComparisonBody = $('#comparisonBody');

  // Inventory
  const elInvStats = $('#invStats');
  const elAlertsTitle = $('#alertsTitle');
  const elAlertsList = $('#alertsList');
  const elInvTableTitle = $('#invTableTitle');
  const elInvHead = $('#invHead');
  const elInvBody = $('#invBody');

  // Workforce
  const elWfStats = $('#wfStats');
  const elScheduleTitle = $('#scheduleTitle');
  const elSchedHead = $('#schedHead');
  const elSchedBody = $('#schedBody');
  const elCoverageTitle = $('#coverageTitle');
  const elCoverageGrid = $('#coverageGrid');
  const elEmployeeTitle = $('#employeeTitle');
  const elEmpHead = $('#empHead');
  const elEmpBody = $('#empBody');

  // -------------------------------------------
  // State
  // -------------------------------------------
  let stores = [];
  let currentStoreId = null;
  let currentTab = 'pnl';
  let pnlData = null;
  let invData = null;
  let wfData = null;

  // -------------------------------------------
  // Helpers
  // -------------------------------------------
  function fmtCurrency(val) {
    if (val == null) return '—';
    val = Number(val);
    if (isNaN(val)) return '—';
    if (Math.abs(val) >= 1e6) return '$' + (val / 1e6).toFixed(2) + 'M';
    if (Math.abs(val) >= 1e3) return '$' + (val / 1e3).toFixed(1) + 'K';
    return '$' + val.toFixed(2);
  }

  function fmtPct(val) {
    if (val == null) return '—';
    val = Number(val);
    if (isNaN(val)) return '—';
    return val.toFixed(1) + '%';
  }

  function fmtNum(val) {
    if (val == null) return '—';
    val = Number(val);
    if (isNaN(val)) return '—';
    return val.toLocaleString();
  }

  function trendArrow(current, previous) {
    if (current == null || previous == null || current === previous) return { cls: 'neutral', arrow: '→', pct: '0%' };
    current = Number(current); previous = Number(previous);
    if (isNaN(current) || isNaN(previous) || previous === 0) return { cls: 'neutral', arrow: '→', pct: '0%' };
    const pct = ((current - previous) / Math.abs(previous) * 100).toFixed(1);
    if (current > previous) return { cls: 'up', arrow: '↑', pct: '+' + pct + '%' };
    return { cls: 'down', arrow: '↓', pct: pct + '%' };
  }

  function showLoading() { elLoading.classList.add('active'); }
  function hideLoading() { elLoading.classList.remove('active'); }

  // -------------------------------------------
  // API
  // -------------------------------------------
  const API_BASE = '';

  async function apiFetch(path) {
    const resp = await fetch(API_BASE + path);
    if (!resp.ok) throw new Error('API error: ' + resp.status);
    return resp.json();
  }

  async function loadStores() {
    try {
      stores = await apiFetch('/api/stores');
      elStoreSelect.innerHTML = '';
      stores.forEach((s) => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        elStoreSelect.appendChild(opt);
      });
      if (stores.length > 0) {
        currentStoreId = stores[0].id;
        elStoreSelect.value = currentStoreId;
        await loadAllData();
      }
    } catch (err) {
      console.error('Failed to load stores:', err);
      elStoreSelect.innerHTML = '<option>Error loading stores</option>';
    }
  }

  async function loadAllData() {
    if (!currentStoreId) return;
    showLoading();
    try {
      const [pnl, inv, wf] = await Promise.all([
        apiFetch('/api/pnl/' + currentStoreId),
        apiFetch('/api/inventory/' + currentStoreId),
        apiFetch('/api/workforce/' + currentStoreId),
      ]);
      pnlData = pnl;
      invData = inv;
      wfData = wf;
      renderAll();
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      hideLoading();
    }
  }

  // -------------------------------------------
  // Render: P&L Dashboard
  // -------------------------------------------
  function createInsightsEl(parentId, id) {
    const parent = document.getElementById(parentId);
    if (!parent) return document.createElement('div');
    const el = document.createElement('div');
    el.id = id;
    parent.insertBefore(el, parent.firstChild);
    return el;
  }

  function renderInsights(container, insights) {
    if (!insights || insights.length === 0) { container.innerHTML = ''; return; }
    const icons = { critical: '🚨', warning: '⚠️', info: '💡', positive: '✅' };
    const colors = { critical: 'var(--red)', warning: 'var(--yellow)', info: 'var(--accent)', positive: 'var(--green)' };
    container.innerHTML = `<div class="insights-panel">
      <div class="insights-title">🔍 ${tr('actionableInsights')}</div>
      ${insights.map(i => `<div class="insight-item" style="border-left:3px solid ${colors[i.severity] || colors.info}">
        <span class="insight-icon">${icons[i.severity] || '💡'}</span>
        <div class="insight-body">
          <strong>${i.title}</strong>
          <div class="insight-detail">${i.detail}</div>
        </div>
      </div>`).join('')}
    </div>`;
  }

  function renderPnl() {
    if (!pnlData) return;
    const p = pnlData.pnl;

    // Insights
    const insightsEl = document.getElementById('pnlInsights') || createInsightsEl('pnlContent', 'pnlInsights');
    renderInsights(insightsEl, pnlData.insights);

    // Stats row — p.revenue is {current, prev, target}
    const statsConfig = [
      { label: tr('revenue'), value: fmtCurrency(p.revenue.current), prev: fmtCurrency(p.revenue.prev), color: 'green', current: p.revenue.current, previous: p.revenue.prev },
      { label: tr('grossMargin'), value: fmtPct(p.grossMargin.current), prev: fmtPct(p.grossMargin.prev), color: 'blue', current: p.grossMargin.current, previous: p.grossMargin.prev },
      { label: tr('laborCost'), value: fmtCurrency(p.laborCost.current), prev: fmtCurrency(p.laborCost.prev), color: 'yellow', current: p.laborCost.current, previous: p.laborCost.prev, invertTrend: true },
      { label: tr('shrinkPct'), value: fmtPct(p.shrink.current), prev: fmtPct(p.shrink.prev), color: 'red', current: p.shrink.current, previous: p.shrink.prev, invertTrend: true },
      { label: tr('netProfit'), value: fmtCurrency(p.netProfit.current), prev: fmtCurrency(p.netProfit.prev), color: 'green', current: p.netProfit.current, previous: p.netProfit.prev },
    ];

    elPnlStats.innerHTML = statsConfig.map((s) => {
      const trend = trendArrow(s.current, s.previous);
      // For shrink and labor cost, lower is better, so invert
      let trendCls = trend.cls;
      if (s.invertTrend) {
        if (trendCls === 'up') trendCls = 'down';
        else if (trendCls === 'down') trendCls = 'up';
      }
      return `<div class="stat-card">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value ${s.color}">${s.value}</div>
        <div class="stat-trend ${trendCls}">${trend.arrow} ${trend.pct} <span class="stat-prev">${tr('vs')} ${s.prev} ${tr('prev')}</span></div>
      </div>`;
    }).join('');

    // Weekly chart
    elWeeklyTrendTitle.textContent = tr('weeklyTrend');
    const weekly = p.weekly || [];
    const maxVal = Math.max(...weekly.map((w) => w.revenue || 0), 1);
    elWeeklyChart.innerHTML = weekly.map((w) => {
      const pctHeight = Math.max(((w.revenue || 0) / maxVal) * 100, 2);
      return `<div class="bar-col">
        <span class="bar-value">${fmtCurrency(w.revenue)}</span>
        <div class="bar" style="height:${pctHeight}%"></div>
        <span class="bar-label">${w.week || ''}</span>
      </div>`;
    }).join('');

    // Conversion card
    elConversionCard.innerHTML = `
      <h3>${tr('conversionRate')}</h3>
      <div class="metric-big">${fmtPct(p.conversionRate.current)}</div>
      <div class="metric-sub">${fmtNum(p.transactions.current)} ${tr('transactions')}</div>
      <div class="metric-sub">${fmtCurrency(p.avgTransaction.current)} ${tr('avgTransaction')}</div>
    `;

    // Foot traffic card
    elFootTrafficCard.innerHTML = `
      <h3>${tr('footTraffic')}</h3>
      <div class="metric-big" style="color:var(--purple)">${fmtNum(p.footTraffic.current)}</div>
      <div class="metric-sub">${tr('visitors')}</div>
    `;

    // Comparison table
    elComparisonTitle.textContent = tr('comparison');
    const comp = pnlData.comparison || [];
    elComparisonHead.innerHTML = `<tr>
      <th>${tr('store')}</th>
      <th>${tr('region')}</th>
      <th>${tr('revenue')}</th>
      <th>${tr('grossMargin')}</th>
      <th>${tr('laborCost')}</th>
      <th>${tr('shrinkPct')}</th>
      <th>${tr('netProfit')}</th>
    </tr>`;
    elComparisonBody.innerHTML = comp.map((c) => `<tr>
      <td><strong>${c.store || c.name || ''}</strong></td>
      <td>${c.region || ''}</td>
      <td>${fmtCurrency(c.revenue)}</td>
      <td>${fmtPct(c.grossMargin)}</td>
      <td>${fmtCurrency(c.laborCost)}</td>
      <td>${fmtPct(c.shrink)}</td>
      <td style="color:${(c.netProfit || 0) >= 0 ? 'var(--green)' : 'var(--red)'}">${fmtCurrency(c.netProfit)}</td>
    </tr>`).join('');
  }

  // -------------------------------------------
  // Render: Inventory
  // -------------------------------------------
  function renderInventory() {
    if (!invData) return;
    const ov = invData.overview || {};

    // Insights
    const insightsEl = document.getElementById('invInsights') || createInsightsEl('inventoryContent', 'invInsights');
    renderInsights(insightsEl, invData.insights);

    // Stats row
    const invStatsConfig = [
      { label: tr('totalValue'), value: fmtCurrency(ov.totalValue), color: 'blue' },
      { label: tr('totalItems'), value: fmtNum(ov.totalItems), color: 'purple' },
      { label: tr('stockouts'), value: fmtNum(ov.stockouts), color: 'red' },
      { label: tr('reorderNeeded'), value: fmtNum(ov.reorderNeeded), color: 'yellow' },
      { label: tr('shrinkLoss'), value: fmtCurrency(ov.totalShrinkValue), color: 'red' },
    ];

    elInvStats.innerHTML = invStatsConfig.map((s) => `<div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value ${s.color}">${s.value}</div>
    </div>`).join('');

    // Alerts
    elAlertsTitle.textContent = tr('alerts');
    const alerts = invData.alerts || [];
    elAlertsList.innerHTML = alerts.map((a) => {
      let cls, icon, typeTxt;
      const aType = (a.type || '').toLowerCase();
      if (aType === 'stockout') {
        cls = 'alert-stockout'; icon = '🔴'; typeTxt = tr('alertStockout');
      } else if (aType === 'low_stock' || aType === 'low') {
        cls = 'alert-low'; icon = '🟡'; typeTxt = tr('alertLow');
      } else {
        cls = 'alert-shrink'; icon = '🔵'; typeTxt = tr('alertShrink');
      }
      return `<div class="alert-item ${cls}">
        <span class="alert-icon">${icon}</span>
        <span class="alert-text"><strong>[${typeTxt}]</strong> ${a.message || a.item || ''}</span>
        <span class="alert-time">${a.time || ''}</span>
      </div>`;
    }).join('');

    // Inventory table
    elInvTableTitle.textContent = tr('invItems');
    elInvHead.innerHTML = `<tr>
      <th>${tr('sku')}</th>
      <th>${tr('name')}</th>
      <th>${tr('category')}</th>
      <th>${tr('price')}</th>
      <th>${tr('stock')}</th>
      <th>${tr('velocity')}</th>
      <th>${tr('daysOfStock')}</th>
      <th>${tr('shrink')}</th>
      <th>${tr('status')}</th>
      <th>${tr('suggestedOrder')}</th>
    </tr>`;

    const items = invData.items || [];
    elInvBody.innerHTML = items.map((item) => {
      const statusLower = (item.status || '').toLowerCase();
      let badgeCls = 'badge-green', badgeText = item.status || 'OK';
      if (statusLower.includes('stockout') || statusLower.includes('out')) {
        badgeCls = 'badge-red';
      } else if (statusLower.includes('low') || statusLower.includes('reorder')) {
        badgeCls = 'badge-yellow';
      } else if (statusLower.includes('overstock') || statusLower.includes('excess')) {
        badgeCls = 'badge-purple';
      }

      const rowCls = (item.suggestedOrder && item.suggestedOrder > 0) ? 'highlight-row' : '';

      return `<tr class="${rowCls}">
        <td>${item.sku || ''}</td>
        <td>${item.name || ''}</td>
        <td>${item.category || ''}</td>
        <td>${fmtCurrency(item.price)}</td>
        <td>${fmtNum(item.stock)}</td>
        <td>${fmtNum(item.velocity)}</td>
        <td>${item.daysOfStock != null ? item.daysOfStock : '—'}</td>
        <td>${item.shrink != null ? fmtNum(item.shrink) : '—'}</td>
        <td><span class="badge ${badgeCls}">${badgeText}</span></td>
        <td>${item.suggestedOrder ? '<strong>' + fmtNum(item.suggestedOrder) + '</strong>' : '—'}</td>
      </tr>`;
    }).join('');
  }

  // -------------------------------------------
  // Render: Workforce
  // -------------------------------------------
  function renderWorkforce() {
    if (!wfData) return;
    const summary = wfData.summary || {};

    // Insights
    const insightsEl = document.getElementById('wfInsights') || createInsightsEl('workforceContent', 'wfInsights');
    renderInsights(insightsEl, wfData.insights);

    // Stats row
    const totalHoursPerDay = wfData.schedule
      ? wfData.schedule.reduce((sum, day) => sum + (day.totalHours || 0), 0) / Math.max(wfData.schedule.length, 1)
      : 0;
    const avgStaffPerDay = wfData.schedule
      ? wfData.schedule.reduce((sum, day) => sum + (day.assigned ? day.assigned.length : 0), 0) / Math.max(wfData.schedule.length, 1)
      : 0;

    const varianceColor = (summary.laborVariance || 0) <= 0 ? 'green' : 'red';
    const variancePrefix = (summary.laborVariance || 0) <= 0 ? '' : '+';

    const wfStatsConfig = [
      { label: tr('weeklyLabor'), value: fmtCurrency(summary.weeklyLabor), color: 'blue' },
      { label: tr('budgetVariance'), value: variancePrefix + fmtCurrency(summary.laborVariance), color: varianceColor },
      { label: tr('coverageGaps'), value: fmtNum(summary.coverageGaps), color: (summary.coverageGaps || 0) > 0 ? 'red' : 'green' },
      { label: tr('avgStaff'), value: Number(avgStaffPerDay || 0).toFixed(1), color: 'purple' },
    ];

    elWfStats.innerHTML = wfStatsConfig.map((s) => `<div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value ${s.color}">${s.value}</div>
    </div>`).join('');

    // Schedule grid
    elScheduleTitle.textContent = tr('schedule');
    const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const schedule = wfData.schedule || [];
    const employees = wfData.employees || [];

    // Build employee -> day -> shift mapping
    const empShifts = {};
    employees.forEach((emp) => {
      empShifts[emp.id || emp.name] = {};
    });

    schedule.forEach((day, idx) => {
      const dayKey = dayKeys[idx] || dayKeys[0];
      const assigned = day.assigned || [];
      assigned.forEach((assignment) => {
        const emp = assignment.employee || {};
        const empId = typeof emp === 'object' ? (emp.id || emp.name) : emp;
        if (!empShifts[empId]) empShifts[empId] = {};
        empShifts[empId][dayKey] = assignment;
      });
    });

    elSchedHead.innerHTML = `<tr>
      <th>${tr('employee')}</th>
      ${dayKeys.map((d) => `<th>${tr(d)}</th>`).join('')}
    </tr>`;

    elSchedBody.innerHTML = employees.map((emp) => {
      const empId = emp.id || emp.name;
      const shifts = empShifts[empId] || {};
      return `<tr>
        <td>${emp.name || empId}</td>
        ${dayKeys.map((d) => {
          const shift = shifts[d];
          if (!shift) return `<td><span class="shift-off">${tr('off')}</span></td>`;
          const start = shift.start || '';
          const end = shift.end || '';
          const hours = shift.hours || '';
          const label = hours ? hours + 'h' : (start && end ? start + '-' + end : '—');
          let shiftCls = 'shift-full';
          const startHour = parseInt(start, 10);
          if (!isNaN(startHour)) {
            if (startHour < 12) shiftCls = 'shift-morning';
            else if (startHour < 17) shiftCls = 'shift-afternoon';
            else shiftCls = 'shift-evening';
          }
          return `<td><span class="shift-bar ${shiftCls}">${label}</span></td>`;
        }).join('')}
      </tr>`;
    }).join('');

    // Coverage chart
    elCoverageTitle.textContent = tr('coverage');
    elCoverageGrid.innerHTML = schedule.map((day, idx) => {
      const dayLabel = tr(dayKeys[idx] || 'mon');
      const coverageSlots = day.coverage || [];
      // Show coverage bars per time slot
      const maxNeeded = Math.max(...coverageSlots.map((c) => Math.max(c.staffed || 0, c.needed || 0)), 1);
      return `<div class="coverage-day">
        <div class="coverage-day-title">${dayLabel}</div>
        ${coverageSlots.map((slot) => {
          const staffed = slot.staffed || 0;
          const needed = slot.needed || 0;
          const pct = Math.min((staffed / Math.max(needed, 1)) * 100, 100);
          let fillCls = 'fill-good';
          if (pct < 70) fillCls = 'fill-bad';
          else if (pct < 90) fillCls = 'fill-ok';
          return `<div class="coverage-bar-row">
            <span class="coverage-bar-label">${slot.hour || slot.time || ''}</span>
            <div class="coverage-bar-track">
              <div class="coverage-bar-fill ${fillCls}" style="width:${pct}%"></div>
            </div>
            <span class="coverage-bar-num">${staffed}/${needed}</span>
          </div>`;
        }).join('')}
      </div>`;
    }).join('');

    // Employee roster
    elEmployeeTitle.textContent = tr('employees');
    elEmpHead.innerHTML = `<tr>
      <th>${tr('employee')}</th>
      <th>${tr('role')}</th>
      <th>${tr('skills')}</th>
      <th>${tr('availability')}</th>
      <th>${tr('hourlyRate')}</th>
    </tr>`;

    elEmpBody.innerHTML = employees.map((emp) => {
      const skillTags = (emp.skills || []).map((sk) => `<span class="skill-tag">${sk}</span>`).join('');
      const availArr = emp.availability || [];
      const daysAvail = Array.isArray(availArr) ? availArr.filter(d => d === 1).length : 7;
      let dotCls = 'available', availText = daysAvail + '/7 days';
      if (daysAvail <= 3) {
        dotCls = 'partial';
      } else if (daysAvail === 0) {
        dotCls = 'unavailable';
      }
      return `<tr>
        <td><strong>${emp.name || ''}</strong></td>
        <td>${emp.role || ''}</td>
        <td>${skillTags || '—'}</td>
        <td><span class="avail-dot ${dotCls}"></span>${availText}</td>
        <td>${emp.hourlyRate != null ? fmtCurrency(emp.hourlyRate) : '—'}</td>
      </tr>`;
    }).join('');
  }

  // -------------------------------------------
  // Render all
  // -------------------------------------------
  function renderAll() {
    if (!pnlData && !invData && !wfData) return;
    if (pnlData) renderPnl();
    if (invData) renderInventory();
    if (wfData) renderWorkforce();
  }

  // -------------------------------------------
  // Update all translatable labels
  // -------------------------------------------
  function updateLabels() {
    // Tabs
    elTabPnl.innerHTML = tr('pnlTab');
    elTabInventory.textContent = tr('inventoryTab');
    elTabWorkforce.textContent = tr('workforceTab');

    // Disclaimer
    elDisclaimerText.innerHTML = tr('disclaimer');

    // Re-render all data panels to pick up label changes
    renderAll();
  }

  // -------------------------------------------
  // Tab switching
  // -------------------------------------------
  function switchTab(tab) {
    currentTab = tab;
    $$('.tab').forEach((el) => el.classList.remove('active'));
    $$('.tab-content').forEach((el) => el.classList.remove('active'));

    const tabBtn = $(`.tab[data-tab="${tab}"]`);
    const tabContent = $(`#${tab}Content`);
    if (tabBtn) tabBtn.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
  }

  // -------------------------------------------
  // Theme toggle
  // -------------------------------------------
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    elThemeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('storeops-theme', isDark ? 'light' : 'dark');
  }

  // -------------------------------------------
  // Language toggle
  // -------------------------------------------
  function toggleLang() {
    langIdx = (langIdx + 1) % LANGS.length;
    elLangToggle.textContent = LANGS[langIdx];
    localStorage.setItem('storeops-lang', langIdx);
    updateLabels();
  }

  // -------------------------------------------
  // Init
  // -------------------------------------------
  function init() {
    // Restore theme preference
    const savedTheme = localStorage.getItem('storeops-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      elThemeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    // Restore language preference
    const savedLang = localStorage.getItem('storeops-lang');
    if (savedLang != null) {
      langIdx = parseInt(savedLang, 10) || 0;
      elLangToggle.textContent = LANGS[langIdx];
    }

    // Set date
    const now = new Date();
    elNavDate.textContent = now.toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });

    // Event listeners
    elThemeToggle.addEventListener('click', toggleTheme);
    elLangToggle.addEventListener('click', toggleLang);

    elDisclaimerClose.addEventListener('click', () => {
      elDisclaimer.classList.add('hidden');
    });

    // Tab clicks
    $$('.tab').forEach((tabEl) => {
      tabEl.addEventListener('click', () => {
        switchTab(tabEl.dataset.tab);
      });
    });

    // Store selector
    elStoreSelect.addEventListener('change', () => {
      currentStoreId = elStoreSelect.value;
      loadAllData();
    });

    // Update initial labels
    updateLabels();

    // Load data
    loadStores();
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
