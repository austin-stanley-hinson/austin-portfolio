// ICONS
import { Link as LinkIcon } from "lucide-react";
import {
  Briefcase,
  Cloud,
  Code2,
  Coffee,
  Cpu,
  Database,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  Layout,
  Mail,
  MapPin,
  Palette,
  Phone,
  Server,
  Smartphone,
  Terminal,
  
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";


export const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Systems and Projects Built", value: "15+" },
  { label: "Students Mentored", value: "30+" },
  { label: "Technologies Used", value: "15+" },
];


export const highlights = [
  { icon: MapPin, text: "Based in New England (Maine)" },
  { icon: Briefcase, text: "Open for internships" },
  { icon: GraduationCap, text: "Current CS and Math major at Colby" },
  { icon: Coffee, text: "Powered by coffee & curiosity" },
];

export const experiences = [
  {
    type: "work",
    period: "2025",
    title: "HackHarvard — Frontend Engineer",
    company: "File Sharing App (Hackathon Project)",
    description:
      "Built a secure file sharing web application with real-time uploads, authentication, and cloud-backed storage. Focused on clean UI, access control, and fast upload performance.",
    technologies: ["React", "Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    type: "work",
    period: "2025",
    title: "HackMIT — Backend Developer",
    company: "Planty: Multi-Source AI Research Agent",
    description:
      "Developed backend logic for an AI-powered research assistant that aggregates multiple data sources. Implemented API integrations and structured retrieval pipelines for efficient data processing.",
    technologies: ["Python", "LangChain", "APIs", "Streamlit"],
  },
  {
    type: "work",
    period: "2022 – 2025",
    title: "Founder & Technical Lead",
    company: "TechEye Initiative",
    description:
      "Led technology education and mentorship initiatives focused on empowering students through coding workshops and hands-on software development projects.",
    technologies: ["Leadership", "Teaching", "Web Development", "Community Impact"],
  },
  {
    type: "education",
    period: "IN PROGRESS",
    title: "B.A. Applied Mathematics & Computer Science",
    company: "Colby College — Waterville, ME",
    description:
      "Studying systems design, algorithms, performance optimization, and mathematical modeling with a focus on building efficient and scalable software systems.",
    technologies: ["Java", "Python", "Data Structures", "Algorithms", "Systems Programming"],
  },
];


export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "austin03.yaf@gmail.com",
    href: "mailto:austin03.yaf@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "New England(Maine)",
    href: "https://www.google.com/maps/place/Waterville,+Maine",
  },
];


export const socialLinks = [
  { icon: FaGithub, href: "https://github.com/austin-stanley-hinson", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/hinson-austin", label: "LinkedIn" },
];

export const footerSocialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/austin-stanley-hinson",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/hinson-austin",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:austin03.yaf@gmail.com",
    label: "Email",
  },
];


export const projects = [
  {
    title: "Planty – Multi-Source AI Research Agent",
    description:
      "AI-powered research agent that aggregates multi-source web data and orchestrates LLM workflows to generate structured summaries.",
    image: "/images/p1.jpg",
    techStack: [
      "LangChain",
      "LangGraph",
      "OpenAI API",
      "Streamlit",
      "LLM Orchestration",
      "API Pipelines",
    ],
    githubUrl:
      "https://github.com/austin-stanley-hinson/Multi-Source-Deep-Search-Agent-",
  },

  {
    title: "Lokala (Location-Based Rewards Platform - In Progress)",
    description:
      "Mobile-first rewards platform connecting small local restaurants with nearby customers through location-based coupons, subscription tiers, and usage analytics.",
    image: "/images/p6.jpg", 
    techStack: [
      "React Native",
      "Expo",
      "Firebase",
      "Geolocation APIs",
      "Push Notifications",
      "Subscription Billing",
      "Cloud Functions",
    ],
    githubUrl:
      "https://github.com/austin-stanley-hinson/myLokala", 
  },

  {
    title: "Sign Language Detector & Translator",
    description:
      "Real-time computer vision system that detects hand gestures and translates them into readable text using ML models.",
    image: "/images/p2.jpg",
    techStack: [
      "OpenCV",
      "MediaPipe",
      "TensorFlow",
      "Real-Time Inference",
      "Computer Vision",
    ],
    githubUrl:
      "https://github.com/austin-stanley-hinson/Sign-Language-Detector-Translator",
  },

  {
    title: "Desktop Voice Assistant",
    description:
      "Voice-controlled desktop assistant capable of executing system commands, retrieving information, and automating workflows.",
    image: "/images/p3.jpg",
    techStack: [
      "SpeechRecognition",
      "NLP",
      "System Automation",
      "API Integrations",
    ],
    githubUrl:
      "https://github.com/austin-stanley-hinson/AI-Desktop-Assistant",
  },

  {
    title: "Secure File Sharing Application",
    description:
      "Full-stack file sharing platform with authentication, protected routes, and secure upload/download workflows.",
    image: "/images/p4.jpg",
    techStack: [
      "React",
      "Firebase Auth",
      "Cloud Storage",
      "Protected Routes",
      "Access Control",
    ],
    githubUrl:
      "https://github.com/austin-stanley-hinson",
  },
  {
    title: "Portfolio Website",
    description:
      "Fully responsive developer portfolio built with modern UI architecture, animation systems, and modular component design.",
    image: "/images/p5.jpg",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Shadcn UI",
      "AOS Animations",
      "Dark Mode Theming",
    ],
    githubUrl:
      "https://github.com/austin-stanley-hinson/austin-portfolio",
  },
];
export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: Globe },
      { name: "TypeScript", icon: Terminal },
      { name: "Tailwind CSS", icon: Palette },
      { name: "React Native", icon: Smartphone },
      { name: "Vue.js", icon: Layout },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Cpu },
      { name: "Python", icon: Terminal },
      { name: "FastAPI", icon: Globe },
      { name: "PostgreSQL", icon: Database },
      { name: "REST APIs", icon: LinkIcon },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "Docker", icon: Server },
      { name: "AWS", icon: Cloud },
      { name: "Linux", icon: Terminal },
      { name: "Figma", icon: Palette },
      { name: "CI/CD", icon: Cpu },
    ],
  },
  
];