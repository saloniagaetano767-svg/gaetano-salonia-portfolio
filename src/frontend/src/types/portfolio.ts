import type { ProjectId, Timestamp } from "../backend.d";

export type { ProjectId, Timestamp };

export interface Project {
  id: ProjectId;
  title: string;
  featured: boolean;
  description: string;
  githubUrl?: string;
  imageUrl: string;
  category: string;
  liveUrl?: string;
  techStack: Array<string>;
}

export interface Profile {
  bio: string;
  title: string;
  socialLinks: Array<SocialLink>;
  name: string;
  skills: Array<string>;
}

export interface SocialLink {
  url: string;
  platform: string;
}

export interface ContactSubmission {
  id: bigint;
  name: string;
  email: string;
  message: string;
  timestamp: Timestamp;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type NavLink = {
  label: string;
  href: string;
};
