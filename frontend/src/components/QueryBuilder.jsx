// QueryBuilder.jsx
import React, { useState } from 'react';
import FilterCondition from './FilterCondition';

const QueryBuilder = ({ availableFilters, reportTemplates, onExecuteQuery, loading }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Защита от всех возможных не-массивов
  const safeReportTemplates = () => {
    if (Array.isArray(reportTemplates)) return reportTemplates;
    if (reportTemplates && typeof reportTemplates === 'object') {
      // Если это объект, попробуем найти массив внутри
      if (Array.isArray(reportTemplates.data)) return reportTemplates.data;
      if (Array.isArray(reportTemplates.templates)) return reportTemplates.templates;
      if (Array.isArray(reportTemplates.items)) return reportTemplates.items;
    }
    return [];
  };

  const safeAvailableFilters = () => {
    if (Array.isArray(availableFilters)) return availableFilters;
    if (availableFilters && typeof availableFilters === 'object') {
      if (Array.isArray(availableFilters.data)) return availableFilters.data;
      if (Array.isArray(availableFilters.filters)) return availableFilters.filters;
      if (Array.isArray(availableFilters.items)) return availableFilters.items;
    }
    return [];
  };

  const templates = safeReportTemplates();
  const filtersList = safeAvailableFilters();

  console.log('ReportTemplates in QueryBuilder:', reportTemplates);
  console.log('AvailableFilters in QueryBuilder:', availableFilters);
  console.log('Processed templates:', templates);
  console.log('Processed filters:', filtersList);

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t && t.id === templateId);
    if (template) {
      setSelectedFields(Array.isArray(template.fields) ? template.fields : []);
      setSelectedTemplate(templateId);
    }
  };

  const addFilter = () => {
    setFilters([...filters, { field: '', operator: 'equals', value: '' }]);
  };

  const updateFilter = (index, updatedFilter) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const executeQuery = () => {
    const query = {
      fields: selectedFields,
      filters: filters.filter(f => f.field && f.value),
      template: selectedTemplate
    };
    onExecuteQuery(query);
  };

  return (
    <div className="query-builder">
      <div className="template-section">
        <h3>Шаблоны отчетов ({templates.length})</h3>
        <select 
          value={selectedTemplate} 
          onChange={(e) => handleTemplateSelect(e.target.value)}
        >
          <option value="">Выберите шаблон</option>
          {templates.map((template, index) => (
            <option key={template?.id || index} value={template?.id}>
              {template?.name || `Шаблон ${index + 1}`}
            </option>
          ))}
        </select>
      </div>

      <div className="fields-section">
        <h3>Поля для отчета ({filtersList.length})</h3>
        {filtersList.length === 0 ? (
          <p>Нет доступных полей</p>
        ) : (
          filtersList.map(filter => (
            <label key={filter.field} style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={selectedFields.includes(filter.field)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFields([...selectedFields, filter.field]);
                  } else {
                    setSelectedFields(selectedFields.filter(f => f !== filter.field));
                  }
                }}
              />
              {filter.label || filter.field}
            </label>
          ))
        )}
      </div>

      <div className="filters-section">
        <h3>Условия фильтрации</h3>
        {filters.map((filter, index) => (
          <FilterCondition
            key={index}
            filter={filter}
            availableFilters={filtersList}
            onChange={(updatedFilter) => updateFilter(index, updatedFilter)}
            onRemove={() => removeFilter(index)}
          />
        ))}
        <button type="button" onClick={addFilter}>
          + Добавить условие
        </button>
      </div>

      <button 
        onClick={executeQuery} 
        disabled={loading || selectedFields.length === 0}
        style={{ marginTop: '20px' }}
      >
        {loading ? 'Выполнение...' : 'Сформировать отчет'}
      </button>

      {/* Отладочная информация */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', fontSize: '12px' }}>
        <strong>Отладка:</strong><br />
        selectedFields: {JSON.stringify(selectedFields)}<br />
        filters: {JSON.stringify(filters)}<br />
        templates count: {templates.length}<br />
        filters count: {filtersList.length}
      </div>
    </div>
  );
};

export default QueryBuilder;