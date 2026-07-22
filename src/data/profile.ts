export const profile = {
  name: 'Alireza Pakdaman',
  headline: 'Software Engineer',
  tagline:
    'CS undergrad at Ontario Tech building software with a data & generative-AI edge — from C++ analysis pipelines to AI visuals for live opera.',
  location: 'Greater Toronto Area, Canada',
  email: 'alirezapakdaman23@gmail.com',
  github: 'https://github.com/alireza-pakdaman',
  githubUser: 'alireza-pakdaman',
  linkedin: 'https://www.linkedin.com/in/alirezapakdaman',
  resume: '/resume.pdf',
  site: 'https://arshiatech.me',
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
}

export const experience: Role[] = [
  {
    org: 'Ontario Tech University',
    title: 'Data Analyst',
    start: 'May 2025',
    end: 'Present',
    location: 'Oshawa, ON',
    summary:
      'Statistical and exploratory data analysis for university research projects — turning complex datasets into actionable insights.',
    tags: ['Statistics', 'EDA', 'Python'],
  },
  {
    org: 'Ontario Tech University',
    title: 'Undergraduate R&D Scientist',
    start: 'Jul 2025',
    end: 'Oct 2025',
    location: 'Oshawa, ON',
    summary:
      'Developed generative AI models (GANs, diffusion) for a live opera production — unique vocal textures and AI-generated visual elements for the stage.',
    tags: ['GANs', 'Diffusion models', 'Generative AI'],
  },
  {
    org: 'Wouessi Digital',
    title: 'Software Development Trainee',
    start: 'Jan 2025',
    end: 'Apr 2025',
    location: 'Toronto, ON',
    summary:
      'Full-stack development on an employee management system — frontend features and API integration on a production codebase.',
    tags: ['Full-stack', 'React', 'REST APIs'],
  },
  {
    org: 'Dexlab',
    title: 'Software Developer',
    start: 'Sep 2024',
    end: 'Jan 2025',
    location: 'Ontario, Canada',
    summary:
      'Hands-on software development — coding, debugging, and shipping features in a small, fast-moving team.',
    tags: ['Software engineering'],
  },
  {
    org: 'nordvern',
    title: 'IT Specialist',
    start: 'May 2023',
    end: 'Jan 2025',
    location: 'Toronto, ON',
    summary:
      'Kept systems running for a downtown Toronto office — troubleshooting, infrastructure, and technical support.',
    tags: ['IT', 'Support'],
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

export const certifications = [
  'SDF-TS Training Cohort 2 — Certificate of Completion',
  'Certificate of Excellence',
  'TryHackMe — Pre Security',
  'TryHackMe — Introduction to Cyber Security',
  'Seize the Moment — Software Development Training',
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
