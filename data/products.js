// Curated database of trending, high-converting Amazon products
const PRODUCTS_DATA = [
  {
    id: "prod-1",
    asin: "B09G96TFF7",
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
    amazonUrl: "https://www.amazon.com/dp/B09G96TFF7",
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
    asin: "B0CHWRXH8B",
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
    amazonUrl: "https://www.amazon.com/dp/B0CHWRXH8B",
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
