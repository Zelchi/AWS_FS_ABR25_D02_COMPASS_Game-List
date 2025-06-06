import { ICategoryEntity } from './CategoryEntity';
import { ValidationResult, ValidationUtils } from '../../utils/validation';

export class CategoryRegisterDto implements ICategoryEntity {
    name: string;
    userId: string;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId;
    }

    public isValid(): ValidationResult {
        const errors: string[] = [];

        if (!ValidationUtils.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!ValidationUtils.validateName(this.name)) {
            errors.push('Invalid category name');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        return {
            name: this.name,
            userId: this.userId,
        };
    }
}

export class CategoryUpdateDto implements Partial<ICategoryEntity> {
    name?: string;

    constructor(name?: string) {
        if (name !== undefined) this.name = name;
    }

    public isValid(): ValidationResult {
        const errors: string[] = [];

        if (this.name !== undefined && !ValidationUtils.validateName(this.name)) {
            errors.push('Invalid category name');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        const result: Partial<ICategoryEntity> = {};

        if (this.name !== undefined) result.name = this.name;

        return result;
    }
}