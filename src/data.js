import githubIcon from './icons/github.png';
import linkedinIcon from './icons/linkedin.png';
import itchIcon from './icons/itch.png';
import emailIcon from './icons/mail.png';

import terminalIcon from './icons/terminal.png';
import aboutIcon from './icons/aboutme.png';
import folderIcon from './icons/folder.png';
import skillsIcon from './icons/skills.png';
import contactIcon from './icons/contact.png';
import resumeIcon from './icons/resume.png';

import photo from './icons/photo.jpg';

export const ABOUT = {
  name: 'Meeran',
  handle: '@Meeran-Dev',
  title: 'Applied ML Engineer (in progress)',
  bio: 'CSE Student at GECA. Passionate about building ML-powered applications and exploring the latest in AI research.',
  location: 'India',
  education: 'B.Tech CSE - 3rd Year',
  profileIcon: photo,
  status: [
    'Implementing ML algorithms from scratch using NumPy.',
    'Learning about MLOps and deployment of ML models.',
    'Exploring the latest research papers in AI and ML.',
  ],
  achievements: [
    'Coming soon..',
  ],
  tags: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP'],
};

export const PROJECTS = [
  {
    id: 0,
    name: 'GECA Chatbot',
    description:
      'RAG-powered college assistant built with LangChain + MongoDB Atlas Vector Search. Inference via Groq with a custom embedding pipeline.',
    tags: ['LangChain', 'MongoDB Atlas', 'Groq', 'RAG'],
    github: 'https://github.com/Meeran-Dev/geca-chatbot'
  },
  {
    id: 1,
    name: 'Job Scam Detector',
    description:
      'ML classifier that detects fraudulent job/internship postings. TF-IDF features, SMOTE for class imbalance, GridSearchCV for tuning. ~94% accuracy. Deployed as a Streamlit app.',
    tags: ['scikit-learn', 'TF-IDF', 'SMOTE', 'GridSearchCV', 'Streamlit'],
    github: 'https://github.com/Meeran-Dev/Job-Internship-Scam-Detection'
  },
  {
    id: 2,
    name: 'LinkUp',
    description:
      'Real-time messaging platform. React/Vite frontend, FastAPI backend, Redis pub/sub for live delivery, PostgreSQL for persistence.',
    tags: ['React', 'FastAPI', 'Redis', 'PostgreSQL', 'WebSocket'],
    github: 'https://github.com/Meeran-Dev/LinkUp'
  },
  {
    id: 3,
    name: 'ML Paper Implementations',
    description:
      'Collection of machine learning papers implemented from scratch using NumPy. Evaluated using Scikit-learn metrics.',
    tags: ['NumPy', 'Scikit-learn', 'ML Algorithms'],
    github: 'https://github.com/Meeran-Dev/ml-paper-implementations'
  },
];

export const SKILLS = [
  {
    category: 'ML / AI',
    items: ['PyTorch', 'Scikit-learn', 'LangChain', 'RAG', 'HuggingFace', 'Ollama', 'TF-IDF', 'SMOTE'],
    highlights: ['PyTorch', 'Scikit-learn'],
  },
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'Java', 'Redis', 'PostgreSQL', 'MongoDB', 'WebSocket'],
    highlights: ['Python', 'FastAPI'],
  },
  {
    category: 'Frontend',
    items: ['React', 'JavaScript', 'HTML / CSS', 'Streamlit'],
    highlights: ['React', 'JavaScript'],
  },
  {
    category: 'DevOps / Tools',
    items: ['Git', 'GitHub', 'Vercel', 'uvicorn'],
    highlights: ['Git', 'GitHub'],
  },
  {
    category: 'Learning',
    items: ['MLflow', 'Docker'],
    highlights: [],
  },
];

export const FILE_ICONS = {
  about:    aboutIcon,
  projects: folderIcon,
  skills:   skillsIcon,
  contact:  contactIcon,
  terminal: terminalIcon,
};

export const CONTACT = [
  { platform: 'GitHub',    handle: 'github.com/Meeran-Dev',    url: 'https://github.com/Meeran-Dev',            icon: githubIcon },
  { platform: 'Email',     handle: 'mdmeeran.86684@email.com', url: 'mailto:mdmeeran.86684@email.com',          icon: emailIcon },
  { platform: 'LinkedIn',  handle: 'linkedin.com/in/mohd-meeran-md1151',   url: 'https://www.linkedin.com/in/mohd-meeran-md1151',                     icon: linkedinIcon },
  { platform: 'Itch.io',   handle: 'soloscript.itch.io',              url: 'https://soloscript.itch.io/',                      icon: itchIcon },
];

export const TERMINAL_COMMANDS = {
  help: {
    type: 'list',
    output: [
      '┌── AVAILABLE COMMANDS ────────────────┐',
      '  about          → who am i',
      '  ls             → list desktop files',
      '  ping github    → get github url',
      '  sudo hire      → 😏',
      '  uname -a       → system info',
      '  clear          → clear terminal',
      '└──────────────────────────────────────┘',
    ],
  },
  about: {
    type: 'text',
    output: 'Meeran — Applied ML Engineer (in progress)\nLocation: India  |  GitHub: Meeran-Dev',
  },
  ls: {
    type: 'list',
    output: ['about_me.txt', 'projects/', 'skills.dat', 'contact.cfg', 'terminal.sh'],
  },
  'ping github': { type: 'success', output: 'PONG 🏓  →  https://github.com/Meeran-Dev' },
  'uname -a':   { type: 'text',    output: 'PortfolioOS 1.0.0 meeran-dev #1 SMP x86_64 GNU/Linux' },
  'sudo hire': {
    type: 'success',
    output: '✅ Access granted.\n🚀 Send your offer to: mdmeeran.86684@email.com\n📎 Attaching portfolio... done.',
  },
  clear:  { type: 'clear',  output: '' },
};
