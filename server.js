const express = require('express');
const path = require('path');
const { getStoreData, getAllStoresComparison, getInventoryAlerts, getInventoryOverview, getInventoryTable, generateSchedule, generateInsights } = require('./data/analyzer');
const { STORES } = require('./data/mock');

const app = express();
const PORT = 3084;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stores', (req, res) => res.json(STORES));

app.get('/api/pnl/:storeId', (req, res) => {
  const data = getStoreData(req.params.storeId);
  const comparison = getAllStoresComparison();
  const insights = generateInsights(req.params.storeId);
  res.json({ ...data, comparison, insights: insights.pnl });
});

app.get('/api/inventory/:storeId', (req, res) => {
  const overview = getInventoryOverview(req.params.storeId);
  const alerts = getInventoryAlerts(req.params.storeId);
  const items = getInventoryTable(req.params.storeId);
  const insights = generateInsights(req.params.storeId);
  res.json({ overview, alerts, items, insights: insights.inventory });
});

app.get('/api/workforce/:storeId', (req, res) => {
  const data = generateSchedule(req.params.storeId);
  const insights = generateInsights(req.params.storeId);
  res.json({ ...data, insights: insights.workforce });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`StoreOps running on http://localhost:${PORT}`));
