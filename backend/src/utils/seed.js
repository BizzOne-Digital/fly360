import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import Package from '../models/Package.js';
import Content from '../models/Content.js';
import Settings from '../models/Settings.js';
import Gallery from '../models/Gallery.js';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Create admin if not exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@flyy360.com',
        password: process.env.ADMIN_PASSWORD || 'changeme123',
        name: 'FLYY 360 Admin',
      });
      console.log('Admin user created');
    }

    // Seed services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: 'Operator-Assisted 360 Photo Booth',
          description: 'Professional attendant, 360 video experience, digital sharing, professional lighting, props, custom overlays, premium backdrops, and branding options.',
          price: '$200 / Hour',
          priceLabel: 'Starting at',
          features: [
            'Professional attendant',
            '360 video experience',
            'Digital sharing',
            'Professional lighting',
            'Props',
            'Custom overlays',
            'Premium backdrops',
            'Branding options',
          ],
          category: '360-booth',
          order: 1,
        },
        {
          title: 'Social Photography',
          description: 'Professional social photography for lifestyle and event moments.',
          price: '$150 / Hour',
          priceLabel: 'Starting at',
          features: [
            'Professional social photography',
            'Lifestyle/event photography',
            'Backdrops',
            'Props',
            'Wardrobe changes',
            'Location changes',
          ],
          category: 'social',
          order: 2,
        },
        {
          title: '1–3 Person 80 CM Platform Booth',
          description: 'Compact platform booth perfect for intimate gatherings.',
          price: 'Included',
          priceLabel: '',
          features: ['1–3 guests', '80 CM platform', '360 experience'],
          category: 'booth-option',
          order: 3,
        },
        {
          title: '1–6 Person 100 CM Platform Booth',
          description: 'Larger platform booth for bigger groups and events.',
          price: 'Included',
          priceLabel: '',
          features: ['1–6 guests', '100 CM platform', '360 experience'],
          category: 'booth-option',
          order: 4,
        },
        {
          title: 'Sky 360 Booth',
          description: 'Our next-generation elevated 360 experience.',
          price: 'Coming Soon',
          priceLabel: '',
          features: ['Elevated platform', 'Premium experience', 'Coming Soon'],
          category: 'booth-option',
          order: 5,
        },
      ]);
      console.log('Services seeded');
    }

    // Seed packages
    const packageCount = await Package.countDocuments();
    if (packageCount === 0) {
      await Package.insertMany([
        {
          name: 'STARTER PACKAGE',
          duration: '2 HOURS',
          price: 'Starting at $400',
          description: 'Perfect for small private parties or birthdays.',
          features: ['One Attendant', 'Basic Lighting', 'Digital Sharing', 'Social Shoot Available'],
          ctaText: 'BOOK STARTER',
          order: 1,
        },
        {
          name: 'STANDARD PACKAGE',
          duration: '3 HOURS',
          price: 'Starting at $700',
          description: 'Ideal for weddings, schools and special events.',
          features: ['Custom Video Overlays', 'Standard Backdrop', 'Props', 'RGB Lighting', 'Social Shoot Available'],
          isFeatured: true,
          ctaText: 'BOOK STANDARD',
          order: 2,
        },
        {
          name: 'PREMIUM / CORPORATE PACKAGE',
          duration: '4+ HOURS',
          price: 'Starting at $1200',
          description: 'Best for weddings, major events, festivals, corporate activations, and brand launches.',
          features: [
            'Premium Backdrop',
            'Premium Props',
            'Premium RGB Lighting',
            'VIP Treatment',
            'Custom Branding',
            'Online Gallery',
            'Social Shoot Available',
          ],
          isPremium: true,
          ctaText: 'BOOK PREMIUM',
          order: 3,
        },
      ]);
      console.log('Packages seeded');
    }

    // Seed gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        {
          title: 'Wedding Celebration',
          category: 'weddings',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
          publicId: 'seed-g1',
          order: 1,
        },
        {
          title: 'Birthday Party',
          category: 'parties',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
          publicId: 'seed-g2',
          order: 2,
        },
        {
          title: 'Corporate Event',
          category: 'corporate',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
          publicId: 'seed-g3',
          order: 3,
        },
        {
          title: 'Prom Night',
          category: 'parties',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
          publicId: 'seed-g4',
          order: 4,
        },
        {
          title: 'Brand Activation',
          category: 'corporate',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
          publicId: 'seed-g5',
          order: 5,
        },
        {
          title: 'Social Shoot',
          category: 'social-shoots',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
          publicId: 'seed-g6',
          order: 6,
        },
      ]);
      console.log('Gallery seeded');
    }

    // Seed client-provided gallery media (idempotent, runs even if gallery already has items)
    const clientMedia = [
      { title: 'FLYY 360 Setup', category: 'all', mediaType: 'image', url: '/img1.jpg', publicId: 'local-img1', order: 0 },
      { title: 'FLYY 360 Setup', category: 'all', mediaType: 'image', url: '/img2.jpg', publicId: 'local-img2', order: 0 },
      { title: 'FLYY 360 Showcase', category: '360-videos', mediaType: 'video', url: '/showcase.mp4', publicId: 'local-showcase', order: 0 },
    ];
    for (const item of clientMedia) {
      await Gallery.findOneAndUpdate({ publicId: item.publicId }, item, { upsert: true });
    }
    await Gallery.deleteOne({ publicId: 'local-img3' });
    console.log('Client media seeded');

    // Seed content
    const contentItems = [
      { key: 'heroTagline', value: 'RAW MOMENTS. REAL MEMORIES.', section: 'hero' },
      { key: 'heroTitle', value: 'FLYY 360', section: 'hero' },
      { key: 'heroHighlight', value: 'RAW & REEL', section: 'hero' },
      { key: 'heroHeadline', value: 'An Experience You\'ll Never Forget', section: 'hero' },
      { key: 'heroSubtitle', value: '360 Photo Booth & Social Photography', section: 'hero' },
      {
        key: 'heroDescription',
        value: 'We are an operator-assisted 360 photo booth and social photography company delivering immersive, shareable experiences for special occasions, weddings, schools, corporate events, brand activations, and unforgettable celebrations.',
        section: 'hero',
      },
      { key: 'promoBadge', value: 'GRAND OPENING SPECIAL — 10% OFF YOUR FIRST BOOKING EVENT', section: 'hero' },
      { key: 'aboutHeading', value: 'We Don\'t Just Capture Moments.\nWe Create Experiences.', section: 'about' },
      {
        key: 'aboutContent',
        value: "We are an operator-assisted 360 Photo Booth & Social Photography company built on a passion for creating unforgettable experiences and turning special moments into memories that last. What started with a vision to bring something fresh, exciting, and elevated to celebrations has grown into an experience designed to make every guest feel like the Star.\n\nAt FLYY 360, we go beyond simply taking photos. We create high-energy, immersive, shareable moments with professional service, creative presentation, premium experiences, and VIP treatment from start to finish. Whether we're capturing a milestone, elevating a celebration, creating engaging social content, or bringing a brand experience to life, our goal is simple: make every moment FLYY.\n\nFLYY 360 — Where Every Moment Takes Center Stage.",
        section: 'about',
      },
      { key: 'promoTitle', value: 'MAKE YOUR EVENT UNFORGETTABLE', section: 'promo' },
      {
        key: 'promoText',
        value: 'Bring the energy, excitement and VIP experience of FLYY 360 to your next event.',
        section: 'promo',
      },
      { key: 'promoDiscount', value: '10% OFF FIRST BOOKING', section: 'promo' },
      {
        key: 'addons',
        value: [
          'Premium Backdrops',
          'Props',
          'Graphic Design',
          'Additional Lighting',
          'Red Carpet',
          'Stanchions',
          'Custom Branding',
          'Extra Attendant',
          'Wardrobe / Location Changes',
        ],
        section: 'addons',
      },
    ];

    for (const item of contentItems) {
      await Content.findOneAndUpdate({ key: item.key }, item, { upsert: true });
    }
    console.log('Content seeded');

    // Seed settings
    const settingsItems = [
      { key: 'phone', value: '706.591.8014' },
      { key: 'email', value: 'booking@flyy360.com' },
      { key: 'location', value: 'Serving Rome, GA and Surrounding Areas' },
      { key: 'instagram', value: '@flyy_360' },
      { key: 'instagramUrl', value: 'https://instagram.com/flyy_360' },
      { key: 'facebookUrl', value: 'https://facebook.com/flyy360' },
      { key: 'promoVideoUrl', value: '/showcase.mp4' },
    ];

    for (const item of settingsItems) {
      await Settings.findOneAndUpdate({ key: item.key }, item, { upsert: true });
    }
    console.log('Settings seeded');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
