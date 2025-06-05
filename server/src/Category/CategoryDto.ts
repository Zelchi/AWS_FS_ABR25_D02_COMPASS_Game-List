import { ICategoryEntity } from './CategoryEntity';

class CategoryDto {
    static validateName(name: string): boolean {
        return typeof name === 'string' && name.trim() !== '';
    }

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }
}

export class CategoryRegisterDto implements ICategoryEntity {
    name: string;
    userId: string;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!CategoryDto.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!CategoryDto.validateName(this.name)) {
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

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (this.name !== undefined && !CategoryDto.validateName(this.name)) {
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