"""M&A Analysis Service"""
from typing import Dict, List
from backend.services.financial_calculator import FinancialCalculator
from backend.data.salesforce_data import SALESFORCE_DATA
from backend.data.servicenow_data import SERVICENOW_DATA
from backend.data.market_data import (
    COMPARABLE_COMPANIES,
    PRECEDENT_TRANSACTIONS,
    MARKET_ASSUMPTIONS
)
import numpy as np


class MAAnalyzer:
    """Complete M&A Analysis Engine"""
    
    def __init__(self):
        self.calc = FinancialCalculator()
        self.acquirer = SALESFORCE_DATA
        self.target = SERVICENOW_DATA
        self.market = MARKET_ASSUMPTIONS
    
    def get_company_overview(self) -> Dict:
        """Get overview of both companies"""
        return {
            "acquirer": {
                "name": self.acquirer["company_name"],
                "ticker": self.acquirer["ticker"],
                "description": self.acquirer["description"],
                "market_cap": self.acquirer["market_cap"],
                "current_price": self.acquirer["current_share_price"],
                "shares_outstanding": self.acquirer["shares_outstanding"]
            },
            "target": {
                "name": self.target["company_name"],
                "ticker": self.target["ticker"],
                "description": self.target["description"],
                "market_cap": self.target["market_cap"],
                "current_price": self.target["current_share_price"],
                "shares_outstanding": self.target["shares_outstanding"]
            },
            "deal_rationale": {
                "strategic_fit": [
                    "Expands Salesforce's enterprise IT service management capabilities",
                    "Creates comprehensive enterprise software platform combining CRM and ITSM",
                    "Strengthens AI and automation offerings through ServiceNow's workflow platform",
                    "Cross-selling opportunities to combined customer base of 200,000+ enterprises"
                ],
                "market_opportunity": [
                    "Total addressable market expansion to $350B+ in enterprise cloud software",
                    "Increased market share in Fortune 500 accounts",
                    "Enhanced competitive position against Microsoft, Oracle, and SAP",
                    "Access to ServiceNow's high-growth IT operations segment"
                ],
                "financial_benefits": [
                    "Revenue synergies from cross-selling estimated at $2.5B annually by Year 3",
                    "Cost synergies of $1.8B from operational efficiencies and redundancy elimination",
                    "Accretive to EPS within 18 months post-close",
                    "Enhanced free cash flow generation from combined operations"
                ]
            }
        }
    
    def get_financial_statements(self) -> Dict:
        """Get historical financial statements"""
        return {
            "acquirer": {
                "income_statements": self.acquirer["income_statements"],
                "balance_sheets": self.acquirer["balance_sheets"],
                "cash_flow_statements": self.acquirer["cash_flow_statements"]
            },
            "target": {
                "income_statements": self.target["income_statements"],
                "balance_sheets": self.target["balance_sheets"],
                "cash_flow_statements": self.target["cash_flow_statements"]
            }
        }
    
    def calculate_dcf_valuation(self, company: str = "target") -> Dict:
        """Calculate DCF valuation for target company"""
        data = self.target if company == "target" else self.acquirer
        
        # Get latest financials
        latest_is = data["income_statements"][-1]
        latest_bs = data["balance_sheets"][-1]
        
        # DCF Assumptions
        base_revenue = latest_is["revenue"]
        growth_rates = [0.18, 0.16, 0.14, 0.12, 0.10]  # 5-year projection
        ebitda_margin = 0.215  # Target margin improvement
        tax_rate = self.market["tax_rate"]
        da_percent = 0.06
        capex_percent = 0.045
        nwc_percent = 0.12
        
        # Calculate WACC
        wacc = self.calc.calculate_wacc(
            risk_free_rate=self.market["risk_free_rate"],
            beta=data["key_metrics"]["beta"],
            market_risk_premium=self.market["market_risk_premium"],
            cost_of_debt=0.05,
            tax_rate=tax_rate,
            debt_to_equity=data["key_metrics"]["debt_to_equity"]
        )
        
        terminal_growth = self.market["terminal_growth_rate"]
        
        # Calculate net debt
        net_debt = latest_bs["long_term_debt"] + latest_bs["short_term_debt"] - latest_bs["cash"]
        shares = data["shares_outstanding"]
        
        # Perform DCF
        dcf_result = self.calc.calculate_dcf_valuation(
            base_revenue=base_revenue,
            growth_rates=growth_rates,
            ebitda_margin=ebitda_margin,
            tax_rate=tax_rate,
            da_percent_revenue=da_percent,
            capex_percent_revenue=capex_percent,
            nwc_percent_revenue=nwc_percent,
            wacc=wacc,
            terminal_growth_rate=terminal_growth,
            net_debt=net_debt,
            shares_outstanding=shares
        )
        
        return {
            "company": company,
            "assumptions": {
                "base_revenue": base_revenue,
                "growth_rates": growth_rates,
                "ebitda_margin": ebitda_margin,
                "tax_rate": tax_rate,
                "wacc": wacc,
                "terminal_growth_rate": terminal_growth,
                "net_debt": net_debt,
                "shares_outstanding": shares
            },
            "projections": {
                "years": [2025, 2026, 2027, 2028, 2029],
                "revenue": dcf_result["projections"]["revenue"],
                "ebitda": dcf_result["projections"]["ebitda"],
                "ebit": dcf_result["projections"]["ebit"],
                "nopat": dcf_result["projections"]["nopat"],
                "fcf": dcf_result["projections"]["fcf"]
            },
            "valuation": {
                "pv_fcf": dcf_result["pv_fcf"],
                "sum_pv_fcf": sum(dcf_result["pv_fcf"]),
                "terminal_value": dcf_result["terminal_value"],
                "pv_terminal_value": dcf_result["pv_terminal_value"],
                "enterprise_value": dcf_result["enterprise_value"],
                "equity_value": dcf_result["equity_value"],
                "value_per_share": dcf_result["value_per_share"],
                "current_price": data["current_share_price"],
                "upside_downside": ((dcf_result["value_per_share"] - data["current_share_price"]) / 
                                   data["current_share_price"]) * 100
            }
        }
    
    def get_comparable_companies_analysis(self) -> Dict:
        """Perform comparable companies analysis"""
        # Filter out companies with negative metrics
        valid_comps = [c for c in COMPARABLE_COMPANIES if c["ev_revenue"] > 0 and c["ev_ebitda"] > 0]
        
        # Calculate statistics
        ev_revenue_multiples = [c["ev_revenue"] for c in valid_comps]
        ev_ebitda_multiples = [c["ev_ebitda"] for c in valid_comps]
        
        # Target metrics
        target_revenue = self.target["income_statements"][-1]["revenue"]
        target_ebitda = self.target["income_statements"][-1]["ebitda"]
        
        # Calculate implied valuations
        median_ev_revenue = np.median(ev_revenue_multiples)
        mean_ev_revenue = np.mean(ev_revenue_multiples)
        
        median_ev_ebitda = np.median(ev_ebitda_multiples)
        mean_ev_ebitda = np.mean(ev_ebitda_multiples)
        
        implied_ev_revenue_median = target_revenue * median_ev_revenue
        implied_ev_revenue_mean = target_revenue * mean_ev_revenue
        
        implied_ev_ebitda_median = target_ebitda * median_ev_ebitda
        implied_ev_ebitda_mean = target_ebitda * mean_ev_ebitda
        
        return {
            "comparable_companies": valid_comps,
            "multiples_analysis": {
                "ev_revenue": {
                    "min": min(ev_revenue_multiples),
                    "25th_percentile": np.percentile(ev_revenue_multiples, 25),
                    "median": median_ev_revenue,
                    "75th_percentile": np.percentile(ev_revenue_multiples, 75),
                    "max": max(ev_revenue_multiples),
                    "mean": mean_ev_revenue
                },
                "ev_ebitda": {
                    "min": min(ev_ebitda_multiples),
                    "25th_percentile": np.percentile(ev_ebitda_multiples, 25),
                    "median": median_ev_ebitda,
                    "75th_percentile": np.percentile(ev_ebitda_multiples, 75),
                    "max": max(ev_ebitda_multiples),
                    "mean": mean_ev_ebitda
                }
            },
            "implied_valuations": {
                "target_revenue": target_revenue,
                "target_ebitda": target_ebitda,
                "ev_revenue_median": implied_ev_revenue_median,
                "ev_revenue_mean": implied_ev_revenue_mean,
                "ev_ebitda_median": implied_ev_ebitda_median,
                "ev_ebitda_mean": implied_ev_ebitda_mean,
                "blended_valuation": (implied_ev_revenue_median + implied_ev_ebitda_median) / 2
            }
        }
    
    def get_precedent_transactions_analysis(self) -> Dict:
        """Perform precedent transactions analysis"""
        # Filter valid transactions
        valid_txns = [t for t in PRECEDENT_TRANSACTIONS if t["ev_revenue"] > 0]
        
        # Calculate statistics
        ev_revenue_multiples = [t["ev_revenue"] for t in valid_txns]
        ev_ebitda_multiples = [t["ev_ebitda"] for t in valid_txns if t["ev_ebitda"] > 0]
        premiums = [t["premium"] for t in valid_txns if t["premium"] > 0]
        
        # Target metrics
        target_revenue = self.target["income_statements"][-1]["revenue"]
        target_ebitda = self.target["income_statements"][-1]["ebitda"]
        
        # Calculate implied valuations
        median_ev_revenue = np.median(ev_revenue_multiples)
        median_ev_ebitda = np.median(ev_ebitda_multiples)
        median_premium = np.median(premiums)
        
        implied_ev_revenue = target_revenue * median_ev_revenue
        implied_ev_ebitda = target_ebitda * median_ev_ebitda
        
        return {
            "precedent_transactions": valid_txns,
            "multiples_analysis": {
                "ev_revenue": {
                    "min": min(ev_revenue_multiples),
                    "median": median_ev_revenue,
                    "max": max(ev_revenue_multiples),
                    "mean": np.mean(ev_revenue_multiples)
                },
                "ev_ebitda": {
                    "min": min(ev_ebitda_multiples),
                    "median": median_ev_ebitda,
                    "max": max(ev_ebitda_multiples),
                    "mean": np.mean(ev_ebitda_multiples)
                },
                "acquisition_premium": {
                    "min": min(premiums) * 100,
                    "median": median_premium * 100,
                    "max": max(premiums) * 100,
                    "mean": np.mean(premiums) * 100
                }
            },
            "implied_valuations": {
                "target_revenue": target_revenue,
                "target_ebitda": target_ebitda,
                "ev_revenue": implied_ev_revenue,
                "ev_ebitda": implied_ev_ebitda,
                "blended_valuation": (implied_ev_revenue + implied_ev_ebitda) / 2,
                "median_premium": median_premium * 100
            }
        }
    
    def calculate_synergies(self) -> Dict:
        """Calculate merger synergies"""
        target_revenue = self.target["income_statements"][-1]["revenue"]
        target_opex = self.target["income_statements"][-1]["operating_expenses"]
        acquirer_revenue = self.acquirer["income_statements"][-1]["revenue"]
        
        synergies = self.calc.calculate_synergies(
            acquirer_revenue=acquirer_revenue,
            target_revenue=target_revenue,
            cross_sell_rate=0.15,  # 15% revenue uplift from cross-selling
            cost_synergy_percent=0.18,  # 18% cost savings
            target_opex=target_opex,
            one_time_costs=2500  # $2.5B integration costs
        )
        
        return {
            "revenue_synergies": synergies["revenue_synergies"],
            "cost_synergies": synergies["cost_synergies"],
            "total_synergies": synergies["total_synergies"],
            "one_time_costs": synergies["one_time_costs"],
            "net_synergy_value": synergies["net_synergy_value"],
            "synergy_breakdown": {
                "Cross-selling to Salesforce customers": synergies["revenue_synergies"] * 0.6,
                "Upsell of ServiceNow to CRM users": synergies["revenue_synergies"] * 0.4,
                "Elimination of duplicate functions": synergies["cost_synergies"] * 0.35,
                "Technology platform consolidation": synergies["cost_synergies"] * 0.25,
                "Real estate and facility optimization": synergies["cost_synergies"] * 0.20,
                "Vendor and procurement savings": synergies["cost_synergies"] * 0.20
            },
            "synergy_realization_timeline": {
                "Year 1": synergies["total_synergies"] * 0.25,
                "Year 2": synergies["total_synergies"] * 0.65,
                "Year 3+": synergies["total_synergies"]
            }
        }
    
    def calculate_accretion_dilution(self) -> Dict:
        """Calculate EPS accretion/dilution"""
        acquirer_ni = self.acquirer["income_statements"][-1]["net_income"]
        target_ni = self.target["income_statements"][-1]["net_income"]
        acquirer_shares = self.acquirer["shares_outstanding"]
        
        # Synergies after tax
        synergies = self.calculate_synergies()
        synergies_after_tax = synergies["net_synergy_value"] * (1 - self.market["tax_rate"])
        
        # Assume 10% stock consideration
        deal_value = 165000  # $165B target price
        stock_consideration = deal_value * 0.10
        new_shares = stock_consideration / self.acquirer["current_share_price"]
        
        ad_analysis = self.calc.calculate_accretion_dilution(
            acquirer_net_income=acquirer_ni,
            target_net_income=target_ni,
            acquirer_shares=acquirer_shares,
            synergies_after_tax=synergies_after_tax,
            new_shares_issued=new_shares
        )
        
        return {
            "acquirer_standalone_eps": ad_analysis["acquirer_standalone_eps"],
            "combined_eps_no_synergies": ad_analysis["combined_eps_no_synergies"],
            "combined_eps_with_synergies": ad_analysis["combined_eps_with_synergies"],
            "accretion_dilution_percent": ad_analysis["accretion_dilution_percent"],
            "is_accretive": ad_analysis["is_accretive"],
            "break_even_synergies": ad_analysis["break_even_synergies"],
            "deal_structure": {
                "total_consideration": deal_value,
                "cash_component": deal_value * 0.90,
                "stock_component": stock_consideration,
                "new_shares_issued": new_shares,
                "pro_forma_shares": acquirer_shares + new_shares
            },
            "synergies_impact": synergies_after_tax
        }
    
    def get_valuation_summary(self) -> Dict:
        """Comprehensive valuation summary"""
        dcf = self.calculate_dcf_valuation("target")
        comps = self.get_comparable_companies_analysis()
        precedents = self.get_precedent_transactions_analysis()
        
        # Weighted average valuation
        dcf_val = dcf["valuation"]["enterprise_value"]
        comps_val = comps["implied_valuations"]["blended_valuation"]
        precedents_val = precedents["implied_valuations"]["blended_valuation"]
        
        # Weights: DCF 40%, Comps 35%, Precedents 25%
        weighted_ev = (dcf_val * 0.40) + (comps_val * 0.35) + (precedents_val * 0.25)
        
        # Apply premium
        premium = 0.30  # 30% acquisition premium
        implied_offer_ev = weighted_ev * (1 + premium)
        
        target_shares = self.target["shares_outstanding"]
        target_net_debt = (self.target["balance_sheets"][-1]["long_term_debt"] + 
                          self.target["balance_sheets"][-1]["short_term_debt"] - 
                          self.target["balance_sheets"][-1]["cash"])
        
        implied_equity_value = implied_offer_ev - target_net_debt
        implied_price_per_share = implied_equity_value / target_shares
        
        current_price = self.target["current_share_price"]
        
        return {
            "valuation_methods": {
                "dcf": dcf_val,
                "comparable_companies": comps_val,
                "precedent_transactions": precedents_val,
                "weighted_average": weighted_ev
            },
            "valuation_range": {
                "low": weighted_ev * 0.90,
                "mid": weighted_ev,
                "high": weighted_ev * 1.10
            },
            "offer_analysis": {
                "implied_offer_ev": implied_offer_ev,
                "implied_equity_value": implied_equity_value,
                "implied_price_per_share": implied_price_per_share,
                "current_share_price": current_price,
                "implied_premium": ((implied_price_per_share - current_price) / current_price) * 100
            },
            "recommendation": {
                "action": "PROCEED WITH ACQUISITION",
                "target_offer_price": implied_price_per_share,
                "offer_range_low": implied_price_per_share * 0.95,
                "offer_range_high": implied_price_per_share * 1.05,
                "total_deal_value": implied_equity_value + target_net_debt
            }
        }
    
    def get_executive_summary(self) -> Dict:
        """Generate executive summary for the deal"""
        valuation = self.get_valuation_summary()
        synergies = self.calculate_synergies()
        accretion = self.calculate_accretion_dilution()
        
        return {
            "transaction_overview": {
                "acquirer": self.acquirer["company_name"],
                "target": self.target["company_name"],
                "proposed_deal_value": valuation["recommendation"]["total_deal_value"],
                "offer_price_per_share": valuation["recommendation"]["target_offer_price"],
                "premium_to_current": valuation["offer_analysis"]["implied_premium"],
                "structure": "90% Cash / 10% Stock"
            },
            "strategic_rationale": [
                "Creates leading enterprise cloud platform combining CRM and ITSM",
                "Expands TAM to $350B+ with enhanced AI/automation capabilities",
                "Strengthens competitive position vs. Microsoft, Oracle, SAP",
                "Significant cross-selling opportunities across 200K+ customers"
            ],
            "financial_highlights": {
                "total_synergies": synergies["total_synergies"],
                "revenue_synergies": synergies["revenue_synergies"],
                "cost_synergies": synergies["cost_synergies"],
                "eps_accretion_year2": accretion["accretion_dilution_percent"],
                "is_accretive": accretion["is_accretive"]
            },
            "valuation_summary": {
                "dcf_valuation": valuation["valuation_methods"]["dcf"],
                "comps_valuation": valuation["valuation_methods"]["comparable_companies"],
                "precedents_valuation": valuation["valuation_methods"]["precedent_transactions"],
                "implied_enterprise_value": valuation["offer_analysis"]["implied_offer_ev"]
            },
            "key_risks": [
                "Integration execution risk - complex technology platform consolidation",
                "Customer retention risk during transition period",
                "Regulatory approval challenges given combined market position",
                "Synergy realization timing and execution",
                "Cultural integration of two distinct organizational cultures"
            ],
            "recommendation": {
                "action": "PROCEED",
                "confidence": "HIGH",
                "rationale": "Compelling strategic fit with achievable synergies, accretive to EPS, and strengthens competitive moat in enterprise cloud software market"
            }
        }
