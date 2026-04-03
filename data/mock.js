// Mock data for retail store management

const STORES = [
  { id: 'S001', name: 'St. Catharines', address: '420 Vansickle Rd', region: 'Niagara' },
  { id: 'S002', name: 'Niagara Falls', address: '7481 Oakwood Dr', region: 'Niagara' },
  { id: 'S003', name: 'Burlington', address: '1250 Brant St', region: 'Hamilton' },
  { id: 'S004', name: 'Hamilton', address: '999 Upper Wentworth', region: 'Hamilton' },
];

// --- P&L DATA ---
const PNL = {
  S001: {
    revenue: { current: 842000, prev: 788000, target: 850000 },
    cogs: { current: 596000, prev: 562000 },
    grossMargin: { current: 29.2, prev: 28.7, target: 30.0 },
    laborCost: { current: 118000, prev: 125000, budget: 120000 },
    gnfr: { current: 14200, prev: 16800, budget: 15000 },
    shrink: { current: 1.1, prev: 1.4, target: 1.0 },
    netProfit: { current: 113800, prev: 84200 },
    transactions: { current: 12450, prev: 11800 },
    avgTransaction: { current: 67.63, prev: 66.78 },
    conversionRate: { current: 32.5, prev: 30.1 },
    footTraffic: { current: 38300, prev: 39200 },
    weekly: [
      { week: 'W1', revenue: 198000, labor: 28500, shrink: 1.2 },
      { week: 'W2', revenue: 212000, labor: 29200, shrink: 1.0 },
      { week: 'W3', revenue: 205000, labor: 30100, shrink: 1.3 },
      { week: 'W4', revenue: 227000, labor: 30200, shrink: 0.9 },
    ],
  },
  S002: {
    revenue: { current: 654000, prev: 612000, target: 670000 },
    cogs: { current: 470000, prev: 441000 },
    grossMargin: { current: 28.1, prev: 27.9, target: 29.0 },
    laborCost: { current: 98000, prev: 95000, budget: 96000 },
    gnfr: { current: 11500, prev: 12200, budget: 12000 },
    shrink: { current: 1.6, prev: 1.8, target: 1.2 },
    netProfit: { current: 74500, prev: 63800 },
    transactions: { current: 9820, prev: 9400 },
    avgTransaction: { current: 66.60, prev: 65.11 },
    conversionRate: { current: 28.4, prev: 27.2 },
    footTraffic: { current: 34560, prev: 34500 },
    weekly: [
      { week: 'W1', revenue: 155000, labor: 23800, shrink: 1.8 },
      { week: 'W2', revenue: 162000, labor: 24500, shrink: 1.5 },
      { week: 'W3', revenue: 168000, labor: 25200, shrink: 1.7 },
      { week: 'W4', revenue: 169000, labor: 24500, shrink: 1.4 },
    ],
  },
  S003: {
    revenue: { current: 1120000, prev: 1050000, target: 1100000 },
    cogs: { current: 784000, prev: 742000 },
    grossMargin: { current: 30.0, prev: 29.3, target: 30.5 },
    laborCost: { current: 155000, prev: 152000, budget: 158000 },
    gnfr: { current: 18200, prev: 19500, budget: 19000 },
    shrink: { current: 0.9, prev: 1.1, target: 1.0 },
    netProfit: { current: 162800, prev: 136500 },
    transactions: { current: 16200, prev: 15400 },
    avgTransaction: { current: 69.14, prev: 68.18 },
    conversionRate: { current: 34.2, prev: 33.1 },
    footTraffic: { current: 47380, prev: 46500 },
    weekly: [
      { week: 'W1', revenue: 268000, labor: 38000, shrink: 1.0 },
      { week: 'W2', revenue: 275000, labor: 38500, shrink: 0.8 },
      { week: 'W3', revenue: 285000, labor: 39200, shrink: 0.9 },
      { week: 'W4', revenue: 292000, labor: 39300, shrink: 0.9 },
    ],
  },
  S004: {
    revenue: { current: 780000, prev: 802000, target: 820000 },
    cogs: { current: 562000, prev: 577000 },
    grossMargin: { current: 27.9, prev: 28.1, target: 29.0 },
    laborCost: { current: 112000, prev: 108000, budget: 110000 },
    gnfr: { current: 13800, prev: 14200, budget: 14000 },
    shrink: { current: 1.8, prev: 1.5, target: 1.2 },
    netProfit: { current: 92200, prev: 102800 },
    transactions: { current: 11600, prev: 12100 },
    avgTransaction: { current: 67.24, prev: 66.28 },
    conversionRate: { current: 29.8, prev: 31.2 },
    footTraffic: { current: 38930, prev: 38780 },
    weekly: [
      { week: 'W1', revenue: 202000, labor: 28000, shrink: 1.6 },
      { week: 'W2', revenue: 195000, labor: 28200, shrink: 1.9 },
      { week: 'W3', revenue: 190000, labor: 27800, shrink: 2.0 },
      { week: 'W4', revenue: 193000, labor: 28000, shrink: 1.7 },
    ],
  },
};

// --- INVENTORY DATA ---
const CATEGORIES = ['Computers', 'TVs & Displays', 'Mobile', 'Audio', 'Appliances', 'Gaming', 'Smart Home', 'Accessories'];

const INVENTORY = [
  { sku: 'TV-SAM-75Q', name: 'Samsung 75" QN85B Neo QLED', category: 'TVs & Displays', price: 1999.99, cost: 1420, stock: { S001: 3, S002: 1, S003: 5, S004: 2 }, reorderPoint: 2, leadDays: 5, weeklyVelocity: { S001: 1.2, S002: 0.8, S003: 2.1, S004: 0.9 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 1 } },
  { sku: 'TV-LG-65C3', name: 'LG 65" C3 OLED', category: 'TVs & Displays', price: 1799.99, cost: 1280, stock: { S001: 4, S002: 3, S003: 6, S004: 3 }, reorderPoint: 3, leadDays: 5, weeklyVelocity: { S001: 1.5, S002: 1.1, S003: 2.5, S004: 1.2 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 0 } },
  { sku: 'PC-APP-M3P', name: 'MacBook Pro 14" M3 Pro', category: 'Computers', price: 2499.99, cost: 2050, stock: { S001: 6, S002: 4, S003: 10, S004: 5 }, reorderPoint: 4, leadDays: 3, weeklyVelocity: { S001: 2.0, S002: 1.5, S003: 3.8, S004: 1.8 }, shrinkUnits: { S001: 0, S002: 1, S003: 0, S004: 0 } },
  { sku: 'PC-DEL-INS', name: 'Dell Inspiron 16" Laptop', category: 'Computers', price: 899.99, cost: 620, stock: { S001: 12, S002: 8, S003: 15, S004: 10 }, reorderPoint: 6, leadDays: 4, weeklyVelocity: { S001: 3.5, S002: 2.8, S003: 5.2, S004: 3.0 }, shrinkUnits: { S001: 0, S002: 0, S003: 1, S004: 0 } },
  { sku: 'MB-APP-IP15', name: 'iPhone 15 Pro 256GB', category: 'Mobile', price: 1549.99, cost: 1320, stock: { S001: 8, S002: 5, S003: 14, S004: 7 }, reorderPoint: 5, leadDays: 2, weeklyVelocity: { S001: 3.2, S002: 2.0, S003: 5.5, S004: 2.8 }, shrinkUnits: { S001: 1, S002: 0, S003: 1, S004: 2 } },
  { sku: 'MB-SAM-S24', name: 'Samsung Galaxy S24 Ultra', category: 'Mobile', price: 1659.99, cost: 1380, stock: { S001: 5, S002: 3, S003: 9, S004: 4 }, reorderPoint: 3, leadDays: 3, weeklyVelocity: { S001: 1.8, S002: 1.2, S003: 3.0, S004: 1.5 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 1 } },
  { sku: 'AU-SON-ARC', name: 'Sonos Arc Soundbar', category: 'Audio', price: 1099.99, cost: 780, stock: { S001: 7, S002: 4, S003: 8, S004: 5 }, reorderPoint: 3, leadDays: 5, weeklyVelocity: { S001: 1.5, S002: 1.0, S003: 2.2, S004: 1.1 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 0 } },
  { sku: 'AU-APP-APM', name: 'AirPods Max', category: 'Audio', price: 779.99, cost: 560, stock: { S001: 10, S002: 6, S003: 12, S004: 8 }, reorderPoint: 4, leadDays: 2, weeklyVelocity: { S001: 2.5, S002: 1.8, S003: 4.0, S004: 2.2 }, shrinkUnits: { S001: 1, S002: 1, S003: 0, S004: 1 } },
  { sku: 'AP-LG-WASH', name: 'LG WashTower', category: 'Appliances', price: 2399.99, cost: 1750, stock: { S001: 2, S002: 1, S003: 4, S004: 2 }, reorderPoint: 2, leadDays: 7, weeklyVelocity: { S001: 0.5, S002: 0.3, S003: 1.0, S004: 0.4 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 0 } },
  { sku: 'AP-BSH-DW', name: 'Bosch 300 Dishwasher', category: 'Appliances', price: 1149.99, cost: 820, stock: { S001: 3, S002: 2, S003: 5, S004: 3 }, reorderPoint: 2, leadDays: 7, weeklyVelocity: { S001: 0.8, S002: 0.5, S003: 1.2, S004: 0.6 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 0 } },
  { sku: 'GM-PS5-PRO', name: 'PS5 Pro Console', category: 'Gaming', price: 699.99, cost: 560, stock: { S001: 0, S002: 0, S003: 2, S004: 1 }, reorderPoint: 3, leadDays: 4, weeklyVelocity: { S001: 2.5, S002: 2.0, S003: 3.5, S004: 2.2 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 0 } },
  { sku: 'SH-RNG-KIT', name: 'Ring Alarm Pro Kit', category: 'Smart Home', price: 379.99, cost: 240, stock: { S001: 15, S002: 10, S003: 18, S004: 12 }, reorderPoint: 6, leadDays: 3, weeklyVelocity: { S001: 2.0, S002: 1.5, S003: 3.2, S004: 1.8 }, shrinkUnits: { S001: 0, S002: 0, S003: 0, S004: 0 } },
  { sku: 'AC-APP-MG', name: 'MagSafe Charger + Case Bundle', category: 'Accessories', price: 89.99, cost: 42, stock: { S001: 45, S002: 30, S003: 60, S004: 35 }, reorderPoint: 15, leadDays: 2, weeklyVelocity: { S001: 8.5, S002: 6.0, S003: 12.0, S004: 7.0 }, shrinkUnits: { S001: 3, S002: 2, S003: 4, S004: 5 } },
  { sku: 'AC-ANK-CAB', name: 'Anker USB-C Cable 3-Pack', category: 'Accessories', price: 24.99, cost: 8, stock: { S001: 80, S002: 55, S003: 100, S004: 65 }, reorderPoint: 25, leadDays: 2, weeklyVelocity: { S001: 15.0, S002: 10.0, S003: 22.0, S004: 12.0 }, shrinkUnits: { S001: 5, S002: 3, S003: 6, S004: 8 } },
];

// --- WORKFORCE DATA ---
const EMPLOYEES_STORE = {
  S001: [
    { id: 'W01', name: 'Alex Chen', role: 'Store Manager', hourlyRate: 32, maxHours: 44, skills: ['Management', 'Sales', 'P&L'], availability: [1,1,1,1,1,0,0] },
    { id: 'W02', name: 'Priya Sharma', role: 'Asst. Manager', hourlyRate: 26, maxHours: 40, skills: ['Management', 'Sales', 'Inventory'], availability: [1,1,1,1,1,0,0] },
    { id: 'W03', name: 'James Wilson', role: 'Senior Sales', hourlyRate: 22, maxHours: 40, skills: ['Sales', 'Computing', 'Mobile'], availability: [1,1,1,1,0,1,0] },
    { id: 'W04', name: 'Maria Garcia', role: 'Senior Sales', hourlyRate: 22, maxHours: 40, skills: ['Sales', 'Home Theater', 'TV'], availability: [1,1,0,1,1,1,0] },
    { id: 'W05', name: 'Tyler Brown', role: 'Sales Assoc.', hourlyRate: 18, maxHours: 32, skills: ['Sales', 'Gaming', 'Accessories'], availability: [0,1,1,1,1,1,0] },
    { id: 'W06', name: 'Sophie Tremblay', role: 'Sales Assoc.', hourlyRate: 18, maxHours: 32, skills: ['Sales', 'Mobile', 'Smart Home'], availability: [1,1,1,0,0,1,1] },
    { id: 'W07', name: 'Kevin Park', role: 'Sales Assoc.', hourlyRate: 17, maxHours: 24, skills: ['Sales', 'Accessories'], availability: [0,0,1,1,1,1,1] },
    { id: 'W08', name: 'Emma Davis', role: 'Warehouse', hourlyRate: 19, maxHours: 40, skills: ['Inventory', 'Receiving', 'Planogram'], availability: [1,1,1,1,1,0,0] },
    { id: 'W09', name: 'Ryan Mitchell', role: 'Warehouse', hourlyRate: 18, maxHours: 32, skills: ['Inventory', 'Receiving'], availability: [1,1,1,1,0,1,0] },
    { id: 'W10', name: 'Chloe Wang', role: 'Customer Service', hourlyRate: 18, maxHours: 32, skills: ['Returns', 'Customer Service', 'POS'], availability: [1,0,1,1,1,1,0] },
  ],
};

const TRAFFIC_PATTERN = {
  // Hourly foot traffic multiplier (index 0 = opening hour 10AM)
  weekday: [0.3, 0.5, 0.7, 0.9, 1.0, 0.8, 0.9, 1.2, 1.5, 1.3, 0.6],
  weekend: [0.8, 1.0, 1.3, 1.5, 1.4, 1.2, 1.3, 1.5, 1.6, 1.2, 0.5],
  peakHour: 18, // 6PM
  baseTrafficPerHour: 45,
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

module.exports = { STORES, PNL, CATEGORIES, INVENTORY, EMPLOYEES_STORE, TRAFFIC_PATTERN, DAYS };
