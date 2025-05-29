import { prisma } from '../db';
import { AccountEntity } from './AccountEntity';

export class AccountRepository {

    async findById(id: string): Promise<AccountEntity | null> {
        return prisma.user.findUnique({
            where: { id, deletedAt: false }
        });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async findAll(): Promise<AccountEntity[]> {
        return prisma.user.findMany({
            where: { deletedAt: false },
        });
    }

    async create(data: AccountEntity): Promise<AccountEntity> {
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