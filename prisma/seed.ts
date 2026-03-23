import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding (Clean Slate)...')

  // Wipe dummy data
  await prisma.appointment.deleteMany()
  await prisma.service.deleteMany()
  await prisma.stylist.deleteMany()
  await prisma.closedDay.deleteMany()

  // 1. Base Settings (Required for the app to function)
  const defaultSchedule = JSON.stringify({
    mon: { start: '09:00', end: '19:00' },
    tue: { start: '09:00', end: '19:00' },
    wed: { start: '09:00', end: '19:00' },
    thu: { start: '09:00', end: '19:00' },
    fri: { start: '09:00', end: '19:00' },
    sat: { start: '10:00', end: '14:00' },
  })

  await prisma.settings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      salonName: 'Tu Peluquería',
      bufferMinutes: 10,
      defaultSchedule,
    },
  })
  
  console.log('Base Settings created.')
  console.log('Database is now clean and ready for real use.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
