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

    static validateStatus(status: string): boolean {
        return typeof status === 'string' && ["playing", "done", "abandoned"].includes(status);
    }

    static validateFavorite(favorite: boolean): boolean {
        return typeof favorite === 'boolean';
    }

    static validateAcquisDate(acquisDate: Date | string): boolean {
        if (typeof acquisDate === 'string') {
            acquisDate = new Date(acquisDate);
        }
        return acquisDate instanceof Date && !isNaN(acquisDate.getTime());
    }

    static validateFinishDate(finishDate: Date | string | null | undefined): boolean {
        if (!finishDate) return true;
        if (typeof finishDate === 'string') {
            finishDate = new Date(finishDate);
        }
        return finishDate instanceof Date && !isNaN(finishDate.getTime());
    }

    static validateCategories(categories?: { id: string }[] | null): boolean {
        if (!categories || !Array.isArray(categories)) return true;
        return categories.every(category => typeof category.id === 'string' && category.id.trim() !== '');
    }

    static validatePlatforms(platforms?: { id: string }[] | null): boolean {
        if (!platforms || platforms.length === 0) return true;

        return platforms.every(platform => typeof platform.id === 'string' && platform.id.trim() !== '');
    }

    static validateRating(rating?: number): boolean {
        if (rating === undefined) return true;
        return typeof rating === 'number' && Number.isInteger(rating) && rating >= 0 && rating <= 5;
    }

    static validatePrice(price?: number): boolean {
        if (price === undefined) return true;
        return typeof price === 'number' && Number.isInteger(price) && price >= 0;
    }
}

export class GameRegisterDto implements IGameEntity {
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
    status: string;
    favorite: boolean;
    rating: number;
    price: number;
    acquisDate: Date;
    finishDate?: Date;
    categories: { id: string }[] = [];
    platforms: { id: string }[] = [];

    constructor(
        userId: string,
        name: string,
        description: string,
        imageUrl: string,
        acquisDate: Date | string,
        categories?: { id: string }[],
        platforms?: { id: string }[],
        status: string = 'none',
        favorite: boolean = false,
        rating: number = 0,
        price: number = 0,
        finishDate?: Date | string
    ) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.status = status;
        this.favorite = favorite;
        this.rating = rating;
        this.price = price;
        this.acquisDate = typeof acquisDate === 'string' ? new Date(acquisDate) : acquisDate;
        this.finishDate = typeof finishDate === 'string' ? new Date(finishDate) : finishDate;
        this.categories = categories || [];
        this.platforms = platforms || [];
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!GameDto.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!GameDto.validateName(this.name)) {
            errors.push('Invalid game name');
        }

        if (!GameDto.validateDescription(this.description)) {
            errors.push('Invalid game description');
        }

        if (!GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        if (!GameDto.validateStatus(this.status)) {
            errors.push('Invalid game status');
        }

        if (!GameDto.validateFavorite(this.favorite)) {
            errors.push('Invalid favorite value');
        }

        if (!GameDto.validateAcquisDate(this.acquisDate)) {
            errors.push('Invalid acquisition date');
        }

        if (!GameDto.validateFinishDate(this.finishDate)) {
            errors.push('Invalid finish date');
        }

        if (!GameDto.validateCategories(this.categories)) {
            errors.push('Invalid categories');
        }

        if (!GameDto.validatePlatforms(this.platforms)) {
            errors.push('Invalid platforms');
        }

        if (!GameDto.validatePrice(this.price)) {
            errors.push('Price must be a non-negative integer');
        }

        if (!GameDto.validateRating(this.rating)) {
            errors.push('Rating must be an integer between 0 and 5');
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
            description: this.description,
            imageUrl: this.imageUrl,
            status: this.status,
            favorite: this.favorite,
            rating: this.rating,
            price: this.price,
            acquisDate: this.acquisDate,
            finishDate: this.finishDate,
            categories: this.categories,
            platforms: this.platforms
        };
    }
}

export class GameUpdateDto implements Partial<IGameEntity> {
    name?: string;
    description?: string;
    imageUrl?: string;
    status?: string;
    favorite?: boolean;
    rating?: number;
    price?: number;
    acquisDate?: Date;
    finishDate?: Date | null;
    categories?: { id: string }[];
    platforms?: { id: string }[];

    constructor(
        name?: string,
        description?: string,
        imageUrl?: string,
        status?: string,
        favorite?: boolean,
        acquisDate?: Date | string,
        finishDate?: Date | string | null,
        categories?: { id: string }[],
        platforms?: { id: string }[],
        rating?: number,
        price?: number
    ) {
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
        if (imageUrl !== undefined) this.imageUrl = imageUrl;
        if (status !== undefined) this.status = status;
        if (favorite !== undefined) this.favorite = favorite;
        if (rating !== undefined) this.rating = rating;
        if (price !== undefined) this.price = price;
        if (acquisDate !== undefined) {
            this.acquisDate = typeof acquisDate === 'string' ? new Date(acquisDate) : acquisDate;
        }
        if (finishDate !== undefined) {
            this.finishDate = finishDate === null ? null :
                typeof finishDate === 'string' ? new Date(finishDate) : finishDate;
        }
        if (categories !== undefined) this.categories = categories;
        if (platforms !== undefined) this.platforms = platforms;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (this.name !== undefined && !GameDto.validateName(this.name)) {
            errors.push('Invalid game name');
        }

        if (this.description !== undefined && !GameDto.validateDescription(this.description)) {
            errors.push('Invalid game description');
        }

        if (this.imageUrl !== undefined && !GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        if (this.status !== undefined && !GameDto.validateStatus(this.status)) {
            errors.push('Invalid game status');
        }

        if (this.favorite !== undefined && !GameDto.validateFavorite(this.favorite)) {
            errors.push('Invalid favorite value');
        }

        if (this.acquisDate !== undefined && !GameDto.validateAcquisDate(this.acquisDate)) {
            errors.push('Invalid acquisition date');
        }

        if (this.finishDate !== undefined && !GameDto.validateFinishDate(this.finishDate)) {
            errors.push('Invalid finish date');
        }

        if (this.categories !== undefined && !GameDto.validateCategories(this.categories)) {
            errors.push('Invalid categories');
        }

        if (this.platforms !== undefined && !GameDto.validatePlatforms(this.platforms)) {
            errors.push('Invalid platforms');
        }

        if (this.price !== undefined && !GameDto.validatePrice(this.price)) {
            errors.push('Price must be a non-negative integer');
        }

        if (this.rating !== undefined && !GameDto.validateRating(this.rating)) {
            errors.push('Rating must be an integer between 0 and 5');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    public data() {
        const result: Partial<IGameEntity> = {};

        if (this.name !== undefined) result.name = this.name;
        if (this.description !== undefined) result.description = this.description;
        if (this.imageUrl !== undefined) result.imageUrl = this.imageUrl;
        if (this.status !== undefined) result.status = this.status;
        if (this.favorite !== undefined) result.favorite = this.favorite;
        if (this.rating !== undefined) result.rating = this.rating;
        if (this.price !== undefined) result.price = this.price;
        if (this.acquisDate !== undefined) result.acquisDate = this.acquisDate;
        if (this.finishDate !== undefined) result.finishDate = this.finishDate;
        if (this.categories !== undefined) result.categories = this.categories;
        if (this.platforms !== undefined) result.platforms = this.platforms;

        return result;
    }
}