/** Edit copy, links, and lists here. Placeholder entries use `isPlaceholder: true`. */

export const site = {
  name: 'Patrick Roland Wijaya',
  shortName: 'Patrick',
  tagline: 'B.S. Computer Science · Class of 2027',
  school:
    'University of Washington — Paul G. Allen School of Computer Science & Engineering',
  locations: 'Seattle, WA · Jakarta, IDN',
  heroLead:
    'Passionate builder focused on AI systems, full-stack products, cybersecurity, and cloud software.',
  resumeUrl: 'https://www.overleaf.com/read/zzqmnktnrpjf#90fd0f',
  /** Set your public email for mailto links */
  contactEmail: 'you@example.com',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
  ] as { label: string; href: string }[],
  about:
    'Tech enthusiast exploring the edges of intelligent systems and reliable software. Currently pursuing a Bachelor of Science in Computer Science at the University of Washington.',
  certifications: [
    'Meta — Django Web Framework, The Full Stack, APIs, Python Data Analytics',
    'freeCodeCamp — Responsive Web Design, JavaScript Algorithms & Data Structures',
    'HackerRank — Python, Java',
    'Johns Hopkins — HTML, CSS, and JavaScript for Web Developers',
    'University of Pennsylvania — Introduction to Java & OOP',
    'IELTS Band 8 · Duolingo English Test 150/160',
  ],
  languages: ['English', 'Bahasa Indonesia', '中文 (Mandarin)', 'Bahasa Melayu'],
  hobbies: ['Puzzles', 'Billiards', 'Chess', 'Coffee chats'],
  softSkills: [
    'Learning',
    'Networking',
    'Public speaking',
    'Teamwork',
    'Time management',
    'Problem solving',
    'Critical thinking',
    'Curiosity',
    'Negotiation',
    'Adaptability',
  ],
  interests: [
    {
      title: 'Artificial intelligence',
      blurb: 'Machine learning, deep learning, and neural networks.',
    },
    {
      title: 'Full-stack development',
      blurb: 'Modern web applications across diverse stacks.',
    },
    {
      title: 'Cybersecurity',
      blurb: 'Robust systems resilient to malicious threats.',
    },
    {
      title: 'Cloud systems',
      blurb: 'Distributed services, infrastructure, and scalable backends.',
    },
  ],
  techStack: [
    'Python',
    'JavaScript',
    'TypeScript',
    'Java',
    'C',
    'C++',
    'React',
    'Node.js',
    'Next.js',
    'FastAPI',
    'Flask',
    'Django',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'LangChain',
    'LangGraph',
    'AWS',
    'React Native',
    'Pytest',
    'Git',
  ],
  stats: [
    { value: '2+', label: 'Years work experience' },
    { value: '1+', label: 'Years tech experience' },
    { value: '7', label: 'Roles & orgs' },
    { value: '24+', label: 'Technologies' },
    { value: '2', label: 'Countries' },
  ],
  orgStats: [
    { value: '4', label: 'Leadership roles' },
    { value: '1000+', label: 'Students impacted' },
    { value: '30+', label: 'Events organized' },
    { value: '2', label: 'Years leading' },
  ],
} as const

export type TimelineEntry = {
  id: string
  title: string
  org: string
  period: string
  location: string
  summary: string
  bullets?: string[]
  tags?: string[]
  isPlaceholder?: boolean
}

export const workExperience: TimelineEntry[] = [
  {
    id: 'aws-sde',
    title: 'Incoming Software Development Engineer Intern',
    org: 'Amazon Web Services (AWS)',
    period: 'Jun 2026 — Sep 2026',
    location: 'United States',
    summary: 'Incoming summer 2026.',
  },
  {
    id: 'uw-dining',
    title: 'Dining Assistant',
    org: 'University of Washington — Student Athlete Dining Center',
    period: 'Sep 2025 — present',
    location: 'Seattle, WA',
    summary:
      'Supports day-to-day dining operations for student-athletes: service flow, station readiness, and a high-traffic meal environment.',
    bullets: [
      'Keeps service lines organized during peak meal windows.',
      'Coordinates with kitchen and front-of-house so athletes move through quickly between practices.',
    ],
    tags: ['Customer service', 'Teamwork', 'Operations'],
  },
  {
    id: 'deepiri',
    title: 'AI Software Engineer Intern',
    org: 'Deepiri',
    period: 'Dec 2025 — Apr 2026',
    location: 'Pittsburgh, PA (remote)',
    summary:
      'Built backend microservices integrated with LangChain / LangGraph agents for a SaaS product.',
    tags: [
      'Python',
      'Poetry',
      'JavaScript',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'OpenAI',
      'FastAPI',
      'LangGraph',
      'LangChain',
      'Ollama',
      'PyTorch',
      'GPU tracing',
    ],
  },
  {
    id: 'sisindokom',
    title: 'Software Engineer Intern',
    org: 'PT. Sisindokom Lintasbuana',
    period: 'Jul 2025 — Aug 2025',
    location: 'Jakarta, IDN',
    summary:
      'Shipped full-stack AI applications adopted by some of the largest enterprises in the region.',
    tags: [
      'Python',
      'JavaScript',
      'React',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'OpenAI',
      'Vertex AI',
      'Flask',
      'AWS',
    ],
  },
  {
    id: 'manulife',
    title: 'Information Technology Intern',
    org: 'PT. Manulife Indonesia (XO Network)',
    period: 'Jul 2024 — Aug 2025',
    location: 'Jakarta, IDN',
    summary:
      'Developed campaign websites and supported internal IT operations and device management.',
    tags: ['Python', 'JavaScript', 'WordPress', 'React', 'Bootstrap'],
  },
  {
    id: 'grc-tutor',
    title: 'CS, Math, Physics & Chemistry Tutor + TA',
    org: 'Green River College Tutoring Centers',
    period: 'Apr 2024 — Jun 2025',
    location: 'Auburn, WA',
    summary:
      'Tutored OOP & DSA, engineering physics, calculus through statistics, and quantum / thermochemistry.',
    tags: ['Java', 'JUnit', 'Python', 'NumPy'],
  },
  {
    id: 'bookstore',
    title: 'Inventory Staff',
    org: 'Green River College Bookstore',
    period: 'Dec 2023 — Jun 2024',
    location: 'Auburn, WA',
    summary:
      'Tracked inventory in Excel, produced reports, and helped surface insights to improve sales.',
    tags: ['Microsoft Excel'],
  },
]

export const organizations: TimelineEntry[] = [
  {
    id: 'permias-nasional',
    title: 'Web Developer',
    org: 'PERMIAS Nasional',
    period: 'Mar 2026 — present',
    location: 'United States (national)',
    summary:
      'Builds and maintains the national organization’s web presence with modern front-end patterns and lightweight AI-assisted workflows.',
    bullets: [
      'Develops responsive pages and components with React, HTML, and CSS.',
      'Integrates AI tooling to speed up content iteration and accessibility checks.',
    ],
    tags: ['React', 'HTML', 'CSS', 'AI'],
  },
  {
    id: 'ptk',
    title: 'Vice President of Leadership',
    org: 'Green River College Phi Theta Kappa — Alpha Chi Beta',
    period: 'Sep 2024 — Jun 2025',
    location: 'Auburn, WA',
    summary: 'Co-led honor society programming, events, and chapter culture.',
    bullets: [
      'Co-organized 10+ campus events with 100+ attendees each.',
      'Secured $10,000+ in funding for chapter initiatives.',
      'Designed leadership tracks that lifted student engagement ~20%.',
    ],
    tags: [
      'Team leadership',
      'Event planning',
      'Public speaking',
      'Strategic planning',
    ],
  },
  {
    id: 'iso',
    title: 'Treasurer',
    org: 'Green River College Indonesian Student Organization',
    period: 'Apr 2024 — Jun 2025',
    location: 'Auburn, WA',
    summary: 'Owned budgeting, reporting, and sponsor conversations for ISO.',
    bullets: [
      'Funded the chapter’s flagship annual event ($5,000+ secured).',
      'Bi-weekly syncs with student government on spend and forecasts.',
      'Grew year-end reserves ~50% versus the prior year.',
    ],
    tags: [
      'Money management',
      'Reporting',
      'Event coordination',
      'Public speaking',
    ],
  },
  {
    id: 'bizclub',
    title: 'Secretary',
    org: 'Green River College Business Club',
    period: 'Dec 2023 — Jun 2025',
    location: 'Auburn, WA',
    summary:
      'Maintained workflows, quarterly schedules, and proposals connecting students with industry.',
    bullets: [
      'Authored 4+ event proposals every quarter.',
      'Built relationships with 10+ founders and operators to power programming.',
    ],
    tags: ['Networking', 'Proposal writing', 'Event coordination'],
  },
]

export type EducationBlock = {
  id: string
  school: string
  unit?: string
  period: string
  location: string
  degree: string
  gpa?: string
  honors?: string[]
  courses?: string[]
}

export const education: EducationBlock[] = [
  {
    id: 'uw',
    school: 'University of Washington',
    unit: 'Paul G. Allen School of Computer Science & Engineering',
    period: '2025 — 2027',
    location: 'Seattle, WA',
    degree: 'Bachelor of Science — Computer Science',
    gpa: '3.65 cumulative',
    honors: ["DubHacks Shark Tank 2025 Winner", "Dean's List"],
    courses: [
      'CSE 311 — Foundations of Computing I',
      'CSE 312 — Foundations of Computing II',
      'CSE 351 — Hardware / Software Interface',
      'CSE 331 — Software Design & Implementation',
      'CSE 332 — Data Structures & Parallelism',
      'CSE 333 — Systems Programming',
      'CSE 391 — System & Software Tools',
      'CSE 473 — Artificial Intelligence',
      'CSE 484 — Computer Security',
    ],
  },
  {
    id: 'grc',
    school: 'Green River College',
    period: '2023 — 2025',
    location: 'Auburn, WA',
    degree: 'Associate in Science — Computer Science, Engineering, Physics',
    gpa: '3.98 / 4.0 — Graduated with Highest Honors',
    honors: [
      'International Student Scholarship (3×)',
      'David Bender–Donnie Hallstone Mathematics Scholarship',
      'Mathematics Division Award',
      "Dean's List — all quarters",
    ],
    courses: [
      'CS 121 — Computer Programming I',
      'CS 122 — Computer Programming II (Java Objects)',
      'CS 123 — Computer Programming III (Java Data Structures)',
      'CS 202 — Discrete Structures I',
      'MATH 240 — Linear Algebra',
      'MATH 146 — Introduction to Statistics',
      'PHYS 221-223 — Engineering Physics sequence',
      'ENGR 106 — Introduction to Engineering Problems',
    ],
  },
  {
    id: 'pelangi',
    school: 'Pelangi Kasih Secondary School',
    period: '2018 — 2023',
    location: 'Jakarta, IDN',
    degree: 'Secondary (Science Stream)',
    gpa: '93.59 / 100 — Ranked 3rd in class',
    honors: [
      'Ranked 3rd in graduating class',
      'Best student awards across 5+ subjects',
      'Multiple regional academic competitions',
    ],
  },
]

export type Project = {
  id: string
  title: string
  summary: string
  features: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'wallzy',
    title: 'Wallzy',
    summary:
      'DubHacks 2025 build — mobile experience with FastAPI services and PostgreSQL, focused on reliable device connectivity.',
    features: [
      'Shipped a working prototype with a team of three in 24 hours at DubHacks.',
      'Improved RFID-emulator connection reliability by roughly 90%.',
      'DubHacks 2025 Shark Tank winner · DubHacks NEXT Batch 5 (Projects track).',
    ],
    stack: ['React Native', 'JavaScript', 'FastAPI', 'PostgreSQL', 'HTML', 'CSS'],
  },
  {
    id: 'ai-corp',
    title: 'AI Corporate Assistant',
    summary:
      'Enterprise copilot blending OpenAI and Vertex AI with private knowledge retrieval.',
    features: [
      'Natural language answers grounded in corporate context',
      'Operational dashboard for monitoring model quality',
      'Responsive marketing-grade UI',
    ],
    stack: [
      'Python',
      'Flask',
      'PostgreSQL',
      'LangChain',
      'OpenAI',
      'Vertex AI',
      'Docker',
    ],
  },
  {
    id: 'portfolio',
    title: 'Personal website',
    summary: 'Immersive portfolio translating story, impact, and craft into motion.',
    features: [
      'Scroll-driven storytelling',
      'Bright kinetic system with accessible contrast',
      'Composable content layer for rapid updates',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'restaurant',
    title: 'Restaurant web application',
    summary: 'Certification-grade full-stack experience with RSVP flows and admin tools.',
    features: [
      'Optimized ORM access patterns',
      'Customizable menus and guest journeys',
      'Administrative console for operators',
    ],
    stack: ['Python', 'Django', 'SQLite', 'Jinja', 'JavaScript'],
  },
  {
    id: 'ai-pm',
    title: 'AI Enterprise Project Manager',
    summary:
      'LLM workflow that compiles and tracks sensitive enterprise initiatives end-to-end.',
    features: [
      'Structured ingestion of messy project inputs',
      'Natural language summaries for executives',
      'Polished client-facing UI',
    ],
    stack: ['Python', 'Flask', 'PostgreSQL', 'LangChain', 'Vertex AI'],
  },
  {
    id: 'schedule',
    title: 'Drag-drop schedule manager',
    summary: 'Interactive planner with tactile drag interactions and export.',
    features: [
      'Drag-and-drop timetable editing',
      'PDF export for sharing',
      'Keyboard-friendly shortcuts',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
]
