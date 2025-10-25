import React from 'react';

const FilterCondition = ({ filter, availableFilters, onChange, onRemove, index }) => {
  console.log('🔍 FilterCondition render:', { filter, availableFilters });

  const handleFieldChange = (field) => {
    console.log('🔄 Field change:', field);
    const selectedFilter = availableFilters.find(f => f.field === field);
    
    const newFilter = {
      ...filter,
      field: field,
      operator: 'equals', // Сбрасываем к стандартному оператору
      value: '' // Сбрасываем значение
    };
    
    console.log('✅ New filter after field change:', newFilter);
    onChange(newFilter);
  };

  const handleOperatorChange = (operator) => {
    console.log('🔄 Operator change:', operator);
    const newFilter = {
      ...filter,
      operator: operator,
      value: '' // Сбрасываем значение при смене оператора
    };
    console.log('✅ New filter after operator change:', newFilter);
    onChange(newFilter);
  };

  const handleValueChange = (value) => {
    console.log('🔄 Value change:', value);
    const newFilter = {
      ...filter,
      value: value
    };
    onChange(newFilter);
  };

  // Получаем конфигурацию выбранного фильтра
  const selectedFilterConfig = availableFilters.find(f => f.field === filter.field);

  // Доступные операторы
  const availableOperators = selectedFilterConfig?.operators || ['equals', 'not_equals'];

  // Рендер поля ввода значения
  const renderValueInput = () => {
    if (!filter.field) {
      return (
        <div style={{ padding: '10px', textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
          ← Выберите поле слева
        </div>
      );
    }

    const operator = filter.operator || 'equals';

    // Множественный выбор для операторов in/not_in
    if (operator === 'in' || operator === 'not_in') {
      if (selectedFilterConfig?.values) {
        return (
          <div>
            <div style={{ fontSize: '12px', marginBottom: '5px', color: '#666' }}>
              Выберите один или несколько:
            </div>
            <select
              multiple
              value={filter.value ? filter.value.split(',') : []}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions).map(option => option.value);
                handleValueChange(values.join(','));
              }}
              style={{ 
                width: '100%',
                padding: '8px',
                border: '2px solid #e1e1e1',
                borderRadius: '4px',
                minHeight: '100px'
              }}
              size={Math.min(selectedFilterConfig.values.length, 6)}
            >
              {selectedFilterConfig.values.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {filter.value && (
              <div style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
                Выбрано: {filter.value.split(',').length}
              </div>
            )}
          </div>
        );
      }
    }

    // Одиночный выбор из предопределенных значений
    if (selectedFilterConfig?.values && !['contains', 'starts_with', 'ends_with'].includes(operator)) {
      return (
        <select
          value={filter.value}
          onChange={(e) => handleValueChange(e.target.value)}
          style={{ 
            width: '100%',
            padding: '10px',
            border: '2px solid #e1e1e1',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="">-- Выберите значение --</option>
          {selectedFilterConfig.values.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    }

    // Текстовое поле для поиска
    if (['contains', 'starts_with', 'ends_with'].includes(operator)) {
      return (
        <input
          type="text"
          value={filter.value}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={`Введите текст для поиска...`}
          style={{ 
            width: '100%',
            padding: '10px',
            border: '2px solid #e1e1e1',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      );
    }

    // Числовое поле
    if (selectedFilterConfig?.type === 'number') {
      return (
        <input
          type="number"
          value={filter.value}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder="Введите число..."
          style={{ 
            width: '100%',
            padding: '10px',
            border: '2px solid #e1e1e1',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      );
    }

    // Стандартное текстовое поле
    return (
      <input
        type="text"
        value={filter.value}
        onChange={(e) => handleValueChange(e.target.value)}
        placeholder="Введите значение..."
        style={{ 
          width: '100%',
          padding: '10px',
          border: '2px solid #e1e1e1',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
    );
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '2px solid #e1e1e1',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Номер условия */}
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#1890ff',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        flexShrink: 0
      }}>
        {index + 1}
      </div>

      {/* Поле */}
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          Поле
        </label>
        <select
          value={filter.field || ''}
          onChange={(e) => handleFieldChange(e.target.value)}
          style={{ 
            width: '100%',
            padding: '10px',
            border: '2px solid #e1e1e1',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: filter.field ? '#fff' : '#f9f9f9'
          }}
        >
          <option value="">-- Выберите поле --</option>
          {availableFilters.map(availableFilter => (
            <option key={availableFilter.field} value={availableFilter.field}>
              {availableFilter.label || availableFilter.field}
            </option>
          ))}
        </select>
      </div>

      {/* Оператор */}
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          Условие
        </label>
        <select
          value={filter.operator || 'equals'}
          onChange={(e) => handleOperatorChange(e.target.value)}
          style={{ 
            width: '100%',
            padding: '10px',
            border: '2px solid #e1e1e1',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: filter.field ? '#fff' : '#f9f9f9'
          }}
          disabled={!filter.field}
        >
          {availableOperators.map(operator => (
            <option key={operator} value={operator}>
              {getOperatorLabel(operator)}
            </option>
          ))}
        </select>
      </div>

      {/* Значение */}
      <div style={{ flex: 1.5 }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
          Значение
        </label>
        {renderValueInput()}
      </div>

      {/* Кнопка удаления */}
      <div style={{ alignSelf: 'center' }}>
        <button
          onClick={onRemove}
          style={{
            padding: '10px 15px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          title="Удалить условие"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Функция для перевода операторов на русский
const getOperatorLabel = (operator) => {
  const operators = {
    'equals': 'равно',
    'not_equals': 'не равно',
    'contains': 'содержит',
    'starts_with': 'начинается с',
    'ends_with': 'заканчивается на',
    'greater_than': 'больше',
    'less_than': 'меньше',
    'between': 'между',
    'in': 'в списке',
    'not_in': 'не в списке'
  };
  return operators[operator] || operator;
};

export default FilterCondition;