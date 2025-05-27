import { prisma } from '../db';
import { AccountEntity, AccountRegisterDto } from './AccountEntity';

export class AccountRepository {
    
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    async create(data: AccountRegisterDto): Promise<AccountEntity> {
        return prisma.user.create({
            data
        });
    }

    async update(id: string, data: Partial<AccountEntity>): Promise<AccountEntity> {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
    }
}

export const accountRepository = new AccountRepository();