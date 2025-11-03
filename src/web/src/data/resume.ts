import React from 'react';

export type ContactInfo = {
  name: React.ReactNode;
  title: React.ReactNode;
  email: React.ReactNode;
  phone: React.ReactNode;
  location: React.ReactNode;
  drunkmode?: React.ReactNode;
  github?: React.ReactNode;
  website?: React.ReactNode;
};

export type Education = {
  degree: React.ReactNode;
  majors: React.ReactNode[];
  minor?: React.ReactNode;
  institution?: React.ReactNode;
  graduationDate?: Date;
};

export type SkillSet = {
  title: React.ReactNode;
  description: React.ReactNode;
};

export type SkillCategory = {
  title: React.ReactNode;
  items: SkillSet[];
};

export type Company = {
  name: React.ReactNode;
  href?: string;
};

export type WorkType = 'Contract' | 'Full-Time' | 'Internship' | 'Part-Time';

export type WorkExperience = {
  title: React.ReactNode;
  company: Company | string;
  type?: WorkType;
  startDate?: Date;
  endDate?: Date;
  releaseDate?: Date;
  location: React.ReactNode;
  achievements: React.ReactNode[];
};

export type ResumeData = {
  contact: ContactInfo;
  education: Education;
  skills: SkillCategory[];
  summary: React.ReactNode;
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
    title: 'Red Team Operator & AI Systems Evaluator | Web Application Pentester | Hardware & Secure Full Stack Engineer',
  },
  education: {
    degree: 'Bachelor of Science',
    majors: ['Computer Science', 'Mathematics'],
    minor: 'Film Studies',
  },
  projects: [],
  skills: [
    {
      items: [
        { description: 'Red teaming AI systems, adversarial attack design, edge case probing', title: 'Adversarial Testing' },
        { description: 'Transfer learning, model adaptation, domain-specific fine-tuning', title: 'Fine-tuning & Transfer Learning' },
        { description: 'Jailbreak attacks, prompt injection, safety boundary testing', title: 'LLM Red Teaming' },
        { description: 'Model performance monitoring, drift detection, anomaly scoring', title: 'Model Evaluation & Drift Detection' },
        { description: 'Prompt optimization, chain-of-thought reasoning, VLM enhancement', title: 'Prompt Engineering' },
        { description: 'Attention mechanisms, ViT architecture, multimodal transformers', title: 'Transformer Architecture' },
      ],
      title: 'AI/ML Specialties',
    },
    {
      items: [
        { description: 'Primary language for full-stack development and automation', title: 'TypeScript' },
        { description: 'AI/ML development, data science, adversarial testing', title: 'Python' },
        { description: 'Full-stack web development, Node.js backend services', title: 'JavaScript' },
        { description: 'Systems programming, robotics, embedded development', title: 'Rust' },
        { description: 'Performance-critical applications, robotics middleware', title: 'C++' },
        { description: 'Microservices, concurrent systems, cloud infrastructure', title: 'Go' },
      ],
      title: 'Programming Languages',
    },
    {
      items: [
        { description: 'Component-based UI development, hooks, context API', title: 'React.js' },
        { description: 'Server-side rendering, static generation, API routes', title: 'Next.js' },
        { description: 'Deep learning frameworks for model training and inference', title: 'PyTorch / TensorFlow' },
        { description: 'LLM application development, prompt templates, chains', title: 'LangChain' },
        { description: 'Pre-trained models, tokenizers, inference pipelines', title: 'Hugging Face Transformers' },
        { description: 'Backend API development, middleware, routing', title: 'Express / FastAPI' },
        { description: 'Containerization, microservices, orchestration', title: 'Docker / Kubernetes' },
        { description: 'Modern API design and type-safe queries', title: 'GraphQL / gRPC' },
      ],
      title: 'Libraries & Frameworks',
    },
    {
      items: [
        { description: 'EC2, Lambda, S3, RDS, CloudFormation, IAM', title: 'AWS' },
        { description: 'Container orchestration, service mesh, deployments', title: 'Kubernetes / Helm' },
        { description: 'Continuous integration and deployment pipelines', title: 'GitHub Actions / CircleCI' },
        { description: 'Infrastructure as code, multi-cloud provisioning', title: 'Terraform' },
        { description: 'CI/CD automation, pipeline orchestration', title: 'Jenkins / BuildKite' },
        { description: 'Monitoring, logging, APM, alerting', title: 'Datadog' },
      ],
      title: 'CI/CD, DevOps & Cloud',
    },
    {
      items: [
        { description: 'Agile development, sprint planning, retrospectives', title: 'AGILE / Scrum' },
        { description: 'Visual workflow management, WIP limits, continuous delivery', title: 'Kanban' },
        { description: 'Version control, branching strategies, collaboration', title: 'Git / GitHub' },
        { description: 'End-to-end testing, browser automation', title: 'Playwright / Selenium' },
        { description: 'Unit testing, integration testing, mocking', title: 'Jest / PyTest' },
      ],
      title: 'Methodologies & Tools',
    },
    {
      items: [
        { description: 'Robot simulation environment for testing and validation', title: 'Gazebo' },
        { description: 'Physics engine for robotics and reinforcement learning', title: 'MuJoCo' },
      ],
      title: 'Robotics & Simulation',
    },
    {
      items: [
        { description: 'AWS Certified Developer - Associate', title: 'AWS Developer Certified' },
        { description: 'Advanced penetration testing certification', title: 'Offensive Security Certified Professional (OSCP)' },
        { description: 'Scrum framework and agile practices', title: 'Professional Scrum Master I (PSM I)' },
      ],
      title: 'Certifications',
    },
  ],
  summary: 'Red Team Operator and AI Systems Evaluator with 12+ years of experience in web application penetration testing, hardware security, and secure full stack engineering. Expert in adversarial testing of LLM systems, transformer architecture analysis, and prompt engineering exploitation. OSCP-certified with deep expertise in red teaming robotics systems, embedded hardware, and AI-integrated applications. Specialized in identifying vulnerabilities in ML pipelines, model drift detection, and automated adversarial test harness development for safety-critical intelligent systems.',
  workExperience: [
    {
      achievements: [
        'Engineered adversarial test harnesses for transformer-based vision models (ViT) and reinforcement learning policies, designing automated red team attacks to probe edge cases, jailbreaks, prompt injection vulnerabilities, and safety boundary violations in production AI systems deployed on Spot and Atlas robots.',
        'Led red teaming initiatives targeting multimodal perception pipelines, crafting adversarial inputs to expose model brittleness, distribution shift, and catastrophic forgetting. Developed evaluation frameworks measuring robustness against adversarial perturbations, data poisoning, and model extraction attacks.',
        'Designed and fine-tuned transformer-based perception models for path planning, object detection, and obstacle avoidance. Applied prompt engineering techniques to optimize vision-language model (VLM) performance, achieving 23% improvement in safety-critical edge case detection through systematic prompt optimization and chain-of-thought reasoning.',
        'Implemented full-stack AI model monitoring and evaluation infrastructure, integrating real-time drift detection, anomaly scoring, and automated retraining triggers to maintain model performance across diverse deployment environments.',
      ],
      company: {
        href: 'https://www.bostondynamics.com',
        name: 'Boston Dynamics',
      },
      location: 'Waltham, MA (Hybrid)',
      startDate: new Date('2022-06-15'),
      title: 'Red Team Operator & AI Systems Evaluator',
      type: 'Full-Time',
    },
    {
      achievements: [
        'Architected and trained generative adversarial networks (GANs) for synthetic DNA sequence generation, implementing custom loss functions and training strategies to optimize convergence while preventing mode collapse and distribution drift in biomarker generation pipelines.',
        'Designed comprehensive AI model evaluation frameworks incorporating adversarial testing, statistical validation, and red team probing to detect overfitting, catastrophic forgetting, and data leakage in production ML systems. Developed automated attack scripts testing model robustness against adversarial examples and out-of-distribution inputs.',
        'Built end-to-end MLOps pipelines with automated model versioning, A/B testing infrastructure, and continuous evaluation dashboards tracking model drift, data quality degradation, and adversarial robustness metrics. Reduced false positive rates by 37% through systematic prompt engineering and retrieval-augmented generation (RAG) optimization.',
        'Performed security assessments of ML systems processing sensitive genomic data, implementing differential privacy mechanisms and federated learning protocols to ensure HIPAA compliance while maintaining model performance.',
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
        'Developed adversarial testing frameworks for AI-powered biometric identification systems, designing red team attacks including prompt injection, model inversion, and membership inference attacks to probe privacy vulnerabilities and circumvention vectors in facial recognition and document verification pipelines processing sensitive PII.',
        'Led AI red teaming efforts simulating adversarial attacks against production ML models, including data poisoning campaigns, backdoor insertion attempts, and model extraction attacks. Implemented defensive measures reducing successful evasion attacks by 64% through adversarial training and input sanitization.',
        'Designed and evaluated transformer-based NLP models for document classification and entity extraction, applying prompt engineering and few-shot learning techniques to optimize performance on government forms and multilingual identification documents while maintaining strict privacy guarantees.',
        'Architected secure MLOps pipelines with automated model evaluation, red team attack simulation, and compliance monitoring for AI systems handling classified data. Integrated adversarial robustness testing into CI/CD workflows, detecting and patching 12 critical model vulnerabilities before production deployment.',
      ],
      company: {
        href: 'https://www.saic.com/',
        name: 'Unisys Federal SAIC',
      },
      endDate: new Date('2020-06-15'),
      location: 'Alexandria, VA',
      startDate: new Date('2016-05-15'),
      title: 'Red Team Operator & AI Systems Evaluator',
      type: 'Full-Time',
    },
  ],
};
