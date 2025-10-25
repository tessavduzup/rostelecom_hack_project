import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Switch,
  Divider,
  message,
  Space,
  Tag
} from 'antd';
import {
  SaveOutlined,
  CloseOutlined,
  DeleteOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const CreateProject = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isIndustrySolution, setIsIndustrySolution] = useState(false);
  const [isForecastAccepted, setIsForecastAccepted] = useState(false);

  // Mock данные для селектов (в реальном приложении будут с бэкенда)
  const services = [
    { id: 1, name: 'Разработка ПО' },
    { id: 2, name: 'Технический консалтинг' },
    { id: 3, name: 'Облачные решения' },
    { id: 4, name: 'Кибербезопасность' }
  ];

  const paymentTypes = [
    { id: 1, name: 'Единовременный платеж' },
    { id: 2, name: 'Этапная оплата' },
    { id: 3, name: 'Постоплата' },
    { id: 4, name: 'Аванс + постоплата' }
  ];

  const statuses = [
    { id: 1, name: 'Лид', probability: 10 },
    { id: 2, name: 'Квалификация', probability: 25 },
    { id: 3, name: 'Коммерческое предложение', probability: 50 },
    { id: 4, name: 'Переговоры', probability: 75 },
    { id: 5, name: 'Договор', probability: 90 },
    { id: 6, name: 'Реализация', probability: 100 }
  ];

  const managers = [
    { id: 1, name: 'Иванов А.В.' },
    { id: 2, name: 'Петрова С.И.' },
    { id: 3, name: 'Сидоров К.П.' }
  ];

  const segments = [
    { id: 1, name: 'Корпоративный' },
    { id: 2, name: 'Средний бизнес' },
    { id: 3, name: 'Малый бизнес' },
    { id: 4, name: 'Госучреждения' }
  ];

  // Обработчик изменения статуса
  const handleStatusChange = (statusId) => {
    const selectedStatus = statuses.find(s => s.id === statusId);
    if (selectedStatus) {
      form.setFieldValue('probability', selectedStatus.probability);
    }
  };

  // Отправка формы
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Формируем данные для отправки
      const projectData = {
        ...values,
        createdDate: new Date().toISOString(),
        isIndustrySolution,
        isForecastAccepted
      };

      console.log('Отправляем данные:', projectData);

      // TODO: Заменить на реальный API вызов
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        message.success('Проект успешно создан!');
        navigate('/user'); // Возвращаемся на страницу пользователя
      } else {
        throw new Error('Ошибка при создании проекта');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      message.error('Не удалось создать проект');
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate('/user');
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        {/* Заголовок и кнопки действий */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={onCancel}
            >
              Назад
            </Button>
            <h1 style={{ margin: 0 }}>Создание нового проекта</h1>
          </div>
          <Space>
            <Button 
              icon={<DeleteOutlined />} 
              danger
              onClick={onCancel}
            >
              Удалить
            </Button>
            <Button 
              icon={<CloseOutlined />} 
              onClick={onCancel}
            >
              Отмена
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              loading={loading}
              onClick={() => form.submit()}
            >
              Сохранить
            </Button>
          </Space>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            probability: 10
          }}
        >
          {/* Основная информация */}
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                name="projectName"
                label="Название проекта"
                rules={[{ required: true, message: 'Введите название проекта' }]}
              >
                <Input placeholder="Введите название проекта" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="organizationName"
                label="Название организации"
                rules={[{ required: true, message: 'Введите название организации' }]}
              >
                <Input placeholder="Введите название организации" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                name="inn"
                label="ИНН организации"
                rules={[
                  { required: true, message: 'Введите ИНН' },
                  { pattern: /^\d{10,12}$/, message: 'ИНН должен содержать 10 или 12 цифр' }
                ]}
              >
                <Input placeholder="Введите ИНН" maxLength={12} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="service"
                label="Услуга"
                rules={[{ required: true, message: 'Выберите услугу' }]}
              >
                <Select placeholder="Выберите услугу" size="large">
                  {services.map(service => (
                    <Option key={service.id} value={service.id}>
                      {service.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                name="paymentType"
                label="Тип платежа"
                rules={[{ required: true, message: 'Выберите тип платежа' }]}
              >
                <Select placeholder="Выберите тип платежа">
                  {paymentTypes.map(type => (
                    <Option key={type.id} value={type.id}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Статус"
                rules={[{ required: true, message: 'Выберите статус' }]}
              >
                <Select 
                  placeholder="Выберите статус"
                  onChange={handleStatusChange}
                >
                  {statuses.map(status => (
                    <Option key={status.id} value={status.id}>
                      {status.name} ({status.probability}%)
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                name="probability"
                label="Вероятность реализации (%)"
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="manager"
                label="Назначенный менеджер"
                rules={[{ required: true, message: 'Выберите менеджера' }]}
              >
                <Select placeholder="Выберите менеджера">
                  {managers.map(manager => (
                    <Option key={manager.id} value={manager.id}>
                      {manager.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                name="segment"
                label="Сегмент бизнеса"
                rules={[{ required: true, message: 'Выберите сегмент' }]}
              >
                <Select placeholder="Выберите сегмент">
                  {segments.map(segment => (
                    <Option key={segment.id} value={segment.id}>
                      {segment.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Финансовая информация */}
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Card size="small" title="Общая сумма выручки" extra={<Tag color="green"><Link to="/r"><Button>+ Добавить</Button></Link></Tag>}>
                <Form.Item name="revenue" initialValue={0}>
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    parser={value => value.replace(/₽\s?|(,*)/g, '')}
                    min={0}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" title="Общее количество затрат" extra={<Tag color="red"><Link to="/cr"><Button>+ Добавить</Button></Link></Tag>}>
                <Form.Item name="costs" initialValue={0}>
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    parser={value => value.replace(/₽\s?|(,*)/g, '')}
                    min={0}
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Divider />

          {/* Дополнительные опции */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Switch 
                      checked={isIndustrySolution} 
                      onChange={setIsIndustrySolution} 
                    />
                    <span>Отраслевое решение</span>
                  </div>
                  
                  {isIndustrySolution && (
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item name="industryManager" label="Отраслевой менеджер">
                          <Input placeholder="Введите ФИО менеджера" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="projectNumber" label="Номер проекта">
                          <Input placeholder="Введите номер проекта" />
                        </Form.Item>
                      </Col>
                    </Row>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Switch 
                      checked={isForecastAccepted} 
                      onChange={setIsForecastAccepted} 
                    />
                    <span>Принимаемый к прогнозу</span>
                  </div>

                  {isForecastAccepted && (
                    <Form.Item name="forecastEvaluation" label="Принимаемый к оценке">
                      <Select placeholder="Выберите оценку">
                        <Option value="high">Высокая</Option>
                        <Option value="medium">Средняя</Option>
                        <Option value="low">Низкая</Option>
                      </Select>
                    </Form.Item>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Form.Item name="viaDzo" valuePropName="checked" style={{ margin: 0 }}>
                      <Switch />
                    </Form.Item>
                    <span>Реализация через ДЗО</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Form.Item name="managementControl" valuePropName="checked" style={{ margin: 0 }}>
                      <Switch />
                    </Form.Item>
                    <span>Требуется контроль статуса на уровне руководства</span>
                  </div>
                </Space>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Дополнительная информация */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <h3>Доп. инфа по проекту</h3>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item name="currentStatus" label="Текущий статус по проекту">
                <TextArea 
                  rows={4} 
                  placeholder="Опишите текущий статус проекта"
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item name="completedWork" label="Что сделано за период">
                <TextArea 
                  rows={4} 
                  placeholder="Опишите выполненную работу"
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item name="futurePlans" label="Планы на следующий период">
                <TextArea 
                  rows={4} 
                  placeholder="Опишите планы на следующий период"
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item name="comments" label="Комментарий (системное поле)">
                <TextArea 
                  rows={3} 
                  placeholder="Системные комментарии"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProject;