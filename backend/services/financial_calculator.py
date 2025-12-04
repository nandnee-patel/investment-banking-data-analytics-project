"""Financial calculations for M&A analysis"""
import numpy as np
from typing import List, Dict
import math


class FinancialCalculator:
    
    @staticmethod
    def calculate_wacc(
        risk_free_rate: float,
        beta: float,
        market_risk_premium: float,
        cost_of_debt: float,
        tax_rate: float,
        debt_to_equity: float
    ) -> float:
        """Calculate Weighted Average Cost of Capital"""
        cost_of_equity = risk_free_rate + (beta * market_risk_premium)
        
        # Weight of equity and debt
        total_capital = 1 + debt_to_equity
        weight_equity = 1 / total_capital
        weight_debt = debt_to_equity / total_capital
        
        wacc = (weight_equity * cost_of_equity) + \
               (weight_debt * cost_of_debt * (1 - tax_rate))
        
        return wacc
    
    @staticmethod
    def calculate_terminal_value(
        final_fcf: float,
        wacc: float,
        terminal_growth_rate: float
    ) -> float:
        """Calculate terminal value using perpetuity growth method"""
        terminal_value = (final_fcf * (1 + terminal_growth_rate)) / \
                        (wacc - terminal_growth_rate)
        return terminal_value
    
    @staticmethod
    def calculate_npv(cash_flows: List[float], discount_rate: float) -> float:
        """Calculate Net Present Value"""
        npv = 0
        for i, cf in enumerate(cash_flows, 1):
            npv += cf / ((1 + discount_rate) ** i)
        return npv
    
    @staticmethod
    def calculate_pv(future_value: float, discount_rate: float, periods: int) -> float:
        """Calculate Present Value"""
        return future_value / ((1 + discount_rate) ** periods)
    
    @staticmethod
    def project_financials(
        base_revenue: float,
        growth_rates: List[float],
        ebitda_margin: float,
        tax_rate: float,
        da_percent_revenue: float,
        capex_percent_revenue: float,
        nwc_percent_revenue: float
    ) -> Dict[str, List[float]]:
        """Project financial statements"""
        projections = {
            'revenue': [],
            'ebitda': [],
            'ebit': [],
            'nopat': [],
            'da': [],
            'capex': [],
            'nwc_change': [],
            'fcf': []
        }
        
        prev_revenue = base_revenue
        prev_nwc = base_revenue * nwc_percent_revenue
        
        for growth_rate in growth_rates:
            # Revenue
            revenue = prev_revenue * (1 + growth_rate)
            projections['revenue'].append(revenue)
            
            # EBITDA
            ebitda = revenue * ebitda_margin
            projections['ebitda'].append(ebitda)
            
            # D&A
            da = revenue * da_percent_revenue
            projections['da'].append(da)
            
            # EBIT
            ebit = ebitda - da
            projections['ebit'].append(ebit)
            
            # NOPAT (Net Operating Profit After Tax)
            nopat = ebit * (1 - tax_rate)
            projections['nopat'].append(nopat)
            
            # CapEx
            capex = revenue * capex_percent_revenue
            projections['capex'].append(capex)
            
            # Net Working Capital Change
            nwc = revenue * nwc_percent_revenue
            nwc_change = nwc - prev_nwc
            projections['nwc_change'].append(nwc_change)
            prev_nwc = nwc
            
            # Free Cash Flow = NOPAT + D&A - CapEx - NWC Change
            fcf = nopat + da - capex - nwc_change
            projections['fcf'].append(fcf)
            
            prev_revenue = revenue
        
        return projections
    
    @staticmethod
    def calculate_dcf_valuation(
        base_revenue: float,
        growth_rates: List[float],
        ebitda_margin: float,
        tax_rate: float,
        da_percent_revenue: float,
        capex_percent_revenue: float,
        nwc_percent_revenue: float,
        wacc: float,
        terminal_growth_rate: float,
        net_debt: float,
        shares_outstanding: float
    ) -> Dict:
        """Complete DCF valuation"""
        # Project financials
        projections = FinancialCalculator.project_financials(
            base_revenue, growth_rates, ebitda_margin, tax_rate,
            da_percent_revenue, capex_percent_revenue, nwc_percent_revenue
        )
        
        # Calculate PV of FCFs
        pv_fcf = []
        for i, fcf in enumerate(projections['fcf'], 1):
            pv = FinancialCalculator.calculate_pv(fcf, wacc, i)
            pv_fcf.append(pv)
        
        # Terminal Value
        terminal_value = FinancialCalculator.calculate_terminal_value(
            projections['fcf'][-1], wacc, terminal_growth_rate
        )
        
        # PV of Terminal Value
        pv_terminal_value = FinancialCalculator.calculate_pv(
            terminal_value, wacc, len(growth_rates)
        )
        
        # Enterprise Value
        enterprise_value = sum(pv_fcf) + pv_terminal_value
        
        # Equity Value
        equity_value = enterprise_value - net_debt
        
        # Value per Share
        value_per_share = equity_value / shares_outstanding
        
        return {
            'projections': projections,
            'pv_fcf': pv_fcf,
            'terminal_value': terminal_value,
            'pv_terminal_value': pv_terminal_value,
            'enterprise_value': enterprise_value,
            'equity_value': equity_value,
            'value_per_share': value_per_share
        }
    
    @staticmethod
    def calculate_multiples(
        market_cap: float,
        enterprise_value: float,
        revenue: float,
        ebitda: float,
        net_income: float
    ) -> Dict[str, float]:
        """Calculate valuation multiples"""
        return {
            'ev_revenue': enterprise_value / revenue if revenue > 0 else 0,
            'ev_ebitda': enterprise_value / ebitda if ebitda > 0 else 0,
            'pe_ratio': market_cap / net_income if net_income > 0 else 0
        }
    
    @staticmethod
    def calculate_synergies(
        acquirer_revenue: float,
        target_revenue: float,
        cross_sell_rate: float,
        cost_synergy_percent: float,
        target_opex: float,
        one_time_costs: float
    ) -> Dict[str, float]:
        """Calculate merger synergies"""
        # Revenue synergies from cross-selling
        revenue_synergies = target_revenue * cross_sell_rate
        
        # Cost synergies from operational efficiencies
        cost_synergies = target_opex * cost_synergy_percent
        
        # Total synergies
        total_synergies = revenue_synergies + cost_synergies
        
        # Net synergy value (after one-time costs)
        net_synergy_value = total_synergies - one_time_costs
        
        return {
            'revenue_synergies': revenue_synergies,
            'cost_synergies': cost_synergies,
            'total_synergies': total_synergies,
            'one_time_costs': one_time_costs,
            'net_synergy_value': net_synergy_value
        }
    
    @staticmethod
    def calculate_accretion_dilution(
        acquirer_net_income: float,
        target_net_income: float,
        acquirer_shares: float,
        synergies_after_tax: float,
        new_shares_issued: float = 0
    ) -> Dict[str, float]:
        """Calculate EPS accretion/dilution analysis"""
        # Standalone EPS
        acquirer_standalone_eps = acquirer_net_income / acquirer_shares
        target_standalone_eps = target_net_income / acquirer_shares  # As if target earnings on acquirer shares
        
        # Combined without synergies
        combined_net_income_no_syn = acquirer_net_income + target_net_income
        total_shares = acquirer_shares + new_shares_issued
        combined_eps_no_synergies = combined_net_income_no_syn / total_shares
        
        # Combined with synergies
        combined_net_income_with_syn = combined_net_income_no_syn + synergies_after_tax
        combined_eps_with_synergies = combined_net_income_with_syn / total_shares
        
        # Accretion/Dilution
        accretion_dilution = ((combined_eps_with_synergies - acquirer_standalone_eps) / 
                             acquirer_standalone_eps) * 100
        
        is_accretive = accretion_dilution > 0
        
        # Break-even synergies needed
        break_even_income = (acquirer_standalone_eps * total_shares) - combined_net_income_no_syn
        
        return {
            'acquirer_standalone_eps': acquirer_standalone_eps,
            'combined_eps_no_synergies': combined_eps_no_synergies,
            'combined_eps_with_synergies': combined_eps_with_synergies,
            'accretion_dilution_percent': accretion_dilution,
            'is_accretive': is_accretive,
            'break_even_synergies': break_even_income
        }
