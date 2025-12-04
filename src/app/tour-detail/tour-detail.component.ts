import { Component } from '@angular/core';

interface ItineraryDay {
  day: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl: string;
  images?: string[];
}

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css'],
})
export class TourDetailComponent {
  tourTitle =
    '7 Days Goa Explore Tour with Beachfront Stay & Sightseeing – Full North + South Goa Experience';
  location = 'Goa, India';
  durationLabel = '6 Nights / 7 Days';
  rating = 4.8;
  ratingCount = 128;
  pricePerPerson = 13000;
  priceLabel = '13K ';

  mainImage = 'assets/images/goa-detail-1.png';

  galleryImages: string[] = [
    'assets/images/goa-detail-2.png',
    'assets/images/goa-detail-3.png',
    'assets/images/goa-detail-4.png',
    'assets/images/goa-detail-5.png',
    'assets/images/goa-detail-6.png',
  ];

  get totalImages(): number {
    return 1 + this.galleryImages.length;
  }

  isModalOpen = false;
  modalIndex = 0;

  get modalImages(): string[] {
    return [this.mainImage, ...this.galleryImages];
  }

  openImageModal(index: number, isMain: boolean = false): void {
    this.modalIndex = isMain ? 0 : index;
    this.isModalOpen = true;
  }

  closeImageModal(): void {
    this.isModalOpen = false;
  }

  nextImage(): void {
    const total = this.modalImages.length;
    this.modalIndex = (this.modalIndex + 1 + total) % total;
  }

  prevImage(): void {
    const total = this.modalImages.length;
    this.modalIndex = (this.modalIndex - 1 + total) % total;
  }

  selectImage(index: number): void {
    this.modalIndex = index;
  }

  highlights: string[] = [
    'North Goa + South Goa Full-Day Sightseeing',
    'Beachfront Resort Stay at Premium Location',
    'Sunset Cruise + Candle Light Beach Dinner',
    'Daily Breakfast + Airport Transfers Included',
    'Nightlife Experience at Popular Beach Clubs',
  ];

  includes: string[] = [
    'Airport pick-up & drop',
    'Daily breakfast',
    'AC vehicle for all tours',
    'Comfortable (3★ / 4★) beachfront stay',
    'Sunset beach dinner (1 night)',
    'Entry & activity tickets as per itinerary',
    'Tour guide & on-ground assistance',
  ];

  notIncludes: string[] = [
    'Personal expenses, tips, and shopping',
    'Any additional adventure activities',
    'Flight / train tickets to Goa',
  ];

  itinerary: ItineraryDay[] = [
    {
      day: 'Day 1',
      title: 'Arrival in Goa + Beach Sunset',
      description:
        'Arrive in Goa and get transferred to your beachfront resort. Check-in, freshen up and spend the evening at leisure by the beach. Enjoy a relaxed sunset and welcome dinner.',
    },
    {
      day: 'Day 2',
      title: 'North Goa Exploration',
      description:
        'Visit popular North Goa beaches like Baga, Calangute and Candolim. Explore forts like Aguada and Chapora, enjoy water sports (optional) and end the day at a famous shack.',
    },
    {
      day: 'Day 3',
      title: 'Full-Day Water Sports Experience',
      description:
        'Enjoy banana boat rides, parasailing, bumper ride and jet ski (as per package inclusion). Evening at leisure to explore local markets and cafés.',
    },
    {
      day: 'Day 4',
      title: 'Grand Island Trip',
      description:
        'Head for a Grand Island boat trip with dolphin sighting, snorkeling and lunch on-board. Evening free to relax or explore nightlife.',
    },
    {
      day: 'Day 5',
      title: 'South Goa Heritage + Spice Plantation',
      description:
        'Visit Old Goa churches like Basilica of Bom Jesus & Se Cathedral. Later, head to a spice plantation tour with traditional Goan lunch and village walk.',
    },
    {
      day: 'Day 6',
      title: 'Leisure + Optional Activities',
      description:
        'Free day to relax at the resort, go shopping, café hopping or opt for optional activities like casino night or river cruise.',
    },
    {
      day: 'Day 7',
      title: 'Checkout & Departure',
      description:
        'After breakfast, check out from the hotel and get transferred to the airport / railway station with unforgettable memories of Goa.',
    },
  ];

  faqs: FaqItem[] = [
    {
      question: 'What is the best time to visit Goa?',
      answer:
        'October to March is ideal, with pleasant weather, beach activities and vibrant nightlife. December is peak season due to Christmas and New Year.',
    },
    {
      question: 'Is this tour suitable for families and kids?',
      answer:
        'Yes, the itinerary balances sightseeing and leisure time, with safe and family-friendly stays.',
    },
    {
      question: 'Can I customize the itinerary?',
      answer:
        'Yes, minor tweaks are possible like extending stays, changing hotel category or adding specific activities.',
    },
    {
      question: 'Are there vegetarian food options?',
      answer:
        'Yes, most partner hotels and restaurants offer multiple vegetarian and Jain-friendly options.',
    },
  ];

  reviews: Review[] = [
    {
      name: 'Omie Srikanth',
      rating: 5,
      date: '18 Mar 2025',
      comment:
        'Amazing beachside experience. Hotel was right on the beach, transfers were on time and the team helped us customize our last day. Highly recommended!',
      avatarUrl: 'assets/images/user-1.png',
      images: ['assets/images/review1.png', 'assets/images/review2.png'],
    },
    {
      name: 'Gautam Ekstrom Rathore',
      rating: 5,
      date: '14 Mar 2025',
      comment:
        'Well-planned itinerary, great selection of cafes and sunset points. The support team was available on WhatsApp throughout.',
      avatarUrl: 'assets/images/user-2.png',
    },
    {
      name: 'Ragini Lubna',
      rating: 5,
      date: '11 Mar 2025',
      comment:
        'Perfect for a first Goa trip. Both North and South were covered comfortably without feeling rushed.',
      avatarUrl: 'assets/images/user-3.png',
    },
  ];

  openedFaqIndex: number | null = null;

  toggleFaq(index: number): void {
    this.openedFaqIndex = this.openedFaqIndex === index ? null : index;
  }

  onBookNow(): void {
    alert('Proceeding to booking flow...');
  }

  /* ----- BOOKING STATE ----- */

  startDate: string | null = null;
  startTime: string | null = null;

  adultPrice = 13000;
  childPrice = 8000;

  adultCount = 2;
  childCount = 0;

  extraPerBooking = 1000;
  extraPerPerson = 1000;

  addServicePerBooking = false;
  addServicePerPerson = false;

  changeAdult(delta: number): void {
    const next = this.adultCount + delta;
    this.adultCount = next < 0 ? 0 : next;
  }

  changeChild(delta: number): void {
    const next = this.childCount + delta;
    this.childCount = next < 0 ? 0 : next;
  }

  get baseTicketsTotal(): number {
    return (
      this.adultCount * this.adultPrice + this.childCount * this.childPrice
    );
  }

  get extrasTotal(): number {
    const persons = this.adultCount + this.childCount;
    let total = 0;
    if (this.addServicePerBooking) {
      total += this.extraPerBooking;
    }
    if (this.addServicePerPerson) {
      total += persons * this.extraPerPerson;
    }
    return total;
  }

  get grandTotal(): number {
    return this.baseTicketsTotal + this.extrasTotal;
  }

  get formattedStartDate(): string {
    if (!this.startDate) {
      return 'Select Date';
    }
    const d = new Date(this.startDate);
    if (Number.isNaN(d.getTime())) {
      return 'Select Date';
    }
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  get formattedStartTime(): string {
    if (!this.startTime) {
      return 'Choose time';
    }
    const [hh, mm] = this.startTime.split(':');
    if (hh == null || mm == null) {
      return 'Choose time';
    }
    let h = parseInt(hh, 10);
    const m = parseInt(mm, 10);
    if (Number.isNaN(h) || Number.isNaN(m)) {
      return 'Choose time';
    }
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    const mStr = m.toString().padStart(2, '0');
    return `${h}:${mStr} ${suffix}`;
  }
  async onShare(): Promise<void> {
    const url = window.location.href;
    const title = this.tourTitle;
    const text = `Check out this tour: ${this.tourTitle}`;

    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title, text, url });
      } catch (err) {
        console.error('Share cancelled or failed', err);
      }
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    } else {
      alert('Sharing is not supported in this browser.');
    }
  }
}
