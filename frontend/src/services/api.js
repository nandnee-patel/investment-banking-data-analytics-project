import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const maApi = {
  getOverview: () => api.get('/ma/overview'),
  getFinancials: () => api.get('/ma/financials'),
  getDCF: (company = 'target') => api.get(`/ma/dcf?company=${company}`),
  getComparableCompanies: () => api.get('/ma/comparable-companies'),
  getPrecedentTransactions: () => api.get('/ma/precedent-transactions'),
  getSynergies: () => api.get('/ma/synergies'),
  getAccretionDilution: () => api.get('/ma/accretion-dilution'),
  getValuationSummary: () => api.get('/ma/valuation-summary'),
  getExecutiveSummary: () => api.get('/ma/executive-summary'),
};

export default api;
