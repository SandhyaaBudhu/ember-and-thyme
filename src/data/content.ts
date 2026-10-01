export const images = {
  hero: `${import.meta.env.BASE_URL}images/hero.jpg`, harvest: `${import.meta.env.BASE_URL}images/harvest.jpg`, fish: `${import.meta.env.BASE_URL}images/fish.jpg`,
  pasta: `${import.meta.env.BASE_URL}images/pasta.jpg`, chef: `${import.meta.env.BASE_URL}images/chef.jpg`, wine: `${import.meta.env.BASE_URL}images/wine.jpg`,
  room: `${import.meta.env.BASE_URL}images/room.jpg`, garden: `${import.meta.env.BASE_URL}images/garden.jpg`,
}

export const signatureDishes = [
  { name: 'From the garden', description: 'Spring greens, soft herbs, citrus & a little crunch.', image: images.harvest, label: 'THE SEASON, ON A PLATE', alt: 'A colourful salad with seasonal leaves and fresh vegetables' },
  { name: 'From the coast', description: 'Line-caught fish, gently kissed by fire.', image: images.fish, label: 'A CONNECTION TO PLACE', alt: 'Fresh fish with herbs and seasonal accompaniments' },
  { name: 'From our hands', description: 'Handmade pasta, garden pesto & aged pecorino.', image: images.pasta, label: 'SIMPLE THINGS, DONE WELL', alt: 'Handmade pasta finished with garden greens and cheese' },
]

export type Dietary = 'Vegetarian' | 'Vegan' | 'Gluten-free'
export type MenuCategory = 'tasting' | 'carte' | 'desserts' | 'drinks'
export type MenuItem = { name: string; description: string; price: number; tags: Dietary[]; section?: string }
export const menuCategories: { id: MenuCategory; label: string; intro: string; ingredient: string; note: string }[] = [
  { id: 'tasting', label: 'Tasting menu', intro: 'Six moments. One unfolding story of the season.', ingredient: 'Spring peas', note: 'Picked early in the cool mornings of Stellenbosch. Sweet, delicate, and here for just a few weeks.' },
  { id: 'carte', label: 'À la carte', intro: 'Follow your appetite. Make the evening your own.', ingredient: 'Wild asparagus', note: 'Tender spring stems from our small grower in the Elgin Valley, charred over coals and finished with lemon.' },
  { id: 'desserts', label: 'Desserts', intro: 'Something sweet, something unexpected.', ingredient: 'Cape strawberries', note: 'Sun-ripened berries from the coast. We preserve their sweetness with a touch of thyme and a little patience.' },
  { id: 'drinks', label: 'Wine & cocktails', intro: 'Small producers. Thoughtful pairings. Very good company.', ingredient: 'Garden botanicals', note: 'Rosemary, thyme, and lemon verbena from our own courtyard, infused into cordials and seasonal cocktails.' },
]
export const menuItems: Record<MenuCategory, MenuItem[]> = {
  tasting: [
    { name: 'The spring journey', description: 'Our six-course chef’s menu. Garden pea velouté, heirloom tomato, line-caught fish, ember-roasted lamb, a palate refresher, and strawberry & thyme.', price: 1250, tags: ['Gluten-free'], section: 'SIX COURSES' },
    { name: 'The garden journey', description: 'Six courses rooted in the garden. Spring pea, heirloom tomato, wild mushroom, coal-roasted celeriac, citrus, and Cape strawberries.', price: 1050, tags: ['Vegetarian', 'Vegan', 'Gluten-free'], section: 'SIX COURSES' },
    { name: 'The wine pairing', description: 'Five thoughtful pours from independent Cape winemakers, chosen to follow the rhythm of your menu.', price: 650, tags: ['Vegan', 'Gluten-free'], section: 'ALONGSIDE YOUR JOURNEY' },
    { name: 'The botanical pairing', description: 'House-fermented teas, garden cordials, and fresh seasonal infusions. A different kind of discovery.', price: 350, tags: ['Vegan', 'Gluten-free'], section: 'ALONGSIDE YOUR JOURNEY' },
  ],
  carte: [
    { name: 'Garden pea velouté', description: 'Fresh peas, mint oil, cultured cream, and a crisp sourdough tuile.', price: 145, tags: ['Vegetarian'], section: 'TO BEGIN' },
    { name: 'Heirloom tomato', description: 'Basil, pickled green strawberry, smoked olive oil, and sea salt.', price: 165, tags: ['Vegan', 'Gluten-free'], section: 'TO BEGIN' },
    { name: 'Wild mushroom toast', description: 'Foraged mushrooms, handmade sourdough, truffle butter, and soft herbs.', price: 185, tags: ['Vegetarian'], section: 'TO BEGIN' },
    { name: 'Line-caught fish', description: 'Saldanha catch, charred leeks, coastal greens, and a lemon butter sauce.', price: 325, tags: ['Gluten-free'], section: 'FROM THE EMBERS' },
    { name: 'Karoo lamb', description: 'Slow-roasted shoulder, spring asparagus, rosemary jus, and potato fondant.', price: 385, tags: ['Gluten-free'], section: 'FROM THE EMBERS' },
    { name: 'Handmade garden pasta', description: 'Fresh ribbons, garden pesto, toasted pine nuts, and aged pecorino.', price: 255, tags: ['Vegetarian'], section: 'FROM THE EMBERS' },
    { name: 'Coal-roasted celeriac', description: 'Hazelnut cream, wild herbs, pickled pear, and a rich vegetable reduction.', price: 245, tags: ['Vegan', 'Gluten-free'], section: 'FROM THE EMBERS' },
  ],
  desserts: [
    { name: 'Strawberry & thyme', description: 'Cape strawberries, thyme sorbet, vanilla cream, and almond crumble.', price: 135, tags: ['Vegetarian'], section: 'A SWEET ENDING' },
    { name: 'Dark chocolate crémeux', description: 'Single-origin chocolate, olive oil, sea salt, and burnt caramel.', price: 145, tags: ['Vegetarian', 'Gluten-free'], section: 'A SWEET ENDING' },
    { name: 'Citrus in three textures', description: 'Fresh orange, lemon granita, and a soft mandarin gel with garden mint.', price: 115, tags: ['Vegan', 'Gluten-free'], section: 'A SWEET ENDING' },
    { name: 'A little local cheese', description: 'Three artisan Cape cheeses, house-made preserves, and seeded crackers.', price: 185, tags: ['Vegetarian'], section: 'TAKE YOUR TIME' },
  ],
  drinks: [
    { name: 'Swartland Chenin Blanc', description: 'Old-vine fruit, a little texture, pear, and a quiet mineral finish. 150 ml glass.', price: 95, tags: ['Vegan', 'Gluten-free'], section: 'FROM THE CELLAR' },
    { name: 'Elgin Pinot Noir', description: 'Cool-climate red berries, fine tannins, and an earthy elegance. 150 ml glass.', price: 125, tags: ['Vegan', 'Gluten-free'], section: 'FROM THE CELLAR' },
    { name: 'Cape Méthode Cap Classique', description: 'Fine bubbles, green apple, and toasted brioche. 150 ml glass.', price: 110, tags: ['Vegetarian', 'Gluten-free'], section: 'FROM THE CELLAR' },
    { name: 'The Thyme After', description: 'Cape gin, fresh lemon, garden thyme cordial, and a botanical tonic.', price: 120, tags: ['Vegan', 'Gluten-free'], section: 'FROM THE BAR' },
    { name: 'Ember Old Fashioned', description: 'Oak-aged whisky, smoked honey, orange bitters, and a slow-melting ice cube.', price: 135, tags: ['Vegetarian', 'Gluten-free'], section: 'FROM THE BAR' },
    { name: 'Garden Hour · alcohol-free', description: 'Lemon verbena, cucumber, green tea, and a little sparkle.', price: 75, tags: ['Vegan', 'Gluten-free'], section: 'FROM THE BAR' },
  ],
}
export const eventFormats = [
  { id: 'table', name: 'The long table', capacity: '8–12 guests', detail: 'An intimate gathering in the heart of the restaurant.', setup: 'One beautifully dressed table · shared seasonal starters · a three-course menu', image: images.hero, price: 'From R850 per person' },
  { id: 'room', name: 'The garden room', capacity: '12–24 guests', detail: 'Your own space, with the garden just beyond the glass.', setup: 'A private room · two long tables or a seated U-shape · a four-course menu', image: images.room, price: 'From R1,050 per person' },
  { id: 'exclusive', name: 'An evening of your own', capacity: '24–48 guests', detail: 'The entire restaurant, and our undivided attention.', setup: 'Exclusive use · welcome drinks in the courtyard · a bespoke tasting menu', image: images.wine, price: 'From R45,000 venue minimum' },
]
export const gallery = [
  { src: images.room, alt: 'A softly lit dining room with warm wood and green foliage', caption: 'A room made for good company.' },
  { src: images.hero, alt: 'A thoughtfully plated seasonal dish on a ceramic plate', caption: 'The season, beautifully expressed.' },
  { src: images.wine, alt: 'A glass of red wine in the warm light of the restaurant', caption: 'A good story in every glass.' },
  { src: images.pasta, alt: 'Fresh handmade pasta with seasonal herbs', caption: 'From our hands to your table.' },
]
