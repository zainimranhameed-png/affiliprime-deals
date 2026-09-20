// Curated database of trending, high-converting Amazon products
const PRODUCTS_DATA = [
  {
    id: "prod-1",
    asin: "B09XS7JWHH",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    tagline: "Industry-leading noise canceling with Auto NC Optimizer and crystal clear hands-free calling",
    category: "tech",
    categoryName: "Tech & Audio",
    rating: 4.8,
    reviewsCount: 14820,
    price: 348.00,
    originalPrice: 399.99,
    discount: "13% OFF",
    badge: "🔥 Best Seller",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B09XS7JWHH",
    specs: {
      "Battery Life": "Up to 30 Hours",
      "Noise Cancellation": "Dual Processor V1 + QN1",
      "Connectivity": "Bluetooth 5.2 / Multipoint",
      "Weight": "250 grams",
      "Fast Charging": "3 min charge = 3 hrs playback",
      "Microphones": "8 Microphones with Beamforming"
    },
    pros: [
      "Top-tier active noise cancellation in the market",
      "Ultra-comfortable lightweight ergonomic design",
      "Superb microphone clarity for Zoom & calls",
      "Multipoint pairing to two devices simultaneously"
    ],
    cons: [
      "Headband does not fold completely into a compact ball",
      "Premium price point"
    ],
    description: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality. With newly developed lightweight leather, these headphones fit snugly around your ears with less pressure."
  },
  {
    id: "prod-2",
    asin: "B0BSHF7WHW",
    title: "Apple 2024 MacBook Air 13\" (M3 Chip, 16GB Unified RAM, 512GB SSD)",
    tagline: "Supercharged by M3, stunning Liquid Retina Display, all-day 18-hour battery",
    category: "tech",
    categoryName: "Tech & Laptops",
    rating: 4.9,
    reviewsCount: 8940,
    price: 1199.00,
    originalPrice: 1299.00,
    discount: "8% OFF",
    badge: "⭐ Editor's Choice",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0BSHF7WHW",
    specs: {
      "Processor": "Apple M3 8-Core CPU / 10-Core GPU",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB Ultrafast SSD",
      "Display": "13.6-inch Liquid Retina with True Tone",
      "Battery Life": "Up to 18 hours",
      "Ports": "MagSafe 3, 2x Thunderbolt 4, Headphone Jack"
    },
    pros: [
      "Insane speed and battery life with M3 chip",
      "Fanless silent design stays cool under heavy workload",
      "Vibrant 500-nit Liquid Retina screen",
      "Dual external display support with laptop lid closed"
    ],
    cons: [
      "Base storage configuration not user upgradeable",
      "Midnight color can attract fingerprints"
    ],
    description: "The MacBook Air M3 breezes through work and play. Built with Apple Intelligence, this laptop offers blazing fast performance for video editing, coding, and multitasking while remaining razor thin at under 0.45 inches."
  },
  {
    id: "prod-3",
    asin: "B0CHWZP6W5",
    title: "Apple Watch Series 10 (GPS, 46mm OLED Always-On, Jet Black)",
    tagline: "Thinnest Apple Watch ever with the biggest screen and advanced health sensors",
    category: "fitness",
    categoryName: "Fitness & Wearables",
    rating: 4.7,
    reviewsCount: 6510,
    price: 399.00,
    originalPrice: 429.00,
    discount: "7% OFF",
    badge: "⚡ Trending Now",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CHWZP6W5",
    specs: {
      "Display": "Wide-angle OLED Always-On display",
      "Sensors": "ECG, Blood Oxygen, Sleep Apnea, Temperature",
      "Water Resistance": "50m swimproof + Depth Gauge",
      "Charging": "80% charge in just 30 minutes",
      "Chip": "S10 SiP with 64-bit dual-core processor",
      "Case Size": "46mm Aluminum"
    },
    pros: [
      "Larger and easier to read display with wide-angle OLED",
      "Sleep apnea detection and advanced ECG heart tracking",
      "Super fast charging makes overnight sleep tracking easy",
      "Loud speaker built-in for podcasts & calls"
    ],
    cons: [
      "1-day typical battery life requires daily top-ups",
      "Only compatible with iPhone"
    ],
    description: "Apple Watch Series 10 is a milestone in smartwatch engineering. It features our biggest and most advanced display yet, gives you vital health insights including sleep apnea notifications, and charges faster than any previous model."
  },
  {
    id: "prod-4",
    asin: "B08N5LNQCX",
    title: "Ninja AF101 Air Fryer 4-Quart with One-Touch Preset Functions",
    tagline: "Crisp, Roast, Reheat & Dehydrate with up to 75% less fat than traditional frying",
    category: "home",
    categoryName: "Home & Kitchen",
    rating: 4.8,
    reviewsCount: 64200,
    price: 89.99,
    originalPrice: 129.99,
    discount: "31% OFF",
    badge: "💰 Top Deal",
    badgeType: "deal",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B08N5LNQCX",
    specs: {
      "Capacity": "4 Quarts (Up to 2 lbs french fries)",
      "Power": "1500 Watts",
      "Temperature Range": "105°F to 400°F",
      "Dishwasher Safe": "Yes (Basket & crisper plate)",
      "Dimensions": "13.6 x 11 x 13.3 inches",
      "Functions": "Air Fry, Roast, Reheat, Dehydrate"
    },
    pros: [
      "Fast, even heat circulation gives restaurant-style crunch",
      "Very easy to clean ceramic nonstick basket",
      "Compact countertop footprint",
      "Over 64,000+ 5-star customer reviews"
    ],
    cons: [
      "4-quart capacity is best for 2-3 people, not large families",
      "Exterior can get warm during prolonged high-temp use"
    ],
    description: "The Ninja AF101 is the ultimate kitchen essential for healthy, quick, and delicious meals. Using rapid convection technology, it delivers crispy textures with little to no oil. Dishwasher-safe parts make cleanup effortless."
  },
  {
    id: "prod-5",
    asin: "B0977N916Y",
    title: "Logitech MX Master 3S Wireless Performance Mouse",
    tagline: "Quiet Clicks, 8K DPI any-surface tracking, MagSpeed electromagnetic scroll",
    category: "gaming",
    categoryName: "Desk & Productivity",
    rating: 4.8,
    reviewsCount: 19800,
    price: 98.99,
    originalPrice: 109.99,
    discount: "10% OFF",
    badge: "🏆 Productivity King",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0977N916Y",
    specs: {
      "Sensor": "Darkfield 8000 DPI (Tracks on glass)",
      "Scroll Wheel": "MagSpeed (Scrolls 1,000 lines/sec)",
      "Battery": "Up to 70 days per full charge",
      "Connectivity": "Bluetooth + Logi Bolt USB Receiver",
      "Multi-Device": "Pair up to 3 devices + Flow file transfer",
      "Weight": "141 grams"
    },
    pros: [
      "Quiet Clicks produce 90% less click noise",
      "Electromagnetic MagSpeed scroll wheel feels magic",
      "Super ergonomic thumb rest with gesture button",
      "Flawless tracking even on clear glass desks"
    ],
    cons: [
      "Designed specifically for right-handed users",
      "Heavier than ultra-light FPS gaming mice"
    ],
    description: "Feel every single moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor. The sculpted silhouette fits your palm naturally for all-day comfort."
  },
  {
    id: "prod-6",
    asin: "B0C9R84C8B",
    title: "Kindle Paperwhite (16 GB) – 6.8\" Glare-Free Display with Warm Light",
    tagline: "Waterproof e-reader with up to 10 weeks of battery and adjustable warm light",
    category: "tech",
    categoryName: "Tech & Reading",
    rating: 4.7,
    reviewsCount: 38400,
    price: 139.99,
    originalPrice: 159.99,
    discount: "13% OFF",
    badge: "📚 Must Have",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0C9R84C8B",
    specs: {
      "Screen": "6.8\" 300 ppi glare-free Paperwhite display",
      "Battery Life": "Up to 10 weeks on single charge",
      "Waterproofing": "IPX8 (Tested in 2 meters of fresh water)",
      "Storage": "16 GB (Holds thousands of books)",
      "Lighting": "Adjustable warm light (White to Amber)",
      "Charging": "USB-C Fast Charging"
    },
    pros: [
      "Reads like real paper even under bright direct sunlight",
      "Adjustable warm light is gentle on the eyes before bed",
      "Battery lasts weeks instead of hours",
      "Waterproof for reading by the pool or in the bath"
    ],
    cons: [
      "E-ink screen refresh is not built for high-speed video/apps",
      "Black and white display"
    ],
    description: "Now with a 6.8” display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns. Purpose-built for reading with a flush-front design and 300 ppi glare-free display."
  },
  {
    id: "prod-7",
    asin: "B0BTGXZQ45",
    title: "Bose QuietComfort Ultra Wireless Earbuds with Immersive Audio",
    tagline: "World-class active noise canceling, spatialized audio, custom tune technology",
    category: "tech",
    categoryName: "Tech & Audio",
    rating: 4.6,
    reviewsCount: 7890,
    price: 249.00,
    originalPrice: 299.00,
    discount: "17% OFF",
    badge: "✨ Spatial Audio",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0BTGXZQ45",
    specs: {
      "Audio": "Bose Immersive Audio (Spatial Audio)",
      "Battery Life": "6 hours (Up to 24 hours with case)",
      "Noise Cancellation": "CustomTune Adaptive ANC",
      "Fit": "9 Ear tip and stability band combinations",
      "Bluetooth": "Bluetooth 5.3 with aptX Adaptive",
      "Water Resistance": "IPX4 sweat and weather resistant"
    },
    pros: [
      "Bose Immersive Audio makes music feel live around you",
      "Silences aircraft cabin noise and busy coffee shops",
      "Super secure stability bands don't slip out",
      "Crystal clear phone call voice pickup"
    ],
    cons: [
      "Case doesn't include wireless charging natively out of box",
      "Earbud stems are slightly wider than AirPods Pro"
    ],
    description: "Groundbreaking spatialized audio for more immersive listening that makes your music feel realer than ever before — no matter the content or source. World-class noise cancellation and sound customized to you."
  },
  {
    id: "prod-8",
    asin: "B0CHWR1XMB",
    title: "Anker Prime 20,000mAh Power Bank (200W Output, Smart Digital Display)",
    tagline: "Ultra-fast charging for 2 MacBooks and phone simultaneously with real-time screen",
    category: "tech",
    categoryName: "Tech & Power",
    rating: 4.8,
    reviewsCount: 5410,
    price: 109.99,
    originalPrice: 129.99,
    discount: "15% OFF",
    badge: "⚡ Powerhouse",
    badgeType: "deal",
    image: "https://images.unsplash.com/photo-1609592424368-8094a6136d8d?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CHWR1XMB",
    specs: {
      "Total Output": "200W High Speed Power Delivery",
      "Capacity": "20,000mAh (Flight Approved)",
      "Ports": "2x USB-C (100W each max) + 1x USB-A (65W)",
      "Display": "Color Smart Digital Screen (Watts/Volts/Temp)",
      "Recharge Time": "100W input charges bank in 1 hour 15 min",
      "Dimensions": "4.9 × 2.1 × 1.9 inches"
    },
    pros: [
      "Can charge a 16-inch MacBook Pro and iPad at top speed together",
      "Clear smart display shows exact battery percentage and wattage",
      "Compact soda-can style design fits easily in backpacks",
      "ActiveShield 2.0 temperature protection prevents overheating"
    ],
    cons: [
      "Substantial weight at 1.18 lbs",
      "Higher price than low-wattage power banks"
    ],
    description: "Equipped with two high-powered USB-C ports and one USB-A port totaling 200W output, quickly charge two laptops simultaneously at 100W each for maximum efficiency. The smart digital display keeps you informed in real time."
  },
  {
    id: "prod-9",
    asin: "B09B2W5FG8",
    title: "Dyson V15 Detect Cordless Vacuum Cleaner with Laser Dirt Illumination",
    tagline: "Reveals invisible microscopic dust on hard floors with high torque anti-tangle head",
    category: "home",
    categoryName: "Home & Living",
    rating: 4.7,
    reviewsCount: 11200,
    price: 649.99,
    originalPrice: 749.99,
    discount: "13% OFF",
    badge: "🌟 Premium Pick",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B09B2W5FG8",
    specs: {
      "Suction Power": "230 Air Watts",
      "Run Time": "Up to 60 minutes",
      "Filtration": "Whole-machine HEPA filtration (99.99% @ 0.3 microns)",
      "Laser Sensor": "Green angled beam reveals invisible floor dust",
      "Piezo Sensor": "Counts and measures particle size automatically",
      "Weight": "6.8 lbs"
    },
    pros: [
      "Laser cleaner head makes floor cleaning incredibly satisfying",
      "Intelligently increases suction power when detecting deep dust",
      "LCD screen shows scientific proof of a deep clean",
      "De-tangling hair screw tool works wonders for pet owners"
    ],
    cons: [
      "Trigger must be held or clicked depending on mode",
      "Premium investment"
    ],
    description: "Dyson's most powerful, intelligent cordless vacuum. Engineered for whole-home deep cleaning. With laser illumination and a piezo sensor to count and size dust particles on screen."
  },
  {
    id: "prod-10",
    asin: "B09V3HBK6L",
    title: "Theragun Pro (5th Gen) Deep Tissue Percussive Therapy Massage Gun",
    tagline: "Visually guided treatments via OLED screen, quiet force technology, 6 attachments",
    category: "fitness",
    categoryName: "Fitness & Recovery",
    rating: 4.8,
    reviewsCount: 4120,
    price: 499.00,
    originalPrice: 599.00,
    discount: "17% OFF",
    badge: "💪 Pro Recovery",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B09V3HBK6L",
    specs: {
      "Amplitude": "16mm depth for deep muscle reach",
      "Stall Force": "60 lbs without stalling",
      "Speed Range": "1750 - 2400 PPM customizable",
      "Arm Position": "4-position rotating arm for full back reach",
      "Battery Life": "150 minutes with fast USB-C charging",
      "Noise Level": "20% quieter brushless motor"
    },
    pros: [
      "16mm amplitude reaches 60% deeper into muscle than consumer guns",
      "Rotating arm allows reaching 100% of your own upper and lower back",
      "Built-in guided routines on OLED display for sleep, warmup, and rehab",
      "Unrivaled 60 lbs stall force"
    ],
    cons: [
      "Commercial-grade weight",
      "More powerful than casual massage needs"
    ],
    description: "The ultimate recovery tool trusted by physiotherapists and pro athletes worldwide. Smarter and quieter than ever, the Theragun PRO helps you recover faster, relieve muscle soreness, and improve range of motion."
  },
  {
    id: "prod-11",
    asin: "B08924G1CB",
    title: "Elgato Stream Deck MK.2 – 15 Customizable Macro LCD Keys",
    tagline: "Trigger actions in apps, control OBS Studio, Twitch, Spotify, Discord with 1 tap",
    category: "gaming",
    categoryName: "Desk & Streaming",
    rating: 4.9,
    reviewsCount: 22400,
    price: 129.99,
    originalPrice: 149.99,
    discount: "13% OFF",
    badge: "🎮 Streamer Essential",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B08924G1CB",
    specs: {
      "Keys": "15 customizable LCD keys",
      "Interface": "USB 2.0 with detachable angled stand",
      "Software Support": "Elgato Marketplace, OBS, Twitch, Zoom, Photoshop",
      "Customization": "Interchangeable front faceplate",
      "Multi-Action": "Trigger multiple hotkeys/scripts in chain",
      "Compatibility": "Windows 10/11 & macOS 10.15+"
    },
    pros: [
      "Saves hours every week for content creators, streamers & coders",
      "Infinite folder nesting gives unlimited macro shortcut capacity",
      "Visual icon feedback confirms when mic is muted or camera is live",
      "Huge plugin store for Smart Home, Discord, and Adobe apps"
    ],
    cons: [
      "Requires software running in background",
      "15 keys might tempt you to upgrade to the 32-key XL version"
    ],
    description: "Stream Deck MK.2 features 15 tactile LCD keys to control apps, tools, and platforms. Trigger one or multiple actions, post social posts, adjust audio, turn on lights, and much more."
  },
  {
    id: "prod-12",
    asin: "B07ZPC9QD4",
    title: "Philips Sonicare DiamondClean 9000 Smart Electric Toothbrush",
    tagline: "Removes up to 10x more plaque, 4 brushing modes, pressure sensor & glass charger",
    category: "home",
    categoryName: "Health & Personal Care",
    rating: 4.7,
    reviewsCount: 16700,
    price: 179.95,
    originalPrice: 229.95,
    discount: "22% OFF",
    badge: "✨ Top Rated",
    badgeType: "deal",
    image: "https://images.unsplash.com/photo-1559591937-e160a0f8b488?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B07ZPC9QD4",
    specs: {
      "Cleaning Action": "Up to 62,000 bristle movements per minute",
      "Brushing Modes": "Clean, White+, Gum Health, Deep Clean+",
      "Intensity Levels": "3 intensities (Low, Medium, High)",
      "Battery Life": "Up to 14 days per full charge",
      "Charging": "Luxury rinse glass induction charger + USB travel case",
      "Sensors": "Pressure sensor alert + Brush head replacement reminder"
    },
    pros: [
      "Leaves teeth feeling dental-hygienist smooth and clean",
      "Luxury glass beaker induction charger looks amazing in bathroom",
      "Real-time pressure sensor protects sensitive gums from over-brushing",
      "4 versatile brushing modes for whitening and gum therapy"
    ],
    cons: [
      "Genuine Sonicare replacement brush heads can be expensive",
      "App connection is optional but adds extra steps"
    ],
    description: "Whiter, healthier teeth for life. Start every day in style with advanced Sonicare technology for whiter teeth and improved oral health. 4 modes and 3 intensities let you personalize your brushing."
  },
  {
    id: "prod-13",
    asin: "B0BVM9X43F",
    title: "Stanley Quencher H2.0 FlowState 40 oz Tumbler (Stainless Steel)",
    tagline: "The viral TikTok hydration tumbler with 3-way rotating lid and 11-hour ice retention",
    category: "home",
    categoryName: "Home & Lifestyle",
    rating: 4.8,
    reviewsCount: 78500,
    price: 45.00,
    originalPrice: 50.00,
    discount: "10% OFF",
    badge: "🔥 #1 Viral TikTok",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0BVM9X43F",
    specs: {
      "Capacity": "40 Ounces (1.18 Liters)",
      "Insulation": "Double-wall vacuum (11 hrs cold, 2 days iced)",
      "Material": "90% recycled 18/8 food-grade stainless steel",
      "Lid Type": "FlowState 3-position lid with splash resistance",
      "Cup Holder Friendly": "Yes (Narrow base fits car cup holders)",
      "Cleaning": "Dishwasher safe"
    },
    pros: [
      "Keeps ice frozen for over 48 hours in warm temperatures",
      "Fits perfectly into standard automobile cup holders",
      "Comfort-grip handle makes carrying 40oz effortless",
      "Extremely durable stainless steel body"
    ],
    cons: [
      "Not 100% leakproof if held completely upside down",
      "Heavy when filled to full capacity"
    ],
    description: "Constructed of recycled stainless steel for sustainable sipping, our 40 oz Quencher H2.0 offers maximum hydration with fewer refills. Commuting, studio workouts, day trips or your front porch—you'll want this tumbler by your side."
  },
  {
    id: "prod-14",
    asin: "B0CHWRXHQR",
    title: "Apple AirPods Pro 2 Wireless Earbuds (USB-C MagSafe Case)",
    tagline: "Up to 2x more Active Noise Cancellation, Transparency mode, and Hearing Aid feature",
    category: "tech",
    categoryName: "Tech & Audio",
    rating: 4.8,
    reviewsCount: 42100,
    price: 189.99,
    originalPrice: 249.00,
    discount: "24% OFF",
    badge: "⚡ Flash Deal",
    badgeType: "deal",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CHWRXHQR",
    specs: {
      "Chip": "Apple H2 Headphone Chip",
      "ANC": "Up to 2x more Active Noise Cancellation",
      "Audio": "Personalized Spatial Audio with dynamic head tracking",
      "Charging": "USB-C, MagSafe & Apple Watch charger",
      "Water Resistance": "IP54 dust, sweat, and water resistant",
      "Battery Life": "Up to 6 hours listening (30 hrs with case)"
    },
    pros: [
      "Unmatched transparency mode sounds like wearing nothing",
      "USB-C port matches modern iPhones and MacBooks",
      "Precision finding with built-in case speaker",
      "Now features scientifically validated clinical hearing protection"
    ],
    cons: [
      "Touch swipe volume controls take a little getting used to",
      "Full feature set requires iOS device"
    ],
    description: "AirPods Pro 2 feature up to 2x more Active Noise Cancellation, Adaptive Audio, and Transparency mode. Now with Hearing Health features including Hearing Protection, Hearing Test, and Clinical-Grade Hearing Aid capability."
  },
  {
    id: "prod-15",
    asin: "B0CL61F39H",
    title: "Sony PlayStation 5 Slim Console (1TB SSD, 4K 120Hz)",
    tagline: "Slimmer design, 1TB ultra-high speed storage, ray tracing, and 3D Audio",
    category: "gaming",
    categoryName: "Gaming & VR",
    rating: 4.9,
    reviewsCount: 31800,
    price: 499.00,
    originalPrice: 549.99,
    discount: "9% OFF",
    badge: "🎮 Gamer Choice",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CL61F39H",
    specs: {
      "Storage": "1TB Custom Ultra-High Speed NVMe SSD",
      "Resolution": "Up to 4K 120Hz with HDR and 8K output support",
      "Audio": "Tempest 3D AudioTech",
      "Controller": "DualSense Wireless Controller with Haptic Feedback",
      "Form Factor": "30% smaller volume than original PS5",
      "Ports": "2x Front USB-C, HDMI 2.1, Gigabit Ethernet"
    },
    pros: [
      "Near-instant game loading times with 1TB SSD",
      "DualSense haptic feedback and adaptive triggers feel incredible",
      "Compact, modern aesthetic fits television media consoles",
      "Enormous library of exclusive blockbuster games"
    ],
    cons: [
      "Vertical stand sold separately on slim model",
      "Fan is audible during intense graphical rendering"
    ],
    description: "Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games."
  },
  {
    id: "prod-16",
    asin: "B0CD27L93Y",
    title: "DJI Mini 4 Pro Drone with 4K/60fps HDR & Omnidirectional Obstacle Sensing",
    tagline: "Under 249g ultra-lightweight drone with 20km FHD video transmission and true vertical shooting",
    category: "tech",
    categoryName: "Drones & Cameras",
    rating: 4.8,
    reviewsCount: 9400,
    price: 759.00,
    originalPrice: 849.00,
    discount: "11% OFF",
    badge: "🚁 Top Tech 2026",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CD27L93Y",
    specs: {
      "Weight": "Under 249g (No FAA registration needed in many areas)",
      "Video Quality": "4K/60fps HDR + 4K/100fps Slow-Motion",
      "Safety": "Omnidirectional Active Obstacle Avoidance",
      "Transmission": "DJI O4 FHD Video Transmission up to 20 km",
      "Flight Time": "Up to 34 minutes per battery",
      "Shooting": "True Vertical Shooting for YouTube Shorts & Reels"
    },
    pros: [
      "Weighs less than 249 grams, regulatory-friendly worldwide",
      "True vertical camera rotation for instant TikTok / YouTube Shorts",
      "Omnidirectional sensors prevent crashes into trees and walls",
      "Outstanding dynamic range in low-light and sunrise/sunset"
    ],
    cons: [
      "Sensitive to high gale-force ocean winds",
      "Requires phone or dedicated screen controller"
    ],
    description: "Mini 4 Pro is DJI's most advanced mini drone to date. It integrates powerful imaging capabilities, omnidirectional obstacle sensing, ActiveTrack 360° with the new Trace Mode, and 20km FHD video transmission."
  },
  {
    id: "prod-17",
    asin: "B0CSB4K8L9",
    title: "Samsung Galaxy S24 Ultra (512GB, Galaxy AI, Titanium Gray)",
    tagline: "Titanium armor frame, 200MP camera with AI zoom, Snapdragon 8 Gen 3, and built-in S Pen",
    category: "tech",
    categoryName: "Smartphones",
    rating: 4.8,
    reviewsCount: 15300,
    price: 1219.99,
    originalPrice: 1419.99,
    discount: "14% OFF",
    badge: "📱 Flagship King",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CSB4K8L9",
    specs: {
      "Display": "6.8\" Flat Dynamic AMOLED 2X, 2600 nits, Gorilla Armor",
      "Processor": "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
      "Camera": "200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-wide",
      "AI Features": "Circle to Search, Live Translate, Note Assist",
      "Battery": "5000mAh with 45W Fast Charging",
      "Stylus": "Built-in S Pen included"
    },
    pros: [
      "Gorilla Glass Armor eliminates 75% of screen reflections",
      "Top-tier 200MP camera with insane 100x zoom capability",
      "Galaxy AI tools make summarizing and photo editing effortless",
      "Guaranteed 7 full years of Android OS and security upgrades"
    ],
    cons: [
      "Large phone dimensions may feel bulky in small pockets",
      "Does not include charging wall adapter in box"
    ],
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life. Your phone."
  },
  {
    id: "prod-18",
    asin: "B0C7JFD92D",
    title: "Apple Mac Studio (M2 Ultra 24-Core CPU, 60-Core GPU, 64GB Unified RAM, 1TB SSD)",
    tagline: "Outrageous powerhouse workstation for 8K video editing, 3D rendering, and machine learning",
    category: "tech",
    categoryName: "Pro Workstations",
    rating: 4.9,
    reviewsCount: 1640,
    price: 3799.00,
    originalPrice: 3999.00,
    discount: "5% OFF",
    badge: "🚀 High-Ticket Beast",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0C7JFD92D",
    specs: {
      "Processor": "Apple M2 Ultra (24-Core CPU, 60-Core GPU, 32-Core Neural Engine)",
      "Unified Memory": "64GB Fast Unified Memory (800GB/s bandwidth)",
      "Storage": "1TB Superfast NVMe SSD",
      "Displays Supported": "Up to 8 simultaneous 4K displays or 6x 6K displays",
      "Ports": "6x Thunderbolt 4, 2x USB-A, HDMI, 10Gb Ethernet, SDXC card slot",
      "Form Factor": "Compact 7.7-inch aluminum desktop enclosure"
    },
    pros: [
      "Incredible render speeds for 8K ProRes and complex 3D VFX",
      "Silent cooling architecture even under maximum stress workloads",
      "Massive port selection on front and back for pro peripherals",
      "Unmatched power efficiency compared to standard workstation towers"
    ],
    cons: [
      "Internal hardware components cannot be upgraded post-purchase",
      "Requires external monitor, keyboard, and mouse"
    ],
    description: "Embraced by creative pros everywhere, Mac Studio delivers extraordinary power with the M2 Ultra chip. It packs outrageous performance and extensive connectivity into an unbelievably compact form, letting you transform any space into a creative studio."
  },
  {
    id: "prod-19",
    asin: "B0CSG6TX9R",
    title: "ASUS ROG Strix SCAR 18 (2024) Gaming Laptop (Intel i9-14900HX, RTX 4090, 64GB DDR5, 2TB SSD)",
    tagline: "The pinnacle of mobile gaming: 18-inch 2.5K 240Hz Nebula HDR Display with RTX 4090 power",
    category: "gaming",
    categoryName: "Gaming Laptops",
    rating: 4.7,
    reviewsCount: 1850,
    price: 3699.99,
    originalPrice: 3999.99,
    discount: "8% OFF",
    badge: "⚡ 4K Gaming King",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CSG6TX9R",
    specs: {
      "GPU": "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W Max TGP)",
      "CPU": "Intel Core i9-14900HX 24-Cores / 32-Threads (up to 5.8 GHz)",
      "Screen": "18\" QHD+ 16:10 (2560 x 1600) 240Hz 3ms Mini-LED ROG Nebula HDR",
      "Memory": "64GB DDR5-5600MHz RAM",
      "Storage": "2TB PCIe 4.0 NVMe M.2 Performance SSD in RAID 0",
      "Cooling": "Conductonaut Extreme Liquid Metal + Tri-Fan Technology"
    },
    pros: [
      "Uncompromising ultra-settings 4K/QHD gaming framerates",
      "Stunning 1100-nit Mini-LED HDR screen with 100% DCI-P3 color",
      "Chilly thermals due to liquid metal and full-width vapor chamber",
      "Per-key RGB mechanical-feel keyboard with customizable lightbar"
    ],
    cons: [
      "Heavy 3.1kg chassis designed primarily for desk usage",
      "Short battery life under heavy gaming load"
    ],
    description: "Rule the battlefield with the ROG Strix SCAR 18. Dominate every competitive arena with the Intel Core i9 processor and NVIDIA GeForce RTX 4090 Laptop GPU. An 18-inch Mini LED panel provides stunning visuals that immerse you directly into AAA blockbusters."
  },
  {
    id: "prod-20",
    asin: "B078WML5PC",
    title: "Breville the Oracle Touch Fully Automatic Espresso Machine (Dual Boiler, Stainless Steel)",
    tagline: "Commercial barista-grade espresso, automated microfoam milk texturing, and swipe touch screen",
    category: "home",
    categoryName: "Luxury Kitchen",
    rating: 4.8,
    reviewsCount: 3980,
    price: 2799.95,
    originalPrice: 2999.95,
    discount: "7% OFF",
    badge: "☕ Barista Luxury",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B078WML5PC",
    specs: {
      "Boilers": "Dedicated Stainless Steel Dual Boilers (Simultaneous Brew & Steam)",
      "Interface": "Intuitive 4-inch Full Color Touchscreen with 8 customizable presets",
      "Grinder": "Integrated Precision Conical Burr Grinder with auto dose & tamp",
      "Steam Wand": "Hands-free automatic microfoam milk texturing with temp control",
      "Pressure": "Commercial 15-bar Italian pump with Over Pressure Valve (OPV)",
      "Material": "Heavy-duty Brushed Stainless Steel chassis"
    },
    pros: [
      "Automates grinding, dosing, tamping, and milk steaming to perfection",
      "Dual boilers allow pulling espresso shots and steaming milk at the exact same time",
      "Produces authentic café-quality microfoam essential for latte art",
      "Save up to 8 personalized custom coffee profiles"
    ],
    cons: [
      "Substantial kitchen counter footprint",
      "Requires regular water filtration and descaling maintenance"
    ],
    description: "Automated, touch screen operation simplifies how to make your favorite café coffee in three easy steps: grind, brew and milk. You can easily adjust coffee strength, milk texture or temperature to suit your taste. Then save it with your own unique name."
  },
  {
    id: "prod-21",
    asin: "B09JZT6YK5",
    title: "Sony Alpha 7 IV Full-Frame Mirrorless Camera Kit (33MP Sensor, 4K 60p, 28-70mm Lens)",
    tagline: "The benchmark hybrid camera for professional photography, 4K streaming, and cinematic filmmaking",
    category: "tech",
    categoryName: "Pro Cameras",
    rating: 4.8,
    reviewsCount: 3240,
    price: 2498.00,
    originalPrice: 2699.99,
    discount: "7% OFF",
    badge: "📸 Pro Creator",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B09JZT6YK5",
    specs: {
      "Sensor": "33MP Full-Frame Exmor R Back-Illuminated CMOS Sensor",
      "Processor": "BIONZ XR Engine with 8x more processing power",
      "Autofocus": "759-Point Phase-Detection AF with Real-time Eye AF for Humans/Animals/Birds",
      "Video": "4K 60p 10-Bit 4:2:2 recording, S-Cinetone, S-Log3",
      "Stabilization": "5-Axis In-Body Image Stabilization (5.5-step shutter advantage)",
      "Connectivity": "UVC/UAC Plug-and-play USB live streaming up to 4K 15p"
    },
    pros: [
      "Exceptional 33MP detail with unmatched dynamic range and color science",
      "Industry-leading autofocus locks onto eyes instantly even in low light",
      "Fully articulating touchscreen LCD ideal for vlogging and studio filming",
      "Dual card slots supporting CFexpress Type A and SD UHS-II"
    ],
    cons: [
      "4K 60p video recording incurs a minor 1.5x Super35 crop",
      "Advanced menu system has a slight learning curve for beginners"
    ],
    description: "An ideal all-arounder that pushes beyond basic, the Sony a7 IV does double duty with strong stills and video performance. Featuring an advanced 33MP Exmor R CMOS sensor and blazing BIONZ XR processing, it brings cinematic clarity to every frame."
  },
  {
    id: "prod-22",
    asin: "B0CVRFRK99",
    title: "Samsung 77-Inch Class OLED 4K S90D Series Smart TV (Pantone Validated, 144Hz, Dolby Atmos)",
    tagline: "Infinite contrast, pure deep blacks, quantum HDR, and ultra-fluid 144Hz PC gaming motion",
    category: "home",
    categoryName: "Home Theater",
    rating: 4.8,
    reviewsCount: 2410,
    price: 2497.99,
    originalPrice: 3297.99,
    discount: "24% OFF",
    badge: "🎬 Cinematic 4K",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CVRFRK99",
    specs: {
      "Screen Size": "77-Inch Diagonal Quantum Dot OLED Panel",
      "Resolution & Refresh": "4K UHD (3840 x 2160) at up to 144Hz Variable Refresh Rate",
      "Processor": "NQ4 AI Gen2 Processor with 20 AI neural networks",
      "Audio": "2.1 Channel 40W Speakers with Dolby Atmos & Object Tracking Sound Lite",
      "Gaming Features": "4x HDMI 2.1 Ports, FreeSync Premium Pro, Samsung Gaming Hub",
      "Design": "LaserSlim razor-thin design with virtually bezel-less infinity screen"
    },
    pros: [
      "Breathtaking pure black levels paired with vibrant Quantum Dot color brilliance",
      "144Hz refresh rate with sub-1ms input latency delivers elite gaming performance",
      "Anti-glare panel minimizes daytime ambient room reflections",
      "AI 4K upscaling elevates standard HD streaming to crisp near-4K clarity"
    ],
    cons: [
      "Large 77-inch profile requires a wide console table or sturdy wall mount",
      "Does not support Dolby Vision HDR format (uses HDR10+ Adaptive instead)"
    ],
    description: "Steal the show with the bold contrast, dramatic sound and vibrant colors of the Samsung OLED TV. Watch everything in sharp 4K thanks to AI-powered upscaling. Experience pure blacks, bright whites and Pantone-validated color accuracy."
  },
  {
    id: "prod-23",
    asin: "B003M1C7TY",
    title: "Herman Miller Embody Ergonomic Office & Gaming Chair (Sync Tilt, BackFit Adjustment)",
    tagline: "Engineered with 30+ medical physicians: pressure-distributing pixelated support that enhances blood flow",
    category: "gaming",
    categoryName: "Ergonomic Chairs",
    rating: 4.9,
    reviewsCount: 4120,
    price: 1795.00,
    originalPrice: 1995.00,
    discount: "10% OFF",
    badge: "👑 Ergonomic King",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1580481077195-c266a4f21cb4?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B003M1C7TY",
    specs: {
      "Support Matrix": "Dynamic Pixelated Support Matrix with BackFit Spine Alignment",
      "Adjustments": "Seat Depth, Fully Articulating Armrests, Tilt Limiter, Pneumatic Height",
      "Warranty": "Herman Miller 12-Year Official 24/7 Multi-Shift Warranty",
      "Weight Capacity": "Tested and rated for up to 300 lbs (136 kg)",
      "Eco Construction": "95% Recyclable materials assembled in green-energy facilities",
      "Upholstery": "Breathable Sync Fabric that prevents heat accumulation during long sessions"
    },
    pros: [
      "Completely eliminates lower back stiffness and tailbone pressure during 10+ hour days",
      "Instinctively contours to micro-movements of your spine in real-time",
      "Industry-leading 12-year manufacturer warranty covers all parts and mechanisms",
      "Fully assembled out of the box — zero tedious DIY assembly required"
    ],
    cons: [
      "Substantial investment price point for home offices",
      "Does not include an integrated headrest"
    ],
    description: "You feel Embody's pixelated support the moment you sit down — a sense that you are floating, yet perfectly balanced. The back of the chair is modeled after the human spine to reduce spine compression and encourage healthy blood circulation."
  },
  {
    id: "prod-24",
    asin: "B0CB93KDFQ",
    title: "Garmin tactix 7 AMOLED Edition Tactical GPS Smartwatch (Ballistics, NVG, 31-Day Battery)",
    tagline: "Military-grade tactical smartwatch with adaptive AMOLED display, built-in flashlight, and avionics",
    category: "fitness",
    categoryName: "Tactical Smartwatches",
    rating: 4.8,
    reviewsCount: 1920,
    price: 1399.99,
    originalPrice: 1499.99,
    discount: "7% OFF",
    badge: "🛡️ Military Grade",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0CB93KDFQ",
    specs: {
      "Display": "1.4\" Adaptive AMOLED Touchscreen with Scratch-Resistant Sapphire Crystal",
      "Durability": "Tested to U.S. Military Standards (MIL-STD-810G) for thermal, shock & water (10 ATM)",
      "Battery Life": "Up to 31 days in smartwatch mode / 82 hours in GPS mode",
      "Flashlight": "Multi-LED white and night-vision preserving green flashlight",
      "Tactical Features": "Kill Switch, Stealth Mode, Night Vision Goggle (NVG) compatibility, Jumpmaster",
      "Navigation": "Multi-Band GNSS with SatIQ Technology, TopoActive Maps, Direct-to Avionics"
    },
    pros: [
      "Unbelievable 31-day battery life with a razor-sharp AMOLED touchscreen",
      "Titanium bezel with DLC coating withstands severe outdoor punishment",
      "Built-in green/white flashlight is invaluable for daily and night operations",
      "Advanced physiological metrics for endurance, VO2 Max, and sleep recovery"
    ],
    cons: [
      "Large 51mm case may feel prominent on smaller wrists",
      "Premium tactical tool with specialized military features most casual users won't exhaust"
    ],
    description: "Featuring an adaptive AMOLED display, traditional buttons and touchscreen display, this tactical smartwatch offers mission-ready tactical features as well as mapping, training metrics, multi-GNSS positioning, and comprehensive health monitoring."
  },
  {
    id: "prod-25",
    asin: "B00PBX3L7K",
    title: "COSRX Snail Mucin 96% Power Repairing Essence (Hydrating Daily Serum, 3.38 fl oz)",
    tagline: "The #1 viral Korean skincare hit with 150,000+ reviews: lightweight repair serum for glowing glass skin",
    category: "fitness",
    categoryName: "Beauty & Skincare",
    rating: 4.8,
    reviewsCount: 152800,
    price: 14.99,
    originalPrice: 25.00,
    discount: "40% OFF",
    badge: "🔥 #1 Viral TikTok Hit",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1608248597359-7ffc93d9e843?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B00PBX3L7K",
    specs: {
      "Key Ingredient": "96.3% Snail Secretion Filtrate (Cruelty-Free)",
      "Skin Types": "Dry, Acne-Prone, Sensitive, Combination",
      "Key Benefits": "Soothes redness, hydrates deep skin layers, repairs barrier",
      "Texture": "Lightweight slippery gel essence that absorbs without stickiness",
      "Volume": "100ml / 3.38 fl. oz with hygienic pump dispenser",
      "Free From": "Parabens, Sulfates, Artificial Fragrance, Mineral Oil"
    },
    pros: [
      "Instantly quenches dry irritated skin and creates the viral Korean 'glass skin' look",
      "Massive 150,000+ verified buyer reviews confirm fast acne scar fading",
      "Hypoallergenic and dermatologist-tested for sensitive skin",
      "Tremendous value per ounce compared to luxury department store serums"
    ],
    cons: [
      "Slimy slippery texture can feel novel during first few uses",
      "Not formulated with strong active acids (focuses purely on hydration & soothing)"
    ],
    description: "Formulated with 96.3% Snail Secretion Filtrate, this essence protects the skin from moisture loss while improving skin elasticity. Snail mucin helps repair and soothes red, sensitized skin back to its radiant glow."
  },
  {
    id: "prod-26",
    asin: "B074PVTPBW",
    title: "Hero Cosmetics Mighty Patch Original Hydrocolloid Acne Pimple Patches (36 Count)",
    tagline: "The #1 best-selling acne patch on Amazon: visibly pulls out pimple gunk in 6 to 8 hours",
    category: "fitness",
    categoryName: "Beauty & Skincare",
    rating: 4.8,
    reviewsCount: 134500,
    price: 11.99,
    originalPrice: 14.99,
    discount: "20% OFF",
    badge: "⭐ #1 Best Seller",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B074PVTPBW",
    specs: {
      "Material": "100% Medical-Grade Pure Hydrocolloid",
      "Count": "36 Sterile 12mm circular blemish stickers",
      "Wear Time": "6 to 8 Hours (Perfect for overnight wear)",
      "Adhesion": "Ultra-thin tapered edges stay glued through tossing & turning",
      "Finish": "Translucent matte sticker blends effortlessly into skin tones",
      "Certifications": "Cruelty-free, vegan-friendly, non-drying"
    },
    pros: [
      "Pulls pus and fluids directly out of whiteheads overnight without popping",
      "Prevents finger picking and touching which eliminates acne scarring",
      "Completely drug-free and gentle on super delicate facial skin",
      "Turns white as it absorbs gunk so you see proof it worked"
    ],
    cons: [
      "Designed specifically for surfaced whiteheads (not deep cystic blemishes)",
      "Stickers must be applied to dry, oil-free skin for maximum adhesion"
    ],
    description: "Mighty Patch is a hydrocolloid sticker that improves the look of blemishes overnight without the popping. Just stick it on, get some sleep, and wake up with clearer-looking skin."
  },
  {
    id: "prod-27",
    asin: "B0016HF5GK",
    title: "Bissell Little Green Multi-Purpose Portable Carpet & Upholstery Cleaner (1400B)",
    tagline: "The legendary viral cleaning machine: removes tough pet stains, car seat grime, and sofa spills",
    category: "home",
    categoryName: "Home & Cleaning",
    rating: 4.7,
    reviewsCount: 128400,
    price: 99.59,
    originalPrice: 123.59,
    discount: "19% OFF",
    badge: "🔥 TikTok Cleaning Hero",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0016HF5GK",
    specs: {
      "Tank Capacity": "48 oz dual tank system (keeps clean & dirty water separate)",
      "Tools Included": "3\" Tough Stain Tool + 8 oz trial Spot & Stain formula with Febreze",
      "Power Cord Length": "15-foot cord + 4-foot flexible suction hose",
      "Weight": "Ultra-portable 9.6 lbs (easy to carry up stairs and out to vehicles)",
      "Application": "Sofas, area rugs, car interiors, mattresses, pet beds",
      "Eco Support": "Every purchase supports the BISSELL Pet Foundation"
    },
    pros: [
      "Unbelievable dirt extraction power restores dirty car seats and muddy sofas to new",
      "Compact size stores conveniently in small closets or laundry rooms",
      "Dual removable water tanks make filling and rinsing out dirty water effortless",
      "Hundreds of millions of TikTok views proving genuine stain removal"
    ],
    cons: [
      "Small 48 oz tank requires refilling on large multi-cushion couch cleanups",
      "Suction motor noise is similar to a compact vacuum cleaner"
    ],
    description: "The BISSELL Little Green portable carpet cleaner combines powerful suction with spot & stain spray to tackle pet messes, car detailing, and stubborn food spills on stairs and upholstery."
  },
  {
    id: "prod-28",
    asin: "B09B2W7J3J",
    title: "Owala FreeSip Insulated Stainless Steel Water Bottle with Straw (32 oz, Leak-Proof)",
    tagline: "The viral hydration sensation: dual sip-or-swig FreeSip spout, push-button lid, and 24h cold insulation",
    category: "fitness",
    categoryName: "Fitness & Hydration",
    rating: 4.9,
    reviewsCount: 48900,
    price: 37.99,
    originalPrice: 42.99,
    discount: "12% OFF",
    badge: "🥤 Viral Phenomenon",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B09B2W7J3J",
    specs: {
      "Capacity": "32 oz / 950 ml Double-Wall Vacuum Insulated Stainless Steel",
      "Spout System": "Patented FreeSip Spout (Sip upright through straw OR tilt back to chug)",
      "Lid Technology": "One-touch push-button flip lid with lock loop handle",
      "Insulation Duration": "Keeps water ice-cold for up to 24 full hours",
      "Safety": "100% Leak-Proof, BPA-free, lead-free, and phthalate-free",
      "Cleaning": "Dishwasher-safe lid with wide opening for easy hand washing"
    },
    pros: [
      "Patented FreeSip spout lets you drink upright without tipping your head back",
      "100% truly leak-proof lock loop lets you toss it into backpacks worry-free",
      "Triple-layer insulation keeps ice cubes intact throughout hot gym workouts",
      "Stunning retro color combinations loved by lifestyle creators worldwide"
    ],
    cons: [
      "32 oz diameter does not fit into tight compact car cup holders (fits in door pockets)",
      "Stainless steel body requires hand-washing to preserve exterior matte powder coat"
    ],
    description: "Meet the bottle that took over TikTok. The Owala FreeSip insulated stainless-steel water bottle features a patented FreeSip spout designed for either sipping upright through the built-in straw or tilting back to swig from the chug opening."
  },
  {
    id: "prod-29",
    asin: "B0C159ZJ7X",
    title: "Ninja CREAMi Deluxe 11-in-1 Ice Cream & Frozen Treat Maker (NC501 Series)",
    tagline: "Turn everyday ingredients into gourmet ice cream, sorbet, gelato, frozen yogurt, and slushies in minutes",
    category: "home",
    categoryName: "Kitchen Appliances",
    rating: 4.8,
    reviewsCount: 21500,
    price: 219.99,
    originalPrice: 249.99,
    discount: "12% OFF",
    badge: "🍦 Viral Dessert King",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B0C159ZJ7X",
    specs: {
      "Programs": "11 One-Touch Functions (Ice Cream, Sorbet, Gelato, Lite Ice Cream, Slushi, etc.)",
      "Capacity": "Deluxe 24 oz Pints (50% more ice cream than original CREAMi)",
      "Technology": "Dual-Drive Creamerizer Paddle shaves frozen blocks into ultra-creamy micro-crystals",
      "Customization": "Process top & bottom halves separately or add mix-ins (Oreos, peanut butter)",
      "Pints Included": "Includes (2) 24 oz XL Deluxe Pints with storage lids",
      "Dishwasher Safe": "Pints, lids, and processing paddle are top-rack dishwasher safe"
    },
    pros: [
      "Makes healthy low-calorie, high-protein ice cream with identical texture to commercial pints",
      "Deluxe 24 oz capacity provides enough treats for the whole family",
      "Mix-In button distributes chocolate chips, fruit, and nuts evenly without pulverizing them",
      "Massive viral TikTok recipe community with millions of healthy dessert creations"
    ],
    cons: [
      "Requires pre-freezing recipe liquid in pints for 24 hours prior to blending",
      "Motor is high-torque and loud during the 2-minute processing cycle"
    ],
    description: "The Ninja CREAMi Deluxe brings the ice cream parlor home. With 11 one-touch programs, turn simple household ingredients into rich, decadent frozen treats like gelato, Italian ice, milkshakes, and protein-packed ice creams."
  },
  {
    id: "prod-30",
    asin: "B07XXPHM23",
    title: "LANEIGE Lip Sleeping Mask with Vitamin C & Murumuru Butter (Berry Flavor, 0.7 oz)",
    tagline: "The holy grail overnight lip treatment: locks in intense moisture for soft, plump, baby-smooth lips",
    category: "fitness",
    categoryName: "Beauty & Lip Care",
    rating: 4.8,
    reviewsCount: 44200,
    price: 24.00,
    originalPrice: 28.00,
    discount: "14% OFF",
    badge: "💄 Cult Classic",
    badgeType: "editor",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=80",
    amazonUrl: "https://www.amazon.com/dp/B07XXPHM23",
    specs: {
      "Active Ingredients": "Berry Fruit Complex, Murumuru Seed Butter, Shea Butter, Vitamin C",
      "Texture": "Rich buttery balm that melts effortlessly onto dry lips",
      "Target": "Dry, chapped, peeling, or dehydrated lips",
      "Size": "20g / 0.7 oz (Lasts 6-9 months with daily use)",
      "Flavor": "Delicious sweet berry aroma",
      "Spatula": "Includes soft silicone lip applicator wand"
    },
    pros: [
      "Completely eradicates flaky dry lips in a single overnight application",
      "A small dab lasts all night without wiping off onto pillows",
      "Pot lasts over half a year of nightly use, making it very economical",
      "One of the most gifted and viral beauty items across beauty influencers"
    ],
    cons: [
      "Rich formula is meant primarily for night sleep (slightly thick for daytime under some lipsticks)",
      "Needs small applicator spatula kept handy"
    ],
    description: "A leave-on lip mask that delivers intense moisture and antioxidants while you sleep with its Moisture Wrap technology and Berry Fruit Complex. Wake up to supple, smooth, nourished lips."
  }
,
  {
    "id": "prod-31",
    "asin": "B0CHWRXH8B",
    "title": "Apple AirPods 4 with Active Noise Cancellation",
    "tagline": "Personalized Spatial Audio, ANC, USB-C charging — Apple's most advanced open-ear AirPods",
    "category": "tech",
    "categoryName": "Tech & Audio",
    "rating": 4.8,
    "reviewsCount": 32500,
    "price": 129,
    "originalPrice": 179,
    "discount": "28% OFF",
    "badge": "🔥 #1 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1606741965429-02919b2e0806?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B0CHWRXH8B",
    "specs": {
      "Chip": "Apple H2",
      "ANC": "Active Noise Cancellation",
      "Audio": "Personalized Spatial Audio",
      "Charging": "USB-C",
      "Battery": "30 hours total",
      "Sweat": "IP54"
    },
    "pros": [
      "Best-in-class open-ear ANC",
      "USB-C charging",
      "Seamless Apple ecosystem",
      "Spatial Audio is stunning"
    ],
    "cons": [
      "Open-ear — some sound leak",
      "Premium price vs base model"
    ],
    "description": "Apple AirPods 4 with ANC are the most advanced open-ear earbuds Apple has ever made. With H2 chip, you get Active Noise Cancellation in a completely open design. Pairs instantly with all Apple devices."
  },
  {
    "id": "prod-32",
    "asin": "B09G9HD6PD",
    "title": "Stanley Quencher H2.0 FlowState Tumbler 40 oz",
    "tagline": "The internet-famous 40oz tumbler — keeps drinks cold for 2 days. Viral on TikTok with 80M+ views",
    "category": "home",
    "categoryName": "Home & Kitchen",
    "rating": 4.8,
    "reviewsCount": 89200,
    "price": 35,
    "originalPrice": 45,
    "discount": "22% OFF",
    "badge": "🔥 #1 Viral Pick",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B09G9HD6PD",
    "specs": {
      "Capacity": "40 oz",
      "Cold": "2+ days iced",
      "Hot": "5-7 hours",
      "Material": "18/8 Stainless Steel",
      "Dishwasher": "Yes",
      "Handle": "Comfort-Grip Removable"
    },
    "pros": [
      "Viral on TikTok & Instagram — 80M+ views",
      "FlowState 3-position lid",
      "Fits in car cup holder",
      "Keeps ice 36+ hours"
    ],
    "cons": [
      "Condensation in humid weather",
      "Lid can be stiff initially"
    ],
    "description": "The Stanley Quencher H2.0 FlowState is the legendary 40oz tumbler that broke the internet. Double-wall vacuum insulation keeps your drinks ice cold for 2+ days. The FlowState lid has 3 positions: straw, sip, and close."
  },
  {
    "id": "prod-33",
    "asin": "B08HR712CL",
    "title": "Mighty Patch Original Hydrocolloid Acne Patches (36 Count)",
    "tagline": "#1 rated acne patch — absorbs pus & flattens pimples overnight. Dermatologist approved, 157K+ reviews",
    "category": "beauty",
    "categoryName": "Beauty & Skincare",
    "rating": 4.6,
    "reviewsCount": 157000,
    "price": 12.99,
    "originalPrice": 16.99,
    "discount": "24% OFF",
    "badge": "🔥 #1 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B08HR712CL",
    "specs": {
      "Count": "36 patches (3 sizes)",
      "Technology": "Medical-grade Hydrocolloid",
      "Usage": "Overnight 6-8 hours",
      "Skin Type": "All skin types",
      "Certified": "Dermatologist Approved",
      "Vegan": "Yes"
    },
    "pros": [
      "Visibly absorbs pus overnight",
      "#1 acne patch with 157K reviews",
      "Protects from picking & bacteria",
      "Nearly invisible on skin"
    ],
    "cons": [
      "Works best on whiteheads only",
      "Single-use — not reusable"
    ],
    "description": "Mighty Patch is the #1 bestselling acne patch in America. Medical-grade hydrocolloid absorbs pus and flattens pimples overnight. Just apply before bed and wake up to clearer skin. Used by millions worldwide."
  },
  {
    "id": "prod-34",
    "asin": "B0BFQQ7K3H",
    "title": "Ring Battery Doorbell Pro 2nd Gen — Smart Video Doorbell",
    "tagline": "Head-to-Toe HD+ video, 3D motion detection, color night vision, 2-way talk — no wiring needed",
    "category": "home",
    "categoryName": "Smart Home",
    "rating": 4.5,
    "reviewsCount": 28400,
    "price": 179.99,
    "originalPrice": 229.99,
    "discount": "22% OFF",
    "badge": "⭐ Amazon's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B0BFQQ7K3H",
    "specs": {
      "Video": "1536p HD+ Head-to-Toe",
      "Vision": "Advanced Color Night Vision",
      "Motion": "3D Bird's Eye Motion Detection",
      "Audio": "2-way Noise Cancellation",
      "Power": "Rechargeable Battery 6 months",
      "Alexa": "Works with Alexa"
    },
    "pros": [
      "Head-to-Toe video shows packages clearly",
      "3D Bird's Eye View path tracking",
      "Color night vision exceptional",
      "Easy battery — no wiring needed"
    ],
    "cons": [
      "Ring Protect subscription $3.99/mo for history",
      "Battery takes 5-6 hours to charge"
    ],
    "description": "Ring Battery Doorbell Pro is Ring's most advanced wire-free doorbell. With 3D Motion Detection, Bird's Eye View, and Head-to-Toe HD+ video with color night vision, you'll never miss a delivery or visitor again."
  },
  {
    "id": "prod-35",
    "asin": "B09V3KXJPB",
    "title": "Kindle Paperwhite Signature Edition 32GB — Waterproof E-Reader",
    "tagline": "6.8\" display, warm light, wireless charging, IPX8 waterproof — 12 weeks battery. The ultimate e-reader",
    "category": "tech",
    "categoryName": "Tech & Gadgets",
    "rating": 4.8,
    "reviewsCount": 76300,
    "price": 139.99,
    "originalPrice": 189.99,
    "discount": "26% OFF",
    "badge": "⭐ Editor's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B09V3KXJPB",
    "specs": {
      "Display": "6.8-inch 300 ppi",
      "Storage": "32 GB",
      "Light": "Auto warm light",
      "Battery": "Up to 12 weeks",
      "Waterproof": "IPX8 2m/60min",
      "Charging": "USB-C + Wireless Qi"
    },
    "pros": [
      "Zero glare in direct sunlight",
      "Wireless charging effortless",
      "32GB stores 30,000+ books",
      "12 weeks battery life"
    ],
    "cons": [
      "No physical page-turn buttons",
      "Higher price than base Paperwhite"
    ],
    "description": "Kindle Paperwhite Signature Edition is the ultimate e-reader with wireless charging, auto-adjusting warm light, and IPX8 waterproofing. Perfect poolside, in the bath, or under the covers. 32GB stores your entire library."
  },
  {
    "id": "prod-36",
    "asin": "B09B8YWXDF",
    "title": "Apple Watch Series 10 GPS 42mm — Thinnest Apple Watch Ever",
    "tagline": "Sleep Apnea detection, ECG, Blood Oxygen, Always-On display, 18-hour battery — most advanced health smartwatch",
    "category": "fitness",
    "categoryName": "Fitness & Health",
    "rating": 4.7,
    "reviewsCount": 41200,
    "price": 329,
    "originalPrice": 399,
    "discount": "18% OFF",
    "badge": "🔥 #1 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B09B8YWXDF",
    "specs": {
      "Display": "Always-On Retina OLED",
      "Health": "Sleep Apnea Detection, ECG, Blood O2",
      "Fitness": "60+ workout modes",
      "Battery": "18 hours + fast charge",
      "Water": "50m waterproof",
      "Chip": "Apple S10 dual-core"
    },
    "pros": [
      "Sleep Apnea detection can save lives",
      "Thinnest Apple Watch design ever",
      "Double-tap gesture control",
      "Most accurate heart rate monitor"
    ],
    "cons": [
      "Requires nightly charging",
      "Only works with iPhone"
    ],
    "description": "Apple Watch Series 10 is the thinnest Apple Watch ever with Sleep Apnea detection (FDA cleared), ECG, blood oxygen monitoring, and 60+ workout modes. The Always-On Retina display is 30% larger than Series 4."
  },
  {
    "id": "prod-37",
    "asin": "B08PPDJWC8",
    "title": "Ninja AF101 Air Fryer 4 Quart — 112,000+ Reviews",
    "tagline": "4-in-1: Air Fry, Roast, Reheat & Dehydrate. Up to 75% less fat. Most reviewed air fryer on Amazon",
    "category": "home",
    "categoryName": "Home & Kitchen",
    "rating": 4.8,
    "reviewsCount": 112000,
    "price": 89.99,
    "originalPrice": 129.99,
    "discount": "31% OFF",
    "badge": "🔥 #1 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B08PPDJWC8",
    "specs": {
      "Capacity": "4 Quart (2-4 people)",
      "Functions": "Air Fry, Roast, Reheat, Dehydrate",
      "Temp": "105°F to 400°F",
      "Fat": "75% less than deep fry",
      "Wattage": "1550W",
      "Dishwasher": "Yes"
    },
    "pros": [
      "112,000+ 5-star reviews",
      "Crispy wings & fries in 15-20 min",
      "Compact footprint",
      "No preheat needed saves time"
    ],
    "cons": [
      "4QT small for large families",
      "No digital display on base model"
    ],
    "description": "Ninja AF101 is the #1 bestselling air fryer on Amazon with 112,000+ verified reviews. Air fry, roast, reheat, and dehydrate with 75% less fat. Perfect for crispy chicken, fries, vegetables, and reheating leftovers."
  },
  {
    "id": "prod-38",
    "asin": "B07BNGZBS5",
    "title": "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Qt",
    "tagline": "World's #1 multi-cooker — pressure cook, slow cook, rice, steam, sauté, yogurt & warm. 138,000+ reviews",
    "category": "home",
    "categoryName": "Home & Kitchen",
    "rating": 4.7,
    "reviewsCount": 138000,
    "price": 79.95,
    "originalPrice": 99.95,
    "discount": "20% OFF",
    "badge": "🔥 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B07BNGZBS5",
    "specs": {
      "Capacity": "6 Quart (4-6 people)",
      "Functions": "7-in-1 multi-cooker",
      "Programs": "13 smart programs",
      "Safety": "10 safety mechanisms",
      "Material": "Stainless Steel inner pot",
      "Certified": "UL/ULC"
    },
    "pros": [
      "Replaces 7 kitchen appliances",
      "138,000+ reviews",
      "Cooks frozen chicken in 20 min",
      "Delay start very convenient"
    ],
    "cons": [
      "Learning curve for timing",
      "Takes up counter space"
    ],
    "description": "The Instant Pot Duo is the world's #1 selling multi-cooker. Replace 7 kitchen appliances: pressure cook, slow cook, rice, steam, sauté, yogurt, and warm. Cuts cooking time by up to 70%."
  },
  {
    "id": "prod-39",
    "asin": "B081QSJNRJ",
    "title": "COSRX Advanced Snail 96 Mucin Power Essence 100ml",
    "tagline": "Korean beauty cult-favorite — 96% snail mucin repairs skin, hydrates & fades acne scars. Viral on TikTok 500M views",
    "category": "beauty",
    "categoryName": "Beauty & Skincare",
    "rating": 4.5,
    "reviewsCount": 94600,
    "price": 19,
    "originalPrice": 25,
    "discount": "24% OFF",
    "badge": "🔥 Viral TikTok",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B081QSJNRJ",
    "specs": {
      "Ingredient": "96% Snail Secretion Filtrate",
      "Size": "100ml",
      "Skin Type": "All types",
      "pH": "6.5 optimal",
      "Cruelty Free": "PETA certified",
      "Fragrance": "Fragrance Free"
    },
    "pros": [
      "Highest snail mucin concentration",
      "Fades hyperpigmentation in 2-4 weeks",
      "Lightweight — layers perfectly",
      "500M+ TikTok views"
    ],
    "cons": [
      "Not vegan (snail-derived)",
      "Results take 2-4 weeks"
    ],
    "description": "COSRX Snail 96 Mucin Essence is Korean skincare's most iconic product. 96% snail secretion filtrate hydrates, repairs skin damage, fades acne scars, and smooths texture. 94,600+ reviews. Went viral on TikTok."
  },
  {
    "id": "prod-40",
    "asin": "B07HBQNNGP",
    "title": "Anker 65W 3-Port GaN USB-C Wall Charger",
    "tagline": "Charge iPhone + iPad + MacBook simultaneously. GaN technology — 40% smaller than Apple charger. Works in 150 countries",
    "category": "tech",
    "categoryName": "Tech & Accessories",
    "rating": 4.7,
    "reviewsCount": 67800,
    "price": 35.99,
    "originalPrice": 49.99,
    "discount": "28% OFF",
    "badge": "⭐ Amazon's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B07HBQNNGP",
    "specs": {
      "Ports": "2x USB-C + 1x USB-A",
      "Wattage": "65W total",
      "Tech": "GaN Gallium Nitride",
      "Compatible": "iPhone, MacBook, iPad, Samsung",
      "Size": "40% smaller than Apple 65W",
      "Safety": "Multi-protect surge protection"
    },
    "pros": [
      "Replaces 3 bulky chargers in one",
      "GaN — 40% smaller same power",
      "Charges MacBook 0-80% in 45 min",
      "Works in 150+ countries"
    ],
    "cons": [
      "Cables not included",
      "Wall outlet only"
    ],
    "description": "Anker's 65W GaN 3-port charger replaces three separate chargers. Advanced GaN technology delivers 65W across two USB-C and one USB-A port in a charger 40% smaller than Apple's equivalent. Charge phone, tablet, and laptop simultaneously."
  },
  {
    "id": "prod-41",
    "asin": "B099VMT8VZ",
    "title": "Tile Mate Bluetooth Tracker 4-Pack — Find Keys, Wallet & Bags",
    "tagline": "300ft Bluetooth range, 1-year battery, works with Alexa & Google Home — never lose your keys again",
    "category": "tech",
    "categoryName": "Tech & Accessories",
    "rating": 4.4,
    "reviewsCount": 89400,
    "price": 59.99,
    "originalPrice": 79.99,
    "discount": "25% OFF",
    "badge": "⭐ Amazon's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1644725564200-7c42e8d9e77e?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B099VMT8VZ",
    "specs": {
      "Range": "300 ft Bluetooth",
      "Battery": "1-year replaceable",
      "Pack": "4 Tile Mates",
      "Alexa": "Works with Alexa",
      "Water": "IP67 waterproof",
      "Network": "Tile Network millions of phones"
    },
    "pros": [
      "Find keys, wallet, pet from phone",
      "Tile Network community finding",
      "4-pack value",
      "Works with Alexa voice"
    ],
    "cons": [
      "Premium features need subscription",
      "Network depends on nearby Tile users"
    ],
    "description": "Tile Mate 4-pack lets you find anything. Keys in the couch? Open the Tile app and ring them. 300ft range and a network of millions of Tile users means you can find items even when far away."
  },
  {
    "id": "prod-42",
    "asin": "B07D4D2JYJ",
    "title": "Fitbit Charge 6 Advanced Fitness Tracker with Google Maps",
    "tagline": "Built-in GPS, Google Maps on wrist, 40+ workouts, 7-day battery, stress & sleep tracking — no phone needed",
    "category": "fitness",
    "categoryName": "Fitness & Health",
    "rating": 4.4,
    "reviewsCount": 38700,
    "price": 129.95,
    "originalPrice": 159.95,
    "discount": "19% OFF",
    "badge": "⭐ Amazon's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B07D4D2JYJ",
    "specs": {
      "GPS": "Built-in GPS",
      "Heart Rate": "24/7 continuous",
      "Exercise": "40+ workout modes",
      "Sleep": "Sleep stages + Sleep Score",
      "Battery": "7 days",
      "Google": "Maps, Wallet, YouTube Music",
      "Water": "50m waterproof"
    },
    "pros": [
      "Built-in GPS — no phone needed",
      "Google Maps navigation on wrist",
      "7-day battery charge once a week",
      "Stress management score"
    ],
    "cons": [
      "Premium features need Fitbit Premium",
      "Small screen vs Apple Watch"
    ],
    "description": "Fitbit Charge 6 is the most capable Fitbit ever, powered by Google. Track 40+ exercises, navigate with Google Maps from your wrist, and get a daily Readiness Score. 7-day battery life means charge it Sunday and forget it all week."
  },
  {
    "id": "prod-43",
    "asin": "B00FLYWNYQ",
    "title": "Hydro Flask 32 oz Wide Mouth Water Bottle — Lifetime Warranty",
    "tagline": "Keeps drinks cold 24h, hot 12h with TempShield insulation. BPA-free, dishwasher safe, lifetime warranty",
    "category": "fitness",
    "categoryName": "Fitness & Outdoors",
    "rating": 4.8,
    "reviewsCount": 74200,
    "price": 37.49,
    "originalPrice": 49.95,
    "discount": "25% OFF",
    "badge": "🔥 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B00FLYWNYQ",
    "specs": {
      "Size": "32 oz Wide Mouth",
      "Cold": "24 hours iced",
      "Hot": "12 hours hot",
      "Material": "18/8 Pro-Grade Stainless",
      "BPA Free": "100% BPA-free",
      "Dishwasher": "Yes",
      "Warranty": "Lifetime"
    },
    "pros": [
      "Cult global following",
      "Wide mouth fits ice easily",
      "Color Last powder coat",
      "Lifetime warranty"
    ],
    "cons": [
      "Premium price vs generic",
      "Cap noisy on hard surfaces"
    ],
    "description": "Hydro Flask is the iconic water bottle trusted by outdoor enthusiasts worldwide. TempShield double-wall insulation keeps drinks ice cold for 24 hours and hot for 12 hours. Backed by a lifetime warranty — the last water bottle you'll buy."
  },
  {
    "id": "prod-44",
    "asin": "B07VGRJDFY",
    "title": "Amazon Echo Dot 5th Gen — Smart Speaker with Motion Sensor & Alexa",
    "tagline": "Crisp clear 360° sound, motion sensor, eero WiFi extender, Alexa — world's #1 most popular smart speaker (186K+ reviews)",
    "category": "home",
    "categoryName": "Smart Home",
    "rating": 4.7,
    "reviewsCount": 186000,
    "price": 39.99,
    "originalPrice": 49.99,
    "discount": "20% OFF",
    "badge": "🔥 #1 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B07VGRJDFY",
    "specs": {
      "Audio": "Improved directional audio",
      "Motion Sensor": "Built-in triggers Alexa routines",
      "WiFi": "eero WiFi extender built-in",
      "Voice": "Far-field microphones",
      "Smart Hub": "Zigbee, Matter, Thread",
      "Privacy": "Physical mic off button"
    },
    "pros": [
      "186,000+ reviews — world's most trusted",
      "Motion sensor for smart routines",
      "Extends WiFi network free",
      "Controls entire smart home by voice"
    ],
    "cons": [
      "Not audiophile quality",
      "Privacy-conscious users may hesitate"
    ],
    "description": "Echo Dot 5th Gen is the world's best-selling smart speaker with 186,000+ reviews. Improved audio, built-in motion sensor, eero WiFi mesh extension, and full Alexa. Set timers, play music, control smart lights — all hands-free."
  },
  {
    "id": "prod-45",
    "asin": "B07ZPKN6YR",
    "title": "Vitamix E310 Explorian Blender 48oz — Professional Grade",
    "tagline": "2.0 HP motor, aircraft-grade blades, makes silky smoothies, hot soups & nut butters in 60 seconds. 5-year warranty",
    "category": "home",
    "categoryName": "Home & Kitchen",
    "rating": 4.7,
    "reviewsCount": 22900,
    "price": 279.95,
    "originalPrice": 349.95,
    "discount": "20% OFF",
    "badge": "⭐ Editor's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B07ZPKN6YR",
    "specs": {
      "Container": "48 oz BPA-free",
      "Motor": "2.0 HP",
      "Blades": "Aircraft-grade stainless steel",
      "Speeds": "10 variable + Pulse",
      "Heat": "Hot soup from friction in 6 min",
      "Warranty": "5 years"
    },
    "pros": [
      "Frozen fruit to ice cream in 30s",
      "Self-cleaning with just water",
      "5-year warranty on $280 blender",
      "Makes hot soup with no heat source"
    ],
    "cons": [
      "Premium investment",
      "Large footprint on counter"
    ],
    "description": "Vitamix E310 Explorian is professional blending made accessible. 2.0 HP motor and aircraft-grade stainless blades make silky smoothies, soups, nut butters, and ice cream in under 60 seconds. 5-year warranty makes it the last blender you'll ever need."
  },
  {
    "id": "prod-46",
    "asin": "B09G3HRMVB",
    "title": "Red Light Therapy Face Device — 7 LED Anti-Aging Facial Massager",
    "tagline": "7 LED wavelengths + EMS microcurrent + vibration — clinically proven collagen boost, wrinkle reduction & acne clearing at home",
    "category": "beauty",
    "categoryName": "Beauty & Skincare",
    "rating": 4.4,
    "reviewsCount": 18700,
    "price": 89.99,
    "originalPrice": 139.99,
    "discount": "36% OFF",
    "badge": "🔥 Viral TikTok",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B09G3HRMVB",
    "specs": {
      "Light": "7 LED wavelengths (Red, NIR, Blue, Green)",
      "EMS": "Microcurrent facial lifting",
      "Vibration": "8000 RPM massage",
      "Session": "10-min daily treatment",
      "Results": "Visible in 4-8 weeks",
      "Safe": "FDA-cleared",
      "Charging": "USB-C rechargeable"
    },
    "pros": [
      "7 wavelengths target wrinkles, spots & acne",
      "EMS firms and lifts facial muscles",
      "Replaces expensive spa treatments",
      "Viral TikTok beauty sensation"
    ],
    "cons": [
      "Consistent daily use required 4-8 weeks",
      "10-20 min daily treatment"
    ],
    "description": "This 7-LED red light therapy device combines EMS microcurrent and vibration massage for a professional anti-aging facial at home. Red light stimulates collagen, blue light kills acne bacteria, and EMS firms sagging skin. FDA-cleared and clinically proven."
  },
  {
    "id": "prod-47",
    "asin": "B09JQL3NWT",
    "title": "Phomemo M02 Pro Mini Bluetooth Photo Printer — Zero Ink Sticker Printer",
    "tagline": "Print 3x3 full-color sticker photos from your phone in 30 seconds — no ink needed. Viral on TikTok & Instagram",
    "category": "tech",
    "categoryName": "Tech & Gadgets",
    "rating": 4.3,
    "reviewsCount": 41300,
    "price": 59.99,
    "originalPrice": 89.99,
    "discount": "33% OFF",
    "badge": "🔥 Viral Pick",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B09JQL3NWT",
    "specs": {
      "Size": "3x3 inch prints",
      "Tech": "ZINK zero-ink",
      "Connection": "Bluetooth 5.0 iOS & Android",
      "DPI": "300 DPI full color",
      "Battery": "500mAh 20+ photos",
      "Paper": "Self-adhesive sticker",
      "Speed": "30-60 seconds per photo"
    },
    "pros": [
      "No ink cartridge ever needed",
      "Prints as sticky-back stickers",
      "Pocket size — fits in handbag",
      "Viral TikTok photo journal trend"
    ],
    "cons": [
      "Special Phomemo paper needed ongoing",
      "Lower quality vs professional prints"
    ],
    "description": "Phomemo M02 Pro lets you print 3x3 full-color sticker photos from your phone in seconds. ZINK zero-ink means no cartridges. Perfect for journals, scrapbooks, gifts, and decorating your space. The viral photo printer of 2026."
  },
  {
    "id": "prod-48",
    "asin": "B084DWCZY2",
    "title": "Ultimate Ears BOOM 3 Portable Bluetooth Speaker — IP67 Waterproof",
    "tagline": "360° full immersive sound, floats on water, 15-hour battery, 100ft range. Connects to 150+ speakers for epic parties",
    "category": "tech",
    "categoryName": "Tech & Audio",
    "rating": 4.7,
    "reviewsCount": 54200,
    "price": 89.95,
    "originalPrice": 119.99,
    "discount": "25% OFF",
    "badge": "🔥 Best Seller",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B084DWCZY2",
    "specs": {
      "Sound": "360° full-circle",
      "Battery": "15 hours",
      "Waterproof": "IP67 — floats on water",
      "Range": "100 ft Bluetooth",
      "PartyUp": "Connect 150+ speakers",
      "Weight": "1.3 lbs"
    },
    "pros": [
      "Floats on water — pool/beach safe",
      "15-hour battery all-day outdoor",
      "Connect 150 speakers for massive party",
      "360° fills any space perfectly"
    ],
    "cons": [
      "No built-in speakerphone mic",
      "Bass light for EDM lovers"
    ],
    "description": "UE BOOM 3 delivers 360° loud immersive sound with deep bass. IP67 waterproof — it literally floats on water. 15-hour battery, 100ft Bluetooth range, and connect to 150 UE speakers for a massive outdoor party setup."
  },
  {
    "id": "prod-49",
    "asin": "B09B9G48R9",
    "title": "iRobot Roomba i4+ EVO Self-Emptying Robot Vacuum",
    "tagline": "Smart mapping robot vacuum that empties itself for 60 days, learns your floor plan & avoids obstacles. Works with Alexa",
    "category": "home",
    "categoryName": "Home & Kitchen",
    "rating": 4.4,
    "reviewsCount": 29800,
    "price": 349.99,
    "originalPrice": 499.99,
    "discount": "30% OFF",
    "badge": "⭐ Editor's Choice",
    "badgeType": "editor",
    "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B09B9G48R9",
    "specs": {
      "Self-Empty": "60-day auto-empty Clean Base",
      "Mapping": "Smart room mapping learns home",
      "Suction": "10x power-lifting",
      "Navigation": "3-stage dual rubber brushes",
      "Alexa": "Works with Alexa & Google",
      "Runtime": "75 min before auto-recharge"
    },
    "pros": [
      "Self-empties 60 days — never touch dirt",
      "Smart room zone mapping",
      "Alexa voice control works great",
      "Dual brushes don't tangle pet hair"
    ],
    "cons": [
      "Clean Base takes floor space",
      "Struggles with dark floors"
    ],
    "description": "Roomba i4+ EVO changes the game with its Clean Base — robot empties itself for 60 days. Maps your home room-by-room, sets cleaning zones, and integrates with Alexa for voice control. The most hands-free vacuum on Amazon."
  },
  {
    "id": "prod-50",
    "asin": "B08C1W5N87",
    "title": "Anti-Theft Travel Backpack 15.6\" — USB Charging Port & TSA Lock",
    "tagline": "Hidden anti-theft back pocket, USB charging port, TSA combination lock, water resistant — the ultimate commuter & travel backpack",
    "category": "fitness",
    "categoryName": "Travel & Lifestyle",
    "rating": 4.6,
    "reviewsCount": 48300,
    "price": 45.99,
    "originalPrice": 69.99,
    "discount": "34% OFF",
    "badge": "🔥 Trending",
    "badgeType": "hot",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    "amazonUrl": "https://www.amazon.com/dp/B08C1W5N87",
    "specs": {
      "Laptop": "15.6-inch fits",
      "Anti-Theft": "Hidden back zipper pocket",
      "USB": "External USB-A port + cable",
      "TSA": "Built-in combination lock",
      "Water": "Water-resistant polyester",
      "Volume": "30L capacity",
      "Weight": "1.5 lbs lightweight"
    },
    "pros": [
      "Hidden pocket thieves can't access",
      "USB port keeps phone charged",
      "Fits under airplane seat",
      "48,000+ reviews from travelers"
    ],
    "cons": [
      "Built-in USB cable fixed",
      "Back panel awkward to self-access"
    ],
    "description": "The Anti-Theft Travel Backpack is the ultimate travel companion with a hidden back anti-theft pocket, built-in USB charging port, TSA-lock compartment, and water-resistant shell. Trusted by 48,000+ travelers worldwide for commuting and air travel."
  }
];

// Global configuration for Affiliate Tag
const APP_CONFIG = {
  defaultAffiliateTag: "affiliprimehu-20", // Official Amazon Associate Tag
  storageKey: "amazon_affiliate_tag_custom",
  siteName: "AffiliPrime Hub",
  currencySymbol: "$",
  amazonAssociateDisclosure: "As an Amazon Associate, we earn from qualifying purchases at no additional cost to you."
};
