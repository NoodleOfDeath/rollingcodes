export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  website?: string;
  drunkmode?: string;
};

export type Education = {
  degree: string;
  majors: string[];
  minor?: string;
  institution?: string;
  graduationDate?: Date;
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export type Skills = {
  methodologies: string[];
  favoriteLanguages: string[];
  allLanguages: string[];
  librariesAndFrameworks: string[];
  ciCdDevOpsCloud: string[];
  developerTools: string[];
  roboticsSimulation: string[];
  certifications: string[];
};

export type Company = {
  name: string;
  href?: string;
};

export type WorkType = 'Contract' | 'Full-Time' | 'Internship' | 'Part-Time';

export type WorkExperience = {
  title: string;
  company: Company | string;
  type?: WorkType;
  startDate?: Date;
  endDate?: Date;
  releaseDate?: Date;
  location: string | React.ReactNode;
  achievements: (string | React.ReactNode)[];
};

export type ResumeData = {
  contact: ContactInfo;
  education: Education;
  skills: Skills;
  summary: string;
  workExperience: WorkExperience[];
  projects: WorkExperience[];
};

export const resumeData: ResumeData = {
  contact: {
    email: 'thom@noodleofdeath.com',
    github: 'https://www.github.com/noodleofdeath',
    location: 'Everett, MA',
    name: 'Thom Morgan',
    phone: '(703) 215-5735',
    title: 'AI Systems Penetration Tester & Secure Full Stack Engineer',
  },
  education: {
    degree: 'Bachelor of Science',
    majors: ['Computer Science', 'Mathematics'],
    minor: 'Film Studies',
  },
  projects: [],
  skills: {
    allLanguages: [
      'C',
      'C++',
      'CSS',
      'Go',
      'HTML',
      'Java',
      'JavaScript',
      'Python',
      'R',
      'Ruby',
      'Rust',
      'SCSS',
      'Shell',
      'SQL',
      'TypeScript',
    ],
    certifications: [
      'AWS Developer Certified',
      'Offensive Security Certified Professional (OSCP)',
      'Professional Scrum Master I (PSM I)',
    ],
    ciCdDevOpsCloud: [
      'AWS',
      'Azure',
      'Blue Ocean',
      'BuildKite',
      'CircleCI',
      'Datadog',
      'DigitalOcean',
      'Helm',
      'GitHub Actions',
      'GitLab Webhooks',
      'Google Cloud Services',
      'Jenkins',
      'Kubernetes',
      'Terraform',
    ],
    developerTools: [
      'Git',
      'GitHub',
      'npm',
      'pnpm',
      'VS Code',
      'Yarn',
    ],
    favoriteLanguages: [
      'JavaScript',
      'Python',
      'TypeScript',
    ],
    librariesAndFrameworks: [
      'Docker',
      'Express',
      'FastAPI',
      'GraphQL',
      'gRPC',
      'Jest',
      'Next.js',
      'Node.js',
      'Pandas',
      'Playwright',
      'PyTorch',
      'React.js',
      'React Native',
      'REST APIs',
      'Selenium',
      'TensorFlow',
    ],
    methodologies: [
      'AGILE',
      'Kanban',
      'Waterfall',
    ],
    roboticsSimulation: [
      'Gazebo',
      'MuJoCo',
    ],
  },
  summary: 'Security-minded Full Stack and AI Systems Engineer with 12+ years of experience designing and automating adversarial test harnesses for robotics, embedded systems, and LLM-integrated applications. Expert in secure CI/CD pipelines, red teaming, and AI evaluation frameworks that identify brittleness, drift, and catastrophic forgetting before deployment. Combines deep software engineering expertise with offensive security certification (OSCP) and ML fluency to ensure safety, reproducibility, and compliance across large-scale intelligent systems.',
  workExperience: [
    {
      achievements: [
        'Designed a secure test harness integrating simulated robotics environments (Gazebo, MuJoCo) with CI/CD pipelines (Jenkins, Buildkite) to automatically probe system regressions, safety violations, and catastrophic forgetting in AI subsystems.',
        'Performed adversarial red teaming of robotic vision and navigation models, identifying potential failure modes in perception pipelines prior to field deployment. Implemented full-stack telemetry, logging, and anomaly detection to support incident response and drift monitoring across production firmware and AI models.',
        'Rearchitected and fine-tuned various perception AI models used by Spot and Atlas for path expansion, object detection, and obstacle avoidance.',
      ],
      company: {
        href: 'https://www.bostondynamics.com',
        name: 'Boston Dynamics',
      },
      location: 'Waltham, MA (Hybrid)',
      startDate: new Date('2022-06-15'),
      title: 'AI Systems Penetration Tester & Senior Secure Full Stack Engineer',
      type: 'Full-Time',
    },
    {
      achievements: [
        'Built GAN-based DNA sequence generators and automated evaluation scripts to test for convergence and outlier drift in model-generated biomarker sequences.',
        'Integrated data quality scoring and statistical validation pipelines to ensure reproducible outputs and detect overfitting or catastrophic forgetting in deployed models.',
        'Delivered full-stack tools accelerating lab throughput by 50%, automating submission, sequencing, and analysis with real-time risk dashboards for scientists.',
      ],
      company: {
        href: 'https://www.absci.com',
        name: 'Absci Corp',
      },
      endDate: new Date('2022-06-15'),
      location: 'Oregon, WA (Remote)',
      startDate: new Date('2020-06-15'),
      title: 'Senior Secure Full Stack Engineer & Data Scientist',
      type: 'Contract',
    },
    {
      achievements: [
        'Implemented AI evaluation frameworks to harden software used to process sensitive PII for identifying wanted individuals both from being circumvented while also guaranteeing compliance with data privacy regulations.',
        'Re-engineered mobile field applications used by U.S. Customs & Border Protection with an emphasis on security, reliability, and low-latency data validation.',
        'Integrated automated regression testing and code-coverage analytics into existing CI/CD pipelines, cutting build and deployment costs by nearly 50%.',
      ],
      company: {
        href: 'https://www.saic.com/',
        name: 'Unisys Federal SAIC',
      },
      endDate: new Date('2020-06-15'),
      location: 'Alexandria, VA',
      startDate: new Date('2016-05-15'),
      title: 'AI Systems Penetration Tester & Senior Secure Full Stack Engineer',
      type: 'Full-Time',
    },
  ],
};
