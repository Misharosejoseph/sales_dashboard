Full Stack Sales Dashboard
Overview

This project is a Full-Stack Sales Dashboard designed for internal business monitoring. It provides a high-level overview of sales and lead performance, allowing visualization of key metrics, sales trends, and lead status distribution.

This assignment demonstrates proficiency in:

Frontend development (React/HTML/CSS/JS)

Backend API development (Node.js/Express or Flask)

Data aggregation and API integration

Basic data visualization using charts

Clean and responsive UI design

Features
1. KPI Summary

Total Leads

Contacted Leads

Sales Closed

Total Revenue

Each KPI displays a numeric value and descriptive label.

2. Lead Status Summary

Table displaying lead statuses:

New

Contacted

Follow Up

Appointment Booked

Converted

Lost

Shows count per status

3. Charts

Sales Trend: Line chart representing revenue over time (min 7 days of data)

Lead Status Distribution: Pie/donut chart showing percentages of all lead statuses with hover tooltips

4. Date Range Filter

Dropdown filter options:

Last 7 Days

Last 30 Days

Backend

Stores lead and sales data (dummy data included)

Provides REST API endpoints for the frontend

Aggregates data for KPI and charts

Returns structured JSON responses

Example Endpoints:

GET /api/kpis – Returns total leads, contacted leads, sales closed, total revenue

GET /api/lead-status – Returns count of leads by status

GET /api/sales-trend?range=7 – Returns revenue data for the selected date range

Frontend

Built using React (or plain HTML/CSS/JS if applicable)

Consumes backend APIs and renders data dynamically

Responsive layout for 1366 × 768 resolution

Loading indicators while fetching data

Empty state messages for missing data

Data

Dummy data simulates realistic business scenarios

Includes multiple lead statuses and sales records to generate visible trends

Setup Instructions
Prerequisites

Node.js (v18+ recommended)

npm or yarn

Steps

Clone the repository:

git clone https://github.com/your-username/fullstack-sales-dashboard.git
cd fullstack-sales-dashboard


Install dependencies for backend:

cd backend
npm install


Run the backend server:

npm start


Install dependencies for frontend:

cd ../frontend
npm install


Run the frontend:

npm start


Open the browser at http://localhost:3000 to view the dashboard

Architecture & Design Decisions

Frontend-Backend Separation: APIs serve as a clear boundary for data handling

Data Aggregation: Backend aggregates KPIs and chart data for simplicity and clarity

Chart Library: Used Chart.js / Recharts for easy visualization

Responsive UI: Flexbox and CSS Grid used to maintain structure and readability

Dummy Data Generation: Simulated realistic leads and sales for testing
