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
      console.log('📡 Loading metadata...');
      
      const filtersResponse = await mockMetadataAPI.getFilters();
      const templatesResponse = await mockMetadataAPI.getReportTemplates();
      
      console.log('✅ Filters response:', filtersResponse);
      console.log('✅ Templates response:', templatesResponse);
      
      // Извлекаем массив фильтров из ответа
      const filtersData = filtersResponse?.project_attributes || [];
      const templatesData = Array.isArray(templatesResponse) ? templatesResponse : [];
      
      setAvailableFilters(filtersData);
      setReportTemplates(templatesData);
      
      console.log('📊 Available filters:', filtersData);
      console.log('📋 Available templates:', templatesData);
      
    } catch (error) {
      console.error('❌ Error loading metadata:', error);
      setAvailableFilters([]);
      setReportTemplates([]);
    }
  };

  const executeQuery = async (query) => {
    console.log('🚀 Executing query:', query);
    setLoading(true);
    try {
      const data = await mockReportsAPI.executeQuery(query);
      console.log('✅ Query result:', data);
      setReportData(data);
      setCurrentQuery(query);
    } catch (error) {
      console.error('❌ Query execution error:', error);
      alert('Ошибка выполнения запроса: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyst-dashboard" style={{ padding: '20px' }}>
      <h1>Панель аналитика</h1>
      
      <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="query-section">
          <QueryBuilder
            availableFilters={availableFilters}
            reportTemplates={reportTemplates}
            onExecuteQuery={executeQuery}
            loading={loading}
          />
        </div>
        
        <div className="results-section">
          {reportData ? (
            <div>
              <h3>
                Результаты отчета ({reportData.metadata.total_count} записей)
                {currentQuery.fields && currentQuery.fields.length === 0 && (
                  <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
                    (все поля)
                  </span>
                )}
              </h3>
              <div style={{overflow: 'auto', maxHeight: '400px', border: '1px solid #ddd', borderRadius: '4px'}}>
                <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '14px'}}>
                  <thead>
                    <tr>
                      {reportData.metadata.fields.map(field => (
                        <th key={field} style={{padding: '8px', background: '#f0f0f0', border: '1px solid #ddd'}}>
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.data.map((row, index) => (
                      <tr key={index}>
                        {reportData.metadata.fields.map(field => (
                          <td key={field} style={{padding: '8px', border: '1px solid #ddd'}}>
                            {row[field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              color: '#999',
              border: '2px dashed #ddd',
              borderRadius: '8px'
            }}>
              <h3>Результаты отчета</h3>
              <p>Выполните запрос для отображения данных</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyst;