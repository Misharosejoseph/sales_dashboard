const express = require("express");
const router = express.Router();

const leads = [
  { id: 1, status: "New", revenue: 0, date: "2026-02-10" },
  { id: 2, status: "Contacted", revenue: 0, date: "2026-02-11" },
  { id: 3, status: "Converted", revenue: 40000, date: "2026-02-12" },
  { id: 4, status: "Converted", revenue: 30000, date: "2026-02-13" },
  { id: 5, status: "Lost", revenue: 0, date: "2026-02-14" },
];

// KPI Summary
router.get("/summary", (req, res) => {
  const totalLeads = leads.length;
  const contactedLeads = leads.filter(l => l.status === "Contacted").length;
  const salesClosed = leads.filter(l => l.status === "Converted").length;
  const totalRevenue = leads.reduce((sum, l) => sum + l.revenue, 0);

  res.json({
    totalLeads,
    contactedLeads,
    salesClosed,
    totalRevenue
  });
});

// Status Summary
router.get("/status-summary", (req, res) => {
  const statusCount = {};

  leads.forEach(l => {
    statusCount[l.status] = (statusCount[l.status] || 0) + 1;
  });

  const result = Object.keys(statusCount).map(status => ({
    status,
    count: statusCount[status]
  }));

  res.json(result);
});

// Sales Trend
router.get("/sales-trend", (req, res) => {
  const revenueByDate = {};

  leads.forEach(l => {
    if (!revenueByDate[l.date]) {
      revenueByDate[l.date] = 0;
    }
    revenueByDate[l.date] += l.revenue;
  });

  const result = Object.keys(revenueByDate).map(date => ({
    date,
    revenue: revenueByDate[date]
  }));

  res.json(result);
});

module.exports = router;

