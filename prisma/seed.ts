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
  const defaultSchedule = {
    mon: { start: '09:00', end: '19:00' },
    tue: { start: '09:00', end: '19:00' },
    wed: { start: '09:00', end: '19:00' },
    thu: { start: '09:00', end: '19:00' },
    fri: { start: '09:00', end: '19:00' },
    sat: { start: '10:00', end: '14:00' },
  }

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

  // 2. Services
  const services = [
    { name: 'Corte Caballero', duration: 30, price: 5000 },
    { name: 'Corte Dama', duration: 45, price: 7000 },
    { name: 'Corte Infantil', duration: 20, price: 3500 },
    { name: 'Barba', duration: 20, price: 2500 },
    { name: 'Corte + Barba', duration: 45, price: 6500 },
  ]

  for (const s of services) {
    await prisma.service.create({ data: s })
  }
  console.log('Services created.')

  // 3. Stylists
  const stylists = [
    { name: 'Nico Cortador', email: 'nico@tupeluqueria.com', phone: '1122334455', schedule: defaultSchedule },
    { name: 'Marcos Fade', email: 'marcos@tupeluqueria.com', phone: '1199887766', schedule: defaultSchedule },
    { name: 'Julieta Style', email: 'julieta@tupeluqueria.com', phone: '1155443322', schedule: { ...defaultSchedule, sat: null } },
  ]

  for (const st of stylists) {
    await prisma.stylist.create({ data: st })
  }
  console.log('Stylists created.')
  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
