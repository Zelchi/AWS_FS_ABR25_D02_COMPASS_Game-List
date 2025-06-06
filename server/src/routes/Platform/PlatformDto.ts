import { IPlatformEntity } from './PlatformEntity';
import { ValidationResult, ValidationUtils } from '../../utils/validation';

export class PlatformRegisterDto implements IPlatformEntity {
    userId: string;
    name: string;
    company: string;
    imageUrl: string;

    constructor(
        userId: string,
        name: string,
        company: string,
        imageUrl: string
    ) {
        this.userId = userId;
        this.name = name;
        this.company = company;
        this.imageUrl = imageUrl;
    }

    public isValid(): ValidationResult {
        const errors: string[] = [];

        if (!ValidationUtils.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!ValidationUtils.validateName(this.name)) {
            errors.push('Invalid platform name');
        }

        if (!ValidationUtils.validateCompany(this.company)) {
            errors.push('Invalid company name');
        }

        if (!ValidationUtils.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        return {
            userId: this.userId,
            name: this.name,
            company: this.company,
            imageUrl: this.imageUrl
        };
    }
}

export class PlatformUpdateDto implements Partial<IPlatformEntity> {
    name?: string;
    company?: string;
    imageUrl?: string;

    constructor(
        name?: string,
        company?: string,
        imageUrl?: string
    ) {
        if (name !== undefined) this.name = name;
        if (company !== undefined) this.company = company;
        if (imageUrl !== undefined) this.imageUrl = imageUrl;
    }

    public isValid(): ValidationResult {
        const errors: string[] = [];

        if (this.name !== undefined && !ValidationUtils.validateName(this.name)) {
            errors.push('Invalid platform name');
        }

        if (this.company !== undefined && !ValidationUtils.validateCompany(this.company)) {
            errors.push('Invalid company name');
        }

        if (this.imageUrl !== undefined && !ValidationUtils.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        const result: Partial<IPlatformEntity> = {};

        if (this.name !== undefined) result.name = this.name;
        if (this.company !== undefined) result.company = this.company;
        if (this.imageUrl !== undefined) result.imageUrl = this.imageUrl;

        return result;
    }
}