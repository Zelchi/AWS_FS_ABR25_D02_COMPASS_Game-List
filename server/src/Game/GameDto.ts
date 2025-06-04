import { IGameEntity, IGameRegister } from "./GameEntity";

class GameDto {

    static validateName(name: string): boolean {
        return typeof name === 'string' && name.trim() !== '';
    }

    static validateDescription(description: string): boolean {
        return typeof description === 'string' && description.trim() !== '';
    }

    static validateImageUrl(imageUrl: string | undefined): boolean {
        if (!imageUrl || imageUrl.trim() === '' || imageUrl === undefined || imageUrl === null) return false;
        return typeof imageUrl === 'string' && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(imageUrl);
    }

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }

    static validateStatus(status: string): boolean {
        return typeof status === 'string' && ["playing", "done", "abandoned"].includes(status);
    }

    static validateFavorite(favorite: boolean | undefined): boolean {
        return favorite === undefined || typeof favorite === 'boolean';
    }

    static validateAcquisDate(acquisDate: Date | string | null | undefined): boolean {
        if (acquisDate === null || acquisDate === undefined) return true; 
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

    static validateReleaseDate(releaseDate: Date | string | null | undefined): boolean {
        if (!releaseDate) return true;
        if (typeof releaseDate === 'string') {
            releaseDate = new Date(releaseDate);
        }
        return releaseDate instanceof Date && !isNaN(releaseDate.getTime());
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
    id?: string;
    userId: string;
    name: string;
    description?: string;
    imageUrl?: string;
    price?: number = 0;
    status?: string = "playing";
    favorite?: boolean = false;
    rating?: number = 0;
    acquisDate?: Date | null;
    finishDate?: Date | null;
    releaseDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    categories?: { id: string }[] = [];
    platforms?: { id: string }[] = [];

    constructor(
        userId: string,
        name: string,
        description?: string,
        imageUrl?: string,
        price: number = 0,
        status: string = "playing",
        favorite: boolean = false,
        rating: number = 0,
        acquisDate?: Date | string | null,
        finishDate?: Date | string | null,
        releaseDate?: Date | string | null,
        categories?: { id: string }[],
        platforms?: { id: string }[],
        id?: string
    ) {
        this.userId = userId;
        this.name = name;
        this.description = description || '';
        this.imageUrl = imageUrl || '';
        this.price = price;
        this.status = status;
        this.favorite = favorite;
        this.rating = rating;
        this.acquisDate = acquisDate ? (typeof acquisDate === 'string' ? new Date(acquisDate) : acquisDate) : null;
        this.finishDate = finishDate ? (typeof finishDate === 'string' ? new Date(finishDate) : finishDate) : null;
        this.releaseDate = releaseDate ? (typeof releaseDate === 'string' ? new Date(releaseDate) : releaseDate) : null;
        this.categories = categories || [];
        this.platforms = platforms || [];
        if (id) this.id = id;
    }

    public isValid(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!GameDto.validateUserId(this.userId)) {
            errors.push('Invalid user ID');
        }

        if (!GameDto.validateName(this.name)) {
            errors.push('Invalid game name');
        }

        if (!GameDto.validateDescription(this.description ?? '')) {
            errors.push('Invalid game description');
        }

        if (!GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Invalid image URL format');
        }

        if (!GameDto.validateStatus(this.status ?? "playing")) {
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

        if (!GameDto.validateReleaseDate(this.releaseDate)) {
            errors.push('Invalid release date');
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

    public data(): IGameRegister {
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
            releaseDate: this.releaseDate,
            categories: this.categories,
            platforms: this.platforms
        };
    }
}

export class GameUpdateDto implements Partial<IGameEntity> {
    id?: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    status?: string;
    favorite?: boolean;
    rating?: number;
    acquisDate?: Date | null;
    finishDate?: Date | null;
    releaseDate?: Date | null;
    categories?: { id: string }[];
    platforms?: { id: string }[];

    constructor(
        name?: string,
        description?: string,
        imageUrl?: string,
        price?: number,
        status?: string,
        favorite?: boolean,
        rating?: number,
        acquisDate?: Date | string | null,
        finishDate?: Date | string | null,
        releaseDate?: Date | string | null,
        categories?: { id: string }[],
        platforms?: { id: string }[],
        id?: string
    ) {
        if (id !== undefined) this.id = id;
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
        if (imageUrl !== undefined) this.imageUrl = imageUrl;
        if (price !== undefined) this.price = price;
        if (status !== undefined) this.status = status;
        if (favorite !== undefined) this.favorite = favorite;
        if (rating !== undefined) this.rating = rating;
        
        if (acquisDate !== undefined) {
            this.acquisDate = acquisDate === null ? null :
                typeof acquisDate === 'string' ? new Date(acquisDate) : acquisDate;
        }

        if (finishDate !== undefined) {
            this.finishDate = finishDate === null ? null :
                typeof finishDate === 'string' ? new Date(finishDate) : finishDate;
        }

        if (releaseDate !== undefined) {
            this.releaseDate = releaseDate === null ? null :
                typeof releaseDate === 'string' ? new Date(releaseDate) : releaseDate;
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

        if (this.releaseDate !== undefined && !GameDto.validateReleaseDate(this.releaseDate)) {
            errors.push('Invalid release date');
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

        if (this.id !== undefined) result.id = this.id;
        if (this.name !== undefined) result.name = this.name;
        if (this.description !== undefined) result.description = this.description;
        if (this.imageUrl !== undefined) result.imageUrl = this.imageUrl;
        if (this.status !== undefined) result.status = this.status;
        if (this.favorite !== undefined) result.favorite = this.favorite;
        if (this.rating !== undefined) result.rating = this.rating;
        if (this.price !== undefined) result.price = this.price;
        if (this.acquisDate !== undefined) result.acquisDate = this.acquisDate;
        if (this.finishDate !== undefined) result.finishDate = this.finishDate;
        if (this.releaseDate !== undefined) result.releaseDate = this.releaseDate;
        if (this.categories !== undefined) result.categories = this.categories;
        if (this.platforms !== undefined) result.platforms = this.platforms;

        return result;
    }
}