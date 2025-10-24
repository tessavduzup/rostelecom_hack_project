import React from 'react';
import { Link } from 'react-router-dom';

function Registration() {
    return (
        <div>
            <h1>Регистрация</h1>
            <p>Страница регистрации</p>
            <Link to="/login">Уже есть аккаунт? Войти</Link>
        </div>
    )
}

export default Registration;