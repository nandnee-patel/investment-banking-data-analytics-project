"""Comparable Companies and Precedent Transactions Data"""

# Comparable Companies Analysis - Enterprise Software/Cloud SaaS Companies
COMPARABLE_COMPANIES = [
    {
        "ticker": "CRM",
        "company_name": "Salesforce, Inc.",
        "market_cap": 251000,
        "enterprise_value": 246000,
        "revenue": 38764,
        "ebitda": 7234,
        "net_income": 3304,
        "ev_revenue": 6.35,
        "ev_ebitda": 34.0,
        "pe_ratio": 76.0,
        "revenue_growth": 0.112
    },
    {
        "ticker": "NOW",
        "company_name": "ServiceNow, Inc.",
        "market_cap": 142000,
        "enterprise_value": 139000,
        "revenue": 10945,
        "ebitda": 2345,
        "net_income": 1407,
        "ev_revenue": 12.70,
        "ev_ebitda": 59.3,
        "pe_ratio": 100.9,
        "revenue_growth": 0.219
    },
    {
        "ticker": "WDAY",
        "company_name": "Workday, Inc.",
        "market_cap": 68500,
        "enterprise_value": 66200,
        "revenue": 7467,
        "ebitda": 1234,
        "net_income": 623,
        "ev_revenue": 8.87,
        "ev_ebitda": 53.6,
        "pe_ratio": 109.9,
        "revenue_growth": 0.165
    },
    {
        "ticker": "ADBE",
        "company_name": "Adobe Inc.",
        "market_cap": 245000,
        "enterprise_value": 242000,
        "revenue": 19410,
        "ebitda": 7823,
        "net_income": 5428,
        "ev_revenue": 12.47,
        "ev_ebitda": 30.9,
        "pe_ratio": 45.1,
        "revenue_growth": 0.098
    },
    {
        "ticker": "MSFT",
        "company_name": "Microsoft Corporation",
        "market_cap": 3150000,
        "enterprise_value": 3095000,
        "revenue": 227583,
        "ebitda": 114234,
        "net_income": 88136,
        "ev_revenue": 13.60,
        "ev_ebitda": 27.1,
        "pe_ratio": 35.7,
        "revenue_growth": 0.127
    },
    {
        "ticker": "ORCL",
        "company_name": "Oracle Corporation",
        "market_cap": 345000,
        "enterprise_value": 385000,
        "revenue": 52961,
        "ebitda": 21234,
        "net_income": 10923,
        "ev_revenue": 7.27,
        "ev_ebitda": 18.1,
        "pe_ratio": 31.6,
        "revenue_growth": 0.064
    },
    {
        "ticker": "SNOW",
        "company_name": "Snowflake Inc.",
        "market_cap": 52000,
        "enterprise_value": 48500,
        "revenue": 2812,
        "ebitda": -234,
        "net_income": -823,
        "ev_revenue": 17.25,
        "ev_ebitda": 0,  # Negative EBITDA
        "pe_ratio": 0,  # Negative earnings
        "revenue_growth": 0.342
    },
    {
        "ticker": "TEAM",
        "company_name": "Atlassian Corporation",
        "market_cap": 72000,
        "enterprise_value": 70500,
        "revenue": 4389,
        "ebitda": 1123,
        "net_income": 412,
        "ev_revenue": 16.06,
        "ev_ebitda": 62.8,
        "pe_ratio": 174.8,
        "revenue_growth": 0.198
    },
    {
        "ticker": "ZM",
        "company_name": "Zoom Video Communications",
        "market_cap": 23000,
        "enterprise_value": 18000,
        "revenue": 4534,
        "ebitda": 1234,
        "net_income": 823,
        "ev_revenue": 3.97,
        "ev_ebitda": 14.6,
        "pe_ratio": 27.9,
        "revenue_growth": -0.089
    },
    {
        "ticker": "DDOG",
        "company_name": "Datadog, Inc.",
        "market_cap": 42000,
        "enterprise_value": 39500,
        "revenue": 2387,
        "ebitda": 423,
        "net_income": 234,
        "ev_revenue": 16.55,
        "ev_ebitda": 93.4,
        "pe_ratio": 179.5,
        "revenue_growth": 0.267
    }
]

# Precedent Transactions - Recent Enterprise Software M&A Deals
PRECEDENT_TRANSACTIONS = [
    {
        "date": "2024-01",
        "acquirer": "Cisco Systems",
        "target": "Splunk Inc.",
        "deal_value": 28000,
        "target_revenue": 3654,
        "target_ebitda": 456,
        "ev_revenue": 7.66,
        "ev_ebitda": 61.4,
        "premium": 0.315
    },
    {
        "date": "2023-10",
        "acquirer": "Broadcom",
        "target": "VMware Inc.",
        "deal_value": 69000,
        "target_revenue": 13294,
        "target_ebitda": 4234,
        "ev_revenue": 5.19,
        "ev_ebitda": 16.3,
        "premium": 0.188
    },
    {
        "date": "2022-12",
        "acquirer": "Vista Equity Partners",
        "target": "Avalara Inc.",
        "deal_value": 8400,
        "target_revenue": 859,
        "target_ebitda": 67,
        "ev_revenue": 9.78,
        "ev_ebitda": 125.4,
        "premium": 0.287
    },
    {
        "date": "2022-09",
        "acquirer": "Adobe Inc.",
        "target": "Figma Inc.",
        "deal_value": 20000,
        "target_revenue": 547,
        "target_ebitda": 82,
        "ev_revenue": 36.56,
        "ev_ebitda": 243.9,
        "premium": 0.502
    },
    {
        "date": "2022-06",
        "acquirer": "Thoma Bravo",
        "target": "Anaplan Inc.",
        "deal_value": 10700,
        "target_revenue": 688,
        "target_ebitda": -45,
        "ev_revenue": 15.55,
        "ev_ebitda": 0,
        "premium": 0.293
    },
    {
        "date": "2021-10",
        "acquirer": "Salesforce",
        "target": "Slack Technologies",
        "deal_value": 27700,
        "target_revenue": 1145,
        "target_ebitda": -234,
        "ev_revenue": 24.19,
        "ev_ebitda": 0,
        "premium": 0.548
    },
    {
        "date": "2021-03",
        "acquirer": "Intuit Inc.",
        "target": "Mailchimp",
        "deal_value": 12000,
        "target_revenue": 800,
        "target_ebitda": 312,
        "ev_revenue": 15.00,
        "ev_ebitda": 38.5,
        "premium": 0.0
    },
    {
        "date": "2020-12",
        "acquirer": "Salesforce",
        "target": "Vlocity Inc.",
        "deal_value": 1330,
        "target_revenue": 345,
        "target_ebitda": 23,
        "ev_revenue": 3.86,
        "ev_ebitda": 57.8,
        "premium": 0.0
    }
]

# Market Assumptions and Macro Data
MARKET_ASSUMPTIONS = {
    "risk_free_rate": 0.045,  # 10-year US Treasury yield
    "market_risk_premium": 0.065,  # Expected equity risk premium
    "tax_rate": 0.20,  # Effective corporate tax rate
    "terminal_growth_rate": 0.025,  # Long-term GDP growth
    "inflation_rate": 0.025,
    "saas_median_ev_revenue": 10.5,
    "saas_median_ev_ebitda": 35.0,
    "saas_median_premium": 0.28
}
