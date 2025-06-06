import { ValidationResult, ValidationUtils } from '../../utils/validation';

export class AccountDto {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    static validateName(name: string): boolean {
        if (!name) return false;
        return name.trim().length >= 3;
    }
}

export class AccountLoginDto {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    isValid(): ValidationResult {
        const errors: string[] = [];

        if (!ValidationUtils.validateEmail(this.email)) {
            errors.push('Invalid email format');
        }

        if (!ValidationUtils.validatePassword(this.password)) {
            errors.push('Invalid password format');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

export class AccountRegisterDto {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    isValid(): ValidationResult {
        const errors: string[] = [];

        if (!ValidationUtils.validateName(this.name) || this.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters');
        }

        if (!ValidationUtils.validateEmail(this.email)) {
            errors.push('Invalid email format');
        }

        if (!ValidationUtils.validatePassword(this.password)) {
            errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}