"""Financial data models for M&A analysis"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime


class IncomeStatement(BaseModel):
    year: int
    revenue: float
    cogs: float
    gross_profit: float
    operating_expenses: float
    ebitda: float
    depreciation_amortization: float
    ebit: float
    interest_expense: float
    ebt: float
    tax_expense: float
    net_income: float
    shares_outstanding: float
    eps: float


class BalanceSheet(BaseModel):
    year: int
    cash: float
    accounts_receivable: float
    inventory: float
    current_assets: float
    ppe: float
    intangibles: float
    total_assets: float
    accounts_payable: float
    short_term_debt: float
    current_liabilities: float
    long_term_debt: float
    total_liabilities: float
    shareholders_equity: float


class CashFlowStatement(BaseModel):
    year: int
    operating_cash_flow: float
    capex: float
    free_cash_flow: float
    financing_cash_flow: float
    investing_cash_flow: float
    net_change_cash: float


class CompanyFinancials(BaseModel):
    company_name: str
    ticker: str
    market_cap: float
    enterprise_value: float
    income_statements: List[IncomeStatement]
    balance_sheets: List[BalanceSheet]
    cash_flow_statements: List[CashFlowStatement]


class ComparableCompany(BaseModel):
    ticker: str
    company_name: str
    market_cap: float
    enterprise_value: float
    revenue: float
    ebitda: float
    net_income: float
    ev_revenue: float
    ev_ebitda: float
    pe_ratio: float
    revenue_growth: float


class PrecedentTransaction(BaseModel):
    date: str
    acquirer: str
    target: str
    deal_value: float
    target_revenue: float
    target_ebitda: float
    ev_revenue: float
    ev_ebitda: float
    premium: float


class DCFAssumptions(BaseModel):
    revenue_growth_rates: List[float]
    ebitda_margin: float
    tax_rate: float
    capex_percent_revenue: float
    nwc_percent_revenue: float
    wacc: float
    terminal_growth_rate: float
    risk_free_rate: float
    market_risk_premium: float
    beta: float
    cost_of_debt: float
    debt_to_equity: float


class DCFValuation(BaseModel):
    assumptions: DCFAssumptions
    projected_years: List[int]
    projected_revenue: List[float]
    projected_ebitda: List[float]
    projected_ebit: List[float]
    projected_nopat: List[float]
    projected_fcf: List[float]
    pv_fcf: List[float]
    terminal_value: float
    pv_terminal_value: float
    enterprise_value: float
    net_debt: float
    equity_value: float
    shares_outstanding: float
    value_per_share: float


class SynergyAnalysis(BaseModel):
    revenue_synergies: float
    cost_synergies: float
    total_synergies: float
    one_time_costs: float
    net_synergy_value: float
    synergy_details: Dict[str, float]


class AccretionDilution(BaseModel):
    acquirer_standalone_eps: float
    target_standalone_eps: float
    combined_eps_no_synergies: float
    combined_eps_with_synergies: float
    accretion_dilution_percent: float
    is_accretive: bool
    break_even_synergies: float


class ValuationSummary(BaseModel):
    dcf_valuation: float
    comparable_companies_valuation: float
    precedent_transactions_valuation: float
    valuation_range_low: float
    valuation_range_mid: float
    valuation_range_high: float
    implied_share_price_low: float
    implied_share_price_mid: float
    implied_share_price_high: float
    premium_to_current: float


class DealRecommendation(BaseModel):
    recommendation: str
    target_price: float
    offer_price_range_low: float
    offer_price_range_high: float
    payment_structure: str
    key_risks: List[str]
    key_opportunities: List[str]
    strategic_rationale: str
    financial_rationale: str
