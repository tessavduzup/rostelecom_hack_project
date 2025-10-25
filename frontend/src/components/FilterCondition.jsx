// FilterCondition.jsx
import React, { useState, useEffect } from 'react';
import { metadataAPI } from '../api/query';

const FilterCondition = ({ filter, availableFilters, onChange, onRemove }) => {
  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const selectedFilterMeta = availableFilters.find(f => f.field === filter.field);

  useEffect(() => {
    if (selectedFilterMeta && selectedFilterMeta.type === 'select') {
      loadOptions();
    } else {
      setOptions([]);
    }
  }, [filter.field, selectedFilterMeta]);

  const loadOptions = async () => {
    setLoadingOptions(true);
    try {
      const data = await metadataAPI.getFilterOptions(filter.field);
      setOptions(data);
    } catch (error) {
      console.error('Error loading options:', error);
      setOptions([]);
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleFieldChange = (field) => {
    onChange({ ...filter, field, value: '' });
  };

  const renderValueInput = () => {
    if (!selectedFilterMeta) return null;

    switch (selectedFilterMeta.type) {
      case 'select':
        return (
          <select
            value={filter.value}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
          >
            <option value="">Выберите значение</option>
            {loadingOptions ? (
              <option>Загрузка...</option>
            ) : (
              options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))
            )}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={filter.value}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={filter.value}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={filter.value}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
          />
        );
    }
  };

  return (
    <div className="filter-condition">
      <select
        value={filter.field}
        onChange={(e) => handleFieldChange(e.target.value)}
      >
        <option value="">Выберите поле</option>
        {availableFilters.map(f => (
          <option key={f.field} value={f.field}>{f.label}</option>
        ))}
      </select>

      <select
        value={filter.operator}
        onChange={(e) => onChange({ ...filter, operator: e.target.value })}
      >
        <option value="equals">равно</option>
        <option value="contains">содержит</option>
        <option value="greater">больше</option>
        <option value="less">меньше</option>
      </select>

      {renderValueInput()}

      <button type="button" onClick={onRemove}>×</button>
    </div>
  );
};

export default FilterCondition;