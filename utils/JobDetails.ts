export interface JobDetails {
  id: number;
  jobName: string;
  progress: number;
}

export const jobDetails: JobDetails[] = [
  {
    id: 1,
    jobName: 'Saravanan - Heart surgery',
    progress: 50,
  },
  {
    id: 2,
    jobName: 'Anunaga - ENT surgery',
    progress: 70,
  },
  {
    id: 3,
    jobName: 'Anunaga - ENT surgery',
    progress: 90,
  },
];
