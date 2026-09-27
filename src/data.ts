export type Course = {
  id: string;
  name: string;
  level: string;
  lessons: number;
  hours: number;
  price: number;
  image: string;
  summary: string;
  includes: string[];
};

export type Instructor = {
  id: string;
  name: string;
  role: string;
  years: number;
  languages: string;
  image: string;
  bio: string;
};

export const school = {
  name: "Wolde Driving School",
  tagline: "Confidence on the road starts here.",
  phone: "(703) 398-9915",
  email: "woldedrivingschool@gmail.com",
  address: "5412 Bradford Ct Apt 230, Alexandria, VA 22311",
  hours: "Mon–Sat 8:00 AM – 10:00 AM",
};

export const courses: Course[] = [
  {
    id: "beginner",
    name: "Beginner Driving course",
    level: "New drivers",
    lessons: 10,
    hours: 10,
    price: 500,
    image: "/images/hero-lesson.jpg",
    summary:
      "From first start to road-test ready. Theory plus dual-control car lessons.",
    includes: [
      "Theory classroom",
      "20 in-car lessons",
      "Highway intro",
      "Mock road test",
    ],
  },
  {
    id: "standard",
    name: "Standard Driving Course",
    level: "Most popular",
    lessons: 15,
    hours: 15,
    price: 725,
    image: "/images/car-fleet.jpg",
    summary:
      "A focused path for students who already know the basics and want a license.",
    includes: [
      "12 practical lessons",
      "Parking mastery",
      "City traffic",
      "Test-day briefing",
    ],
  },
  {
    id: "intensive",
    name: "Intensive Driving Course",
    level: "Fast track",
    lessons: 20,
    hours: 20,
    price: 950,
    image: "/images/parking-lesson.jpg",
    summary: "Daily lessons for one week so you can sit the road test sooner.",
    includes: [
      "Two lessons per day",
      "Priority scheduling",
      "Theory crash course",
      "Mock exam",
    ],
  },
  {
    id: "defensive",
    name: "Driving Course",
    level: "Licensed drivers",
    lessons: 7,
    hours: 7,
    price: 350,
    image: "/images/steering-close.jpg",
    summary: "Hazard awareness, night driving, rain, and roundabout strategy.",
    includes: [
      "Night session",
      "Emergency stop",
      "Mirror scanning",
      "Certificate of completion",
    ],
  },
  {
    id: "test-prep",
    name: "Road Test Prep",
    level: "Exam week",
    lessons: 7,
    hours: 7,
    price: 350,
    image: "/images/office-front.jpg",
    summary:
      "Polish maneuvers the examiner cares about and calm test-day nerves.",
    includes: [
      "Parallel parking",
      "Hill start",
      "Three-point turn",
      "Route rehearsal",
    ],
  },
  {
    id: "theory",
    name: "Online or In-Person Theory Class",
    level: "Classroom",
    lessons: 36,
    hours: 30,
    price: 200,
    image: "/images/theory-class.jpg",
    summary:
      "Road signs, right-of-way, and written-exam practice with a live instructor.",
    includes: [
      "Printed workbook",
      "Practice quizzes",
      "Sign identification",
      "Written mock test",
    ],
  },
];

export const instructors: Instructor[] = [
  {
    id: "teketel",
    name: "Teketel Wolde",
    role: "Chief instructor & founder",
    years: 10,
    languages: "Amharic, English",
    image: "/images/instructor-1.jpg",
    bio: "Patient with first-time drivers and exacting on safety. Teketel built Wolde to make licensing feel achievable.",
  },
  {
    id: "selam",
    name: "Selam Tesfaye",
    role: "Senior instructor",
    years: 5,
    languages: "Amharic, English, Tigrinya",
    image: "/images/instructor-2.jpg",
    bio: "Known for calm city-traffic coaching and excellent results with nervous adult learners.",
  },
  {
    id: "yonas",
    name: "Yonas Bekele",
    role: "Highway & test specialist",
    years: 7,
    languages: "Amharic, English",
    image: "/images/instructor-3.jpg",
    bio: "Specializes in mock exams, parking, and last-week polish before you sit the road test.",
  },
];

export const testimonials = [
  {
    name: "Marta K.",
    quote:
      "I failed twice elsewhere. Wolde broke parking down until it clicked. Passed on the next try.",
    course: "Road Test Prep",
  },
  {
    name: "Daniel A.",
    quote:
      "Teketel never rushed me. Dual-control car made the first highway merge feel safe.",
    course: "Beginner Driving course",
  },
  {
    name: "Hana G.",
    quote:
      "The intensive week was tiring in the best way. I had my license before the month ended.",
    course: "7-Day Intensive",
  },
];

export const gallery = [
  { src: "/images/hero-lesson.jpg", alt: "In-car driving lesson" },
  { src: "/images/car-fleet.jpg", alt: "Training car" },
  { src: "/images/theory-class.jpg", alt: "Theory classroom" },
  { src: "/images/parking-lesson.jpg", alt: "Parking practice" },
  { src: "/images/steering-close.jpg", alt: "Steering practice" },
  { src: "/images/office-front.jpg", alt: "School office" },
  { src: "/images/instructor-1.jpg", alt: "Instructor Abebe" },
  { src: "/images/instructor-2.jpg", alt: "Instructor Selam" },
];

export const faqs = [
  {
    q: "Do I need my own car?",
    a: "No. Lessons use dual-control school cars. You may use your own vehicle for a refresher if it is insured and roadworthy.",
  },
  {
    q: "Which license categories do you cover?",
    a: "We prepare students for Category B (cars). Theory covers signs and rules used on the Virginia roads. You will take a written exam.",
  },
  {
    q: "How soon can I start?",
    a: "Most students start within a few days of registering. Intensives can often begin the following Monday.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes. Pay a 50% deposit to lock your schedule, then the balance before your final lesson or at the Payment page.",
  },
  {
    q: "What if I need to reschedule?",
    a: "Give 12 hours notice in your dashboard or by phone and we will move the lesson at no extra charge.",
  },
];

// export const school = {
//   name: 'Wolde Driving School',
//   tagline: 'Professional driving instruction in Alexandria, Virginia',
//   phone: '703-398-9915',
//   phoneHref: 'tel:+17033989915',
//   email: 'woldedrivingschool@gmail.com',
//   emailHref: 'mailto:woldedrivingschool@gmail.com',
//   addressLines: ['5412 Bradford Ct Apt 230', 'Alexandria, VA 22311'],
//   address: '5412 Bradford Ct Apt 230, Alexandria, VA 22311',
//   mapsUrl: 'https://maps.google.com/?q=5412+Bradford+Ct+Apt+230+Alexandria+VA+22311',
//   logo: '/images/logo.png',
// } as const

// export const images = {
//   hero: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80',
//   lesson: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80',
//   teen: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
//   adult: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
//   parking: 'https://images.unsplash.com/photo-1471479917193-f009552562ae?auto=format&fit=crop&w=1200&q=80',
//   road: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
//   classroom: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
//   city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
// }

// export function money(cents: number, currency = 'usd') {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: currency.toUpperCase(),
//   }).format(cents / 100)
// }
