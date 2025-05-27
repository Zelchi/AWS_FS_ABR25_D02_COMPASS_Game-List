import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccountEntity, AccountLoginDto, AccountRegisterDto } from './AccountEntity';
import { accountRepository } from './AccountRepository';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key-change-in-production';

export class AccountService {

    async register(data: AccountRegisterDto): Promise<void> {
        const existingUser = await accountRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await accountRepository.create({
            ...data,
            password: hashedPassword
        });
    }

    async login(data: AccountLoginDto): Promise<{ user: AccountEntity; token: string }> {

        const user = await accountRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = this.generateToken(user);

        const { password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword as AccountEntity,
            token
        };
    }

    private generateToken(user: AccountEntity): string {
        return jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '24h' }
        );
    }

    async verifyToken(token: string): Promise<{ id: string; email: string }> {
        try {
            return jwt.verify(token, SECRET_KEY) as { id: string; email: string };
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async getUserById(id: string): Promise<AccountEntity | null> {
        const user = await accountRepository.findById(id);
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as AccountEntity;
    }
}

export const accountService = new AccountService();