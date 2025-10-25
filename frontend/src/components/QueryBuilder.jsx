import React, { useState } from 'react';

const QueryBuilder = ({ availableFilters, reportTemplates, onExecuteQuery, loading }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Убрали автоматическую установку полей при выборе шаблона
  const handleTemplateSelect = (templateId) => {
    console.log('📋 Template selected:', templateId);
    // НЕ устанавливаем поля автоматически - аналитик сам решит какие поля выбрать
    setSelectedTemplate(templateId);
  };

  // Добавим функцию сброса выбора полей
  const clearFieldSelection = () => {
    setSelectedFields([]);
  };

  // Добавим функцию выбора всех полей
  const selectAllFields = () => {
    setSelectedFields(availableFilters.map(filter => filter.field));
  };

  // Добавление фильтра
  const addFilter = () => {
    console.log('➕ Adding filter');
    const newFilter = {
      id: Date.now(),
      field: '',
      operator: 'equals',
      value: ''
    };
    setFilters(prev => [...prev, newFilter]);
  };

  // Обновление фильтра
  const updateFilter = (filterId, field, value) => {
    console.log('✏️ Updating filter:', filterId, field, value);
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, [field]: value }
          : filter
      )
    );
  };

  // Удаление фильтра
  const removeFilter = (filterId) => {
    console.log('🗑️ Removing filter:', filterId);
    setFilters(prev => prev.filter(filter => filter.id !== filterId));
  };

  const executeQuery = () => {
    console.log('🚀 Executing query');
    
    // Убрали проверку на выбранные поля - аналитик может захотеть пустой отчет
    const query = {
      fields: selectedFields, // может быть пустым массивом
      filters: filters.filter(f => f.field && f.value),
      template: selectedTemplate
    };
    
    console.log('📤 Sending query:', query);
    onExecuteQuery(query);
  };

  // Убрали проверку canExecute - можно выполнять запрос без выбранных полей
  const canExecute = !loading;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <h1>📊 Построитель запросов для аналитика</h1>

      {/* Шаблоны - теперь опционально */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>🎯 Шаблон отчета (опционально)</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
          Выберите готовый шаблон или создайте свой набор полей ниже
        </p>
        <select 
          value={selectedTemplate || ''}
          onChange={(e) => handleTemplateSelect(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '10px', 
            border: '2px solid #e1e1e1', 
            borderRadius: '6px',
            fontSize: '16px'
          }}
        >
          <option value="">-- Без шаблона (произвольный отчет) --</option>
          {reportTemplates.map((template, index) => (
            <option key={template?.id || index} value={template?.id || ''}>
              {template?.name || `Шаблон ${index + 1}`}
            </option>
          ))}
        </select>
        
        {selectedTemplate && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e6f7ff', borderRadius: '4px' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              <strong>Выбран шаблон:</strong> {reportTemplates.find(t => t.id === selectedTemplate)?.name}
            </p>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
              Рекомендуемые поля: {reportTemplates.find(t => t.id === selectedTemplate)?.fields?.join(', ') || 'не указаны'}
            </p>
          </div>
        )}
      </div>

      {/* Поля для отчета - теперь основная часть */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>📋 Поля для отчета</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={selectAllFields}
              disabled={availableFilters.length === 0}
              style={{
                padding: '8px 16px',
                backgroundColor: availableFilters.length > 0 ? '#1890ff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: availableFilters.length > 0 ? 'pointer' : 'not-allowed',
                fontSize: '12px'
              }}
            >
              Выбрать все
            </button>
            <button 
              onClick={clearFieldSelection}
              disabled={selectedFields.length === 0}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedFields.length > 0 ? '#ff4d4f' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: selectedFields.length > 0 ? 'pointer' : 'not-allowed',
                fontSize: '12px'
              }}
            >
              Очистить
            </button>
          </div>
        </div>

        {availableFilters.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666', background: '#f9f9f9', borderRadius: '4px' }}>
            ❌ Нет доступных полей для отчета
          </div>
        ) : (
          <>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Выберите поля для отчета или оставьте пустым для получения всех полей
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '10px',
              maxHeight: '300px',
              overflowY: 'auto',
              padding: '10px',
              border: '1px solid #eee',
              borderRadius: '4px'
            }}>
              {availableFilters.map(filter => (
                <label key={filter.field} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '12px',
                  border: '2px solid #e1e1e1',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedFields.includes(filter.field) ? '#e6f7ff' : 'white',
                  transition: 'all 0.2s'
                }}>
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(filter.field)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFields(prev => [...prev, filter.field]);
                      } else {
                        setSelectedFields(prev => prev.filter(f => f !== filter.field));
                      }
                    }}
                    style={{ marginRight: '12px', transform: 'scale(1.3)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{filter.label || filter.field}</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Тип: {filter.type} • Операторы: {filter.operators?.join(', ') || 'все'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {selectedFields.length > 0 ? (
                  <span style={{ color: 'green' }}>
                    ✅ Выбрано полей: {selectedFields.length} из {availableFilters.length}
                  </span>
                ) : (
                  <span style={{ color: 'orange' }}>
                    ⚠️ Поля не выбраны - будут показаны все доступные поля
                  </span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {availableFilters.length} полей доступно
              </div>
            </div>
          </>
        )}
      </div>

      {/* Фильтры */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>🔍 Условия фильтрации</h3>
          <button 
            onClick={addFilter}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            + Добавить условие
          </button>
        </div>

        {filters.length === 0 ? (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#999',
            border: '2px dashed #ddd',
            borderRadius: '8px'
          }}>
            📝 Нет добавленных условий фильтрации
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filters.map((filter, index) => (
              <FilterRow
                key={filter.id}
                filter={filter}
                availableFilters={availableFilters}
                onChange={updateFilter}
                onRemove={removeFilter}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Кнопка выполнения */}
      <button 
        onClick={executeQuery} 
        disabled={!canExecute}
        style={{ 
          width: '100%',
          padding: '15px',
          backgroundColor: canExecute ? '#52c41a' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: canExecute ? 'pointer' : 'not-allowed',
          fontSize: '18px',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        {loading ? '⏳ Выполняется...' : `🚀 Сформировать отчет`}
      </button>

      {/* Инструкция */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e6f7ff', 
        borderRadius: '8px',
        border: '1px solid #91d5ff'
      }}>
        <h4>💡 Гибкие возможности для аналитика:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>Шаблон (опционально)</strong> - используйте готовый или создайте свой</li>
          <li><strong>Произвольные поля</strong> - выберите любые поля или оставьте пустым для всех</li>
          <li><strong>Гибкая фильтрация</strong> - настройте любые условия фильтрации</li>
          <li><strong>Экспорт данных</strong> - получите данные в нужном вам формате</li>
        </ul>
        
        <h4>🎯 Примеры использования:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>Быстрый обзор</strong>: Без выбора полей → все данные</li>
          <li><strong>Финансовый отчет</strong>: Только поля выручки и дат</li>
          <li><strong>Анализ менеджеров</strong>: Менеджеры + проекты + стадии</li>
        </ul>
      </div>
    </div>
  );
};

// Компонент строки фильтра
const FilterRow = ({ filter, availableFilters, onChange, onRemove, index }) => {
  const selectedFilterConfig = availableFilters.find(f => f.field === filter.field);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e1e1e1'
    }}>
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
        fontSize: '14px'
      }}>
        {index + 1}
      </div>

      {/* Поле */}
      <div style={{ flex: 1 }}>
        <select
          value={filter.field || ''}
          onChange={(e) => onChange(filter.id, 'field', e.target.value)}
          style={{ 
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="">-- Выберите поле --</option>
          {availableFilters.map(avFilter => (
            <option key={avFilter.field} value={avFilter.field}>
              {avFilter.label || avFilter.field}
            </option>
          ))}
        </select>
      </div>

      {/* Оператор */}
      <div style={{ flex: 1 }}>
        <select
          value={filter.operator || 'equals'}
          onChange={(e) => onChange(filter.id, 'operator', e.target.value)}
          style={{ 
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
          disabled={!filter.field}
        >
          {selectedFilterConfig?.operators?.map(operator => (
            <option key={operator} value={operator}>
              {getOperatorLabel(operator)}
            </option>
          )) || (
            <option value="equals">равно</option>
          )}
        </select>
      </div>

      {/* Значение */}
      <div style={{ flex: 1.5 }}>
        <ValueInput 
          filter={filter} 
          filterConfig={selectedFilterConfig}
          onChange={(value) => onChange(filter.id, 'value', value)}
        />
      </div>

      {/* Кнопка удаления */}
      <button
        onClick={() => onRemove(filter.id)}
        style={{
          padding: '8px 12px',
          backgroundColor: '#ff4d4f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ✕
      </button>
    </div>
  );
};

// Компонент ввода значения
const ValueInput = ({ filter, filterConfig, onChange }) => {
  if (!filter.field) {
    return (
      <input
        type="text"
        placeholder="Сначала выберите поле"
        disabled
        value=""
        style={{ 
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5'
        }}
      />
    );
  }

  const operator = filter.operator || 'equals';

  // Множественный выбор для операторов in/not_in
  if (operator === 'in' || operator === 'not_in') {
    if (filterConfig?.values) {
      return (
        <select
          multiple
          value={filter.value ? filter.value.split(',') : []}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions).map(option => option.value);
            onChange(values.join(','));
          }}
          style={{ 
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '80px'
          }}
          size={Math.min(filterConfig.values.length, 4)}
        >
          {filterConfig.values.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    }
  }

  // Одиночный выбор из предопределенных значений
  if (filterConfig?.values) {
    return (
      <select
        value={filter.value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ 
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      >
        <option value="">-- Выберите значение --</option>
        {filterConfig.values.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  }

  // Стандартное поле ввода
  return (
    <input
      type={filterConfig?.type === 'number' ? 'number' : 'text'}
      value={filter.value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Введите значение..."
      style={{ 
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}
    />
  );
};

// Функция перевода операторов
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

export default QueryBuilder;