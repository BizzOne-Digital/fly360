export const DEFAULT_CONTENT = {
  heroTagline: 'RAW MOMENTS. REAL MEMORIES.',
  heroTitle: 'FLYY 360',
  heroHighlight: 'RAW & REEL',
  heroHeadline: "An Experience You'll Never Forget",
  heroSubtitle: 'PHOTO BOOTH & SOCIAL PHOTOGRAPHY',
  heroDescription:
    'We are an operator-assisted 360 photo booth and social photography company delivering immersive, shareable experiences for special occasions, weddings, schools, corporate events, brand activations, and unforgettable celebrations.',
  promoBadge: 'GRAND OPENING SPECIAL — 10% OFF YOUR FIRST BOOKING EVENT',
  aboutHeading: "We Don't Just Capture Moments.\nWe Create Experiences.",
  aboutContent:
    "We are an operator-assisted 360 Photo Booth & Social Photography company built on a passion for creating unforgettable experiences and turning special moments into memories that last. What started with a vision to bring something fresh, exciting, and elevated to celebrations has grown into an experience designed to make every guest feel like the Star.\n\nAt FLYY 360, we go beyond simply taking photos. We create high-energy, immersive, shareable moments with professional service, creative presentation, premium experiences, and VIP treatment from start to finish. Whether we're capturing a milestone, elevating a celebration, creating engaging social content, or bringing a brand experience to life, our goal is simple: make every moment FLYY.\n\nFLYY 360 — Where Every Moment Takes Center Stage.",
  promoTitle: 'MAKE YOUR EVENT UNFORGETTABLE',
  promoText: 'Bring the energy, excitement and VIP experience of FLYY 360 to your next event.',
  promoDiscount: '10% OFF FIRST BOOKING',
  addons: [
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
};

export const DEFAULT_SETTINGS = {
  phone: '706.591.8014',
  email: 'booking@flyy360.com',
  location: 'Serving Rome, GA and Surrounding Areas',
  instagram: '@flyy_360',
  instagramUrl: 'https://instagram.com/flyy_360',
  facebookUrl: 'https://facebook.com/flyy360',
  promoVideoUrl: '/showcase.mp4',
};

export const DEFAULT_SERVICES = [
  {
    _id: 'svc-1',
    title: 'Operator-Assisted 360 Photo Booth',
    description:
      'Professional attendant, 360 video experience, digital sharing, professional lighting, props, custom overlays, premium backdrops, and branding options.',
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
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    isPublished: true,
  },
  {
    _id: 'svc-2',
    title: 'Social Photography',
    description: 'Professional social photography for lifestyle and event moments.',
    price: '$150',
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
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    isPublished: true,
  },
  {
    _id: 'svc-3',
    title: '1–3 Person 80 CM Platform Booth',
    description: 'Compact platform booth perfect for intimate gatherings.',
    price: 'Included',
    priceLabel: '',
    features: ['1–3 guests', '80 CM platform', '360 experience'],
    category: 'booth-option',
    isPublished: true,
  },
  {
    _id: 'svc-4',
    title: '1–6 Person 100 CM Platform Booth',
    description: 'Larger platform booth for bigger groups and events.',
    price: 'Included',
    priceLabel: '',
    features: ['1–6 guests', '100 CM platform', '360 experience'],
    category: 'booth-option',
    isPublished: true,
  },
  {
    _id: 'svc-5',
    title: 'Sky 360 Booth',
    description: 'Our next-generation elevated 360 experience.',
    price: 'Coming Soon',
    priceLabel: '',
    features: ['Elevated platform', 'Premium experience', 'Coming Soon'],
    category: 'booth-option',
    isPublished: true,
  },
];

export const DEFAULT_PACKAGES = [
  {
    _id: 'pkg-1',
    name: 'STARTER PACKAGE',
    duration: '2 HOURS',
    price: 'Starting at $400',
    description: 'Perfect for small private parties or birthdays.',
    features: ['One Attendant', 'Basic Lighting', 'Digital Sharing', 'Social Shoot Available'],
    ctaText: 'BOOK STARTER',
    isFeatured: false,
    isPremium: false,
    isEnabled: true,
  },
  {
    _id: 'pkg-2',
    name: 'STANDARD PACKAGE',
    duration: '3 HOURS',
    price: 'Starting at $700',
    description: 'Ideal for weddings, schools and special events.',
    features: ['Custom Video Overlays', 'Standard Backdrop', 'Props', 'RGB Lighting', 'Social Shoot Available'],
    isFeatured: true,
    isPremium: false,
    isEnabled: true,
    ctaText: 'BOOK STANDARD',
  },
  {
    _id: 'pkg-3',
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
    isFeatured: false,
    isPremium: true,
    isEnabled: true,
    ctaText: 'BOOK PREMIUM',
  },
];

export const DEFAULT_GALLERY = [
  { id: 'g0a', title: 'FLYY 360 Setup', category: 'all', mediaType: 'image', url: '/img1.jpg' },
  { id: 'g0b', title: 'FLYY 360 Setup', category: 'all', mediaType: 'image', url: '/img2.jpg' },
  { id: 'g0d', title: 'FLYY 360 Showcase', category: '360-videos', mediaType: 'video', url: '/showcase.mp4' },
  { id: 'g1', title: 'Wedding Celebration', category: 'weddings', mediaType: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
  { id: 'g2', title: 'Birthday Party', category: 'parties', mediaType: 'image', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80' },
  { id: 'g3', title: 'Corporate Event', category: 'corporate', mediaType: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { id: 'g4', title: 'Prom Night', category: 'parties', mediaType: 'image', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80' },
  { id: 'g5', title: 'Brand Activation', category: 'corporate', mediaType: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
  { id: 'g6', title: 'Social Shoot', category: 'social-shoots', mediaType: 'image', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80' },
];

export function mergeContent(apiContent = {}) {
  return { ...DEFAULT_CONTENT, ...apiContent };
}

export function mergeSettings(apiSettings = {}) {
  return { ...DEFAULT_SETTINGS, ...apiSettings };
}

export function resolveServices(apiServices = []) {
  return apiServices.length > 0 ? apiServices : DEFAULT_SERVICES;
}

export function resolvePackages(apiPackages = []) {
  const enabled = apiPackages.filter((p) => p.isEnabled !== false);
  return enabled.length > 0 ? enabled : DEFAULT_PACKAGES;
}

export function resolveGallery(apiGallery = []) {
  return apiGallery.length > 0 ? apiGallery : DEFAULT_GALLERY;
}
