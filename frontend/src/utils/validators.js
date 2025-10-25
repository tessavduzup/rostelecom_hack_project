export const validatePassword = (value) => {
    if (value.length < 8) {
        return 'Пароль должен быть минимум 8 символов';
    } else if (!/[A-Z]/.test(value)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
    } else if (!/[a-z]/.test(value)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    } else if (!/[0-9]/.test(value)) {
        return 'Пароль должен содержать хотя бы одну цифру';
    }
    return true;
};

export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Введите корректный email адрес';
    }
    return true;
};

export const validateFIO = (value) => {
    if (value.length < 2) {
        return 'Минимум 2 символа';
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        return 'Может содержать только буквы, пробелы и дефисы';
    }
    return true;
};

export default {
    validatePassword,
    validateEmail,
    validateFIO,
};