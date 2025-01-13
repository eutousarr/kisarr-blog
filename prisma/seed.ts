import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      prenom: 'Alice',
      nom: 'Prisma',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          slug: 'prisma-nextjs',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
      invoices: {
        create: {
          id: 'FACTURE-1',
          name: 'Invoice #1',
        },
    },
  }
  })
 
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      prenom: 'Bob',
      nom: 'NextJs',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            slug: 'prisma-twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            slug: 'nexus-twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
      invoices: {
        create: {
          id: 'FACTURE-2',
          name: 'Invoice #2',
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })