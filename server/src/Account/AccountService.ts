import bcrypt from 'bcrypt';
import { AccountEntity } from './AccountEntity';
import { accountRepository } from './AccountRepository';
import { AccountRegister, AccountLogin } from './AccountEntity';
import { Auth } from '../auth';

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

        const token = Auth.generateToken({
            id: user.id,
            email: user.email
        });

        const { password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword as AccountEntity,
            token
        };
    }

    async getUser(userId: string): Promise<AccountEntity> {

        const user = await accountRepository.findById(userId);

        if (!user) throw new Error('User not found');

        return user;
    }
}

export const accountService = new AccountService();