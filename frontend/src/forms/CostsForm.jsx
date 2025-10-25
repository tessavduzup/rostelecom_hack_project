import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateNumber, validateDate } from '../utils/validators';
import { loginUser } from '../api/authAPI';
import '../styles/forms.css';

function CostsForm() {
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const all_changelog = "Все изменения"

  const categories = [
    { value: '', label: 'Выберите категорию' },
    { value: 'product_sales', label: 'Продажа товаров' },
    { value: 'services', label: 'Услуги' },
    { value: 'subscriptions', label: 'Подписки' },
    { value: 'other', label: 'Прочее' }
  ];

  
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const onSubmit = async (data) => {
      try {
        if (new Date(data.date_start) > new Date(data.date_end)){
          throw new Error('Дата начала не может быть позже даты окончания')
        }
        
        setSubmitError('')
        setSubmitSuccess('')

        setSubmitSuccess('Затраты успешно добавлены!')
      } catch (error) {
        setSubmitError(error.message || 'Затраты не получилось добавить!')
      }
  }

  return (
    <>
      <div>
        <h1 className='label'>Добавление затрат</h1>

        {submitSuccess && <div className='submitSuccess'>{submitSuccess}</div>}
        {submitError && <div className='submitErrors'>{submitError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Дата начала</h3>
          <input
            type="date"
            {...register("date_start", {
              required: "Дата начала обязательна",
              validate: validateDate
            })}
          />
          {errors.date_start && <p className="errors">{errors.date_start.message}</p>}
          
          <h3>Дата окончания</h3>
          <input
            type="date"
            {...register("date_end", {
              required: "Дата окончания обязательна",
              validate: validateDate
            })}
          />
          {errors.date_end && <p className="errors">{errors.date_end.message}</p>}

          <h3>Сумма</h3>
          <input
            type="text"
            {...register("amount", {
              required: "Сумма должна быть введена",
              validate: validateNumber
            })}
          />
          {errors.amount && <p className="errors">{errors.amount.message}</p>}

          <h3>Вид затрат</h3>
          <select
            {...register("category", {
              required: "Выберите категорию"
            })}
          >
          {categories.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
            ))}
          </select>

          <h3>Статус отражения затрат</h3>
          <select
            {...register("category", {
              required: "Выберите категорию"
            })}
          >
          {categories.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
            ))}
          </select>

          <h3><button type='submit'>Добавить</button></h3>
          <h3><button type='reset'>Отмена</button></h3>
        </form>
        <div>{all_changelog}</div>
      </div>
    </>
  )
}


export default CostsForm;
