import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface DestinationCard {
  title: string;
  subtitle: string;
  priceLabel: string;
  ctaLabel: string;
  imageUrl: string;
}

interface BubbleDestination {
  name: string;
  duration: string;
  imageUrl: string;
}

interface JourneyCard {
  title: string;
  description: string;
  imageUrl: string;
}

interface FeatureCard {
  icon: string; // you can map to icon classes later
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  specialOffers: DestinationCard[] = [
    {
      title: 'Goa (Private Party Access)',
      subtitle: '“VIP nights, no filters.”',
      priceLabel: '₹25K',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/goa.png',
    },
    {
      title: 'Udaipur (Palace Stay, Dinner)',
      subtitle: '“Live your royal era.”',
      priceLabel: '₹25K',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/udaipur.png',
    },
    {
      title: 'Mumbai (Snow Adventure)',
      subtitle: '“City heat, snow-core chaos.”',
      priceLabel: '₹25K',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/mumbai.png',
    },
    {
      title: 'Kochi (Carnival Parade Tour)',
      subtitle: '“Where culture turns into a celebration.”',
      priceLabel: '₹25K',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/kochi.png',
    },
  ];

  internationalPackages: DestinationCard[] = [
    {
      title: 'Europe',
      subtitle: 'One continent. Endless main-character moments',
      priceLabel: '1,39,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/europe.jpg',
    },
    {
      title: 'Vietnam',
      subtitle: 'Chaos, culture & café hopping',
      priceLabel: '55,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/vietnam.jpg',
    },
    {
      title: 'Bali',
      subtitle: 'Soft life, loud memories.',
      priceLabel: '46,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/bali.jpg',
    },
    {
      title: 'Thailand',
      subtitle: 'Street vibes to island highs.',
      priceLabel: '41,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/thailand.jpg',
    },
    {
      title: 'Japan',
      subtitle: 'Tradition meets futuristic flex.',
      priceLabel: '1,25,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/japan.jpg',
    },
    {
      title: 'Sri Lanka',
      subtitle: 'Tea trails, tides & timeless vibes.',
      priceLabel: '26,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/srilanka.jpg',
    },
    {
      title: 'Kazakhstan',
      subtitle: 'Where nature hits different.',
      priceLabel: '45,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/kazakhstan.jpg',
    },
    {
      title: 'Singapore',
      subtitle: 'Small city. Big flex.',
      priceLabel: '49,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/singapore.jpg',
    },
    {
      title: 'Malaysia',
      subtitle: 'Culture, colors & city lights.',
      priceLabel: '22,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/malaysia.jpg',
    },
    {
      title: 'Maldives',
      subtitle: 'Offline, overwater, over the moon.',
      priceLabel: '75,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/maldives.jpg',
    },
    {
      title: 'Turkey',
      subtitle: 'Where continents flirt.',
      priceLabel: '99,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/turkey.jpg',
    },
    {
      title: 'Spain',
      subtitle: 'Late nights. Louder stories.',
      priceLabel: '1,45,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/spain.jpg',
    },
  ];

  newYearBubbles: BubbleDestination[] = [
    {
      name: 'Paris',
      duration: '6 Nights / 7 Days',
      imageUrl: 'assets/images/paris.png',
    },
    {
      name: 'Singapore',
      duration: '4 Nights / 5 Days',
      imageUrl: 'assets/images/singapore.png',
    },
    {
      name: 'Rome',
      duration: '6 Nights / 7 Days',
      imageUrl: 'assets/images/rome.png',
    },
    {
      name: 'Bangkok',
      duration: '4 Nights / 5 Days',
      imageUrl: 'assets/images/bangkok.png',
    },
    {
      name: 'Bali',
      duration: '6 Nights / 7 Days',
      imageUrl: 'assets/images/bali-circle.png',
    },
    {
      name: 'Phuket',
      duration: '6 Nights / 7 Days',
      imageUrl: 'assets/images/phuket.png',
    },
    {
      name: 'Tokyo',
      duration: '6 Nights / 7 Days',
      imageUrl: 'assets/images/tokyo.png',
    },
    {
      name: 'Cappadocia',
      duration: '4 Nights / 5 Days',
      imageUrl: 'assets/images/cappadocia.png',
    },
  ];

  indiaPackages: DestinationCard[] = [
    {
      title: 'Spiti',
      subtitle: 'Silence, stars & soul reset.',
      priceLabel: '16,500',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/spiti.jpg',
    },
    {
      title: 'Leh Ladakh',
      subtitle: 'High altitude, higher mindset.',
      priceLabel: '19,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/leh-ladakh.jpg',
    },
    {
      title: 'Himachal',
      subtitle: 'Mountains made us do it.',
      priceLabel: '7,500',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/himachal.jpg',
    },
    {
      title: 'Kashmir',
      subtitle: 'If heaven had a vibe.',
      priceLabel: '22,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/kashmir.jpg',
    },
    {
      title: 'Sikkim',
      subtitle: 'Calm looks good on you.',
      priceLabel: '13,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/sikkim.jpg',
    },
    {
      title: 'Uttrakhand',
      subtitle: 'Where peace logs in.',
      priceLabel: '6,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/uttrakhand.jpg',
    },
    {
      title: 'Kerala',
      subtitle: 'Slow days, softer life.',
      priceLabel: '11,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/kerala.jpg',
    },
    {
      title: 'Rajasthan',
      subtitle: 'Royal energy, desert dreams.',
      priceLabel: '10,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/rajasthan.jpg',
    },
    {
      title: 'Meghalaya',
      subtitle: 'Where the rain feels aesthetic.',
      priceLabel: '19,999',
      ctaLabel: 'Book Now',
      imageUrl: 'assets/images/meghalaya.jpg',
    },
  ];

  journeyCards: JourneyCard[] = [
    {
      title: 'Weekend Trips',
      description: 'Quick escapes for a refreshing break.',
      imageUrl: 'assets/images/weekend.png',
    },
    {
      title: 'Honeymoon Packages',
      description: 'Romantic, bespoke journeys for couples.',
      imageUrl: 'assets/images/honeymoon.png',
    },
    {
      title: 'Family Packages',
      description: 'Safe, fun, and memorable trips for all ages.',
      imageUrl: 'assets/images/family.png',
    },
    {
      title: 'Community Experience',
      description: 'Immersive stays with local communities.',
      imageUrl: 'assets/images/community.png',
    },
  ];

  featureCards: FeatureCard[] = [
    {
      icon: 'assets/images/union.png',
      title: 'Proven Expertise',
      description:
        'Curated domestic and international tours by travel planners.',
    },
    {
      icon: 'assets/images/union2.png',
      title: 'Next-Gen Smart Touring',
      description: 'Modern tech and expert planning for seamless experiences.',
    },
    {
      icon: 'assets/images/union3.png',
      title: 'Trusted Globally',
      description:
        'Strong collaborations with global airlines, hotels and partners.',
    },
    {
      icon: 'assets/images/union4.png',
      title: 'Award-winning Support',
      description: '24x7 travel assistance at every step of the journey.',
    },
  ];

  faqs: FaqItem[] = [
    {
      question: 'How does Rahi Gateways ensure my trip is personalized?',
      answer:
        'We assign a consultant to build every itinerary from scratch, aligning the trip with your interests, budget and pace.',
    },
    {
      question: 'How soon before my trip should I book?',
      answer:
        'For domestic trips, we recommend 3–4 weeks in advance; for international routes, 6–8 weeks works best.',
    },
    {
      question: 'What kind of 24/7 support is provided?',
      answer:
        'You get a dedicated helpline, local on-ground contact and instant assistance over WhatsApp or call.',
    },
    {
      question: 'Can I combine elements from different packages?',
      answer:
        'Yes, most packages are modular — we can mix stays, activities and routes to customize your journey.',
    },
    {
      question: 'What measures are taken for safety and security?',
      answer:
        'We partner only with verified vendors and follow destination-specific safety protocols and guidelines.',
    },
    {
      question: 'What is the policy for cancellations or modifications?',
      answer:
        'Each trip has a clear cancellation and reschedule policy, shared at the time of booking.',
    },
    {
      question: 'Does Rahi Gateways offer travel insurance?',
      answer:
        'Yes. We can bundle travel insurance for medical emergencies, baggage loss and cancellations.',
    },
  ];

  @ViewChild('intlSlider', { read: ElementRef })
  intlSlider!: ElementRef<HTMLDivElement>;

  @ViewChild('indiaSlider', { read: ElementRef })
  indiaSlider!: ElementRef<HTMLDivElement>;

  // ... your existing arrays (specialOffers, internationalPackages, etc.)
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit(): void {
    const video = this.heroVideo.nativeElement;

    // Set attributes using Renderer2
    this.renderer.setAttribute(video, 'muted', 'true');
    this.renderer.setAttribute(video, 'playsinline', '');
    this.renderer.setProperty(video, 'muted', true);

    // Play video
    setTimeout(() => {
      video.play().catch((err) => {
        console.error('Autoplay failed:', err);
      });
    }, 100);
  }

  scrollIntl(direction: number): void {
    if (!this.intlSlider) return;

    const container = this.intlSlider.nativeElement;
    const card = container.querySelector(
      '.destination-card'
    ) as HTMLElement | null;

    const gap = 18; // same as CSS
    const cardWidth = card ? card.offsetWidth + gap : container.clientWidth;

    container.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
    });
  }

  scrollIndia(direction: number): void {
    if (!this.indiaSlider) return;

    const container = this.indiaSlider.nativeElement;
    const card = container.querySelector(
      '.destination-card'
    ) as HTMLElement | null;

    const gap = 18; // same as CSS
    const cardWidth = card ? card.offsetWidth + gap : container.clientWidth;

    container.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
    });
  }

  openedFaqIndex: number | null = null;

  toggleFaq(index: number): void {
    this.openedFaqIndex = this.openedFaqIndex === index ? null : index;
  }

  goToPackageDetail(pkg: DestinationCard) {
    // later you can pass an id/slug; for now just navigate
    this.router.navigate(['/tour', 'goa-7-days']);
  }

  explorePackage() {
    this.router.navigate(['/explore-packages']);
  }
}
