import { IGameEntity } from "./GameEntity";

class GameDto {
    static validateName(name: string): boolean {
        return typeof name === 'string' && name.trim() !== '';
    }

    static validateDescription(description: string): boolean {
        return typeof description === 'string' && description.trim() !== '';
    }

    static validateImageUrl(imageUrl: string): boolean {
        return typeof imageUrl === 'string' && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(imageUrl);
    }

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }

    static validateGenre(genre: string): boolean {
        return typeof genre === 'string' && genre.trim() !== '';
    }

    static validateReleaseDate(releaseDate: Date | string): boolean {
        if (typeof releaseDate === 'string') {
            releaseDate = new Date(releaseDate);
        }
        return releaseDate instanceof Date && !isNaN(releaseDate.getTime());
    }

    static validateCategories(categories: { id: string }[]): boolean {
        if (!categories || !Array.isArray(categories) || categories.length === 0) return false;
        return categories.every(category => typeof category.id === 'string' && category.id.trim() !== '');
    }
}

export class GameRegisterDto implements IGameEntity {
    name: string;
    genre: string;
    description: string;
    userId: string;
    releaseDate: Date;
    imageUrl: string;
    categories: { id: string }[];

    constructor(
        name: string,
        genre: string,
        description: string,
        userId: string,
        releaseDate: Date | string,
        imageUrl: string,
        categories: { id: string }[]
    ) {
        this.name = name;
        this.genre = genre;
        this.description = description;
        this.userId = userId;
        this.releaseDate = typeof releaseDate === 'string' ? new Date(releaseDate) : releaseDate;
        this.imageUrl = imageUrl;
        this.categories = categories;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!GameDto.validateName(this.name)) {
            errors.push('Invalid game name');
        }

        if (!GameDto.validateGenre(this.genre)) {
            errors.push('Invalid genre');
        }

        if (!GameDto.validateDescription(this.description)) {
            errors.push('Invalid game description');
        }

        if (!GameDto.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!GameDto.validateReleaseDate(this.releaseDate)) {
            errors.push('Invalid release date');
        }

        if (!GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        if (this.categories && !GameDto.validateCategories(this.categories)) {
            errors.push('Invalid categories');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        return {
            name: this.name,
            genre: this.genre,
            description: this.description,
            userId: this.userId,
            releaseDate: this.releaseDate,
            imageUrl: this.imageUrl,
            categories: this.categories
        };
    }
}

export class GameUpdateDto implements Partial<IGameEntity> {
    name?: string;
    genre?: string;
    description?: string;
    releaseDate?: Date;
    imageUrl?: string;
    categories?: { id: string }[];

    constructor(
        name?: string,
        genre?: string,
        description?: string,
        releaseDate?: Date | string,
        imageUrl?: string,
        categories?: { id: string }[]
    ) {
        if (name !== undefined) this.name = name;
        if (genre !== undefined) this.genre = genre;
        if (description !== undefined) this.description = description;
        if (releaseDate !== undefined) {
            this.releaseDate = typeof releaseDate === 'string' ? new Date(releaseDate) : releaseDate;
        }
        if (imageUrl !== undefined) this.imageUrl = imageUrl;
        if (categories !== undefined) this.categories = categories;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (this.name !== undefined && !GameDto.validateName(this.name)) {
            errors.push('Invalid game name');
        }

        if (this.genre !== undefined && !GameDto.validateGenre(this.genre)) {
            errors.push('Invalid genre');
        }

        if (this.description !== undefined && !GameDto.validateDescription(this.description)) {
            errors.push('Invalid game description');
        }

        if (this.releaseDate !== undefined && !GameDto.validateReleaseDate(this.releaseDate)) {
            errors.push('Invalid release date');
        }

        if (this.imageUrl !== undefined && !GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        if (this.categories !== undefined && !GameDto.validateCategories(this.categories)) {
            errors.push('Invalid categories');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        const result: Partial<IGameEntity> = {};
        
        if (this.name !== undefined) result.name = this.name;
        if (this.genre !== undefined) result.genre = this.genre;
        if (this.description !== undefined) result.description = this.description;
        if (this.releaseDate !== undefined) result.releaseDate = this.releaseDate;
        if (this.imageUrl !== undefined) result.imageUrl = this.imageUrl;
        if (this.categories !== undefined) result.categories = this.categories;
        
        return result;
    }
}