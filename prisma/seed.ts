import { PrismaClient, Role, PreorderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ZENVY database...');

  // Brand Settings
  await prisma.brandSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      brandName: 'ZENVY',
      logoUrl: '/logo.png',
      tagline: 'The New Era of Performance',
      description: 'Elevating performance wear through editorial design and technical precision.',
      email: 'support@zenvy.com',
      phone: '+880 1700-000000',
    },
  });

  // Admin User
  await prisma.user.upsert({
    where: { email: 'admin@zenvy.com' },
    update: {},
    create: {
      id: 'admin-user-id-001',
      email: 'admin@zenvy.com',
      passwordHash: 'hashed_password_placeholder',
      name: 'ZENVY Store Admin',
      role: Role.ADMIN,
    },
  });

  // Sizes
  const sizes = [
    { code: 'S', name: 'Small', displayOrder: 1 },
    { code: 'M', name: 'Medium', displayOrder: 2 },
    { code: 'L', name: 'Large', displayOrder: 3 },
    { code: 'XL', name: 'Extra Large', displayOrder: 4 },
    { code: '2XL', name: 'Double Extra Large', displayOrder: 5 },
  ];
  for (const s of sizes) {
    await prisma.size.upsert({
      where: { code: s.code },
      update: {},
      create: s,
    });
  }

  // Sleeves
  const sleeves = [
    { name: 'Short Sleeve', additionalPrice: 0.0 },
    { name: 'Long Sleeve', additionalPrice: 15.0 },
  ];
  for (const sl of sleeves) {
    await prisma.sleeveType.upsert({
      where: { name: sl.name },
      update: {},
      create: sl,
    });
  }

  // Patches
  const patches = [
    { name: 'No Patch', price: 0.0, displayOrder: 0 },
    { name: 'UEFA Champions League', price: 25.0, displayOrder: 1 },
    { name: 'Premier League', price: 20.0, displayOrder: 2 },
    { name: 'La Liga', price: 20.0, displayOrder: 3 },
  ];
  for (const p of patches) {
    await prisma.patch.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  // Categories
  const catJerseys = await prisma.category.upsert({
    where: { slug: 'jerseys' },
    update: {},
    create: {
      name: 'Jerseys',
      slug: 'jerseys',
      description: 'Authentic and Replica Football, Basketball, & Custom Kits',
      isFeatured: true,
    },
  });

  const catOuterwear = await prisma.category.upsert({
    where: { slug: 'outerwear' },
    update: {},
    create: {
      name: 'Outerwear',
      slug: 'outerwear',
      description: 'Performance Windbreakers & Jackets',
      isFeatured: true,
    },
  });

  // Products
  const prod1 = await prisma.product.upsert({
    where: { slug: 'aura-strike-pro' },
    update: {},
    create: {
      name: 'Aura Strike Pro Jersey',
      slug: 'aura-strike-pro',
      sku: 'ZNV-AM-001',
      description: "Men's Authentic Jersey with breathable AeroKnit fabric technology.",
      basePrice: 120.0,
      stock: 145,
      isNewArrival: true,
      isFeatured: true,
      categoryId: catJerseys.id,
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATCkpWLnD7sw-RJ2xE3UNgvubJIo6nkJmQDGMYOzACq8avrPm1KLmjW8SLK7hVNE5iY_0tABnsZTJN91gDeB3w1hmjjR9XVXZsx79G2zNNd3h6Bt6bE1oKirfBkJkDdPB0wllwBpdW4NZieUmoe3TGe055BJNxTqJJgbb7KlGsLePz7O9m0kPusE54s29KdRFgnDxZDQAokqxIoui0OJAurLmyR5bQCWf7PFb0jBXOCH8VK76UxWbHGw',
            isPrimary: true,
          },
        ],
      },
    },
  });

  const prod2 = await prisma.product.upsert({
    where: { slug: 'nimbus-windbreaker' },
    update: {},
    create: {
      name: 'Nimbus Windbreaker',
      slug: 'nimbus-windbreaker',
      sku: 'ZNV-NW-042',
      description: 'Off-white technical windbreaker jacket with glassmorphic accents.',
      basePrice: 210.0,
      stock: 0,
      isPreorder: true,
      categoryId: catOuterwear.id,
      images: {
        create: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtghZsGtFKHlZIYqaxAa8EcbW83K4egjcrZw6V4BKNThg-IAlTlMAK7mBkx_cl17Vu7d2UuuImJuqgR8VWEBruONytgmwd_u56NZOtXfIj4EccnfmiRjMoLpTVBSjXF2sCqgz2Xbmmtc4gMfUG1L_-q82tQjpjnb76hU4-UPXEwVHQis53FgqSKTFOUlJYAHop_oph-8ZHd2YUllJzjsxTPEerlfKDZ2ysTRoudBnK-P0058K9dNXJA',
            isPrimary: true,
          },
        ],
      },
      preorder: {
        create: {
          preorderPrice: 210.0,
          expectedArrival: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          maxCapacity: 1000,
          soldCount: 842,
          status: PreorderStatus.AVAILABLE,
        },
      },
    },
  });

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
