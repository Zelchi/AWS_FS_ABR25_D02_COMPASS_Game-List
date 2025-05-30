import { ICategoryEntity } from './CategoryEntity';

class CategoryDto {
    static validateName(name: string): boolean {
        return typeof name === 'string' && name.trim() !== '';
    }

    static validateDescription(description: string): boolean {
        return typeof description === 'string' && description.trim() !== '';
    }

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }
}

export class CategoryRegisterDto implements ICategoryEntity {
    name: string;
    description: string;
    userId: string;

    constructor(name: string, description: string, userId: string) {
        this.name = name;
        this.description = description;
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

        if (!CategoryDto.validateDescription(this.description)) {
            errors.push('Invalid description');
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
            description: this.description
        };
    }
}

export class CategoryUpdateDto implements Partial<ICategoryEntity> {
    name?: string;
    description?: string;

    constructor(name?: string, description?: string) {
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (this.name !== undefined && !CategoryDto.validateName(this.name)) {
            errors.push('Invalid category name');
        }

        if (this.description !== undefined && !CategoryDto.validateDescription(this.description)) {
            errors.push('Invalid description');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        const result: Partial<ICategoryEntity> = {};

        if (this.name !== undefined) result.name = this.name;
        if (this.description !== undefined) result.description = this.description;

        return result;
    }
}