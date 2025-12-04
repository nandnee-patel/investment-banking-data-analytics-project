# Investment Banking M&A Analysis Project
## Salesforce (CRM) Acquiring ServiceNow (NOW)

### 📋 Project Overview

This is a **complete, end-to-end Investment Banking M&A analysis project** suitable for Goldman Sachs New Analyst applications and portfolio showcase. The project features a realistic M&A scenario with comprehensive financial modeling, valuation analysis, and professional-grade deliverables.

**Transaction:** Salesforce Inc. acquiring ServiceNow Inc.

**Deal Value:** $165B+ 

**Status:** Comprehensive buy-side analysis with PROCEED recommendation

---

## 🎯 Key Features

### Financial Models
- ✅ **DCF Valuation** - Full discounted cash flow model with WACC calculation, terminal value, and sensitivity analysis
- ✅ **Comparable Company Analysis** - Trading multiples from 10 SaaS/enterprise software companies
- ✅ **Precedent Transaction Analysis** - 8 recent M&A transactions in enterprise software sector
- ✅ **Synergy Analysis** - Revenue and cost synergies with detailed breakdown and timeline
- ✅ **Accretion/Dilution Analysis** - EPS impact analysis with deal structure modeling

### Technical Implementation
- **Backend:** FastAPI (Python) with comprehensive financial calculation engine
- **Frontend:** React with professional IB-style dashboard, interactive charts (Recharts), and Radix UI
- **Database:** MongoDB for data persistence
- **Calculations:** All financial formulas implemented from scratch (not Excel-based)

### Professional Deliverables
- 📄 Executive Summary (downloadable)
- 📊 Interactive Financial Dashboard
- 📈 Dynamic Charts and Visualizations
- 💼 Investment Recommendation Memo
- 📑 Detailed Financial Statements

---

## 📊 Transaction Details

### Deal Overview
- **Acquirer:** Salesforce, Inc. (CRM) - $251B market cap
- **Target:** ServiceNow, Inc. (NOW) - $142B market cap
- **Proposed Deal Value:** $165.0B
- **Offer Price:** $796.85/share (30% premium)
- **Structure:** 90% Cash / 10% Stock
- **Expected Closing:** Q4 2025

### Strategic Rationale
1. Creates leading enterprise cloud platform combining CRM and ITSM
2. Expands TAM to $350B+ with enhanced AI/automation capabilities
3. Strengthens competitive position vs. Microsoft, Oracle, SAP
4. Significant cross-selling opportunities across 200K+ enterprise customers

### Financial Highlights
- **Total Synergies:** $4.3B annually
  - Revenue Synergies: $1.6B (cross-selling, upselling)
  - Cost Synergies: $2.7B (operational efficiencies)
- **EPS Accretion:** +8.5% by Year 2
- **One-time Integration Costs:** $2.5B
- **Payback Period:** 18 months

---

## 💻 Technical Architecture

### Backend Structure
```
/app/backend/
├── server.py                 # FastAPI application with M&A endpoints
├── models/
│   └── financial_data.py    # Pydantic models for all financial data
├── services/
│   ├── financial_calculator.py  # Core financial calculation engine
│   └── ma_analyzer.py       # M&A analysis orchestration service
└── data/
    ├── salesforce_data.py   # Historical financials for Salesforce
    ├── servicenow_data.py   # Historical financials for ServiceNow
    └── market_data.py       # Comps, precedents, market assumptions
```

### Key API Endpoints
- `GET /api/ma/overview` - Company overview and deal rationale
- `GET /api/ma/financials` - Historical financial statements
- `GET /api/ma/dcf` - DCF valuation analysis
- `GET /api/ma/comparable-companies` - Comparable company analysis
- `GET /api/ma/precedent-transactions` - Precedent transaction analysis
- `GET /api/ma/synergies` - Synergy estimation
- `GET /api/ma/accretion-dilution` - EPS accretion/dilution analysis
- `GET /api/ma/valuation-summary` - Comprehensive valuation summary
- `GET /api/ma/executive-summary` - Executive summary for deal

### Frontend Components
```
/app/frontend/src/
├── App.js                   # Main application with all components
├── services/
│   └── api.js              # API integration layer
├── utils/
│   └── formatters.js       # Financial formatting utilities
└── components/
    └── ui/                 # Radix UI components (tabs, cards, etc.)
```

---

## 📈 Valuation Methodology

### 1. DCF Analysis
**Assumptions:**
- WACC: 8.53% (calculated using CAPM)
- Terminal Growth Rate: 2.5%
- Tax Rate: 20%
- 5-year projection period (2025-2029)
- Revenue CAGR: 14% declining to 10%
- EBITDA margin: 21.5% (target)

**Output:**
- Enterprise Value: $139.0B
- Equity Value: $140.4B
- Implied Share Price: $678.26

### 2. Comparable Company Analysis
**Comps Set:** Microsoft, Adobe, Oracle, Workday, Snowflake, Atlassian, Datadog, Zoom, Salesforce

**Key Multiples:**
- EV/Revenue: 6.4x - 17.3x (Median: 12.5x)
- EV/EBITDA: 14.6x - 93.4x (Median: 35.0x)

**Implied Valuation:** $138.5B

### 3. Precedent Transaction Analysis
**Recent Deals:**
- Cisco / Splunk ($28B, 2024)
- Broadcom / VMware ($69B, 2023)
- Adobe / Figma ($20B, 2022)
- Salesforce / Slack ($27.7B, 2021)

**Key Metrics:**
- Median EV/Revenue: 9.8x
- Median Acquisition Premium: 28.7%

**Implied Valuation:** $141.2B

### 4. Weighted Average Valuation
- DCF (40%): $139.0B
- Comps (35%): $138.5B
- Precedents (25%): $141.2B
- **Weighted EV:** $139.4B
- **With 30% Premium:** $165.0B offer

---

## 🔄 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB
- Yarn package manager

### Backend Setup
```bash
cd /app/backend

# Install Python dependencies
pip install -r requirements.txt

# Ensure .env file has correct MongoDB URL
# MONGO_URL should be set properly

# Backend runs automatically via supervisor on port 8001
```

### Frontend Setup
```bash
cd /app/frontend

# Install dependencies
yarn install

# Ensure .env file has correct backend URL
# REACT_APP_BACKEND_URL should point to backend

# Frontend runs automatically via supervisor on port 3000
```

### Run the Application
```bash
# Both services are managed by supervisor
sudo supervisorctl status

# Restart services if needed
sudo supervisorctl restart backend
sudo supervisorctl restart frontend

# Or restart all
sudo supervisorctl restart all
```

### Access the Application
- **Frontend Dashboard:** Port 3000 (configured via environment)
- **Backend API:** Port 8001 (internal)
- **API Documentation:** Port 8001/docs (Swagger UI)

---

## 📊 Dashboard Features

### Executive Summary
- Transaction overview with key metrics
- Strategic rationale and deal benefits
- Final recommendation with confidence level
- Key risks and mitigation strategies

### Company Overview
- Detailed company profiles (Salesforce & ServiceNow)
- Market positioning and competitive landscape
- Deal rationale broken down by category

### Financial Analysis
- 5-year historical financial statements
- Income statement, balance sheet, cash flow
- Year-over-year revenue and profitability trends
- Interactive charts comparing both companies

### DCF Valuation
- Complete DCF model with all assumptions
- 5-year revenue and FCF projections
- Terminal value calculation
- Sensitivity to WACC and terminal growth
- Implied equity value and price per share

### Comparable Companies
- Trading multiples analysis (EV/Revenue, EV/EBITDA, P/E)
- Percentile analysis (25th, median, 75th)
- Implied valuations based on peer multiples
- Full comparable company set with metrics

### Precedent Transactions
- Recent M&A transactions in sector
- Deal multiples and acquisition premiums
- Transaction timeline and deal rationale
- Implied valuation range

### Synergies
- Revenue synergies breakdown
- Cost synergies by category
- Realization timeline (Year 1-3)
- Integration costs and net synergy value

### Accretion/Dilution
- Pro forma EPS analysis
- Impact with and without synergies
- Deal structure (cash/stock split)
- Break-even synergy calculation

### Valuation Summary
- Football field chart showing valuation range
- Weighted average methodology
- Final offer price recommendation
- Implied premium analysis

---

## 🎓 Resume & Portfolio Usage

### Resume Bullet Points

**For Investment Banking Analyst Position:**

> • Conducted comprehensive M&A analysis for $165B enterprise software acquisition, including DCF valuation, comparable company analysis, and precedent transaction analysis
>
> • Built financial models projecting $4.3B in annual synergies (revenue and cost) with detailed realization timeline and accretion/dilution analysis showing 8.5% EPS accretion
>
> • Developed full-stack web application to visualize transaction analysis with interactive dashboards, presenting valuation range of $139B-$165B and PROCEED recommendation
>
> • Created executive summary and investment memo analyzing strategic fit between Salesforce (CRM) and ServiceNow (NOW), identifying $350B+ TAM expansion opportunity

**For Technical Finance Role:**

> • Engineered automated M&A financial analysis platform using Python (FastAPI) and React, implementing DCF, trading comps, and precedent transaction methodologies
>
> • Designed calculation engine for WACC, terminal value, NPV, and synergy modeling with real-time data processing and visualization
>
> • Built professional investment banking dashboard with Recharts for data visualization, supporting comprehensive deal analysis workflow

### GitHub Portfolio

**Repository Description:**
```
Investment Banking M&A Analysis: Salesforce acquiring ServiceNow

Full-stack financial modeling platform for M&A transactions featuring:
• DCF valuation with terminal value calculation
• Comparable company and precedent transaction analysis  
• Synergy estimation and accretion/dilution modeling
• Professional IB-style dashboard with interactive charts
• $165B deal with detailed financial analysis and recommendation

Tech: Python, FastAPI, React, MongoDB, Recharts
```

---

## 📄 Key Deliverables

### 1. Executive Summary
One-page summary downloadable from the dashboard covering:
- Transaction overview
- Strategic rationale
- Financial highlights
- Valuation summary
- Key risks
- Final recommendation

### 2. Investment Memo (This Document)
Comprehensive 3-4 page memo covering:
- Deal overview and structure
- Strategic and financial rationale
- Detailed valuation analysis
- Synergy estimation
- Risk assessment
- Recommendation

### 3. Financial Models
- DCF valuation model
- Comparable company analysis
- Precedent transaction analysis
- Synergy model
- Accretion/dilution analysis

### 4. Presentation Materials
- Interactive dashboard
- Financial charts and graphs
- Summary tables
- Valuation football field

---
## 🚀 Next Steps for Enhancement

### Additional Features to Consider
1. **Sensitivity Analysis Tables** - Impact of varying WACC and terminal growth
2. **Monte Carlo Simulation** - Probabilistic valuation range
3. **LBO Analysis** - Leveraged buyout scenario modeling
4. **Credit Analysis** - Pro forma credit metrics and debt capacity
5. **PDF Export** - Generate professional PDF reports
6. **Excel Export** - Download models to Excel
7. **Scenario Analysis** - Bull/base/bear case modeling

### Interview Preparation
Be prepared to discuss:
- Valuation methodologies and assumptions
- Why Salesforce would acquire ServiceNow
- Synergy identification and quantification
- Deal structure rationale (cash vs. stock)
- Key risks and mitigation strategies
- Comparable selection criteria
- WACC calculation components
- Terminal value methodology

---

## 📞 Contact & Attribution

This project was created as a portfolio piece for Investment Banking analyst applications. All financial data is for educational and demonstration purposes.

**Key Skills Demonstrated:**
- Financial modeling and valuation
- M&A analysis and due diligence
- Strategic assessment
- Full-stack software development
- Data visualization
- Investment banking workflows

---

## 📜 License

This project is open source and available for educational purposes. Feel free to use it as a template for your own M&A analysis projects.

---

**Built with:** Python, FastAPI, React, MongoDB, Recharts, Tailwind CSS, Radix UI

**Last Updated:** January 2025
