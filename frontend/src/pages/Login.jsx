import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Форма отправлена')
    }

  return (
    <>
      <div>
        <h1>Авторизация</h1>
        <form onSubmit={handleSubmit}>
          <h3>Имя пользователя</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h3>Пароль</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Отправить</button>
        </form>
        <h4>Нет аккаунта?</h4>
        <Link to='/reg'>Зарегистрироваться</Link>
      </div>
    </>
  )
}

export default Login