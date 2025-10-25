import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitProject, getProjectAttribute } from '../api/authAPI';
import '../styles/CreateProject.css';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [attributesLoading, setAttributesLoading] = useState(true);
  const [attributesError, setAttributesError] = useState('');
  const [showFinancials, setShowFinancials] = useState(false);
  const [attributes, setAttributes] = useState(null);
  
  const [formData, setFormData] = useState({
    projectName: '',
    organizationName: '',
    inn: '',
    service: '',
    paymentType: '',
    status: '',
    probability: 10,
    manager: '',
    segment: '',
    currentStatus: '',
    completedWork: '',
    futurePlans: '',
    comments: '',
    isIndustrySolution: false,
    isForecastAccepted: false,
    viaDzo: false,
    managementControl: false,
    industryManager: '',
    projectNumber: '',
    forecastEvaluation: ''
  });

  const [financialData, setFinancialData] = useState({
    revenues: [],
    costs: [],
    totalRevenue: 0,
    totalCosts: 0
  });

  const ATTRIBUTES_STORAGE_KEY = 'project_attributes_cache';
  const CACHE_TIMESTAMP_KEY = 'project_attributes_timestamp';
  const CACHE_DURATION = 5 * 60 * 1000; 

  const isCacheValid = () => {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;
    
    const now = Date.now();
    const cacheTime = parseInt(timestamp, 10);
    return (now - cacheTime) < CACHE_DURATION;
  };

  // Сохранение в локальное хранилище
  const saveAttributesToStorage = (data) => {
    try {
      localStorage.setItem(ATTRIBUTES_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.warn('Не удалось сохранить данные в localStorage:', error);
    }
  };

  // Получение из локального хранилища
  const getAttributesFromStorage = () => {
    try {
      const cached = localStorage.getItem(ATTRIBUTES_STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.warn('Не удалось получить данные из localStorage:', error);
      return null;
    }
  };

  // Загрузка атрибутов проекта
  const loadAttributes = async () => {
    setAttributesLoading(true);
    setAttributesError('');

    try {
      // Пытаемся получить из кэша
      if (isCacheValid()) {
        const cachedAttributes = getAttributesFromStorage();
        if (cachedAttributes) {
          setAttributes(cachedAttributes);
          setAttributesLoading(false);
          return;
        }
      }

      // Если кэш невалиден или пуст, загружаем с сервера
      const data = await getProjectAttribute();
      setAttributes(data);
      
      // Сохраняем в кэш
      saveAttributesToStorage(data);
      
    } catch (error) {
      console.error('Ошибка загрузки атрибутов:', error);
      setAttributesError('Не удалось загрузить данные с сервера');
      
      // Пытаемся использовать старые данные из кэша, даже если они устарели
      const cachedAttributes = getAttributesFromStorage();
      if (cachedAttributes) {
        setAttributes(cachedAttributes);
        setAttributesError('Используются данные из кэша (возможно устаревшие)');
      }
    } finally {
      setAttributesLoading(false);
    }
  };

  // Принудительная перезагрузка данных
  const reloadAttributes = () => {
    // Очищаем кэш и загружаем заново
    localStorage.removeItem(ATTRIBUTES_STORAGE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    loadAttributes();
  };

  useEffect(() => {
    loadAttributes();
  }, []);

  // Обработчик изменения основных полей
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Автоматическое обновление вероятности при изменении статуса
    if (field === 'status' && attributes?.statuses) {
      const selectedStatus = attributes.statuses.find(s => s.id === value);
      if (selectedStatus) {
        setFormData(prev => ({
          ...prev,
          probability: selectedStatus.probability
        }));
      }
    }
  };

  // Обработчик изменения финансовых данных
  const handleFinancialChange = (type, index, field, value) => {
    setFinancialData(prev => {
      const newData = { ...prev };
      newData[type][index] = {
        ...newData[type][index],
        [field]: value
      };
      
      // Пересчет итогов
      if (type === 'revenues') {
        newData.totalRevenue = newData.revenues.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      } else if (type === 'costs') {
        newData.totalCosts = newData.costs.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      }
      
      return newData;
    });
  };

  // Добавление новой статьи доходов/расходов
  const addFinancialItem = (type) => {
    setFinancialData(prev => ({
      ...prev,
      [type]: [...prev[type], { name: '', amount: 0, date: '' }]
    }));
  };

  // Удаление статьи доходов/расходов
  const removeFinancialItem = (type, index) => {
    setFinancialData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Проверка обязательных полей
      const requiredFields = ['projectName', 'organizationName', 'inn', 'service', 'paymentType', 'status', 'manager', 'segment'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert('Пожалуйста, заполните все обязательные поля');
        setLoading(false);
        return;
      }

      // Подготовка данных для отправки
      const submissionData = {
        ...formData,
        financialData,
        createdDate: new Date().toISOString()
      };

      // Отправка на сервер
      const response = await submitProject(submissionData);
      
      if (response.success) {
        alert('Проект успешно создан!');
        navigate('/user');
      } else {
        throw new Error('Ошибка при создании проекта');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert(error.message || 'Не удалось создать проект');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/user');
  };

  // Компонент загрузки
  if (attributesLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  // Компонент ошибки
  if (!attributes && attributesError) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Ошибка загрузки данных</h2>
          <p>{attributesError}</p>
          <div className="error-actions">
            <button onClick={reloadAttributes} className="retry-button">
              Попробовать снова
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-project-container">
      {/* Баннер с предупреждением об использовании кэша */}
      {attributesError && (
        <div className="cache-warning">
          <span>⚠️ {attributesError}</span>
          <button onClick={reloadAttributes} className="reload-button">
            Обновить данные
          </button>
        </div>
      )}

      <div className="project-card">
        {/* Заголовок и кнопки действий */}
        <div className="project-header">
          <div className="header-left">
            <button className="back-button" onClick={handleCancel}>
              ← Назад
            </button>
            <h1>Создание нового проекта</h1>
          </div>
          <div className="header-actions">
            <button className="cancel-button" onClick={handleCancel}>
              Отмена
            </button>
            <button 
              className="save-button" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Основная информация - всегда видна */}
          <div className="form-section">
            <h2>Основная информация</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Название проекта *</label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Введите название проекта"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Название организации *</label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  placeholder="Введите название организации"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>ИНН организации *</label>
                <input
                  type="text"
                  value={formData.inn}
                  onChange={(e) => handleInputChange('inn', e.target.value)}
                  placeholder="Введите ИНН"
                  pattern="\d{10,12}"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Услуга *</label>
                <select
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  required
                >
                  <option value="">Выберите услугу</option>
                  {attributes.services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Тип платежа *</label>
                <select
                  value={formData.paymentType}
                  onChange={(e) => handleInputChange('paymentType', e.target.value)}
                  required
                >
                  <option value="">Выберите тип платежа</option>
                  {attributes.paymentTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Статус *</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  required
                >
                  <option value="">Выберите статус</option>
                  {attributes.statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name} ({status.probability}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Вероятность реализации (%)</label>
                <input
                  type="number"
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', e.target.value)}
                  min="0"
                  max="100"
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label>Назначенный менеджер *</label>
                <select
                  value={formData.manager}
                  onChange={(e) => handleInputChange('manager', e.target.value)}
                  required
                >
                  <option value="">Выберите менеджера</option>
                  {attributes.managers.map(manager => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Сегмент бизнеса *</label>
                <select
                  value={formData.segment}
                  onChange={(e) => handleInputChange('segment', e.target.value)}
                  required
                >
                  <option value="">Выберите сегмент</option>
                  {attributes.segments.map(segment => (
                    <option key={segment.id} value={segment.id}>
                      {segment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Кнопка для показа финансового раздела */}
          <div className="financials-toggle">
            <button
              type="button"
              className="toggle-button"
              onClick={() => setShowFinancials(!showFinancials)}
            >
              {showFinancials ? '▼' : '▶'} Финансовая информация
            </button>
          </div>

          {/* Финансовый раздел - показывается по кнопке */}
          {showFinancials && (
            <div className="form-section financial-section">
              <h3>Финансовая информация</h3>
              
              {/* Доходы */}
              <div className="financial-block">
                <div className="financial-header">
                  <h4>Доходы</h4>
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => addFinancialItem('revenues')}
                  >
                    + Добавить доход
                  </button>
                </div>
                
                {financialData.revenues.map((revenue, index) => (
                  <div key={index} className="financial-item">
                    <input
                      type="text"
                      placeholder="Наименование дохода"
                      value={revenue.name}
                      onChange={(e) => handleFinancialChange('revenues', index, 'name', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Сумма"
                      value={revenue.amount}
                      onChange={(e) => handleFinancialChange('revenues', index, 'amount', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="date"
                      value={revenue.date}
                      onChange={(e) => handleFinancialChange('revenues', index, 'date', e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFinancialItem('revenues', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <div className="financial-total">
                  Общая сумма выручки: {financialData.totalRevenue.toLocaleString('ru-RU')} ₽
                </div>
              </div>

              {/* Расходы */}
              <div className="financial-block">
                <div className="financial-header">
                  <h4>Расходы</h4>
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => addFinancialItem('costs')}
                  >
                    + Добавить расход
                  </button>
                </div>
                
                {financialData.costs.map((cost, index) => (
                  <div key={index} className="financial-item">
                    <input
                      type="text"
                      placeholder="Наименование расхода"
                      value={cost.name}
                      onChange={(e) => handleFinancialChange('costs', index, 'name', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Сумма"
                      value={cost.amount}
                      onChange={(e) => handleFinancialChange('costs', index, 'amount', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="date"
                      value={cost.date}
                      onChange={(e) => handleFinancialChange('costs', index, 'date', e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFinancialItem('costs', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <div className="financial-total">
                  Общая сумма затрат: {financialData.totalCosts.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
          )}

          {/* Дополнительные опции */}
          <div className="form-section">
            <h3>Дополнительные опции</h3>
            
            <div className="switch-group">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.isIndustrySolution}
                  onChange={(e) => handleInputChange('isIndustrySolution', e.target.checked)}
                />
                <span className="slider"></span>
                Отраслевое решение
              </label>
            </div>

            {formData.isIndustrySolution && (
              <div className="form-row">
                <div className="form-group">
                  <label>Отраслевой менеджер</label>
                  <input
                    type="text"
                    value={formData.industryManager}
                    onChange={(e) => handleInputChange('industryManager', e.target.value)}
                    placeholder="Введите ФИО менеджера"
                  />
                </div>
                <div className="form-group">
                  <label>Номер проекта</label>
                  <input
                    type="text"
                    value={formData.projectNumber}
                    onChange={(e) => handleInputChange('projectNumber', e.target.value)}
                    placeholder="Введите номер проекта"
                  />
                </div>
              </div>
            )}

            <div className="switch-group">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.isForecastAccepted}
                  onChange={(e) => handleInputChange('isForecastAccepted', e.target.checked)}
                />
                <span className="slider"></span>
                Принимаемый к прогнозу
              </label>
            </div>

            {formData.isForecastAccepted && (
              <div className="form-group">
                <label>Принимаемый к оценке</label>
                <select
                  value={formData.forecastEvaluation}
                  onChange={(e) => handleInputChange('forecastEvaluation', e.target.value)}
                >
                  <option value="">Выберите оценку</option>
                  <option value="high">Высокая</option>
                  <option value="medium">Средняя</option>
                  <option value="low">Низкая</option>
                </select>
              </div>
            )}

            <div className="switch-group">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.viaDzo}
                  onChange={(e) => handleInputChange('viaDzo', e.target.checked)}
                />
                <span className="slider"></span>
                Реализация через ДЗО
              </label>
            </div>

            <div className="switch-group">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.managementControl}
                  onChange={(e) => handleInputChange('managementControl', e.target.checked)}
                />
                <span className="slider"></span>
                Требуется контроль статуса на уровне руководства
              </label>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="form-section">
            <h3>Дополнительная информация</h3>
            
            <div className="form-group">
              <label>Текущий статус по проекту</label>
              <textarea
                rows={4}
                value={formData.currentStatus}
                onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                placeholder="Опишите текущий статус проекта"
                maxLength={1000}
              />
              <div className="char-count">{formData.currentStatus.length}/1000</div>
            </div>

            <div className="form-group">
              <label>Что сделано за период</label>
              <textarea
                rows={4}
                value={formData.completedWork}
                onChange={(e) => handleInputChange('completedWork', e.target.value)}
                placeholder="Опишите выполненную работу"
                maxLength={1000}
              />
              <div className="char-count">{formData.completedWork.length}/1000</div>
            </div>

            <div className="form-group">
              <label>Планы на следующий период</label>
              <textarea
                rows={4}
                value={formData.futurePlans}
                onChange={(e) => handleInputChange('futurePlans', e.target.value)}
                placeholder="Опишите планы на следующий период"
                maxLength={1000}
              />
              <div className="char-count">{formData.futurePlans.length}/1000</div>
            </div>

            <div className="form-group">
              <label>Комментарий (системное поле)</label>
              <textarea
                rows={3}
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                placeholder="Системные комментарии"
                disabled
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;