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

// Continue in next part...