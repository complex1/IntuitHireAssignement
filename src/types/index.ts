export interface IJob {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  tags: string[];
  postedDate: string;
  deadline: string;
  applicants: number;
  description: string;
  requirements: string;
}

export interface IEmployer {
  id: string;
  "companyName": string;
  "email": string;
  "contactNumber": string;
  "password": string;
}

export interface IFreelancer {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  password: string;
  githubUsername: string;
}

export interface IFilter {
  search: string;
  tags: string[];
  tagOptions: string[];
  sortBy: string;
  companys: string[];
  companysOptions: string[];
  experience: number;
  experienceOptions: number[];
}