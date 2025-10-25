// src/api/mockData.js

// Mock данные для фильтров
export const mockFilters = {
  project_attributes: [
    {
      field: 'project_name',
      type: 'text', 
      label: 'Название проекта',
      operators: ['equals', 'not_equals', 'contains', 'starts_with', 'ends_with']
    },
    {
      field: 'project_stage',
      type: 'select',
      label: 'Этап проекта',
      operators: ['equals', 'not_equals', 'in', 'not_in'],
      values: ['Инициация', 'Планирование', 'Исполнение', 'Завершение', 'На паузе']
    },
    {
      field: 'manager',
      type: 'select',
      label: 'Менеджер',
      operators: ['equals', 'not_equals', 'in', 'not_in'],
      values: ['Иванов Иван', 'Петров Петр', 'Сидоров Алексей', 'Кузнецова Мария']
    },
    {
      field: 'service_type',
      type: 'select',
      label: 'Тип услуги',
      operators: ['equals', 'not_equals', 'in', 'not_in'],
      values: ['ИТ-консалтинг', 'Разработка ПО', 'Облачные решения', 'Кибербезопасность']
    },
    {
      field: 'revenue',
      type: 'number',
      label: 'Выручка',
      operators: ['equals', 'not_equals', 'greater_than', 'less_than', 'between']
    },
    {
      field: 'start_date',
      type: 'date',
      label: 'Дата начала',
      operators: ['equals', 'not_equals', 'greater_than', 'less_than', 'between']
    },
    {
      field: 'end_date',
      type: 'date',
      label: 'Дата окончания',
      operators: ['equals', 'not_equals', 'greater_than', 'less_than', 'between']
    }
  ]
};

// Mock данные для шаблонов отчетов
export const mockReportTemplates = [
  {
    id: 'financial_overview',
    name: 'Финансовый обзор',
    fields: ['project_name', 'revenue', 'start_date', 'end_date']
  },
  {
    id: 'project_stages', 
    name: 'Стадии проектов',
    fields: ['project_name', 'project_stage', 'manager', 'start_date']
  },
  {
    id: 'manager_performance',
    name: 'Эффективность менеджеров', 
    fields: ['manager', 'project_name', 'revenue', 'service_type']
  }
];

// Mock API для получения метаданных
export const mockMetadataAPI = {
  async getFilters() {
    console.log('📡 Mock: getFilters called');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFilters;
  },

  async getReportTemplates() {
    console.log('📡 Mock: getReportTemplates called');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockReportTemplates;
  }
};

// Mock API для выполнения запросов
export const mockReportsAPI = {
  async executeQuery(query) {
    console.log('📡 Mock: executeQuery called with:', query);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Генерация тестовых данных на основе запроса
    const mockData = generateMockData(query);
    
    // Если поля не выбраны, показываем все доступные поля
    const fieldsToShow = query.fields && query.fields.length > 0 
      ? query.fields 
      : ['project_name', 'manager', 'service_type', 'revenue', 'project_stage', 'start_date', 'end_date'];
    
    return {
      data: mockData,
      metadata: {
        total_count: mockData.length,
        fields: fieldsToShow
      }
    };
  }
};

// Функция генерации тестовых данных
function generateMockData(query) {
  const allData = [
    { 
      project_name: 'Проект А', 
      manager: 'Иванов Иван', 
      service_type: 'ИТ-консалтинг', 
      revenue: 100000, 
      project_stage: 'Исполнение', 
      start_date: '2024-01-15', 
      end_date: '2024-06-30' 
    },
    { 
      project_name: 'Проект Б', 
      manager: 'Петров Петр', 
      service_type: 'Разработка ПО', 
      revenue: 250000, 
      project_stage: 'Завершение', 
      start_date: '2024-02-01', 
      end_date: '2024-05-15' 
    },
    { 
      project_name: 'Проект В', 
      manager: 'Сидоров Алексей', 
      service_type: 'Облачные решения', 
      revenue: 150000, 
      project_stage: 'Планирование', 
      start_date: '2024-03-10', 
      end_date: '2024-08-20' 
    },
    { 
      project_name: 'Проект Г', 
      manager: 'Кузнецова Мария', 
      service_type: 'Кибербезопасность', 
      revenue: 300000, 
      project_stage: 'Исполнение', 
      start_date: '2024-01-20', 
      end_date: '2024-07-15' 
    },
    { 
      project_name: 'Проект Д', 
      manager: 'Иванов Иван', 
      service_type: 'Разработка ПО', 
      revenue: 200000, 
      project_stage: 'Инициация', 
      start_date: '2024-04-01', 
      end_date: '2024-09-30' 
    },
    { 
      project_name: 'Проект Е', 
      manager: 'Петров Петр', 
      service_type: 'ИТ-консалтинг', 
      revenue: 180000, 
      project_stage: 'Исполнение', 
      start_date: '2024-03-15', 
      end_date: '2024-08-30' 
    },
    { 
      project_name: 'Проект Ж', 
      manager: 'Сидоров Алексей', 
      service_type: 'Кибербезопасность', 
      revenue: 220000, 
      project_stage: 'Завершение', 
      start_date: '2024-01-10', 
      end_date: '2024-06-20' 
    },
    { 
      project_name: 'Проект З', 
      manager: 'Кузнецова Мария', 
      service_type: 'Облачные решения', 
      revenue: 270000, 
      project_stage: 'Планирование', 
      start_date: '2024-05-01', 
      end_date: '2024-10-31' 
    }
  ];

  // Если нет фильтров, возвращаем все данные
  if (!query.filters || query.filters.length === 0) {
    console.log('📊 No filters applied, returning all data');
    return allData;
  }

  console.log('🔍 Applying filters:', query.filters);

  // Применяем фильтры
  const filteredData = allData.filter(item => {
    return applyFilters(item, query.filters);
  });

  console.log('✅ Filtered data count:', filteredData.length);
  return filteredData;
}

// Функция применения фильтров
function applyFilters(item, filters) {
  return filters.every(filter => {
    if (!filter.field || !filter.value) {
      console.log('⚠️ Skipping filter - no field or value:', filter);
      return true;
    }

    const fieldValue = item[filter.field];
    const filterValue = filter.value;
    const operator = filter.operator || 'equals';

    console.log(`🔍 Checking filter: ${filter.field} ${operator} ${filterValue}`);
    console.log(`   Item value: ${fieldValue}`);

    let result;

    switch (operator) {
      case 'equals':
        result = fieldValue == filterValue;
        break;
      case 'not_equals':
        result = fieldValue != filterValue;
        break;
      case 'contains':
        result = String(fieldValue).toLowerCase().includes(String(filterValue).toLowerCase());
        break;
      case 'starts_with':
        result = String(fieldValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
        break;
      case 'ends_with':
        result = String(fieldValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
        break;
      case 'in':
        const inValues = filterValue.split(',').map(v => v.trim());
        result = inValues.includes(String(fieldValue));
        break;
      case 'not_in':
        const notInValues = filterValue.split(',').map(v => v.trim());
        result = !notInValues.includes(String(fieldValue));
        break;
      case 'greater_than':
        result = Number(fieldValue) > Number(filterValue);
        break;
      case 'less_than':
        result = Number(fieldValue) < Number(filterValue);
        break;
      case 'between':
        // Простая реализация для диапазона (формат: "min-max")
        const [min, max] = filterValue.split('-').map(v => Number(v.trim()));
        result = Number(fieldValue) >= min && Number(fieldValue) <= max;
        break;
      default:
        console.warn(`❌ Unknown operator: ${operator}`);
        result = true;
    }

    console.log(`   Result: ${result}`);
    return result;
  });
}

// Дополнительные функции для тестирования
export const testData = {
  // Получить все данные без фильтров
  getAllData() {
    return generateMockData({ filters: [] });
  },
  
  // Получить данные с определенным менеджером
  getDataByManager(managerName) {
    return generateMockData({
      filters: [
        { field: 'manager', operator: 'equals', value: managerName }
      ]
    });
  },
  
  // Получить данные с выручкой больше указанной
  getDataByRevenue(minRevenue) {
    return generateMockData({
      filters: [
        { field: 'revenue', operator: 'greater_than', value: minRevenue.toString() }
      ]
    });
  }
};

// Экспорт по умолчанию для удобства
export default {
  mockFilters,
  mockReportTemplates,
  mockMetadataAPI,
  mockReportsAPI,
  testData
};