import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword, validateFIO } from '../utils/validators';
import { registerUser } from '../api/authAPI';
import '../styles/Registration.css';

function Registration() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const onSubmit = async (data) => {
        try {
            setSubmitError('');
            setSubmitSuccess('');

            if (data.password !== data.second_password){
                throw new Error("Пароли должны совпадать!")
            }
            
            const userData = await registerUser({
                firstName: data.first_name,
                lastName: data.last_name,
                middleName: data.middle_name,
                email: data.email,
                password: data.password
            });
            
            setSubmitSuccess('Регистрация прошла успешно!');

            if (userData.token){
                localStorage.setItem('token', userData.token);
                localStorage.setItem('user', JSON.stringify(userData.user));
            }
        } catch (error){
            setSubmitError(error.message || 'Ошибка при регистрации');
        }
    }

    return (
        <div className='main_container'>
            <h1>Регистрация</h1>

            {submitSuccess && <div className='submitSuccess'>{submitSuccess}</div>}
            {submitError && <div className='submitErrors'>{submitError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} id='registrationForm'>
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

                <h3>Повторите пароль:</h3>
                <input
                    type="password"
                    {...register("second_password", {
                        required: "Введите пароль ещё раз",
                        validate: validatePassword
                    })}
                />
                {errors.second_password && <p className="errors">{errors.second_password.message}</p>}
                
                <h3><button type='submit'>Зарегистрироваться</button></h3>
            </form>
            <div className='no_wrap'>
                <h4>Уже есть аккаунт?</h4>
                <Link to="/login">Войти</Link>
            </div>
            
        </div>
    )
}

export default Registration;