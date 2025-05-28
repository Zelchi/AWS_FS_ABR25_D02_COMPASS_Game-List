import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccountEntity } from './AccountEntity';
import { accountRepository } from './AccountRepository';
import { AccountRegister, AccountLogin } from './AccountEntity';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key-change-in-production';

export class AccountService {

    async register(data: AccountRegister): Promise<void> {

        const existingUser = await accountRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await accountRepository.create({
            ...data,
            password: hashedPassword
        });
    }

    async login(data: AccountLogin): Promise<{ user: AccountEntity; token: string }> {

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

    async getAll(): Promise<AccountEntity[]> {
        const users = await accountRepository.findAll();

        if (!users) throw new Error('No users found');

        return users.map((user: AccountEntity) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as AccountEntity;
        });
    }
}

export const accountService = new AccountService();