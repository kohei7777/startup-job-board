export interface Job {
  id: number
  title: string
  company: string
  stage: string
  featured: boolean
  description: string
  tags: string
  salaryMin: number
  salaryMax: number
  location: string
  employees: string
  founded: string
  requirements: string
  benefits: string
  industry: string
  jobType: string
  createdAt: Date
}
