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

export type ResumeVersion = 'ic' | 'tech-lead';

// Shared data
const sharedContact: ContactInfo = {
  email: 'thom@noodleofdeath.com',
  github: 'https://www.github.com/noodleofdeath',
  location: 'Everett, MA',
  name: 'Thom Morgan',
  phone: '(703) 215-5735',
  title: 'Technical Lead & Security Red Team Operator | AI Systems Evaluator | Full Stack Pentester',
};

const sharedEducation: Education = {
  degree: 'Bachelor of Science',
  majors: ['Computer Science', 'Mathematics'],
  minor: 'Film Studies',
};

const sharedCertifications: SkillCategory = {
  items: [
    { description: 'AWS Certified Developer - Associate', title: 'AWS Developer Certified' },
    { description: 'Advanced penetration testing certification', title: 'Offensive Security Certified Professional (OSCP)' },
    { description: 'Scrum framework and agile practices', title: 'Professional Scrum Master I (PSM I)' },
  ],
  title: 'Certifications',
};

const sharedProgrammingLanguages: SkillCategory = {
  items: [
    { description: 'Primary language for full-stack development and automation', title: 'TypeScript' },
    { description: 'AI/ML development, data science, adversarial testing', title: 'Python' },
    { description: 'Full-stack web development, Node.js backend services', title: 'JavaScript' },
    { description: 'Systems programming, robotics, embedded development', title: 'Rust' },
    { description: 'Performance-critical applications, robotics middleware', title: 'C++' },
    { description: 'Microservices, concurrent systems, cloud infrastructure', title: 'Go' },
  ],
  title: 'Programming Languages',
};

const sharedFrameworks: SkillCategory = {
  items: [
    { description: 'Deep learning frameworks, CUDA optimization, distributed training', title: 'PyTorch / TensorFlow' },
    { description: 'LLM orchestration, agents, RAG chains, memory management', title: 'LangChain / LlamaIndex' },
    { description: 'Foundation models, tokenizers, PEFT, inference optimization', title: 'Hugging Face Transformers' },
    { description: 'Vector similarity search, embeddings, semantic retrieval', title: 'Pinecone / Weaviate / ChromaDB' },
    { description: 'React 18+, Next.js 14+, server components, streaming SSR', title: 'React / Next.js' },
    { description: 'FastAPI, Express, GraphQL, gRPC, WebSockets, event-driven APIs', title: 'Backend Frameworks' },
    { description: 'Container orchestration, service mesh (Istio), helm charts', title: 'Docker / Kubernetes' },
    { description: 'Pytest, Jest, Playwright, chaos engineering, contract testing', title: 'Testing Frameworks' },
  ],
  title: 'Frameworks & Technologies',
};

const sharedDevOps: SkillCategory = {
  items: [
    { description: 'EC2, ECS, Lambda, SageMaker, Bedrock, S3, RDS, VPC, IAM', title: 'AWS Cloud Platform' },
    { description: 'GitOps, ArgoCD, Flux, container orchestration, service mesh (Istio)', title: 'Kubernetes Ecosystem' },
    { description: 'IaC, multi-cloud provisioning, state management, policy as code', title: 'Terraform / Pulumi' },
    { description: 'GitHub Actions, GitLab CI, CircleCI, pipeline-as-code', title: 'CI/CD Platforms' },
    { description: 'Observability, APM, distributed tracing, log aggregation, SLOs', title: 'Datadog / Prometheus / Grafana' },
    { description: 'Configuration management, secret management (Vault), drift detection', title: 'Infrastructure Automation' },
  ],
  title: 'DevOps & Cloud Infrastructure',
};

const sharedSecurityTools: SkillCategory = {
  items: [
    { description: 'Burp Suite, Metasploit, Cobalt Strike, BloodHound, OWASP ZAP, custom tooling', title: 'Security Testing Tools' },
    { description: 'MITRE ATT&CK, threat intelligence, incident response, forensics', title: 'Red/Purple Team Operations' },
    { description: 'NIST, FedRAMP, HIPAA, GDPR, SOC 2, compliance automation', title: 'Security Compliance' },
  ],
  title: 'Security Tools & Compliance',
};

const sharedMethodologies: SkillCategory = {
  items: [
    { description: 'Agile/Scrum, SAFe, sprint planning, retrospectives, OKRs', title: 'Agile Methodologies' },
    { description: 'SDLC, shift-left security, secure-by-design, threat modeling', title: 'Secure Development' },
    { description: 'Git workflows, trunk-based development, code review, pair programming', title: 'Software Engineering Practices' },
    { description: 'SRE principles, incident management, postmortems, SLI/SLO/SLA', title: 'Site Reliability Engineering' },
  ],
  title: 'Methodologies & Best Practices',
};

const sharedRobotics: SkillCategory = {
  items: [
    { description: 'Robot simulation environment for testing and validation', title: 'Gazebo' },
    { description: 'Physics engine for robotics and reinforcement learning', title: 'MuJoCo' },
  ],
  title: 'Robotics & Simulation',
};

// TECH LEAD VERSION - Leadership focused
export const techLeadResumeData: ResumeData = {
  contact: {
    ...sharedContact,
    title: 'Technical Lead & Security Engineering Manager | AI/ML Security Architect | Red Team Operations',
  },
  education: sharedEducation,
  projects: [],
  skills: [
    {
      items: [
        { description: 'GenAI/LLM security, jailbreak attacks, prompt injection, safety alignment', title: 'LLM Security & Red Teaming' },
        { description: 'Red teaming AI systems, adversarial ML, model poisoning, evasion attacks', title: 'Adversarial AI Testing' },
        { description: 'OWASP Top 10, web/API/mobile pentesting, exploit development, zero-days', title: 'Offensive Security (OSCP)' },
        { description: 'Zero-trust architecture, secure-by-design, threat modeling (STRIDE)', title: 'Security Architecture & Strategy' },
        { description: 'DevSecOps, shift-left security, SAST/DAST/SCA, security-as-code', title: 'Application Security Automation' },
      ],
      title: 'Core Expertise: Security & AI Red Teaming',
    },
    {
      items: [
        { description: 'Led 6-7 senior developers building secure AI systems and full stack applications', title: 'Engineering Leadership' },
        { description: 'Cross-functional coordination, agile/scrum, OKRs, stakeholder management', title: 'Team & Product Management' },
        { description: 'Technical roadmapping, architecture decisions, code review standards', title: 'Technical Strategy' },
        { description: 'Security champions program, threat modeling workshops, security training', title: 'Security Culture Building' },
        { description: 'Hiring, mentorship, performance management, career development', title: 'People Leadership' },
      ],
      title: 'Leadership & Management',
    },
    {
      items: [
        { description: 'RAG architectures, vector databases (Pinecone, Weaviate), semantic search', title: 'Retrieval-Augmented Generation' },
        { description: 'LoRA, QLoRA, PEFT, instruction tuning, RLHF, domain adaptation', title: 'LLM Fine-tuning & Optimization' },
        { description: 'Chain-of-thought, few-shot learning, prompt optimization, agent frameworks', title: 'Prompt Engineering' },
        { description: 'Transformer architecture, attention mechanisms, ViT, multimodal models', title: 'Deep Learning Architecture' },
        { description: 'MLOps, model monitoring, drift detection, A/B testing, feature stores', title: 'ML Operations & Governance' },
        { description: 'XAI, SHAP, LIME, fairness metrics, bias detection, model interpretability', title: 'Explainable AI' },
      ],
      title: 'AI/ML Engineering',
    },
    sharedProgrammingLanguages,
    sharedFrameworks,
    sharedDevOps,
    sharedSecurityTools,
    sharedMethodologies,
    sharedRobotics,
    sharedCertifications,
  ],
  summary: 'Technical Lead and Security Engineering Manager with 12+ years specializing in secure AI/ML systems and offensive security. Progressive evolution from full stack penetration tester → DevOps/AI engineer → technical leadership orchestrating cross-functional teams. Currently at Boston Dynamics, leading 6-7 senior developers in architecting secure GenAI/LLM systems for production robotics while directing security red team operations. Core expertise: AI/LLM security architecture, adversarial ML testing, secure full stack development, and DevSecOps automation. Reduced critical vulnerabilities 47% through strategic implementation of shift-left security, automated SQA pipelines, and zero-trust architectures. OSCP-certified with proven track record building high-performing security-focused engineering teams.',
  workExperience: [
    {
      achievements: [
        'Led cross-functional agile team of 6-7 senior developers in cloud-native microservices architecture and embedded GenAI/LLM deployment for Spot and Atlas robots. Orchestrated security red team operations, identifying and remediating 150+ vulnerabilities across web applications, RESTful/GraphQL APIs, and ML pipelines. Reduced critical security findings by 47% year-over-year through shift-left security, automated SQA pipelines, and DevSecOps practices.',
        'Established GitOps-based CI/CD infrastructure leveraging containerization (Docker/Kubernetes) with automated security testing, SAST/DAST scanning, and dependency vulnerability checks. Accelerated release cycles by 35% while maintaining zero security regressions in production, implementing infrastructure-as-code (Terraform) and zero-trust network architecture principles.',
        'Directed engineering of adversarial AI testing frameworks for transformer-based vision models (ViT) and reinforcement learning policies. Designed automated red team attack simulation probing LLM jailbreaks, prompt injection, RAG poisoning, and model inversion attacks, identifying 40+ critical AI safety vulnerabilities pre-production using MLSecOps best practices.',
        'Mentored team in secure-by-design architecture, conducting weekly threat modeling (STRIDE), security champions training, and pair programming sessions. Improved team security awareness scores by 60% and reduced security-related bugs by 52% through implementation of security guardrails and automated policy enforcement.',
        'Architected observable AI/ML infrastructure with real-time model performance monitoring, drift detection using statistical process control, and automated retraining pipelines. Applied advanced prompt engineering, few-shot learning, and retrieval-augmented generation (RAG) achieving 23% improvement in safety-critical edge case detection for autonomous navigation systems.',
      ],
      company: {
        href: 'https://www.bostondynamics.com',
        name: 'Boston Dynamics',
      },
      location: 'Waltham, MA (Hybrid)',
      startDate: new Date('2022-06-15'),
      title: 'Technical Lead - Security Red Team & AI Systems',
      type: 'Full-Time',
    },
    {
      achievements: [
        'Built end-to-end MLOps and DevOps pipelines with automated model versioning, CI/CD orchestration, A/B testing frameworks, and observability dashboards tracking model drift, data quality, and adversarial robustness. Reduced false positive rates by 37% through hyperparameter optimization, ensemble methods, and feature engineering using XGBoost and deep learning architectures.',
        'Architected and trained state-of-the-art generative AI models (GANs) for synthetic DNA sequence generation, implementing custom loss functions and attention mechanisms to optimize convergence. Deployed scalable inference pipelines on AWS Lambda and ECS, processing millions of biomarker predictions with sub-100ms latency.',
        'Designed comprehensive AI governance and model evaluation frameworks incorporating explainability (SHAP/LIME), fairness metrics, adversarial robustness testing, and automated red team probing. Implemented MLSecOps practices detecting data poisoning, model extraction attacks, and backdoor vulnerabilities in production ML systems.',
        'Performed security assessments and penetration testing of cloud-based ML systems processing PHI/PII, implementing differential privacy, federated learning, and homomorphic encryption protocols to ensure HIPAA/GDPR compliance. Architected zero-trust data access patterns and secure enclaves for model training on sensitive genomic data.',
      ],
      company: {
        href: 'https://www.absci.com',
        name: 'Absci Corp',
      },
      endDate: new Date('2022-06-15'),
      location: 'Oregon, WA (Remote)',
      startDate: new Date('2020-06-15'),
      title: 'Senior Full Stack Engineer - DevOps & AI/ML',
      type: 'Contract',
    },
    {
      achievements: [
        'Conducted comprehensive OWASP Top 10 penetration testing across cloud-native web applications, RESTful/SOAP APIs, mobile apps (iOS/Android), and network infrastructure for FedRAMP-compliant government systems. Performed manual code review and automated security assessments using Burp Suite, Metasploit, and custom exploit development, identifying 200+ critical/high severity vulnerabilities including SQL injection, XSS, CSRF, authentication bypasses, and privilege escalation.',
        'Executed sophisticated red team operations simulating nation-state APT tactics (MITRE ATT&CK framework) against federal infrastructure. Successfully compromised air-gapped networks through spear phishing, watering hole attacks, social engineering, and zero-day exploit chains. Produced executive-level threat intelligence reports and delivered security awareness training achieving 85% phishing detection improvement.',
        'Developed adversarial ML testing frameworks for biometric identification systems (facial recognition, fingerprint analysis) processing sensitive PII. Designed white-box and black-box attacks including prompt injection, model inversion, membership inference, and adversarial perturbations. Reduced evasion attack success by 64% through adversarial training, input validation, and rate limiting.',
        'Architected DevSecOps pipelines integrating shift-left security practices with SAST (SonarQube, Checkmarx), DAST (OWASP ZAP), SCA (Snyk, Dependabot), and container scanning (Trivy, Clair). Implemented security-as-code using policy engines (OPA) and secret management (Vault), detecting and remediating 12 critical CVEs pre-production, establishing foundation for later DevOps/SRE specialization.',
      ],
      company: {
        href: 'https://www.saic.com/',
        name: 'Unisys Federal SAIC',
      },
      endDate: new Date('2020-06-15'),
      location: 'Alexandria, VA',
      startDate: new Date('2016-05-15'),
      title: 'Full Stack Penetration Tester & Red Team Operator',
      type: 'Full-Time',
    },
  ],
};

// IC VERSION - Deep technical expertise focused
export const icResumeData: ResumeData = {
  contact: {
    ...sharedContact,
    title: 'Senior Security Engineer & AI Red Team Specialist | LLM Security | Full Stack Pentester',
  },
  education: sharedEducation,
  projects: [],
  skills: [
    {
      items: [
        { description: 'GenAI/LLM security, jailbreak attacks, prompt injection, safety alignment', title: 'LLM Security & Red Teaming' },
        { description: 'Red teaming AI systems, adversarial ML, model poisoning, evasion attacks', title: 'Adversarial AI Testing' },
        { description: 'RAG architectures, vector databases (Pinecone, Weaviate), semantic search', title: 'Retrieval-Augmented Generation' },
        { description: 'LoRA, QLoRA, PEFT, instruction tuning, RLHF, domain adaptation', title: 'LLM Fine-tuning & Optimization' },
        { description: 'OWASP Top 10, web/API/mobile pentesting, exploit development, zero-days', title: 'Offensive Security (OSCP)' },
        { description: 'MLSecOps, model monitoring, adversarial robustness, AI safety testing', title: 'AI Security Operations' },
      ],
      title: 'Core Expertise: AI/LLM Security & Red Teaming',
    },
    {
      items: [
        { description: 'Manual code review, automated scanning, SAST/DAST/SCA integration', title: 'Application Security Testing' },
        { description: 'Burp Suite, Metasploit, Cobalt Strike, BloodHound, custom exploit development', title: 'Penetration Testing' },
        { description: 'Zero-trust architecture, secure-by-design, threat modeling (STRIDE)', title: 'Security Architecture' },
        { description: 'DevSecOps, shift-left security, CI/CD security automation', title: 'Security Automation' },
        { description: 'MITRE ATT&CK, threat intelligence, incident response, forensics', title: 'Red Team Operations' },
        { description: 'NIST, FedRAMP, HIPAA, GDPR, SOC 2, security compliance', title: 'Compliance & Governance' },
      ],
      title: 'Offensive Security & AppSec',
    },
    {
      items: [
        { description: 'Chain-of-thought, few-shot learning, prompt optimization, agent frameworks', title: 'Prompt Engineering' },
        { description: 'Transformer architecture, attention mechanisms, ViT, multimodal models', title: 'Deep Learning Architecture' },
        { description: 'PyTorch, TensorFlow, CUDA optimization, distributed training', title: 'ML Frameworks' },
        { description: 'MLOps, model monitoring, drift detection, A/B testing, feature stores', title: 'ML Operations' },
        { description: 'XAI, SHAP, LIME, fairness metrics, bias detection, interpretability', title: 'Explainable AI' },
        { description: 'LangChain, LlamaIndex, vector DBs, RAG pipelines, agent orchestration', title: 'LLM Application Development' },
      ],
      title: 'AI/ML Engineering & Research',
    },
    sharedProgrammingLanguages,
    sharedFrameworks,
    sharedDevOps,
    sharedMethodologies,
    sharedRobotics,
    sharedCertifications,
  ],
  summary: 'Senior Security Engineer and AI Red Team Specialist with 12+ years of deep technical expertise in LLM security, adversarial ML testing, and offensive security. Expert in designing and executing sophisticated attacks against GenAI systems including jailbreak techniques, prompt injection, RAG poisoning, and model extraction. Hands-on experience building adversarial test harnesses for transformer-based models, conducting full stack penetration testing, and implementing automated security testing in CI/CD pipelines. Identified 400+ critical vulnerabilities across web applications, APIs, and ML systems. OSCP-certified with proven ability to find and exploit complex security flaws in production systems while implementing robust defensive measures. Specialized in the intersection of AI safety, ML security, and traditional application security.',
  workExperience: [
    {
      achievements: [
        'Engineered sophisticated adversarial test harnesses for transformer-based vision models (ViT) and reinforcement learning policies deployed on Spot and Atlas robots. Designed automated red team attack frameworks probing LLM jailbreaks, prompt injection, RAG poisoning, model inversion, and membership inference attacks. Identified 40+ critical AI safety vulnerabilities including edge cases causing catastrophic failures in autonomous navigation systems.',
        'Performed comprehensive security assessments of GenAI/LLM systems, discovering novel attack vectors including context window poisoning, embedding space manipulation, and semantic adversarial perturbations. Developed custom tooling for automated LLM security testing achieving 3x faster vulnerability discovery. Implemented defensive measures including input sanitization, output filtering, and adversarial training reducing successful attacks by 64%.',
        'Conducted deep technical penetration testing across cloud-native microservices, RESTful/GraphQL APIs, and ML inference pipelines. Discovered and exploited critical vulnerabilities including authentication bypasses, privilege escalation, SQL injection, and model extraction attacks. Developed proof-of-concept exploits and detailed technical remediation guidance resulting in 47% reduction in critical security findings.',
        'Built end-to-end security automation integrating SAST/DAST/SCA tools into GitOps CI/CD pipelines. Implemented infrastructure-as-code security scanning, container vulnerability analysis, and secret detection using Trivy, Snyk, and custom policy engines (OPA). Automated security testing reduced manual review time by 60% while maintaining zero false negatives for critical vulnerabilities.',
        'Applied advanced prompt engineering, few-shot learning, and RAG optimization techniques to LLM-powered robotics perception systems. Fine-tuned transformer models using LoRA/PEFT achieving 23% improvement in safety-critical edge case detection. Implemented real-time model monitoring, drift detection, and adversarial robustness testing for production AI systems processing millions of inferences daily.',
      ],
      company: {
        href: 'https://www.bostondynamics.com',
        name: 'Boston Dynamics',
      },
      location: 'Waltham, MA (Hybrid)',
      startDate: new Date('2022-06-15'),
      title: 'Senior Security Engineer - AI Red Team & Application Security',
      type: 'Full-Time',
    },
    {
      achievements: [
        'Architected and trained state-of-the-art generative AI models (GANs) for synthetic DNA sequence generation, implementing custom loss functions and attention mechanisms. Optimized model convergence through hyperparameter tuning, ensemble methods, and feature engineering using PyTorch and TensorFlow. Deployed scalable inference pipelines on AWS Lambda and ECS processing millions of predictions with sub-100ms latency and 99.9% availability.',
        'Performed in-depth security assessments of cloud-based ML systems processing PHI/PII, identifying critical vulnerabilities in model serving infrastructure, data pipelines, and API endpoints. Implemented defensive measures including differential privacy, federated learning, homomorphic encryption, and zero-trust data access patterns ensuring HIPAA/GDPR compliance while maintaining model performance.',
        'Designed and implemented comprehensive adversarial ML testing frameworks incorporating white-box and black-box attacks, data poisoning detection, backdoor vulnerability scanning, and model extraction defenses. Developed automated red team probing scripts testing robustness against adversarial examples, out-of-distribution inputs, and distribution shift scenarios.',
        'Built production MLOps pipelines with automated model versioning, A/B testing infrastructure, explainability dashboards (SHAP/LIME), and continuous monitoring tracking drift, data quality, fairness metrics, and adversarial robustness. Reduced false positive rates by 37% through systematic prompt engineering, retrieval-augmented generation optimization, and ensemble model architectures.',
      ],
      company: {
        href: 'https://www.absci.com',
        name: 'Absci Corp',
      },
      endDate: new Date('2022-06-15'),
      location: 'Oregon, WA (Remote)',
      startDate: new Date('2020-06-15'),
      title: 'Senior Security Engineer - ML Security & DevOps',
      type: 'Contract',
    },
    {
      achievements: [
        'Executed comprehensive penetration testing across FedRAMP-compliant government systems including cloud-native web applications, RESTful/SOAP APIs, mobile apps (iOS/Android), and network infrastructure. Performed manual code review and exploit development using Burp Suite, Metasploit, and custom tooling. Identified 200+ critical/high severity vulnerabilities including SQL injection, XSS, CSRF, authentication bypasses, privilege escalation, and business logic flaws.',
        'Conducted sophisticated red team operations simulating nation-state APT tactics (MITRE ATT&CK framework) against federal infrastructure. Successfully compromised air-gapped networks through spear phishing campaigns, watering hole attacks, social engineering, and zero-day exploit chains. Developed custom malware, persistence mechanisms, and lateral movement techniques for realistic adversary simulation.',
        'Designed and executed adversarial ML attacks against biometric identification systems (facial recognition, fingerprint analysis) processing sensitive PII. Developed white-box and black-box attacks including prompt injection, model inversion, membership inference, adversarial perturbations, and evasion techniques. Created defensive countermeasures including adversarial training, input validation, and anomaly detection reducing attack success by 64%.',
        'Implemented DevSecOps automation integrating security testing into CI/CD workflows using SAST (SonarQube, Checkmarx), DAST (OWASP ZAP), SCA (Snyk, Dependabot), container scanning (Trivy, Clair), and secret detection. Developed security-as-code policies using OPA and infrastructure security scanning with Terraform/CloudFormation. Detected and remediated 12 critical CVEs pre-production through automated security gates.',
      ],
      company: {
        href: 'https://www.saic.com/',
        name: 'Unisys Federal SAIC',
      },
      endDate: new Date('2020-06-15'),
      location: 'Alexandria, VA',
      startDate: new Date('2016-05-15'),
      title: 'Security Engineer - Penetration Testing & Red Team',
      type: 'Full-Time',
    },
  ],
};

// Default export for backwards compatibility
export const resumeData: ResumeData = techLeadResumeData;

// Helper function to get resume by version
export function getResumeData(version: ResumeVersion = 'tech-lead'): ResumeData {
  return version === 'ic' ? icResumeData : techLeadResumeData;
}
