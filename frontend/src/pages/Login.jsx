import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '../utils/validators';
import { loginUser } from '../api/authAPI';
import '../styles/Login.css';


function Login() {
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const onSubmit = async (data) => {
      try {
        setSubmitError('')
        setSubmitSuccess('')

        const userData = await loginUser(data.username, data.password)

        localStorage.setItem('token', userData.token)
        localStorage.setItem('user', JSON.stringify(userData.user))

        setSubmitSuccess('Вход успешно выполнен!')
      } catch (error) {
        setSubmitError(error.message || 'Ошибка при входе')
      }
  }

  return (
    <>
      <div>
        <h1>Авторизация</h1>

        {submitSuccess && <div className='submitSuccess'>{submitSuccess}</div>}
        {submitError && <div className='submitErrors'>{submitError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Имя пользователя</h3>
          <input
            type="text"
            {...register("username", {
              required: "Имя пользователя обязательно",
              validate: validateEmail
            })}
          />
          {errors.username && <p className="errors">{errors.username.message}</p>}
          
          <h3>Пароль</h3>
          <input
            type="password"
            {...register("password", {
              required: "Пароль обязателен",
              validate: validatePassword
            })}
          />
          {errors.password && <p className="errors">{errors.password.message}</p>}

          <h3><button type='submit'>Войти</button></h3>
        </form>
        <h4>Нет аккаунта?</h4>
        <Link to='/reg'>Зарегистрироваться</Link>
      </div>
    </>
  )
}

export default Login