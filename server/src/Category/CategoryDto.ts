import { ICategoryEntity } from './CategoryEntity';

class CategoryDto {
    static validateTitle(title: string): boolean {
        return typeof title === 'string' && title.trim() !== '';
    }

    static validateDescription(description: string): boolean {
        return typeof description === 'string' && description.trim() !== '';
    }

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }
}

export class CategoryRegisterDto implements ICategoryEntity {
    title: string;
    description: string;
    userId: string;

    constructor(title: string, description: string, userId: string) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!CategoryDto.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!CategoryDto.validateTitle(this.title)) {
            errors.push('Invalid category title');
        }

        if (!CategoryDto.validateDescription(this.userId)) {
            errors.push('Invalid description');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        return {
            title: this.title,
            userId: this.userId,
            description: this.description
        };
    }
}

export class CategoryUpdateDto implements Partial<ICategoryEntity> {
    title?: string;
    description?: string;

    constructor(title?: string, description?: string) {
        if (title !== undefined) this.title = title;
        if (description !== undefined) this.description = description;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (this.title !== undefined && !CategoryDto.validateTitle(this.title)) {
            errors.push('Invalid category title');
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

        if (this.title !== undefined) result.title = this.title;
        if (this.description !== undefined) result.description = this.description;

        return result;
    }
}