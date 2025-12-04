# Complete Setup & Usage Guide
## Investment Banking M&A Analysis Project

This guide will walk you through running the complete Investment Banking M&A analysis application locally.

---

## \ud83d\udcbb System Requirements

- **Operating System:** Linux, macOS, or Windows (with WSL2)
- **Python:** 3.9 or higher
- **Node.js:** 18.x or higher
- **MongoDB:** 4.4 or higher
- **Yarn:** 1.22 or higher
- **RAM:** Minimum 4GB, Recommended 8GB
- **Disk Space:** 2GB free space

---

## \ud83d\ude80 Quick Start (5 Minutes)

### Step 1: Verify Services

The application uses supervisor to manage all services. Check status:

```bash
sudo supervisorctl status
```

You should see:
```
backend     RUNNING
frontend    RUNNING
mongodb     RUNNING
```

If any service is not running:
```bash
sudo supervisorctl restart all
```

### Step 2: Verify Backend

Test the API is responding:

```bash
curl http://localhost:8001/api/
```

Expected response:
```json
{
  "message": "M&A Analysis API - Salesforce acquiring ServiceNow",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### Step 3: Access Frontend

Open your browser and navigate to the configured frontend URL (port 3000 or as configured in your environment).

You should see the M&A Analysis Dashboard!

---

## \ud83d\udd27 Detailed Installation (If Starting Fresh)

### Backend Setup

```bash
# Navigate to backend directory
cd /app/backend

# Ensure Python virtual environment (if needed)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Verify .env file exists
ls -la .env

# The .env should contain:
# MONGO_URL=mongodb://localhost:27017/
# DB_NAME=ma_analysis
# CORS_ORIGINS=*

# Test Python imports
python3 -c "from services.ma_analyzer import MAAnalyzer; print('Backend imports OK')"
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd /app/frontend

# Install dependencies with Yarn
yarn install

# Verify .env file exists
ls -la .env

# The .env should contain:
# REACT_APP_BACKEND_URL=<your_backend_url>

# Test build (optional)
yarn build
```

### MongoDB Setup

```bash
# Check MongoDB is running
sudo systemctl status mongodb
# OR
ps aux | grep mongod

# Test connection
mongosh --eval "db.version()"

# Create database (auto-created on first use)
mongosh --eval "use ma_analysis"
```

---

## \ud83d\udd04 Running the Application

### Using Supervisor (Recommended)

Supervisor manages all services automatically:

```bash
# Check status
sudo supervisorctl status

# Restart all services
sudo supervisorctl restart all

# Restart individual service
sudo supervisorctl restart backend
sudo supervisorctl restart frontend

# View logs
sudo supervisorctl tail -f backend
sudo supervisorctl tail -f frontend
```

### Manual Start (Development Only)

If you need to run services manually for development:

**Terminal 1 - MongoDB:**
```bash
mongod --dbpath /data/db
```

**Terminal 2 - Backend:**
```bash
cd /app/backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 3 - Frontend:**
```bash
cd /app/frontend
yarn start
```

---

## \ud83d\udd0d Testing the Application

### 1. Test Backend APIs

```bash
# Test root endpoint
curl http://localhost:8001/api/

# Test executive summary
curl http://localhost:8001/api/ma/executive-summary

# Test DCF valuation
curl http://localhost:8001/api/ma/dcf

# Test comparable companies
curl http://localhost:8001/api/ma/comparable-companies

# Test all endpoints
curl http://localhost:8001/api/ma/overview
curl http://localhost:8001/api/ma/financials
curl http://localhost:8001/api/ma/synergies
curl http://localhost:8001/api/ma/accretion-dilution
curl http://localhost:8001/api/ma/valuation-summary
```

### 2. Test Frontend

Open browser and navigate through all tabs:
- Executive Summary
- Overview
- Financials
- DCF
- Comps
- Precedents
- Synergies
- Valuation

### 3. Test Download Feature

Click "Download Summary" button in the header. A text file should download with the executive summary.

---

## \ud83d\udcca Using the Dashboard

### Navigation

The dashboard has 8 main sections accessible via tabs:

1. **Executive** - High-level transaction overview and recommendation
2. **Overview** - Company profiles and deal rationale
3. **Financials** - Historical financial statements
4. **DCF** - Discounted cash flow valuation
5. **Comps** - Comparable company analysis
6. **Precedents** - Precedent transaction analysis
7. **Synergies** - Merger synergies and accretion/dilution
8. **Valuation** - Final valuation summary and recommendation

### Key Features

**Metric Cards:**
- Display key deal metrics (Deal Value, Premium, Synergies, EPS Impact)
- Color-coded for quick visual assessment

**Interactive Charts:**
- Revenue comparison over time
- Free cash flow projections
- Synergy breakdown (pie chart)
- Valuation methods comparison

**Financial Tables:**
- Income statements (historical and projected)
- Comparable company metrics
- Precedent transaction details
- EPS accretion/dilution analysis

**Download Functionality:**
- Click "Download Summary" to export executive summary
- Text format with all key metrics and recommendation

---

## \ud83d\udee0\ufe0f Troubleshooting

### Backend Issues

**Issue:** Backend not starting
```bash
# Check logs
tail -f /var/log/supervisor/backend.err.log

# Common issues:
# 1. MongoDB not running
sudo systemctl start mongodb

# 2. Missing Python packages
cd /app/backend && pip install -r requirements.txt

# 3. Port already in use
lsof -i :8001
kill -9 <PID>
```

**Issue:** Import errors in Python
```bash
# Verify Python path
cd /app/backend
python3 -c "import sys; print(sys.path)"

# The backend directory should be in the path
# If not, set PYTHONPATH
export PYTHONPATH=/app:$PYTHONPATH
```

**Issue:** API returns 500 errors
```bash
# Check backend logs for detailed error
tail -100 /var/log/supervisor/backend.err.log

# Test MongoDB connection
python3 << EOF
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
async def test():
    client = AsyncIOMotorClient('mongodb://localhost:27017/')
    print(await client.server_info())
asyncio.run(test())
EOF
```

### Frontend Issues

**Issue:** Frontend not loading
```bash
# Check if frontend is running
curl http://localhost:3000

# Check logs
tail -f /var/log/supervisor/frontend.err.log

# Verify REACT_APP_BACKEND_URL in .env
cat /app/frontend/.env
```

**Issue:** API calls failing (CORS errors)
```bash
# Check backend CORS configuration
grep CORS_ORIGINS /app/backend/.env

# Should allow your frontend origin
# Update if needed:
echo "CORS_ORIGINS=*" >> /app/backend/.env
sudo supervisorctl restart backend
```

**Issue:** Charts not rendering
```bash
# Verify recharts is installed
cd /app/frontend
yarn list recharts

# Reinstall if needed
yarn add recharts
sudo supervisorctl restart frontend
```

### MongoDB Issues

**Issue:** MongoDB not running
```bash
# Start MongoDB
sudo systemctl start mongodb

# Or via supervisor
sudo supervisorctl start mongodb

# Check status
sudo systemctl status mongodb
```

**Issue:** Connection refused
```bash
# Check MongoDB is listening
netstat -tlnp | grep 27017

# Check MongoDB logs
tail -50 /var/log/mongodb/mongod.log

# Restart MongoDB
sudo systemctl restart mongodb
```

---

## \ud83d\udcdd API Documentation

### Base URL
```
http://localhost:8001/api
```

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | API info and available endpoints |
| `/api/ma/overview` | GET | Company overview and deal rationale |
| `/api/ma/financials` | GET | Historical financial statements |
| `/api/ma/dcf` | GET | DCF valuation analysis |
| `/api/ma/comparable-companies` | GET | Comparable company analysis |
| `/api/ma/precedent-transactions` | GET | Precedent transaction analysis |
| `/api/ma/synergies` | GET | Synergy estimation |
| `/api/ma/accretion-dilution` | GET | EPS accretion/dilution |
| `/api/ma/valuation-summary` | GET | Valuation summary |
| `/api/ma/executive-summary` | GET | Executive summary |

### Interactive API Docs

FastAPI provides automatic interactive documentation:

**Swagger UI:** http://localhost:8001/docs
**ReDoc:** http://localhost:8001/redoc

---

## \ud83d\udd12 Environment Variables

### Backend (.env)

```bash
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/
DB_NAME=ma_analysis

# CORS Configuration
CORS_ORIGINS=*

# Optional: Logging Level
LOG_LEVEL=INFO
```

### Frontend (.env)

```bash
# Backend API URL
REACT_APP_BACKEND_URL=<your_backend_url>

# Optional: Environment
NODE_ENV=production
```

---

## \ud83d\udce6 Project Structure

```
/app/
\u251c\u2500\u2500 backend/
\u2502   \u251c\u2500\u2500 server.py              # Main FastAPI application
\u2502   \u251c\u2500\u2500 requirements.txt       # Python dependencies
\u2502   \u251c\u2500\u2500 .env                   # Environment variables
\u2502   \u251c\u2500\u2500 models/
\u2502   \u2502   \u2514\u2500\u2500 financial_data.py  # Data models
\u2502   \u251c\u2500\u2500 services/
\u2502   \u2502   \u251c\u2500\u2500 financial_calculator.py
\u2502   \u2502   \u2514\u2500\u2500 ma_analyzer.py
\u2502   \u2514\u2500\u2500 data/
\u2502       \u251c\u2500\u2500 salesforce_data.py
\u2502       \u251c\u2500\u2500 servicenow_data.py
\u2502       \u2514\u2500\u2500 market_data.py
\u251c\u2500\u2500 frontend/
\u2502   \u251c\u2500\u2500 package.json          # Node dependencies
\u2502   \u251c\u2500\u2500 .env                  # Environment variables
\u2502   \u2514\u2500\u2500 src/
\u2502       \u251c\u2500\u2500 App.js            # Main React component
\u2502       \u251c\u2500\u2500 services/
\u2502       \u2502   \u2514\u2500\u2500 api.js        # API integration
\u2502       \u251c\u2500\u2500 utils/
\u2502       \u2502   \u2514\u2500\u2500 formatters.js # Number formatting
\u2502       \u2514\u2500\u2500 components/
\u2502           \u2514\u2500\u2500 ui/           # UI components
\u251c\u2500\u2500 MA_PROJECT_README.md   # Main project README
\u251c\u2500\u2500 INVESTMENT_MEMO.md     # Detailed investment memo
\u2514\u2500\u2500 SETUP_GUIDE.md         # This file
```

---

## \ud83d\udd04 Development Workflow

### Making Changes

**Backend Changes:**
1. Edit Python files in `/app/backend/`
2. Backend auto-reloads (hot reload enabled)
3. Test changes: `curl http://localhost:8001/api/<endpoint>`
4. Check logs: `tail -f /var/log/supervisor/backend.err.log`

**Frontend Changes:**
1. Edit React files in `/app/frontend/src/`
2. Frontend auto-reloads (hot reload enabled)
3. Check browser console for errors
4. Check logs: `tail -f /var/log/supervisor/frontend.err.log`

### Adding New Financial Data

To add or modify company financial data:

1. Edit `/app/backend/data/salesforce_data.py` or `servicenow_data.py`
2. Follow existing data structure
3. Backend will auto-reload
4. Refresh frontend to see changes

### Adding New API Endpoints

1. Add endpoint to `/app/backend/server.py`:
```python
@api_router.get(\"/ma/new-endpoint\")
async def get_new_data():
    return ma_analyzer.your_new_method()
```

2. Add method to `/app/backend/services/ma_analyzer.py`:
```python
def your_new_method(self):
    # Your logic here
    return result
```

3. Add API call to `/app/frontend/src/services/api.js`:
```javascript
getNewData: () => api.get('/ma/new-endpoint'),
```

4. Use in frontend components

---

## \ud83d\udcca Performance Optimization

### Backend Optimization

```python
# Add caching for expensive calculations
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_calculation(param):
    # Your calculation
    pass
```

### Frontend Optimization

```javascript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// Use useMemo for expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);
```

---

## \ud83d\udd12 Security Considerations

### Production Deployment

When deploying to production:

1. **Environment Variables:**
   - Never commit `.env` files
   - Use secure secret management
   - Rotate secrets regularly

2. **CORS Configuration:**
   - Set specific origins (not `*`)
   - Use HTTPS only

3. **API Authentication:**
   - Add JWT or OAuth authentication
   - Implement rate limiting
   - Add request validation

4. **Database Security:**
   - Use authentication for MongoDB
   - Enable SSL/TLS
   - Regular backups

---

## \ud83c\udf93 Portfolio & Interview Prep

### Demo Preparation

Before showing to recruiters:

1. **Test all features** - Click through every tab
2. **Verify all charts render** - Check on different screen sizes
3. **Test download feature** - Ensure executive summary downloads
4. **Check data accuracy** - Verify calculations are correct
5. **Prepare talking points** - Be ready to explain your methodology

### Key Discussion Points

Be prepared to discuss:
- **Valuation methodology** - Why you chose specific multiples
- **DCF assumptions** - How you determined growth rates, WACC
- **Synergy estimation** - Process for identifying and quantifying
- **Technical implementation** - Architecture decisions
- **Deal rationale** - Why this specific acquisition makes sense

---

## \u2753 FAQ

**Q: Can I modify the companies being analyzed?**

A: Yes! Edit `/app/backend/data/` files to change companies. Update company names, financial data, and market information.

**Q: Can I add more comparable companies?**

A: Yes! Add to `COMPARABLE_COMPANIES` list in `/app/backend/data/market_data.py`.

**Q: How do I change the DCF assumptions?**

A: Modify the `calculate_dcf_valuation` method in `/app/backend/services/ma_analyzer.py`.

**Q: Can I export to Excel or PDF?**

A: Current version exports text format. You can extend the download feature to generate Excel or PDF by adding libraries like `openpyxl` or `reportlab`.

**Q: Is the data real?**

A: The data is realistic but created for educational purposes. For actual analysis, replace with real financial data from SEC filings, Bloomberg, or Capital IQ.

---

## \ud83d\udcde Support & Resources

### Additional Resources

- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **React Documentation:** https://react.dev/
- **Recharts Documentation:** https://recharts.org/
- **MongoDB Documentation:** https://docs.mongodb.com/

### Learning Resources

- Investment Banking Valuation Guide
- Damodaran's Corporate Finance Resources
- Wall Street Prep Financial Modeling Courses

---

## \u2705 Final Checklist

Before considering the project complete:

- [ ] All services running without errors
- [ ] All 8 dashboard tabs displaying correctly
- [ ] All charts rendering with data
- [ ] Download feature working
- [ ] API returning correct data for all endpoints
- [ ] No console errors in browser
- [ ] Mobile responsive (test on different screen sizes)
- [ ] README and documentation complete
- [ ] Code commented and clean
- [ ] Ready for GitHub upload

---

**Congratulations! Your Investment Banking M&A Analysis Project is complete and ready for your portfolio!**

Good luck with your Goldman Sachs application! \ud83c\udf89
