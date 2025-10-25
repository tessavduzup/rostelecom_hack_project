import axios from 'axios';

const API_BASE = '/api';

export const metadataAPI = {
  getFilters: () => axios.get(`${API_BASE}/metadata/filters`).then(r => r.data),
  getFilterOptions: (field) => axios.get(`${API_BASE}/metadata/filter-options/${field}`).then(r => r.data),
  getReportTemplates: () => axios.get(`${API_BASE}/metadata/available-reports`).then(r => r.data),
};

export const reportsAPI = {
  executeQuery: (query) => axios.post(`${API_BASE}/reports/execute`, query).then(r => r.data),
  exportReport: (query, format) => 
    axios.post(`${API_BASE}/export/${format}`, query, { responseType: 'blob' })
};