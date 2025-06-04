import { IGameEntity, IGameRegister } from './GameEntity';

type ValidationResult = {
    valid: boolean;
    errors: string[];
};

class GameDto {

    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }

    static validateName(name: string): boolean {
        return typeof name === 'string' && name.trim() !== '' && name.length <= 100;
    }

    static validateDescription(description?: string): boolean {
        return typeof description === 'string' && description.trim() !== '' && description.length <= 500;
    }

    static validateImageUrl(imageUrl?: string): boolean {
        if (!imageUrl) return true;
        try {
            new URL(imageUrl);
            return true;
        } catch (e) {
            return false;
        }
    }

    static validatePrice(price?: number): boolean {
        return price === undefined || price >= 0;
    }

    static validateRating(rating?: number): boolean {
        return rating === undefined || (rating >= 1 && rating <= 5);
    }

    static validateStatus(status?: string): boolean {
        console.log('Validating status:', status);
        const lowerStatus = typeof status === 'string' ? status.toLowerCase() : '';
        return ['playing', 'done', 'abandoned'].includes(lowerStatus);
    }

    static validateDate(date?: string | Date): boolean {
        if (!date) return true;
        if (typeof date === 'string') {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        }
        return date instanceof Date && !isNaN(date.getTime());
    }
}

export class GameRegisterDto {
    private userId: string;
    private name: string;
    private description: string | undefined;
    private imageUrl: string | undefined;
    private status: string | undefined;
    private favorite: boolean | undefined;
    private rating: number | undefined;
    private price: number | undefined;
    private acquisDate: Date | undefined;
    private finishDate: Date | undefined;
    private releaseDate: Date | undefined;
    private categories: { id: string }[] | undefined;
    private platforms: { id: string }[] | undefined;

    constructor(
        userId: string,
        name: string,
        description?: string,
        imageUrl?: string,
        status?: string,
        favorite?: boolean,
        rating?: number,
        price?: number,
        acquisDate?: string | Date,
        finishDate?: string | Date,
        releaseDate?: string | Date,
        categories?: Array<{ id: string }>,
        platforms?: Array<{ id: string }>,
    ) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.status = status;
        this.favorite = favorite;
        this.rating = rating;
        this.price = price;
        this.acquisDate = acquisDate ? new Date(acquisDate) : undefined;
        this.finishDate = finishDate ? new Date(finishDate) : undefined;
        this.releaseDate = releaseDate ? new Date(releaseDate) : undefined;
        this.categories = categories;
        this.platforms = platforms;
    }

    isValid(): ValidationResult {
        const errors: string[] = [];

        if (!GameDto.validateUserId(this.userId)) {
            errors.push('User ID is required');
        }

        if (!GameDto.validateName(this.name)) {
            if (!this.name || this.name.trim().length === 0) {
                errors.push('Game name is required');
            } else {
                errors.push('Game name is too long (max 100 characters)');
            }
        }

        if (!GameDto.validateDescription(this.description)) {
            errors.push('Description is too long (max 1000 characters)');
        }

        if (!GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Image URL is not valid');
        }

        if (!GameDto.validateRating(this.rating)) {
            errors.push('Rating must be between 0 and 10');
        }

        if (!GameDto.validatePrice(this.price)) {
            errors.push('Price cannot be negative');
        }

        if (!GameDto.validateStatus(this.status)) {
            errors.push('Status must be one of: playing, done, abandoned');
        }

        if (!GameDto.validateDate(this.acquisDate)) {
            errors.push('Acquisition date is not valid');
        }

        if (!GameDto.validateDate(this.finishDate)) {
            errors.push('Finish date is not valid');
        }

        if (!GameDto.validateDate(this.releaseDate)) {
            errors.push('Release date is not valid');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    data(): IGameRegister {
        return {
            userId: this.userId,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            price: this.price,
            status: this.status,
            favorite: this.favorite,
            rating: this.rating,
            acquisDate: this.acquisDate,
            finishDate: this.finishDate,
            releaseDate: this.releaseDate,
            categories: this.categories,
            platforms: this.platforms
        };
    }
}

export class GameUpdateDto {
    private name: string | undefined;
    private description: string | undefined;
    private imageUrl: string | undefined;
    private status: string | undefined;
    private favorite: boolean | undefined;
    private acquisDate: Date | undefined;
    private finishDate: Date | undefined;
    private categories: { id: string }[] | undefined;
    private platforms: { id: string }[] | undefined;
    private rating: number | undefined;
    private price: number | undefined;
    private releaseDate: Date | undefined;

    constructor(
        name?: string,
        description?: string,
        imageUrl?: string,
        status?: string,
        favorite?: boolean,
        rating?: number,
        price?: number,
        acquisDate?: string | Date,
        finishDate?: string | Date,
        releaseDate?: string | Date,
        categories?: Array<{ id: string }>,
        platforms?: Array<{ id: string }>,
    ) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.status = status;
        this.favorite = favorite;
        this.rating = rating;
        this.price = price;
        this.acquisDate = acquisDate ? new Date(acquisDate) : undefined;
        this.finishDate = finishDate ? new Date(finishDate) : undefined;
        this.releaseDate = releaseDate ? new Date(releaseDate) : undefined;
        this.categories = categories;
        this.platforms = platforms;
    }

    isValid(): ValidationResult {
        const errors: string[] = [];

        if (this.name !== undefined && !GameDto.validateName(this.name)) {
            if (this.name.trim().length === 0) {
                errors.push('Game name cannot be empty');
            } else {
                errors.push('Game name is too long (max 100 characters)');
            }
        }

        if (this.description !== undefined && !GameDto.validateDescription(this.description)) {
            errors.push('Description is too long (max 1000 characters)');
        }

        if (this.imageUrl !== undefined && !GameDto.validateImageUrl(this.imageUrl)) {
            errors.push('Image URL is not valid');
        }

        if (this.rating !== undefined && !GameDto.validateRating(this.rating)) {
            errors.push('Rating must be between 0 and 10');
        }

        if (this.price !== undefined && !GameDto.validatePrice(this.price)) {
            errors.push('Price cannot be negative');
        }

        if (this.status !== undefined && !GameDto.validateStatus(this.status)) {
            errors.push('Status must be one of: playing, done, abandoned');
        }

        if (this.acquisDate !== undefined && !GameDto.validateDate(this.acquisDate)) {
            errors.push('Acquisition date is not valid');
        }

        if (this.finishDate !== undefined && !GameDto.validateDate(this.finishDate)) {
            errors.push('Finish date is not valid');
        }

        if (this.releaseDate !== undefined && !GameDto.validateDate(this.releaseDate)) {
            errors.push('Release date is not valid');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    data(): Partial<IGameEntity> {
        return {
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            status: this.status,
            favorite: this.favorite,
            acquisDate: this.acquisDate,
            finishDate: this.finishDate,
            categories: this.categories,
            platforms: this.platforms,
            rating: this.rating,
            price: this.price,
            releaseDate: this.releaseDate
        };
    }
}