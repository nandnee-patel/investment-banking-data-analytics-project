"""ServiceNow (NOW) Financial Data - Target"""

# Historical and projected financial data for ServiceNow

SERVICENOW_DATA = {
    "company_name": "ServiceNow, Inc.",
    "ticker": "NOW",
    "description": "ServiceNow is a leading provider of cloud-based services that automate enterprise IT operations. The company's platform enables IT service management and extends to IT operations management, IT business management, and development operations.",
    "market_cap": 142000,  # in millions
    "current_share_price": 685.25,
    "shares_outstanding": 207,  # in millions
    "fiscal_year_end": "December",
    
    # Historical Financial Data (Last 5 Years) - in millions USD
    "income_statements": [
        {
            "year": 2020,
            "revenue": 4519,
            "cogs": 1040,
            "gross_profit": 3479,
            "operating_expenses": 2834,
            "ebitda": 912,
            "depreciation_amortization": 267,
            "ebit": 645,
            "interest_expense": 12,
            "ebt": 633,
            "tax_expense": 95,
            "net_income": 538,
            "shares_outstanding": 198,
            "eps": 2.72
        },
        {
            "year": 2021,
            "revenue": 5915,
            "cogs": 1342,
            "gross_profit": 4573,
            "operating_expenses": 3689,
            "ebitda": 1236,
            "depreciation_amortization": 352,
            "ebit": 884,
            "interest_expense": 15,
            "ebt": 869,
            "tax_expense": 130,
            "net_income": 739,
            "shares_outstanding": 201,
            "eps": 3.68
        },
        {
            "year": 2022,
            "revenue": 7243,
            "cogs": 1623,
            "gross_profit": 5620,
            "operating_expenses": 4523,
            "ebitda": 1534,
            "depreciation_amortization": 437,
            "ebit": 1097,
            "interest_expense": 18,
            "ebt": 1079,
            "tax_expense": 162,
            "net_income": 917,
            "shares_outstanding": 203,
            "eps": 4.52
        },
        {
            "year": 2023,
            "revenue": 8973,
            "cogs": 1974,
            "gross_profit": 6999,
            "operating_expenses": 5634,
            "ebitda": 1912,
            "depreciation_amortization": 547,
            "ebit": 1365,
            "interest_expense": 22,
            "ebt": 1343,
            "tax_expense": 201,
            "net_income": 1142,
            "shares_outstanding": 205,
            "eps": 5.57
        },
        {
            "year": 2024,
            "revenue": 10945,
            "cogs": 2373,
            "gross_profit": 8572,
            "operating_expenses": 6892,
            "ebitda": 2345,
            "depreciation_amortization": 665,
            "ebit": 1680,
            "interest_expense": 25,
            "ebt": 1655,
            "tax_expense": 248,
            "net_income": 1407,
            "shares_outstanding": 207,
            "eps": 6.80
        }
    ],
    
    "balance_sheets": [
        {
            "year": 2020,
            "cash": 2345,
            "accounts_receivable": 1234,
            "inventory": 0,
            "current_assets": 4123,
            "ppe": 876,
            "intangibles": 8234,
            "total_assets": 15678,
            "accounts_payable": 234,
            "short_term_debt": 0,
            "current_liabilities": 2567,
            "long_term_debt": 1750,
            "total_liabilities": 6234,
            "shareholders_equity": 9444
        },
        {
            "year": 2021,
            "cash": 3012,
            "accounts_receivable": 1523,
            "inventory": 0,
            "current_assets": 5234,
            "ppe": 1045,
            "intangibles": 9123,
            "total_assets": 18234,
            "accounts_payable": 289,
            "short_term_debt": 0,
            "current_liabilities": 3123,
            "long_term_debt": 1745,
            "total_liabilities": 7234,
            "shareholders_equity": 11000
        },
        {
            "year": 2022,
            "cash": 3567,
            "accounts_receivable": 1845,
            "inventory": 0,
            "current_assets": 6234,
            "ppe": 1234,
            "intangibles": 10234,
            "total_assets": 21234,
            "accounts_payable": 345,
            "short_term_debt": 0,
            "current_liabilities": 3734,
            "long_term_debt": 1740,
            "total_liabilities": 8456,
            "shareholders_equity": 12778
        },
        {
            "year": 2023,
            "cash": 4123,
            "accounts_receivable": 2234,
            "inventory": 0,
            "current_assets": 7456,
            "ppe": 1456,
            "intangibles": 11456,
            "total_assets": 24567,
            "accounts_payable": 412,
            "short_term_debt": 0,
            "current_liabilities": 4456,
            "long_term_debt": 1735,
            "total_liabilities": 9867,
            "shareholders_equity": 14700
        },
        {
            "year": 2024,
            "cash": 4892,
            "accounts_receivable": 2678,
            "inventory": 0,
            "current_assets": 8923,
            "ppe": 1734,
            "intangibles": 12789,
            "total_assets": 28234,
            "accounts_payable": 498,
            "short_term_debt": 0,
            "current_liabilities": 5234,
            "long_term_debt": 1730,
            "total_liabilities": 11234,
            "shareholders_equity": 17000
        }
    ],
    
    "cash_flow_statements": [
        {
            "year": 2020,
            "operating_cash_flow": 1234,
            "capex": -234,
            "free_cash_flow": 1000,
            "financing_cash_flow": -345,
            "investing_cash_flow": -567,
            "net_change_cash": 88
        },
        {
            "year": 2021,
            "operating_cash_flow": 1634,
            "capex": -289,
            "free_cash_flow": 1345,
            "financing_cash_flow": -423,
            "investing_cash_flow": -756,
            "net_change_cash": 166
        },
        {
            "year": 2022,
            "operating_cash_flow": 2012,
            "capex": -345,
            "free_cash_flow": 1667,
            "financing_cash_flow": -512,
            "investing_cash_flow": -934,
            "net_change_cash": 221
        },
        {
            "year": 2023,
            "operating_cash_flow": 2456,
            "capex": -412,
            "free_cash_flow": 2044,
            "financing_cash_flow": -623,
            "investing_cash_flow": -1145,
            "net_change_cash": 276
        },
        {
            "year": 2024,
            "operating_cash_flow": 2934,
            "capex": -489,
            "free_cash_flow": 2445,
            "financing_cash_flow": -734,
            "investing_cash_flow": -1356,
            "net_change_cash": 355
        }
    ],
    
    # Key Metrics
    "key_metrics": {
        "beta": 1.25,
        "debt_to_equity": 0.10,
        "current_ratio": 1.70,
        "roe": 0.083,
        "roa": 0.050,
        "revenue_growth_5yr_cagr": 0.193,
        "gross_margin": 0.78,
        "operating_margin": 0.153,
        "net_margin": 0.129,
        "fcf_margin": 0.223
    }
}
