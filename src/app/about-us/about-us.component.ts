import { Component } from '@angular/core';

interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

interface VisionItem {
  text: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Milestone {
  icon: string;
  value: string;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  coreValues: CoreValue[] = [
    {
      icon: 'heart',
      title: 'Customer First',
      description:
        'We prioritize our users, putting their needs and satisfaction first, ensuring an exceptional experience at every step.',
    },
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description:
        'Continuously seeking new approaches and technologies to revolutionize the payment experience.',
    },
    {
      icon: 'users',
      title: 'Collaboration',
      description:
        'Operating with transparency and honesty, forging strong partnerships and enabling seamless payments for businesses.',
    },
    {
      icon: 'award',
      title: 'Excellence',
      description:
        'Committed to delivering the highest quality service and maintaining advanced business practices.',
    },
    {
      icon: 'globe',
      title: 'Exploration',
      description:
        "Never settling, always learning and evolving the world's fastest payment platform.",
    },
    {
      icon: 'shield',
      title: 'Reliability',
      description:
        'Providing rock-solid infrastructure and security, thus building a trust with clients.',
    },
  ];

  visionItems: VisionItem[] = [
    { text: 'Relentlessly read about before it is invented or perfected.' },
    { text: 'Never presenting unacceptable to safety and comfort of clients.' },
    { text: 'Sustainable and responsible business practices.' },
    {
      text: 'Leveraging technology to enhance the travel gathering and experience.',
    },
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Priya Sharma',
      role: 'CEO',
      image: 'assets/team/face.jpeg',
    },
    {
      name: 'Aidan Singh',
      role: 'CTO',
      image: 'assets/team/face.jpeg',
    },
    {
      name: 'Neha Gupta',
      role: 'CFO',
      image: 'assets/team/face.jpeg',
    },
    {
      name: 'Himanshu Khanna',
      role: 'COO',
      image: 'assets/team/face.jpeg',
    },
  ];

  milestones: Milestone[] = [
    {
      icon: 'star',
      value: '15+',
      label: 'Years Of Success',
    },
    {
      icon: 'map',
      value: '100+',
      label: 'Destinations Covered',
    },
    {
      icon: 'users',
      value: '25K+',
      label: 'Happy Travelers',
    },
    {
      icon: 'trophy',
      value: 'Top 5',
      label: 'Travel Agency Regarded',
    },
  ];

  faqs: FAQ[] = [
    {
      question: 'How does Rahi Gateways ensure my trip is personalized?',
      answer:
        'We assign a dedicated travel consultant to each of our clients from scratch, tailoring the trip with your specific requirements and needs beyond the ordinary. Our approach focuses on understanding your preferences and creating a unique experience.',
      isOpen: false,
    },
    {
      question: 'What level of 24/7 support is provided?',
      answer:
        'Our support team is available 24/7 to assist you with any queries or emergencies during your trip. We provide multiple contact channels including phone, email, and live chat.',
      isOpen: false,
    },
    {
      question:
        'Can I customize my itinerary if I have special dietary or religious?',
      answer:
        'Absolutely! We accommodate all dietary restrictions, religious requirements, and special needs. Our team works closely with local partners to ensure your requirements are met.',
      isOpen: false,
    },
    {
      question: 'What measures are taken for safety and security?',
      answer:
        'We partner with verified and trusted service providers, conduct thorough safety assessments, provide travel insurance options, and maintain 24/7 emergency support.',
      isOpen: false,
    },
    {
      question: 'What is the policy for cancellations or modifications?',
      answer:
        'Our cancellation and modification policies vary depending on the booking type and timing. We offer flexible options and will work with you to minimize any losses. Please refer to our detailed policy document or contact our team.',
      isOpen: false,
    },
  ];

  toggleFAQ(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  getIconPath(iconName: string): string {
    // Returns appropriate icon based on name
    return iconName;
  }
}
