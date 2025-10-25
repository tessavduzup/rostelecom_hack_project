import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '../utils/validators';

import './../styles/Login.css'

function Login() {
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
      alert(JSON.stringify(data))
  }

  return (
    <>
      <div className='Login'>
        <h1>Авторизация</h1>
        <form onSubmit={handleSubmit(onSubmit)} >
          <h3>Имя пользователя</h3>
          <input
            type="text" className='sign'
            {...register("username", {
              required: "Имя пользователя обязательно",
              validate: validateEmail
            })}
          />
          {errors.username && <p className="errors">{errors.username.message}</p>}
          
          <h3>Пароль</h3>
          <input
            type="password" className='sign'
            {...register("password", {
              required: "Пароль обязателен",
              validate: validatePassword
            })}
          />
          {errors.password && <p className="errors">{errors.password.message}</p>}

          <h3><button type='submit'>Войти</button></h3>
        </form>
        <h4>Нет аккаунта?</h4>
        <Link to='/reg' className='link'>Зарегистрироваться</Link>
      </div>
    </>
  )
}

export default Login