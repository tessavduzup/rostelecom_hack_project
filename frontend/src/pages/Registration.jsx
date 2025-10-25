import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword, validateFIO } from '../utils/validators';

function Registration() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Имя:</h3>
                <input
                    type="text"
                    {...register("first_name", {
                        required: "Имя обязательно",
                        validate: validateFIO
                    })}
                />
                {errors.first_name && <p className="errors">{errors.first_name.message}</p>}

                <h3>Фамилия:</h3>
                <input
                    type="text"
                    {...register("last_name", {
                        required: "Фамилия обязательна",
                        validate: validateFIO
                    })}
                />
                {errors.last_name && <p className="errors">{errors.last_name.message}</p>}
                
                <h3>Отчество:</h3>
                <input
                    type="text"
                    {...register("middle_name", {
                        required: "Отчество обязательно",
                        validate: validateFIO
                    })}
                />
                {errors.middle_name && <p className="errors">{errors.middle_name.message}</p>}
                
                <h3>Почта:</h3>
                <input
                    type="email"
                    {...register("email", {
                        required: "Почта обязательна",
                        validate: validateEmail
                    })}
                />
                {errors.email && <p className="errors">{errors.email.message}</p>}
                
                <h3>Пароль:</h3>
                <input
                    type="password"
                    {...register("password", {
                        required: "Пароль обязателен",
                        validate: validatePassword
                    })}
                />
                {errors.password && <p className="errors">{errors.password.message}</p>}
                <h3><button type='submit'>Зарегистрироваться</button></h3>
            </form>
            <h3>Уже есть аккаунт?</h3>
            <Link to="/login">Войти</Link>
        </div>
    )
}

export default Registration;