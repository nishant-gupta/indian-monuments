import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const historicalCategory = await prisma.category.upsert({
    where: { slug: 'historical' },
    update: {},
    create: {
      name: 'Historical',
      slug: 'historical',
    },
  })

  const architecturalCategory = await prisma.category.upsert({
    where: { slug: 'architectural' },
    update: {},
    create: {
      name: 'Architectural',
      slug: 'architectural',
    },
  })

  const religiousCategory = await prisma.category.upsert({
    where: { slug: 'religious' },
    update: {},
    create: {
      name: 'Religious',
      slug: 'religious',
    },
  })

  // Create tags
  const unescoTag = await prisma.tag.upsert({
    where: { slug: 'unesco' },
    update: {},
    create: {
      name: 'UNESCO World Heritage',
      slug: 'unesco',
    },
  })

  const mughalTag = await prisma.tag.upsert({
    where: { slug: 'mughal' },
    update: {},
    create: {
      name: 'Mughal Architecture',
      slug: 'mughal',
    },
  })

  const hinduTag = await prisma.tag.upsert({
    where: { slug: 'hindu' },
    update: {},
    create: {
      name: 'Hindu Architecture',
      slug: 'hindu',
    },
  })

  // Create monuments
  const tajMahal = await prisma.monument.upsert({
    where: { slug: 'taj-mahal' },
    update: {},
    create: {
      name: 'Taj Mahal',
      slug: 'taj-mahal',
      description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra.',
      history: 'The Taj Mahal was commissioned by Shah Jahan in 1631, to be built in the memory of his wife Mumtaz Mahal, who died on 17 June that year, while giving birth to their 14th child, Gauhara Begum.',
      location: 'Agra, Uttar Pradesh',
      address: 'Agra, Uttar Pradesh 282001, India',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India',
      latitude: 27.1751,
      longitude: 78.0421,
      entryFee: '₹1100 for foreign tourists, ₹50 for Indian tourists',
      timings: 'Sunrise to Sunset (Closed on Fridays)',
      bestTime: 'October to March',
      howToReach: 'By air: Agra Airport (7 km from city center)\nBy train: Agra Cantt Railway Station\nBy road: Well-connected by NH-2 and NH-3',
      facilities: 'Parking, Wheelchair access, Audio guides, Restrooms, Cafeteria',
      categories: {
        connect: [
          { id: historicalCategory.id },
          { id: architecturalCategory.id },
        ],
      },
      tags: {
        connect: [
          { id: unescoTag.id },
          { id: mughalTag.id },
        ],
      },
    },
  })

  const redFort = await prisma.monument.upsert({
    where: { slug: 'red-fort' },
    update: {},
    create: {
      name: 'Red Fort',
      slug: 'red-fort',
      description: 'The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors.',
      history: 'Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. The fort was designed by architect Ustad Ahmad Lahori.',
      location: 'Delhi',
      address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6562,
      longitude: 77.2410,
      entryFee: '₹500 for foreign tourists, ₹35 for Indian tourists',
      timings: '9:30 AM to 4:30 PM (Closed on Mondays)',
      bestTime: 'October to March',
      howToReach: 'By metro: Chandni Chowk Metro Station\nBy bus: Red Fort Bus Stop\nBy road: Well-connected by NH-1',
      facilities: 'Parking, Wheelchair access, Audio guides, Restrooms, Cafeteria',
      categories: {
        connect: [
          { id: historicalCategory.id },
          { id: architecturalCategory.id },
        ],
      },
      tags: {
        connect: [
          { id: unescoTag.id },
          { id: mughalTag.id },
        ],
      },
    },
  })

  const khajuraho = await prisma.monument.upsert({
    where: { slug: 'khajuraho-temples' },
    update: {},
    create: {
      name: 'Khajuraho Temples',
      slug: 'khajuraho-temples',
      description: 'The Khajuraho Group of Monuments is a group of Hindu and Jain temples in Chhatarpur, Madhya Pradesh, India.',
      history: 'The temples were built between 885 AD and 1000 AD by the Chandela dynasty. The temples are famous for their nagara-style architectural symbolism and their erotic sculptures.',
      location: 'Khajuraho, Madhya Pradesh',
      address: 'Khajuraho, Chhatarpur, Madhya Pradesh 471606, India',
      city: 'Khajuraho',
      state: 'Madhya Pradesh',
      country: 'India',
      latitude: 24.8529,
      longitude: 79.9229,
      entryFee: '₹40 for Indian tourists, ₹600 for foreign tourists',
      timings: 'Sunrise to Sunset',
      bestTime: 'October to March',
      howToReach: 'By air: Khajuraho Airport (5 km from city center)\nBy train: Khajuraho Railway Station\nBy road: Well-connected by NH-75',
      facilities: 'Parking, Wheelchair access, Audio guides, Restrooms, Cafeteria',
      categories: {
        connect: [
          { id: historicalCategory.id },
          { id: religiousCategory.id },
        ],
      },
      tags: {
        connect: [
          { id: unescoTag.id },
          { id: hinduTag.id },
        ],
      },
    },
  })

  // Add images to monuments
  await prisma.image.createMany({
    skipDuplicates: true,
    data: [
      {
        url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
        alt: 'Taj Mahal front view',
        monumentId: tajMahal.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada',
        alt: 'Taj Mahal at sunset',
        monumentId: tajMahal.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d',
        alt: 'Red Fort main gate',
        monumentId: redFort.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d',
        alt: 'Red Fort interior',
        monumentId: redFort.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d',
        alt: 'Khajuraho Temple',
        monumentId: khajuraho.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d',
        alt: 'Khajuraho Temple sculptures',
        monumentId: khajuraho.id,
      },
    ],
  })

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 