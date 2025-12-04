"""Salesforce (CRM) Financial Data - Acquirer"""

# Historical and projected financial data for Salesforce

SALESFORCE_DATA = {
    "company_name": "Salesforce, Inc.",
    "ticker": "CRM",
    "description": "Salesforce is the global leader in customer relationship management (CRM) software and applications for sales, service, marketing, and more. Founded in 1999, Salesforce pioneered the shift to cloud computing in enterprise software.",
    "market_cap": 251000,  # in millions
    "current_share_price": 265.50,
    "shares_outstanding": 945,  # in millions
    "fiscal_year_end": "January",
    
    # Historical Financial Data (Last 5 Years) - in millions USD
    "income_statements": [
        {
            "year": 2020,
            "revenue": 21252,
            "cogs": 5529,
            "gross_profit": 15723,
            "operating_expenses": 13543,
            "ebitda": 3845,
            "depreciation_amortization": 1665,
            "ebit": 2180,
            "interest_expense": 185,
            "ebt": 1995,
            "tax_expense": 299,
            "net_income": 1696,
            "shares_outstanding": 916,
            "eps": 1.85
        },
        {
            "year": 2021,
            "revenue": 26492,
            "cogs": 6743,
            "gross_profit": 19749,
            "operating_expenses": 16894,
            "ebitda": 4983,
            "depreciation_amortization": 2128,
            "ebit": 2855,
            "interest_expense": 192,
            "ebt": 2663,
            "tax_expense": 506,
            "net_income": 2157,
            "shares_outstanding": 928,
            "eps": 2.32
        },
        {
            "year": 2022,
            "revenue": 31352,
            "cogs": 7932,
            "gross_profit": 23420,
            "operating_expenses": 20145,
            "ebitda": 5896,
            "depreciation_amortization": 2621,
            "ebit": 3275,
            "interest_expense": 203,
            "ebt": 3072,
            "tax_expense": 492,
            "net_income": 2580,
            "shares_outstanding": 937,
            "eps": 2.75
        },
        {
            "year": 2023,
            "revenue": 34857,
            "cogs": 8846,
            "gross_profit": 26011,
            "operating_expenses": 22134,
            "ebitda": 6489,
            "depreciation_amortization": 2612,
            "ebit": 3877,
            "interest_expense": 215,
            "ebt": 3662,
            "tax_expense": 659,
            "net_income": 3003,
            "shares_outstanding": 941,
            "eps": 3.19
        },
        {
            "year": 2024,
            "revenue": 38764,
            "cogs": 9691,
            "gross_profit": 29073,
            "operating_expenses": 24215,
            "ebitda": 7234,
            "depreciation_amortization": 2876,
            "ebit": 4358,
            "interest_expense": 228,
            "ebt": 4130,
            "tax_expense": 826,
            "net_income": 3304,
            "shares_outstanding": 945,
            "eps": 3.50
        }
    ],
    
    "balance_sheets": [
        {
            "year": 2020,
            "cash": 6682,
            "accounts_receivable": 5937,
            "inventory": 0,
            "current_assets": 14562,
            "ppe": 4934,
            "intangibles": 42657,
            "total_assets": 73027,
            "accounts_payable": 628,
            "short_term_debt": 2500,
            "current_liabilities": 13456,
            "long_term_debt": 2673,
            "total_liabilities": 31784,
            "shareholders_equity": 41243
        },
        {
            "year": 2021,
            "cash": 10619,
            "accounts_receivable": 7254,
            "inventory": 0,
            "current_assets": 20134,
            "ppe": 5823,
            "intangibles": 47832,
            "total_assets": 83423,
            "accounts_payable": 712,
            "short_term_debt": 0,
            "current_liabilities": 15234,
            "long_term_debt": 2989,
            "total_liabilities": 36892,
            "shareholders_equity": 46531
        },
        {
            "year": 2022,
            "cash": 11245,
            "accounts_receivable": 8562,
            "inventory": 0,
            "current_assets": 22967,
            "ppe": 6234,
            "intangibles": 51234,
            "total_assets": 92156,
            "accounts_payable": 834,
            "short_term_debt": 0,
            "current_liabilities": 17123,
            "long_term_debt": 2985,
            "total_liabilities": 39567,
            "shareholders_equity": 52589
        },
        {
            "year": 2023,
            "cash": 12567,
            "accounts_receivable": 9234,
            "inventory": 0,
            "current_assets": 25234,
            "ppe": 6789,
            "intangibles": 53456,
            "total_assets": 98234,
            "accounts_payable": 923,
            "short_term_debt": 0,
            "current_liabilities": 18456,
            "long_term_debt": 8765,
            "total_liabilities": 42345,
            "shareholders_equity": 55889
        },
        {
            "year": 2024,
            "cash": 13892,
            "accounts_receivable": 10123,
            "inventory": 0,
            "current_assets": 27845,
            "ppe": 7234,
            "intangibles": 55678,
            "total_assets": 104567,
            "accounts_payable": 1045,
            "short_term_debt": 0,
            "current_liabilities": 19876,
            "long_term_debt": 8750,
            "total_liabilities": 45234,
            "shareholders_equity": 59333
        }
    ],
    
    "cash_flow_statements": [
        {
            "year": 2020,
            "operating_cash_flow": 4779,
            "capex": -843,
            "free_cash_flow": 3936,
            "financing_cash_flow": -1234,
            "investing_cash_flow": -2567,
            "net_change_cash": 135
        },
        {
            "year": 2021,
            "operating_cash_flow": 6001,
            "capex": -1012,
            "free_cash_flow": 4989,
            "financing_cash_flow": -876,
            "investing_cash_flow": -3201,
            "net_change_cash": 912
        },
        {
            "year": 2022,
            "operating_cash_flow": 6892,
            "capex": -1156,
            "free_cash_flow": 5736,
            "financing_cash_flow": -1234,
            "investing_cash_flow": -4123,
            "net_change_cash": 379
        },
        {
            "year": 2023,
            "operating_cash_flow": 7645,
            "capex": -1289,
            "free_cash_flow": 6356,
            "financing_cash_flow": -1567,
            "investing_cash_flow": -4567,
            "net_change_cash": 222
        },
        {
            "year": 2024,
            "operating_cash_flow": 8523,
            "capex": -1423,
            "free_cash_flow": 7100,
            "financing_cash_flow": -1789,
            "investing_cash_flow": -5234,
            "net_change_cash": 77
        }
    ],
    
    # Key Metrics
    "key_metrics": {
        "beta": 1.15,
        "debt_to_equity": 0.15,
        "current_ratio": 1.40,
        "roe": 0.056,
        "roa": 0.032,
        "revenue_growth_5yr_cagr": 0.128,
        "gross_margin": 0.75,
        "operating_margin": 0.112,
        "net_margin": 0.085,
        "fcf_margin": 0.183
    }
}
