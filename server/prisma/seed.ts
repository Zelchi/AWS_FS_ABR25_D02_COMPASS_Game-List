import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  await prisma.game.deleteMany();
  await prisma.category.deleteMany();
  await prisma.platform.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating users...');

  const userPasswords = await Promise.all([
    bcrypt.hash('!Password123', 10),
  ]);

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'admin@admin.com',
      password: userPasswords[0]
    }
  });

  console.log('Creating categories...');

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        userId: user1.id,
        name: 'RPG',
        description: 'Role-playing games with character development'
      }
    }),
    prisma.category.create({
      data: {
        userId: user1.id,
        name: 'Action',
        description: 'Fast-paced games focused on combat and movement'
      }
    }),
    prisma.category.create({
      data: {
        userId: user1.id,
        name: 'Adventure',
        description: 'Story-driven exploration games'
      }
    }),
    prisma.category.create({
      data: {
        userId: user1.id,
        name: 'Strategy',
        description: 'Games that emphasize tactical decision-making'
      }
    })
  ]);

  console.log('Creating platforms...');

  const platforms = await Promise.all([
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'PlayStation 5',
        company: 'Sony',
        acquisDate: new Date('2022-01-15'),
        imageUrl: 'https://example.com/ps5.jpg'
      }
    }),
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'Nintendo Switch',
        company: 'Nintendo',
        acquisDate: new Date('2021-03-10'),
        imageUrl: 'https://example.com/switch.jpg'
      }
    }),
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'Xbox Series X',
        company: 'Microsoft',
        acquisDate: new Date('2022-02-20'),
        imageUrl: 'https://example.com/xbox.jpg'
      }
    }),
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'Gaming PC',
        company: 'Custom',
        acquisDate: new Date('2021-11-05'),
        imageUrl: 'https://example.com/pc.jpg'
      }
    })
  ]);

  console.log('Creating games...');

  const games = await Promise.all([
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Final Fantasy XVI',
        description: 'Latest entry in the Final Fantasy series',
        imageUrl: 'https://example.com/ff16.jpg',
        price: 6999,
        rating: 4,
        status: 'playing',
        favorite: true,
        acquisDate: new Date('2023-06-22'),
        categories: {
          connect: [{ id: categories[0].id }]
        },
        platforms: {
          connect: [{ id: platforms[0].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'The Legend of Zelda: Tears of the Kingdom',
        description: 'Open-world adventure in Hyrule',
        imageUrl: 'https://example.com/zelda.jpg',
        price: 5999,
        rating: 5,
        status: 'completed',
        favorite: true,
        acquisDate: new Date('2023-05-12'),
        finishDate: new Date('2023-06-30'),
        categories: {
          connect: [{ id: categories[1].id }]
        },
        platforms: {
          connect: [{ id: platforms[1].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Starfield',
        description: 'Bethesda\'s epic space RPG',
        imageUrl: 'https://example.com/starfield.jpg',
        price: 6999,
        rating: 4,
        status: 'wishlist',
        favorite: false,
        acquisDate: new Date('2023-09-06'),
        categories: {
          connect: [{ id: categories[2].id }]
        },
        platforms: {
          connect: [{ id: platforms[2].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Civilization VII',
        description: 'Turn-based strategy game',
        imageUrl: 'https://example.com/civ7.jpg',
        price: 5999,
        rating: 5,
        status: 'playing',
        favorite: true,
        acquisDate: new Date('2023-08-15'),
        categories: {
          connect: [{ id: categories[3].id }]
        },
        platforms: {
          connect: [{ id: platforms[3].id }]
        }
      }
    })
  ]);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });