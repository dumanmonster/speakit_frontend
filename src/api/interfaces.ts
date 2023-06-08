export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  language: string;
  level: string;
  createdAt: Date;
  profileImg?: string;
  learnedTopics?: string[];
  favoriteDefinitions?: string[];
  isVerified?: boolean;
  role: "ADMIN" | "USER";
}

export interface Definition {
  id: string;
  word: string;
  description: string;
  level: string;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  level: string;
  language: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  format: "OFFLINE" | "ONLINE";
  entryFee: string;
  organizationId: string;
  link?: string;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  rating: number;
  industry: string;
}

export enum Roles {
  ADMIN,
  USER,
}
export interface IProduct {
  id: string;
  title: string;
  price: number;
}
