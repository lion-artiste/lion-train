import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    const raphael = await prisma.user.upsert({
        where: { email: 'raphael.graff.m@gmail.com' },
        update: {},
        create: {
            email: 'raphael.graff.m@gmail.com',
            name: 'Raphaël Graff',
            id: '123456ABCDEF'
        },
    })

    console.log({ raphael })
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