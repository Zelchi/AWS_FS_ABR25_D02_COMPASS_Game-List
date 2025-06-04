import { IPlatformEntity } from './PlatformEntity';

class PlatformDto {
    static validateName(name: string): boolean {
        return typeof name === 'string' && name.trim() !== '';
    }

    static validateCompany(company: string): boolean {
        return typeof company === 'string' && company.trim() !== '';
    }

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }

    static validateImageUrl(imageUrl: string): boolean {
        if (!imageUrl || imageUrl === undefined || imageUrl === null) return true;

        try {
            const url = new URL(imageUrl);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }
}

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

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!PlatformDto.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!PlatformDto.validateName(this.name)) {
            errors.push('Invalid platform name');
        }

        if (!PlatformDto.validateCompany(this.company)) {
            errors.push('Invalid company name');
        }

        if (!PlatformDto.validateImageUrl(this.imageUrl)) {
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

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (this.name !== undefined && !PlatformDto.validateName(this.name)) {
            errors.push('Invalid platform name');
        }

        if (this.company !== undefined && !PlatformDto.validateCompany(this.company)) {
            errors.push('Invalid company name');
        }

        if (this.imageUrl !== undefined && !PlatformDto.validateImageUrl(this.imageUrl)) {
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