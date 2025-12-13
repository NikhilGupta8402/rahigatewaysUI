// src/app/explore-package/explore-package.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TravelPackage {
  id: string;
  category: string;
  title: string;
  location: string;
  description: string;
  days: number;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-explore-package',
  templateUrl: './explore-package.component.html',
  styleUrls: ['./explore-package.component.css'],
})
export class ExplorePackageComponent {
  constructor(private router: Router) {}

  /* ------------------ CATEGORY LIST ------------------ */
  allCategories: string[] = [
    'India',
    'International',
    'Beach',
    'Mountain',
    'Adventure',
    'Cultural',
    'Luxury',
    'City',
    'Weekend',
    'Honeymoon',
    'Family',
    'Special Offer',
    'Community',
  ];

  selectedCategories = [...this.allCategories];
  searchQuery: string = '';
  selectedDuration: string = 'all';
  maxPrice: number = 500000;

  /* ------------------ PACKAGES DATA ------------------ */
  packages: TravelPackage[] = [
    // SPECIAL OFFERS
    {
      id: 'goa-private-party',
      category: 'Special Offer',
      title: 'Goa Private Party Access',
      location: 'Goa',
      description:
        'Exclusive early booking discount with private party access.',
      days: 3,
      price: 25000,
      imageUrl: 'assets/images/goa.png',
    },
    {
      id: 'udaipur-palace-stay',
      category: 'Special Offer',
      title: 'Udaipur Palace Stay & Dinner',
      location: 'Udaipur',
      description: 'Limited New Year premium palace experience.',
      days: 3,
      price: 25000,
      imageUrl: 'assets/images/udaipur.png',
    },
    {
      id: 'mumbai-snow-adventure',
      category: 'Special Offer',
      title: 'Mumbai Snow Adventure',
      location: 'Mumbai',
      description: 'Exciting winter New Year experience.',
      days: 3,
      price: 25000,
      imageUrl: 'assets/images/mumbai.png',
    },
    {
      id: 'kochi-carnival-tour',
      category: 'Special Offer',
      title: 'Kochi Carnival Parade Tour',
      location: 'Kochi',
      description: 'Premium New Year parade experience.',
      days: 3,
      price: 25000,
      imageUrl: 'assets/images/kochi.png',
    },

    // INTERNATIONAL PACKAGES
    {
      id: 'bali-getaway',
      category: 'International',
      title: 'Bali Beach Getaway',
      location: 'Bali',
      description: 'Private beach and tropical escape.',
      days: 6,
      price: 25000,
      imageUrl: 'assets/images/bali.png',
    },
    {
      id: 'thailand-retreat',
      category: 'International',
      title: 'Thailand Party & Retreat',
      location: 'Thailand',
      description: 'Party spots and quiet tropical stays.',
      days: 5,
      price: 25000,
      imageUrl: 'assets/images/thailand.png',
    },
    {
      id: 'dubai-skyline',
      category: 'International',
      title: 'Dubai Skyline Views',
      location: 'Dubai',
      description: 'Fireworks, Burj view and luxury nights.',
      days: 5,
      price: 25000,
      imageUrl: 'assets/images/dubai.png',
    },
    {
      id: 'maldives-underwater',
      category: 'International',
      title: 'Maldives Underwater Dining',
      location: 'Maldives',
      description: 'Couple-friendly island luxury.',
      days: 5,
      price: 25000,
      imageUrl: 'assets/images/maldives.png',
    },
    {
      id: 'singapore-marina',
      category: 'International',
      title: 'Singapore Marina Bay Lights',
      location: 'Singapore',
      description: 'Stunning lights & modern skyscrapers.',
      days: 4,
      price: 25000,
      imageUrl: 'assets/images/singapore2.png',
    },

    // INDIA PACKAGES
    {
      id: 'goa-beach-edm',
      category: 'India',
      title: 'Goa Beach EDM Parties',
      location: 'Goa',
      description: 'Beach resorts and EDM nightlife.',
      days: 3,
      price: 13000,
      imageUrl: 'assets/images/goa2.png',
    },
    {
      id: 'udaipur-lakeside',
      category: 'India',
      title: 'Udaipur Palaces & Lakes',
      location: 'Udaipur',
      description: 'Romantic views and royal dining.',
      days: 3,
      price: 11000,
      imageUrl: 'assets/images/udaipur2.png',
    },
    {
      id: 'varanasi-ghats',
      category: 'India',
      title: 'Varanasi Ghats & Aarti',
      location: 'Varanasi',
      description: 'Holy rituals and serene mornings.',
      days: 3,
      price: 11000,
      imageUrl: 'assets/images/varanasi.png',
    },
    {
      id: 'manali-snow',
      category: 'India',
      title: 'Manali Snowfall Experience',
      location: 'Manali',
      description: 'Snow valleys and adventures.',
      days: 4,
      price: 11000,
      imageUrl: 'assets/images/manali.png',
    },
    {
      id: 'andamans-coral',
      category: 'India',
      title: 'Andamans Coral & Scuba',
      location: 'Andaman & Nicobar',
      description: 'Coral reefs and water adventures.',
      days: 4,
      price: 11000,
      imageUrl: 'assets/images/andamans.png',
    },

    // NEW YEAR BUBBLES
    {
      id: 'paris-tour',
      category: 'International',
      title: 'Paris Holiday Tour',
      location: 'Paris',
      description: 'Romantic Europe experience.',
      days: 7,
      price: 85000,
      imageUrl: 'assets/images/paris.png',
    },
    {
      id: 'singapore-holiday',
      category: 'International',
      title: 'Singapore Holiday Trip',
      location: 'Singapore',
      description: 'Modern city with attractions.',
      days: 5,
      price: 55000,
      imageUrl: 'assets/images/singapore.png',
    },
    {
      id: 'rome-tour',
      category: 'International',
      title: 'Rome Cultural Tour',
      location: 'Rome',
      description: 'Ancient monuments and history.',
      days: 7,
      price: 80000,
      imageUrl: 'assets/images/rome.png',
    },
    {
      id: 'bangkok-holiday',
      category: 'International',
      title: 'Bangkok Holiday Trip',
      location: 'Bangkok',
      description: 'City life, temples and nightlife.',
      days: 5,
      price: 45000,
      imageUrl: 'assets/images/bangkok.png',
    },
    {
      id: 'bali-circle',
      category: 'International',
      title: 'Bali Full Trip',
      location: 'Bali',
      description: 'Beaches, nature and temples.',
      days: 7,
      price: 60000,
      imageUrl: 'assets/images/bali-circle.png',
    },
    {
      id: 'phuket-tour',
      category: 'International',
      title: 'Phuket Island Tour',
      location: 'Phuket',
      description: 'Beaches & island activities.',
      days: 7,
      price: 50000,
      imageUrl: 'assets/images/phuket.png',
    },
    {
      id: 'tokyo-tour',
      category: 'International',
      title: 'Tokyo City Tour',
      location: 'Tokyo',
      description: 'Japan modern city experience.',
      days: 7,
      price: 90000,
      imageUrl: 'assets/images/tokyo.png',
    },
    {
      id: 'cappadocia-tour',
      category: 'International',
      title: 'Cappadocia Balloon Tour',
      location: 'Cappadocia',
      description: 'Hot air balloon magical valleys.',
      days: 5,
      price: 75000,
      imageUrl: 'assets/images/cappadocia.png',
    },

    // JOURNEY CARDS converted
    {
      id: 'weekend-trips',
      category: 'Weekend',
      title: 'Weekend Trips',
      location: 'India',
      description: 'Quick escapes for a refreshing break.',
      days: 2,
      price: 7000,
      imageUrl: 'assets/images/weekend.png',
    },
    {
      id: 'honeymoon-packages',
      category: 'Honeymoon',
      title: 'Honeymoon Packages',
      location: 'Multiple',
      description: 'Romantic, bespoke journeys for couples.',
      days: 5,
      price: 35000,
      imageUrl: 'assets/images/honeymoon.png',
    },
    {
      id: 'family-packages',
      category: 'Family',
      title: 'Family Packages',
      location: 'India',
      description: 'Safe, fun, and memorable trips for families.',
      days: 4,
      price: 24000,
      imageUrl: 'assets/images/family.png',
    },
    {
      id: 'community-experience',
      category: 'Community',
      title: 'Community Experience',
      location: 'Rural India',
      description: 'Immersive stays with local communities.',
      days: 3,
      price: 18000,
      imageUrl: 'assets/images/community.png',
    },
  ];

  /* ------------------ CATEGORY TOGGLE ------------------ */
  toggleCategory(c: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (!this.selectedCategories.includes(c)) {
        this.selectedCategories.push(c);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter((x) => x !== c);
    }
  }

  /* ------------------ FILTERED LIST ------------------ */
  get filteredPackages() {
    return this.packages.filter((p) => {
      const categoryMatch = this.selectedCategories.includes(p.category);
      const priceMatch = p.price <= this.maxPrice;
      const durationMatch =
        this.selectedDuration === 'all' ||
        (this.selectedDuration === '1-3' && p.days <= 3) ||
        (this.selectedDuration === '4-7' && p.days >= 4 && p.days <= 7) ||
        (this.selectedDuration === '8+' && p.days >= 8);

      const searchMatch =
        this.searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(this.searchQuery.toLowerCase());

      return categoryMatch && priceMatch && durationMatch && searchMatch;
    });
  }

  /* ------------------ ACTIONS ------------------ */
  onBook(pkg: TravelPackage) {
    // Example navigation to a package detail/booking page.
    // Make sure you have the route '/package/:id' configured in your router.
    console.log('Book clicked for', pkg.id);
    this.router.navigate(['/package', pkg.id]);
  }
}
