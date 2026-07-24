export const profile = {
  name: 'Alireza Pakdaman',
  headline: 'Software Engineer',
  tagline:
    'CS undergrad at Ontario Tech building software with a data and generative-AI edge, from C++ analysis pipelines to AI visuals for live opera.',
  location: 'Greater Toronto Area, Canada',
  email: 'alirezapakdaman23@gmail.com',
  github: 'https://github.com/alireza-pakdaman',
  githubUser: 'alireza-pakdaman',
  linkedin: 'https://www.linkedin.com/in/alirezapakdaman',
  resume: '/resume.pdf',
  site: 'https://alirezapakdaman.com',
  gradYear: 2027,
} as const;

export interface Role {
  org: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  summary?: string;
  tags?: string[];
  /** Optional proof links (verifiable credentials, certificates, production pages). */
  links?: { label: string; href: string }[];
}

export const experience: Role[] = [
  {
    org: 'Ontario Tech University',
    title: 'Data Analyst',
    start: 'May 2025',
    end: 'Present',
    location: 'Oshawa, ON',
    summary:
      'Analyze student and financial data and produce data-driven reports for university stakeholders.',
    tags: ['Statistics', 'EDA', 'Python'],
  },
  {
    org: 'Ontario Tech University',
    title: 'Undergraduate R&D Scientist',
    start: 'Jul 2025',
    end: 'Oct 2025',
    location: 'Oshawa, ON',
    summary:
      'Sole producer and developer of the generative-AI pipeline for “Meladramma-AI,” a live opera production. Built GAN and diffusion models for unique vocal textures and AI-generated stage visuals. Worked directly with Professor Carolyn (Bland) McGregor AM, Dean of the Faculty of Information Technology, and with the Faculty of Arts & Humanities to integrate AI into the production and elevate the audience experience.',
    tags: ['GANs', 'Diffusion models', 'Generative AI'],
    links: [
      {
        label: 'Meladramma-AI production',
        href: 'https://businessandit.ontariotechu.ca/fbit-xo/arts-and-humanities/meladramma-ai1.php',
      },
    ],
  },
  {
    org: 'Wouessi Digital',
    title: 'Software Development Trainee',
    start: 'Jan 2025',
    end: 'Apr 2025',
    location: 'Toronto, ON',
    summary:
      'Full-stack development on an employee management system, building frontend features and API integration on a production codebase.',
    tags: ['Full-stack', 'React', 'REST APIs'],
    links: [
      {
        label: 'Verify credential',
        href: 'https://credsverse.com/credentials/bedff4d7-5e5a-4262-b1dc-2c7d36e0dfea',
      },
    ],
  },
  {
    org: 'Dexlab',
    title: 'Software Developer',
    start: 'Sep 2024',
    end: 'Jan 2025',
    location: 'Ontario, Canada',
    summary:
      'Coding, debugging, and shipping features in a small, fast-moving team.',
    tags: ['Software engineering'],
  },
  {
    org: 'nordvern',
    title: 'IT Specialist',
    start: 'May 2023',
    end: 'Jan 2025',
    location: 'Toronto, ON',
    summary:
      'Kept systems running for a downtown Toronto office, covering troubleshooting, infrastructure, and technical support. Recognized as Employee of the Year.',
    tags: ['IT', 'Support'],
    links: [{ label: 'Certificate of Excellence', href: '/certificates/nordvern-employee-of-the-year.jpg' }],
  },
  {
    org: 'Alphesda Interactive',
    title: 'Web Developer',
    start: 'May 2022',
    end: 'Sep 2022',
    location: 'Melbourne, Australia (remote)',
    summary: 'Built and maintained client-facing web experiences.',
    tags: ['Web', 'JavaScript'],
  },
];

export const education = {
  school: 'Ontario Tech University',
  degree: 'BSc (Hons) Computer Science',
  start: 'Sep 2022',
  end: 'Jun 2027 (expected)',
};

export const certifications: { label: string; href?: string }[] = [
  {
    label: 'Certificate of Excellence, Nordvern (Employee of the Year)',
    href: '/certificates/nordvern-employee-of-the-year.jpg',
  },
  {
    label: 'Seize the Moment: Software Development Training',
    href: 'https://verified.sertifier.com/en/verify/94363823464834/',
  },
  {
    label: 'TryHackMe: Pre Security',
    href: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-KERN8WSWK6.png',
  },
  {
    label: 'TryHackMe: Introduction to Cyber Security',
    href: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-9IQXQLWNNQ.png',
  },
  { label: 'SDF-TS Training Cohort 2: Certificate of Completion' },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C++', 'Python', 'TypeScript', 'JavaScript', 'R', 'SQL'] },
  {
    group: 'Data & AI',
    items: ['Statistical analysis', 'Machine learning', 'GANs & diffusion models', 'pandas', 'NumPy', 'Jupyter'],
  },
  { group: 'Web', items: ['React', 'Astro', 'Node.js', 'HTML/CSS', 'REST APIs'] },
  { group: 'Tools', items: ['Git & GitHub', 'Linux', 'VS Code', 'Azure (learning)'] },
];
