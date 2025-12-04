from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any
import uuid
from datetime import datetime, timezone
import sys

# Add backend directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Import M&A analysis services
from backend.services.ma_analyzer import MAAnalyzer

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="M&A Analysis API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize M&A Analyzer
ma_analyzer = MAAnalyzer()


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# M&A Analysis Endpoints

@api_router.get("/")
async def root():
    return {
        "message": "M&A Analysis API - Salesforce acquiring ServiceNow",
        "version": "1.0.0",
        "endpoints": {
            "overview": "/api/ma/overview",
            "financials": "/api/ma/financials",
            "dcf": "/api/ma/dcf",
            "comps": "/api/ma/comparable-companies",
            "precedents": "/api/ma/precedent-transactions",
            "synergies": "/api/ma/synergies",
            "accretion": "/api/ma/accretion-dilution",
            "valuation": "/api/ma/valuation-summary",
            "executive": "/api/ma/executive-summary"
        }
    }

@api_router.get("/ma/overview")
async def get_ma_overview():
    """Get M&A transaction overview with company details and strategic rationale"""
    try:
        overview = ma_analyzer.get_company_overview()
        return overview
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/financials")
async def get_financial_statements():
    """Get historical financial statements for both companies"""
    try:
        financials = ma_analyzer.get_financial_statements()
        return financials
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/dcf")
async def get_dcf_valuation(company: str = "target"):
    """Get DCF valuation analysis"""
    try:
        dcf = ma_analyzer.calculate_dcf_valuation(company)
        return dcf
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/comparable-companies")
async def get_comparable_companies():
    """Get comparable companies analysis with trading multiples"""
    try:
        comps = ma_analyzer.get_comparable_companies_analysis()
        return comps
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/precedent-transactions")
async def get_precedent_transactions():
    """Get precedent transactions analysis"""
    try:
        precedents = ma_analyzer.get_precedent_transactions_analysis()
        return precedents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/synergies")
async def get_synergy_analysis():
    """Get merger synergies analysis"""
    try:
        synergies = ma_analyzer.calculate_synergies()
        return synergies
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/accretion-dilution")
async def get_accretion_dilution():
    """Get EPS accretion/dilution analysis"""
    try:
        accretion = ma_analyzer.calculate_accretion_dilution()
        return accretion
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/valuation-summary")
async def get_valuation_summary():
    """Get comprehensive valuation summary with recommendation"""
    try:
        valuation = ma_analyzer.get_valuation_summary()
        return valuation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/ma/executive-summary")
async def get_executive_summary():
    """Get executive summary of the transaction"""
    try:
        summary = ma_analyzer.get_executive_summary()
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Legacy endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()