import React, { useState, useEffect } from 'react';
import '@/App.css';
import { maApi } from '@/services/api';
import { formatMoney, formatPercent, formatMultiple, formatLargeMoney, formatNumber } from '@/utils/formatters';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, TrendingUp, DollarSign, Target, BarChart3, FileText } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    overview: null,
    financials: null,
    dcf: null,
    comps: null,
    precedents: null,
    synergies: null,
    accretion: null,
    valuation: null,
    executive: null,
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [overview, financials, dcf, comps, precedents, synergies, accretion, valuation, executive] = await Promise.all([
        maApi.getOverview(),
        maApi.getFinancials(),
        maApi.getDCF(),
        maApi.getComparableCompanies(),
        maApi.getPrecedentTransactions(),
        maApi.getSynergies(),
        maApi.getAccretionDilution(),
        maApi.getValuationSummary(),
        maApi.getExecutiveSummary(),
      ]);

      setData({
        overview: overview.data,
        financials: financials.data,
        dcf: dcf.data,
        comps: comps.data,
        precedents: precedents.data,
        synergies: synergies.data,
        accretion: accretion.data,
        valuation: valuation.data,
        executive: executive.data,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadExecutiveSummary = () => {
    if (!data.executive) return;
    
    const content = generateExecutiveSummaryText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Salesforce-ServiceNow-MA-Executive-Summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateExecutiveSummaryText = () => {
    const exec = data.executive;
    return `
SALESFORCE ACQUISITION OF SERVICENOW
INVESTMENT BANKING EXECUTIVE SUMMARY
${'='.repeat(60)}

TRANSACTION OVERVIEW
${'-'.repeat(60)}
Acquirer: ${exec.transaction_overview.acquirer}
Target: ${exec.transaction_overview.target}
Proposed Deal Value: ${formatLargeMoney(exec.transaction_overview.proposed_deal_value, 1)}
Offer Price per Share: $${exec.transaction_overview.offer_price_per_share.toFixed(2)}
Premium to Current Price: ${formatPercent(exec.transaction_overview.premium_to_current, 1)}
Deal Structure: ${exec.transaction_overview.structure}

STRATEGIC RATIONALE
${'-'.repeat(60)}
${exec.strategic_rationale.map((r, i) => `${i + 1}. ${r}`).join('\n')}

FINANCIAL HIGHLIGHTS
${'-'.repeat(60)}
Total Synergies: ${formatLargeMoney(exec.financial_highlights.total_synergies, 1)}
Revenue Synergies: ${formatLargeMoney(exec.financial_highlights.revenue_synergies, 1)}
Cost Synergies: ${formatLargeMoney(exec.financial_highlights.cost_synergies, 1)}
EPS Accretion (Year 2): ${formatPercent(exec.financial_highlights.eps_accretion_year2, 1)}
Is Accretive: ${exec.financial_highlights.is_accretive ? 'Yes' : 'No'}

VALUATION SUMMARY
${'-'.repeat(60)}
DCF Valuation: ${formatLargeMoney(exec.valuation_summary.dcf_valuation, 1)}
Comparable Companies Valuation: ${formatLargeMoney(exec.valuation_summary.comps_valuation, 1)}
Precedent Transactions Valuation: ${formatLargeMoney(exec.valuation_summary.precedents_valuation, 1)}
Implied Enterprise Value: ${formatLargeMoney(exec.valuation_summary.implied_enterprise_value, 1)}

KEY RISKS
${'-'.repeat(60)}
${exec.key_risks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

RECOMMENDATION
${'-'.repeat(60)}
Action: ${exec.recommendation.action}
Confidence Level: ${exec.recommendation.confidence}

Rationale: ${exec.recommendation.rationale}

${'='.repeat(60)}
Prepared by: Goldman Sachs M&A Advisory Team
Date: ${new Date().toLocaleDateString()}
`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading M&A Analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white" data-testid="main-title">Investment Banking M&A Analysis</h1>
              <p className="text-slate-400 text-sm mt-1">Salesforce (CRM) Acquiring ServiceNow (NOW)</p>
            </div>
            <button
              onClick={downloadExecutiveSummary}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              data-testid="download-summary-btn"
            >
              <Download size={18} />
              Download Summary
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="executive" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 bg-slate-800/50 p-2 rounded-lg mb-8">
            <TabsTrigger value="executive" className="data-[state=active]:bg-blue-600" data-testid="executive-tab">Executive</TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600" data-testid="overview-tab">Overview</TabsTrigger>
            <TabsTrigger value="financials" className="data-[state=active]:bg-blue-600" data-testid="financials-tab">Financials</TabsTrigger>
            <TabsTrigger value="dcf" className="data-[state=active]:bg-blue-600" data-testid="dcf-tab">DCF</TabsTrigger>
            <TabsTrigger value="comps" className="data-[state=active]:bg-blue-600" data-testid="comps-tab">Comps</TabsTrigger>
            <TabsTrigger value="precedents" className="data-[state=active]:bg-blue-600" data-testid="precedents-tab">Precedents</TabsTrigger>
            <TabsTrigger value="synergies" className="data-[state=active]:bg-blue-600" data-testid="synergies-tab">Synergies</TabsTrigger>
            <TabsTrigger value="valuation" className="data-[state=active]:bg-blue-600" data-testid="valuation-tab">Valuation</TabsTrigger>
          </TabsList>

          {/* Executive Summary */}
          <TabsContent value="executive" data-testid="executive-content">
            <ExecutiveSummary data={data.executive} valuation={data.valuation} />
          </TabsContent>

          {/* Overview */}
          <TabsContent value="overview" data-testid="overview-content">
            <Overview data={data.overview} />
          </TabsContent>

          {/* Financials */}
          <TabsContent value="financials" data-testid="financials-content">
            <Financials data={data.financials} />
          </TabsContent>

          {/* DCF */}
          <TabsContent value="dcf" data-testid="dcf-content">
            <DCFAnalysis data={data.dcf} />
          </TabsContent>

          {/* Comparable Companies */}
          <TabsContent value="comps" data-testid="comps-content">
            <ComparableCompanies data={data.comps} />
          </TabsContent>

          {/* Precedent Transactions */}
          <TabsContent value="precedents" data-testid="precedents-content">
            <PrecedentTransactions data={data.precedents} />
          </TabsContent>

          {/* Synergies */}
          <TabsContent value="synergies" data-testid="synergies-content">
            <SynergiesAnalysis data={data.synergies} accretion={data.accretion} />
          </TabsContent>

          {/* Valuation */}
          <TabsContent value="valuation" data-testid="valuation-content">
            <ValuationSummary data={data.valuation} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-400 text-sm">
          <p>Investment Banking M&A Analysis Project | Portfolio-Ready | {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

// Metric Card Component
const MetricCard = ({ icon, title, value, subtitle }) => (
  <Card className="bg-slate-800/50 border-slate-700">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
        </div>
        <div className="p-2 bg-slate-700/50 rounded-lg">{icon}</div>
      </div>
    </CardContent>


// Component: Executive Summary
const ExecutiveSummary = ({ data, valuation }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<DollarSign className="text-green-400" />}
          title="Deal Value"
          value={formatLargeMoney(data.transaction_overview.proposed_deal_value, 1)}
          subtitle="Total Consideration"
        />
        <MetricCard
          icon={<TrendingUp className="text-blue-400" />}
          title="Premium"
          value={formatPercent(data.transaction_overview.premium_to_current, 1)}
          subtitle="Above Current Price"
        />
        <MetricCard
          icon={<Target className="text-purple-400" />}
          title="Total Synergies"
          value={formatLargeMoney(data.financial_highlights.total_synergies, 1)}
          subtitle="Revenue + Cost"
        />
        <MetricCard
          icon={<BarChart3 className={data.financial_highlights.is_accretive ? 'text-green-400' : 'text-red-400'} />}
          title="EPS Impact"
          value={formatPercent(data.financial_highlights.eps_accretion_year2, 1)}
          subtitle={data.financial_highlights.is_accretive ? 'Accretive' : 'Dilutive'}
        />
      </div>

      {/* Transaction Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Acquirer</p>
              <p className="font-semibold">{data.transaction_overview.acquirer}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Target</p>
              <p className="font-semibold">{data.transaction_overview.target}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Offer Price per Share</p>
              <p className="font-semibold">${data.transaction_overview.offer_price_per_share.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Deal Structure</p>
              <p className="font-semibold">{data.transaction_overview.structure}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Rationale */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Strategic Rationale</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <ul className="space-y-2">
            {data.strategic_rationale.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText />
            Final Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-slate-100">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-400">{data.recommendation.action}</span>
              <span className="text-slate-400">|</span>
              <span className="text-xl font-semibold">Confidence: {data.recommendation.confidence}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{data.recommendation.rationale}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Risks */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Risks</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <ul className="space-y-2">
            {data.key_risks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Component: Overview
const Overview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acquirer */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">{data.acquirer.name}</CardTitle>
            <CardDescription className="text-slate-400">{data.acquirer.ticker}</CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
            <p className="text-sm leading-relaxed">{data.acquirer.description}</p>
            <Separator className="bg-slate-600" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Market Cap</p>
                <p className="font-semibold">{formatLargeMoney(data.acquirer.market_cap, 1)}</p>
              </div>
              <div>
                <p className="text-slate-400">Share Price</p>
                <p className="font-semibold">${data.acquirer.current_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400">Shares Outstanding</p>
                <p className="font-semibold">{formatNumber(data.acquirer.shares_outstanding)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">{data.target.name}</CardTitle>
            <CardDescription className="text-slate-400">{data.target.ticker}</CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
            <p className="text-sm leading-relaxed">{data.target.description}</p>
            <Separator className="bg-slate-600" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Market Cap</p>
                <p className="font-semibold">{formatLargeMoney(data.target.market_cap, 1)}</p>
              </div>
              <div>
                <p className="text-slate-400">Share Price</p>
                <p className="font-semibold">${data.target.current_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400">Shares Outstanding</p>
                <p className="font-semibold">{formatNumber(data.target.shares_outstanding)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Rationale */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Deal Rationale</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-6">
          <div>
            <h3 className="font-semibold text-white mb-2">Strategic Fit</h3>
            <ul className="space-y-1">
              {data.deal_rationale.strategic_fit.map((item, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Market Opportunity</h3>
            <ul className="space-y-1">
              {data.deal_rationale.market_opportunity.map((item, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Financial Benefits</h3>
            <ul className="space-y-1">
              {data.deal_rationale.financial_benefits.map((item, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component: Financials
const Financials = ({ data }) => {
  if (!data) return null;

  const acquirerIS = data.acquirer.income_statements;
  const targetIS = data.target.income_statements;

  const revenueChartData = acquirerIS.map((item, idx) => ({
    year: item.year,
    Salesforce: item.revenue,
    ServiceNow: targetIS[idx].revenue,
  }));

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Revenue Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Line type="monotone" dataKey="Salesforce" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="ServiceNow" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Income Statement Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Salesforce Income Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-2 text-slate-400">Year</th>
                    <th className="text-right py-2 text-slate-400">2024</th>
                    <th className="text-right py-2 text-slate-400">2023</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Revenue</td>
                    <td className="text-right">{formatMoney(acquirerIS[4].revenue)}</td>
                    <td className="text-right">{formatMoney(acquirerIS[3].revenue)}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">EBITDA</td>
                    <td className="text-right">{formatMoney(acquirerIS[4].ebitda)}</td>
                    <td className="text-right">{formatMoney(acquirerIS[3].ebitda)}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Net Income</td>
                    <td className="text-right">{formatMoney(acquirerIS[4].net_income)}</td>
                    <td className="text-right">{formatMoney(acquirerIS[3].net_income)}</td>
                  </tr>
                  <tr>
                    <td className="py-2">EPS</td>
                    <td className="text-right">${acquirerIS[4].eps.toFixed(2)}</td>
                    <td className="text-right">${acquirerIS[3].eps.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">ServiceNow Income Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-2 text-slate-400">Year</th>
                    <th className="text-right py-2 text-slate-400">2024</th>
                    <th className="text-right py-2 text-slate-400">2023</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Revenue</td>
                    <td className="text-right">{formatMoney(targetIS[4].revenue)}</td>
                    <td className="text-right">{formatMoney(targetIS[3].revenue)}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">EBITDA</td>
                    <td className="text-right">{formatMoney(targetIS[4].ebitda)}</td>
                    <td className="text-right">{formatMoney(targetIS[3].ebitda)}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Net Income</td>
                    <td className="text-right">{formatMoney(targetIS[4].net_income)}</td>
                    <td className="text-right">{formatMoney(targetIS[3].net_income)}</td>
                  </tr>
                  <tr>
                    <td className="py-2">EPS</td>
                    <td className="text-right">${targetIS[4].eps.toFixed(2)}</td>
                    <td className="text-right">${targetIS[3].eps.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Component: DCF Analysis
const DCFAnalysis = ({ data }) => {
  if (!data) return null;

  const fcfChartData = data.projections.years.map((year, idx) => ({
    year,
    FCF: data.projections.fcf[idx],
    'PV of FCF': data.valuation.pv_fcf[idx],
  }));

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">DCF Assumptions</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-400 text-sm">WACC</p>
              <p className="font-semibold text-lg">{formatPercent(data.assumptions.wacc * 100, 2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Terminal Growth</p>
              <p className="font-semibold text-lg">{formatPercent(data.assumptions.terminal_growth_rate * 100, 1)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">EBITDA Margin</p>
              <p className="font-semibold text-lg">{formatPercent(data.assumptions.ebitda_margin * 100, 1)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Tax Rate</p>
              <p className="font-semibold text-lg">{formatPercent(data.assumptions.tax_rate * 100, 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Free Cash Flow Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fcfChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Bar dataKey="FCF" fill="#3b82f6" />
              <Bar dataKey="PV of FCF" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Projected Financials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-2 text-slate-400">Metric</th>
                    {data.projections.years.map(year => (
                      <th key={year} className="text-right py-2 text-slate-400">{year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Revenue</td>
                    {data.projections.revenue.map((val, idx) => (
                      <td key={idx} className="text-right">{formatMoney(val, 0)}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">EBITDA</td>
                    {data.projections.ebitda.map((val, idx) => (
                      <td key={idx} className="text-right">{formatMoney(val, 0)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2">FCF</td>
                    {data.projections.fcf.map((val, idx) => (
                      <td key={idx} className="text-right">{formatMoney(val, 0)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700">
          <CardHeader>
            <CardTitle className="text-white">Valuation Output</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-200 space-y-3">
            <div className="flex justify-between">
              <span>PV of FCF (5Y)</span>
              <span className="font-semibold">{formatLargeMoney(data.valuation.sum_pv_fcf, 1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Terminal Value</span>
              <span className="font-semibold">{formatLargeMoney(data.valuation.terminal_value, 1)}</span>
            </div>
            <div className="flex justify-between">
              <span>PV of Terminal Value</span>
              <span className="font-semibold">{formatLargeMoney(data.valuation.pv_terminal_value, 1)}</span>
            </div>
            <Separator className="bg-slate-600" />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Enterprise Value</span>
              <span className="font-bold text-blue-400">{formatLargeMoney(data.valuation.enterprise_value, 1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Less: Net Debt</span>
              <span className="font-semibold">{formatLargeMoney(data.assumptions.net_debt, 1)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Equity Value</span>
              <span className="font-bold text-green-400">{formatLargeMoney(data.valuation.equity_value, 1)}</span>
            </div>
            <Separator className="bg-slate-600" />
            <div className="flex justify-between text-xl">
              <span className="font-bold">Value per Share</span>
              <span className="font-bold text-purple-400">${data.valuation.value_per_share.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Current Price</span>
              <span>${data.valuation.current_price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Upside/Downside</span>
              <span className={data.valuation.upside_downside > 0 ? 'text-green-400' : 'text-red-400'}>
                {formatPercent(data.valuation.upside_downside, 1)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Component: Comparable Companies
const ComparableCompanies = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Trading Multiples Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">EV / Revenue</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Min</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_revenue.min)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>25th Percentile</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_revenue['25th_percentile'])}</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span className="font-semibold">Median</span>
                  <span className="font-bold">{formatMultiple(data.multiples_analysis.ev_revenue.median)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>75th Percentile</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_revenue['75th_percentile'])}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Max</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_revenue.max)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">EV / EBITDA</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Min</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_ebitda.min)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>25th Percentile</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_ebitda['25th_percentile'])}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span className="font-semibold">Median</span>
                  <span className="font-bold">{formatMultiple(data.multiples_analysis.ev_ebitda.median)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>75th Percentile</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_ebitda['75th_percentile'])}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Max</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_ebitda.max)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Implied Valuations for ServiceNow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">EV/Revenue (Median)</p>
              <p className="text-white text-xl font-bold">{formatLargeMoney(data.implied_valuations.ev_revenue_median, 1)}</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">EV/EBITDA (Median)</p>
              <p className="text-white text-xl font-bold">{formatLargeMoney(data.implied_valuations.ev_ebitda_median, 1)}</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
              <p className="text-blue-300 text-sm mb-1">Blended Valuation</p>
              <p className="text-white text-xl font-bold">{formatLargeMoney(data.implied_valuations.blended_valuation, 1)}</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Target Revenue</p>
              <p className="text-white text-xl font-bold">{formatMoney(data.implied_valuations.target_revenue, 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Comparable Companies Set</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-2 text-slate-400">Company</th>
                  <th className="text-right py-2 text-slate-400">Market Cap</th>
                  <th className="text-right py-2 text-slate-400">EV/Revenue</th>
                  <th className="text-right py-2 text-slate-400">EV/EBITDA</th>
                  <th className="text-right py-2 text-slate-400">Growth</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {data.comparable_companies.map((company, idx) => (
                  <tr key={idx} className="border-b border-slate-700">
                    <td className="py-2">
                      <div>
                        <div className="font-semibold">{company.ticker}</div>
                        <div className="text-xs text-slate-400">{company.company_name}</div>
                      </div>
                    </td>
                    <td className="text-right">{formatLargeMoney(company.market_cap, 1)}</td>
                    <td className="text-right">{formatMultiple(company.ev_revenue)}</td>
                    <td className="text-right">{formatMultiple(company.ev_ebitda)}</td>
                    <td className="text-right">{formatPercent(company.revenue_growth * 100, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component: Precedent Transactions
const PrecedentTransactions = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Transaction Multiples Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">EV / Revenue</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Min</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_revenue.min)}</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span className="font-semibold">Median</span>
                  <span className="font-bold">{formatMultiple(data.multiples_analysis.ev_revenue.median)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Max</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_revenue.max)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">EV / EBITDA</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Min</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_ebitda.min)}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span className="font-semibold">Median</span>
                  <span className="font-bold">{formatMultiple(data.multiples_analysis.ev_ebitda.median)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Max</span>
                  <span className="font-semibold">{formatMultiple(data.multiples_analysis.ev_ebitda.max)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Acquisition Premium</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Min</span>
                  <span className="font-semibold">{formatPercent(data.multiples_analysis.acquisition_premium.min, 1)}</span>
                </div>
                <div className="flex justify-between text-purple-400">
                  <span className="font-semibold">Median</span>
                  <span className="font-bold">{formatPercent(data.multiples_analysis.acquisition_premium.median, 1)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Max</span>
                  <span className="font-semibold">{formatPercent(data.multiples_analysis.acquisition_premium.max, 1)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Implied Valuations for ServiceNow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">EV/Revenue</p>
              <p className="text-white text-xl font-bold">{formatLargeMoney(data.implied_valuations.ev_revenue, 1)}</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">EV/EBITDA</p>
              <p className="text-white text-xl font-bold">{formatLargeMoney(data.implied_valuations.ev_ebitda, 1)}</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
              <p className="text-blue-300 text-sm mb-1">Blended Valuation</p>
              <p className="text-white text-xl font-bold">{formatLargeMoney(data.implied_valuations.blended_valuation, 1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Precedent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-2 text-slate-400">Date</th>
                  <th className="text-left py-2 text-slate-400">Acquirer / Target</th>
                  <th className="text-right py-2 text-slate-400">Deal Value</th>
                  <th className="text-right py-2 text-slate-400">EV/Rev</th>
                  <th className="text-right py-2 text-slate-400">EV/EBITDA</th>
                  <th className="text-right py-2 text-slate-400">Premium</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {data.precedent_transactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-slate-700">
                    <td className="py-2">{txn.date}</td>
                    <td className="py-2">
                      <div>
                        <div className="font-semibold">{txn.acquirer}</div>
                        <div className="text-xs text-slate-400">{txn.target}</div>
                      </div>
                    </td>
                    <td className="text-right">{formatLargeMoney(txn.deal_value, 1)}</td>
                    <td className="text-right">{formatMultiple(txn.ev_revenue)}</td>
                    <td className="text-right">{formatMultiple(txn.ev_ebitda)}</td>
                    <td className="text-right">{txn.premium > 0 ? formatPercent(txn.premium * 100, 1) : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component: Synergies Analysis
const SynergiesAnalysis = ({ data, accretion }) => {
  if (!data || !accretion) return null;

  const synergyBreakdownData = Object.entries(data.synergy_breakdown).map(([name, value]) => ({
    name: name.length > 30 ? name.substring(0, 27) + '...' : name,
    value: value,
  }));

  const timelineData = Object.entries(data.synergy_realization_timeline).map(([year, value]) => ({
    year,
    synergies: value,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700">
          <CardContent className="pt-6">
            <p className="text-green-300 text-sm">Revenue Synergies</p>
            <p className="text-3xl font-bold text-white mt-2">{formatLargeMoney(data.revenue_synergies, 1)}</p>
            <p className="text-slate-400 text-xs mt-1">Cross-selling & Upselling</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700">
          <CardContent className="pt-6">
            <p className="text-blue-300 text-sm">Cost Synergies</p>
            <p className="text-3xl font-bold text-white mt-2">{formatLargeMoney(data.cost_synergies, 1)}</p>
            <p className="text-slate-400 text-xs mt-1">Operational Efficiencies</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700">
          <CardContent className="pt-6">
            <p className="text-purple-300 text-sm">Total Synergies</p>
            <p className="text-3xl font-bold text-white mt-2">{formatLargeMoney(data.total_synergies, 1)}</p>
            <p className="text-slate-400 text-xs mt-1">Annual Run-rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Synergy Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={synergyBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {synergyBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {Object.entries(data.synergy_breakdown).map(([name, value], idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <span className="text-slate-300">{name}</span>
                <span className="text-slate-400 ml-auto">{formatMoney(value, 0)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Synergy Realization Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="synergies" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Accretion / Dilution Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-white font-semibold">EPS Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Acquirer Standalone EPS</span>
                  <span className="font-semibold">${accretion.acquirer_standalone_eps.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Combined EPS (No Synergies)</span>
                  <span className="font-semibold">${accretion.combined_eps_no_synergies.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span className="font-semibold">Combined EPS (With Synergies)</span>
                  <span className="font-bold">${accretion.combined_eps_with_synergies.toFixed(2)}</span>
                </div>
                <Separator className="bg-slate-600" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Accretion / (Dilution)</span>
                  <span className={`font-bold ${accretion.is_accretive ? 'text-green-400' : 'text-red-400'}`}>
                    {formatPercent(accretion.accretion_dilution_percent, 1)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status</span>
                  <span className={`font-semibold ${accretion.is_accretive ? 'text-green-400' : 'text-red-400'}`}>
                    {accretion.is_accretive ? 'ACCRETIVE' : 'DILUTIVE'}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Deal Structure</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Total Consideration</span>
                  <span className="font-semibold">{formatLargeMoney(accretion.deal_structure.total_consideration, 1)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Cash Component (90%)</span>
                  <span className="font-semibold">{formatLargeMoney(accretion.deal_structure.cash_component, 1)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Stock Component (10%)</span>
                  <span className="font-semibold">{formatLargeMoney(accretion.deal_structure.stock_component, 1)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>New Shares Issued</span>
                  <span className="font-semibold">{formatNumber(accretion.deal_structure.new_shares_issued, 1)}M</span>
                </div>
                <Separator className="bg-slate-600" />
                <div className="flex justify-between text-slate-300">
                  <span className="font-semibold">Pro Forma Shares</span>
                  <span className="font-semibold">{formatNumber(accretion.deal_structure.pro_forma_shares, 1)}M</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component: Valuation Summary
const ValuationSummary = ({ data }) => {
  if (!data) return null;

  const valuationMethodsData = [
    { method: 'DCF', value: data.valuation_methods.dcf },
    { method: 'Comps', value: data.valuation_methods.comparable_companies },
    { method: 'Precedents', value: data.valuation_methods.precedent_transactions },
    { method: 'Weighted Avg', value: data.valuation_methods.weighted_average },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Final Valuation &amp; Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-slate-400 text-sm">Target Offer Price</p>
              <p className="text-3xl font-bold text-white mt-2">${data.recommendation.target_offer_price.toFixed(2)}</p>
              <p className="text-slate-500 text-xs mt-1">Per Share</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-slate-400 text-sm">Total Deal Value</p>
              <p className="text-3xl font-bold text-white mt-2">{formatLargeMoney(data.recommendation.total_deal_value, 1)}</p>
              <p className="text-slate-500 text-xs mt-1">Enterprise Value</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-slate-400 text-sm">Offer Range (Low)</p>
              <p className="text-2xl font-bold text-white mt-2">${data.recommendation.offer_range_low.toFixed(2)}</p>
              <p className="text-slate-500 text-xs mt-1">Conservative</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-slate-400 text-sm">Offer Range (High)</p>
              <p className="text-2xl font-bold text-white mt-2">${data.recommendation.offer_range_high.toFixed(2)}</p>
              <p className="text-slate-500 text-xs mt-1">Aggressive</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Valuation Methods Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={valuationMethodsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="method" type="category" stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {valuationMethodsData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold">{item.method}</span>
                <span className="text-white text-lg font-bold">{formatLargeMoney(item.value, 1)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Valuation Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Low</span>
                <span className="text-white font-bold">{formatLargeMoney(data.valuation_range.low, 1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold">Mid (Base Case)</span>
                <span className="text-blue-400 text-xl font-bold">{formatLargeMoney(data.valuation_range.mid, 1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">High</span>
                <span className="text-white font-bold">{formatLargeMoney(data.valuation_range.high, 1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Offer Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-300">
                <span>Implied Offer EV</span>
                <span className="font-semibold">{formatLargeMoney(data.offer_analysis.implied_offer_ev, 1)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Implied Equity Value</span>
                <span className="font-semibold">{formatLargeMoney(data.offer_analysis.implied_equity_value, 1)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Implied Price per Share</span>
                <span className="font-semibold">${data.offer_analysis.implied_price_per_share.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Current Share Price</span>
                <span className="font-semibold">${data.offer_analysis.current_share_price.toFixed(2)}</span>
              </div>
              <Separator className="bg-slate-600" />
              <div className="flex justify-between text-lg">
                <span className="text-white font-semibold">Implied Premium</span>
                <span className="text-green-400 font-bold">{formatPercent(data.offer_analysis.implied_premium, 1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <FileText />
            Investment Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-bold text-green-400">{data.recommendation.action}</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Based on comprehensive DCF, comparable company, and precedent transaction analyses, we recommend proceeding with the acquisition of ServiceNow at a 
            target price of <span className="font-bold text-white">${data.recommendation.target_offer_price.toFixed(2)}</span> per share, 
            representing a total deal value of <span className="font-bold text-white">{formatLargeMoney(data.recommendation.total_deal_value, 1)}</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

  </Card>
);