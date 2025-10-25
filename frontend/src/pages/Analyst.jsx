// AnalystDashboard.jsx
import React, { useState, useEffect } from 'react';
import QueryBuilder from '../components/QueryBuilder';
import { mockMetadataAPI, mockReportsAPI } from '../api/mockData';

const Analyst = () => {
  const [availableFilters, setAvailableFilters] = useState([]);
  const [reportTemplates, setReportTemplates] = useState([]);
  const [currentQuery, setCurrentQuery] = useState({});
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMetadata();
  }, []);

  const loadMetadata = async () => {
    try {      
      const filtersResponse = await mockMetadataAPI.getFilters();
      const templatesResponse = await mockMetadataAPI.getReportTemplates();
      
      console.log('Raw filters response:', filtersResponse);
      console.log('Raw templates response:', templatesResponse);
      
      let filtersData = [];
      if (Array.isArray(filtersResponse)) {
        filtersData = filtersResponse;
      } else if (filtersResponse && Array.isArray(filtersResponse.project_attributes)) {
        filtersData = filtersResponse.project_attributes;
      } else if (filtersResponse && Array.isArray(filtersResponse.data)) {
        filtersData = filtersResponse.data;
      }
      
      let templatesData = [];
      if (Array.isArray(templatesResponse)) {
        templatesData = templatesResponse;
      } else if (templatesResponse && Array.isArray(templatesResponse.data)) {
        templatesData = templatesResponse.data;
      }
      
      setAvailableFilters(filtersData);
      setReportTemplates(templatesData);
      
    } catch (error) {
      setAvailableFilters([]);
      setReportTemplates([]);
    }
  };

  const executeQuery = async (query) => {
    setLoading(true);
    try {
      const data = await mockReportsAPI.executeQuery(query);
      setReportData(data);
      setCurrentQuery(query);
    } catch (error) {
      console.error('Query execution error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyst-dashboard">
      <h1>Панель аналитика - ТЕСТОВЫЙ РЕЖИМ</h1>
      <p style={{color: 'orange'}}>Используются тестовые данные</p>
      
      <div className="dashboard-content">
        <div className="query-section">
          <QueryBuilder
            availableFilters={availableFilters}
            reportTemplates={reportTemplates}
            onExecuteQuery={executeQuery}
            loading={loading}
          />
        </div>
        
        <div className="results-section">
          {reportData && (
            <div>
              <h3>Результаты отчета ({reportData.metadata.total_count} записей)</h3>
              <div style={{overflow: 'auto', maxHeight: '400px'}}>
                <table border="1" style={{borderCollapse: 'collapse', width: '100%'}}>
                  <thead>
                    <tr>
                      {reportData.metadata.fields.map(field => (
                        <th key={field} style={{padding: '8px', background: '#f0f0f0'}}>
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.data.map((row, index) => (
                      <tr key={index}>
                        {reportData.metadata.fields.map(field => (
                          <td key={field} style={{padding: '8px'}}>
                            {row[field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyst;