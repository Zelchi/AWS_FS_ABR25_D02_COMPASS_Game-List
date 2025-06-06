export type ValidationResult = {
    valid: boolean;
    errors: string[];
};

export class ValidationUtils {
    static validateUserId(userId: string): boolean {
        return typeof userId === 'string' && userId.trim() !== '';
    }

    static validateName(name: string, maxLength: number = 100): boolean {
        return typeof name === 'string' && name.trim() !== '' && name.length <= maxLength;
    }

    static validateDescription(description?: string, maxLength: number = 500): boolean {
        return description === undefined || description.trim() === '' ||
            (typeof description === 'string' && description.length <= maxLength);
    }

    static validateImageUrl(imageUrl?: string): boolean {
        if (!imageUrl) return true;
        try {
            const url = new URL(imageUrl);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }

    static validateDate(date?: string | Date): boolean {
        if (!date) return true;
        if (typeof date === 'string') {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        }
        return date instanceof Date && !isNaN(date.getTime());
    }

    static validatePrice(price?: number): boolean {
        return price === undefined || price >= 0;
    }

    static validateRating(rating?: number): boolean {
        return rating === undefined || (rating >= 1 && rating <= 5);
    }

    static validateStatus(status?: string): boolean {
        const lowerStatus = typeof status === 'string' ? status.toLowerCase() : '';
        return ['playing', 'done', 'abandoned'].includes(lowerStatus);
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    static validateCompany(company: string): boolean {
        return typeof company === 'string' && company.trim() !== '';
    }
}