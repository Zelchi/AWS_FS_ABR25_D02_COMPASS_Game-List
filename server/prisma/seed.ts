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
        imageUrl: 'https://i.pinimg.com/736x/37/9b/fc/379bfc00de26978b06ea6ef72584908f.jpg'
      }
    }),
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'Nintendo Switch',
        company: 'Nintendo',
        acquisDate: new Date('2021-03-10'),
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Nintendo_switch_logo.png'
      }
    }),
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'Xbox Series X',
        company: 'Microsoft',
        acquisDate: new Date('2022-02-20'),
        imageUrl: 'https://i.pinimg.com/736x/69/af/1b/69af1b021e6fe4d37383f80cdaf0cc26.jpg'
      }
    }),
    prisma.platform.create({
      data: {
        userId: user1.id,
        name: 'Steam',
        company: 'Valve',
        acquisDate: new Date('2021-11-05'),
        imageUrl: 'https://b.thumbs.redditmedia.com/xvwxkNXOkvdu9d6S67odp1gCPfhB1A3qKDs7kdwO5ts.png'
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
        imageUrl: 'https://clan.fastly.steamstatic.com/images/45155195/e13a94bab7ab0b06a5494167339e8a1e610f4f54_400x225.jpg',
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
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg/250px-The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg',
        price: 5999,
        rating: 5,
        status: 'done',
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
        status: 'abandoned',
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
        imageUrl: 'https://image.api.playstation.com/vulcan/img/cfn/11307Hs8nlMsvWNuv_O2AC7tY7gdGyoYbRX1Effyn1qc2IR0XFvHXcdhJsAZMc00hW_0lukWIajDGsKsB7uK5LAFiCsjoVSW.png',
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
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Elden Ring',
        description: 'Open world action RPG by FromSoftware',
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/62UmxLNSb0a0iT0BvzwH3XJF.png',
        price: 5999,
        rating: 5,
        status: 'done',
        favorite: true,
        acquisDate: new Date('2022-02-25'),
        finishDate: new Date('2022-04-10'),
        categories: {
          connect: [{ id: categories[0].id }, { id: categories[1].id }]
        },
        platforms: {
          connect: [{ id: platforms[0].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'God of War Ragnarök',
        description: 'Action-adventure game based on Norse mythology',
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/8YdK4x6G4L9EGpgWPkiPVj8y.png',
        price: 6999,
        rating: 5,
        status: 'done',
        favorite: true,
        acquisDate: new Date('2022-11-09'),
        finishDate: new Date('2022-12-15'),
        categories: {
          connect: [{ id: categories[1].id }, { id: categories[2].id }]
        },
        platforms: {
          connect: [{ id: platforms[0].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Cyberpunk 2077',
        description: 'Open-world RPG set in a dystopian future',
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202008/0416/6Bo40lnWU0BhgrOUm7Cb6by3.png',
        price: 4999,
        rating: 3,
        status: 'abandoned',
        favorite: false,
        acquisDate: new Date('2020-12-10'),
        categories: {
          connect: [{ id: categories[0].id }]
        },
        platforms: {
          connect: [{ id: platforms[3].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Baldur\'s Gate 3',
        description: 'Fantasy RPG based on Dungeons & Dragons',
        imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
        price: 5999,
        rating: 5,
        status: 'playing',
        favorite: true,
        acquisDate: new Date('2023-08-03'),
        categories: {
          connect: [{ id: categories[0].id }, { id: categories[3].id }]
        },
        platforms: {
          connect: [{ id: platforms[3].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Horizon Forbidden West',
        description: 'Action RPG set in a post-apocalyptic world',
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/1dy5w4Y5iwt9kanSlPXHBRNQ.png',
        price: 5999,
        rating: 4,
        status: 'done',
        favorite: false,
        acquisDate: new Date('2022-02-18'),
        finishDate: new Date('2022-03-30'),
        categories: {
          connect: [{ id: categories[1].id }, { id: categories[2].id }]
        },
        platforms: {
          connect: [{ id: platforms[0].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Animal Crossing: New Horizons',
        description: 'Life simulation game',
        imageUrl: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a',
        price: 3999,
        rating: 4,
        status: 'playing',
        favorite: false,
        acquisDate: new Date('2020-03-20'),
        categories: {
          connect: [{ id: categories[2].id }]
        },
        platforms: {
          connect: [{ id: platforms[1].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Halo Infinite',
        description: 'First-person shooter',
        imageUrl: 'https://store-images.s-microsoft.com/image/apps.21536.13727851868390641.c9cc5f66-aff8-406c-af6b-440838730be0.68796bde-cbf5-4eaa-a299-011417041da6',
        price: 5999,
        rating: 3,
        status: 'abandoned',
        favorite: false,
        acquisDate: new Date('2021-12-08'),
        categories: {
          connect: [{ id: categories[1].id }]
        },
        platforms: {
          connect: [{ id: platforms[2].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Stardew Valley',
        description: 'Farming simulation RPG',
        imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
        price: 1499,
        rating: 5,
        status: 'playing',
        favorite: true,
        acquisDate: new Date('2021-05-14'),
        categories: {
          connect: [{ id: categories[0].id }, { id: categories[3].id }]
        },
        platforms: {
          connect: [{ id: platforms[1].id }, { id: platforms[3].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Forza Horizon 5',
        description: 'Racing game set in Mexico',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/d/dc/Capa_de_Forza_Horizon_5.jpg/330px-Capa_de_Forza_Horizon_5.jpg',
        price: 5999,
        rating: 4,
        status: 'done',
        favorite: false,
        acquisDate: new Date('2021-11-09'),
        finishDate: new Date('2022-01-15'),
        categories: {
          connect: [{ id: categories[1].id }]
        },
        platforms: {
          connect: [{ id: platforms[2].id }, { id: platforms[3].id }]
        }
      }
    }),
    prisma.game.create({
      data: {
        userId: user1.id,
        name: 'Persona 5 Royal',
        description: 'JRPG about high school students with supernatural abilities',
        imageUrl: 'https://image.api.playstation.com/vulcan/img/cfn/11307WJ4TkwLDkBEJni04tu81UlL-PCQsfaFYBDLvZaC_STUeyp_1A7wJfHHj_XDoedOwpH3zh_JuU7HEiy63dDA31I4ymKb.png',
        price: 4999,
        rating: 5,
        status: 'done',
        favorite: true,
        acquisDate: new Date('2022-10-21'),
        finishDate: new Date('2023-01-10'),
        categories: {
          connect: [{ id: categories[0].id }]
        },
        platforms: {
          connect: [{ id: platforms[0].id }, { id: platforms[1].id }, { id: platforms[2].id }]
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