import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProjectId = bigint;
export type Timestamp = bigint;
export interface Profile {
    bio: string;
    title: string;
    socialLinks: Array<SocialLink>;
    name: string;
    skills: Array<string>;
}
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
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
}
export interface SocialLink {
    url: string;
    platform: string;
}
export interface backendInterface {
    addProject(title: string, description: string, techStack: Array<string>, imageUrl: string, liveUrl: string | null, githubUrl: string | null, category: string, featured: boolean): Promise<ProjectId>;
    deleteProject(id: ProjectId): Promise<boolean>;
    getAllProjects(): Promise<Array<Project>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getFeaturedProjects(): Promise<Array<Project>>;
    getProfile(): Promise<Profile | null>;
    getProject(id: ProjectId): Promise<Project | null>;
    setProfile(newProfile: Profile): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<bigint>;
    updateProject(project: Project): Promise<boolean>;
}
