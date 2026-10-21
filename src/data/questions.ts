// Original sample questions written from the public AZ-900 skills outline.
// Shape mirrors the `questions` table in supabase/schema.sql.
export type AnswerKey = "a" | "b" | "c" | "d";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: Record<AnswerKey, string>;
  correctAnswer: AnswerKey;
  explanation: string;
  keyConcept: string;
  commonMisconception: string;
  difficulty: Difficulty;
}

export const questions: Question[] = [
  // ---------- Cloud Concepts ----------
  {
    id: "q-cc-1",
    topicId: "service-models",
    question:
      "A team wants to deploy a web app without patching operating systems or managing servers, but still write and control their own code. Which service model fits best?",
    options: {
      a: "Infrastructure as a Service (IaaS)",
      b: "Platform as a Service (PaaS)",
      c: "Software as a Service (SaaS)",
      d: "On-premises hosting",
    },
    correctAnswer: "b",
    explanation:
      "PaaS gives you a managed platform: the provider handles the OS, runtime and servers, while you bring and manage your application code.",
    keyConcept: "IaaS = you manage the OS. PaaS = you manage the app. SaaS = you just use it.",
    commonMisconception:
      "SaaS also removes server management, but you can't deploy your own code to it — you only use a finished product.",
    difficulty: "Easy",
  },
  {
    id: "q-cc-2",
    topicId: "shared-responsibility",
    question:
      "Under the shared responsibility model, which responsibility always stays with the customer, regardless of service model?",
    options: {
      a: "Physical security of datacenters",
      b: "Patching the host hypervisor",
      c: "The data they store and who can access it",
      d: "Maintaining network cabling",
    },
    correctAnswer: "c",
    explanation:
      "Your data, devices, accounts and identities are always your responsibility. The provider handles the physical layer in every model.",
    keyConcept: "Provider owns the building; you always own your data and identities.",
    commonMisconception:
      "Learners assume SaaS shifts everything to the provider — but who can access your data is still your decision.",
    difficulty: "Medium",
  },
  {
    id: "q-cc-3",
    topicId: "cloud-benefits",
    question:
      "An online shop automatically adds resources during a flash sale and removes them afterwards. Which cloud benefit does this best describe?",
    options: { a: "Elasticity", b: "Predictability", c: "Governance", d: "Fault tolerance" },
    correctAnswer: "a",
    explanation:
      "Elasticity is the ability to automatically scale resources up and down to match demand, so you only pay for what you need.",
    keyConcept: "Elastic = stretches and snaps back automatically.",
    commonMisconception:
      "Scalability is close, but scalability is the ability to grow; elasticity emphasises automatic growing and shrinking.",
    difficulty: "Easy",
  },
  {
    id: "q-cc-4",
    topicId: "cloud-migration",
    question:
      "A company stops buying its own servers up front and instead pays monthly for the cloud resources it uses. What financial shift is this?",
    options: {
      a: "From OpEx to CapEx",
      b: "From CapEx to OpEx",
      c: "From fixed to reserved pricing",
      d: "From pay-as-you-go to licensing",
    },
    correctAnswer: "b",
    explanation:
      "Buying hardware is capital expenditure (CapEx). Paying for consumption over time is operational expenditure (OpEx).",
    keyConcept: "CapEx = buy the car. OpEx = pay for the taxi ride.",
    commonMisconception:
      "The terms are easy to reverse. Remember the cloud moves you toward paying as you go — operational spending.",
    difficulty: "Medium",
  },
  {
    id: "q-cc-5",
    topicId: "cloud-concepts",
    question:
      "Which deployment model lets an organisation keep sensitive workloads in its own datacenter while using public cloud for others?",
    options: { a: "Public cloud", b: "Private cloud", c: "Hybrid cloud", d: "Community SaaS" },
    correctAnswer: "c",
    explanation:
      "A hybrid cloud combines private (on-premises) and public cloud environments, letting workloads move between them.",
    keyConcept: "Hybrid = a bit of both, working together.",
    commonMisconception:
      "Private cloud keeps everything in-house; it doesn't involve the public cloud at all.",
    difficulty: "Easy",
  },
  {
    id: "q-cc-6",
    topicId: "cloud-benefits",
    question:
      "A business needs to know roughly what its cloud bill will be each month. Which cloud benefit addresses this?",
    options: {
      a: "High availability",
      b: "Cost predictability",
      c: "Elasticity",
      d: "Disaster recovery",
    },
    correctAnswer: "b",
    explanation:
      "Cost predictability means being able to forecast spending, helped by tools like the pricing calculator and budgets.",
    keyConcept: "Predictability comes in two flavours: performance and cost.",
    commonMisconception:
      "Elasticity can make costs vary — predictability is about forecasting, not scaling.",
    difficulty: "Medium",
  },
  {
    id: "q-cc-7",
    topicId: "shared-responsibility",
    question:
      "When running a virtual machine (IaaS), who is responsible for installing operating system security updates?",
    options: {
      a: "The cloud provider",
      b: "The customer",
      c: "It is shared equally",
      d: "No one — the OS updates itself",
    },
    correctAnswer: "b",
    explanation:
      "With IaaS you control the operating system, so patching it is your job. The provider manages the physical host underneath.",
    keyConcept: "If you can log into the OS, you patch the OS.",
    commonMisconception:
      "Because it runs in the cloud, people assume the provider patches everything. That's only true further up the stack (PaaS/SaaS).",
    difficulty: "Medium",
  },
  // ---------- Architecture & Services ----------
  {
    id: "q-ar-1",
    topicId: "availability-zones",
    question:
      "You want an application to survive the failure of a single datacenter without leaving its region. What should you use?",
    options: {
      a: "Availability zones",
      b: "A resource group",
      c: "A management group",
      d: "Azure Advisor",
    },
    correctAnswer: "a",
    explanation:
      "Availability zones are physically separate locations within one region, each with independent power, cooling and networking.",
    keyConcept:
      "Zones protect against a datacenter failure; region pairs protect against a regional one.",
    commonMisconception:
      "Resource groups are logical containers for organising resources — they provide no physical separation.",
    difficulty: "Medium",
  },
  {
    id: "q-ar-2",
    topicId: "regions",
    question: "Why does Azure pair most regions with another region in the same geography?",
    options: {
      a: "To halve storage costs",
      b: "To support recovery if an entire region is affected",
      c: "To enforce naming standards",
      d: "To combine their billing",
    },
    correctAnswer: "b",
    explanation:
      "Region pairs allow replication and prioritised recovery, and updates roll out to one region of a pair at a time.",
    keyConcept: "Pairs = a backup buddy for a whole region.",
    commonMisconception: "Region pairs are about resilience, not pricing or billing.",
    difficulty: "Medium",
  },
  {
    id: "q-ar-3",
    topicId: "compute",
    question:
      "You need to run small pieces of code in response to events and pay only while the code runs. Which option fits best?",
    options: {
      a: "Virtual machine scale sets",
      b: "Azure Functions",
      c: "Azure Virtual Desktop",
      d: "Dedicated hosts",
    },
    correctAnswer: "b",
    explanation:
      "Azure Functions is a serverless compute service: code runs on triggers and you're billed for execution time.",
    keyConcept: "Event happens → function runs → you pay for that moment.",
    commonMisconception:
      "Scale sets scale VMs automatically, but you still pay for running VMs even when idle.",
    difficulty: "Easy",
  },
  {
    id: "q-ar-4",
    topicId: "storage",
    question:
      "Which storage option is best suited for large amounts of unstructured data such as images and videos?",
    options: { a: "Queue storage", b: "Table storage", c: "Blob storage", d: "Managed disks" },
    correctAnswer: "c",
    explanation:
      "Blob storage is object storage designed for unstructured data like media files, backups and logs.",
    keyConcept: "Blob = Binary Large OBject — big, shapeless files.",
    commonMisconception:
      "Managed disks store data too, but they're attached to VMs as drives, not used to serve large media collections.",
    difficulty: "Easy",
  },
  {
    id: "q-ar-5",
    topicId: "networking",
    question:
      "Two virtual networks in Azure need to communicate privately over the Microsoft backbone. What connects them?",
    options: {
      a: "Virtual network peering",
      b: "A public IP on every VM",
      c: "Azure DNS",
      d: "A resource lock",
    },
    correctAnswer: "a",
    explanation:
      "Peering links virtual networks so resources communicate privately, without traversing the public internet.",
    keyConcept: "Peering = a private bridge between two VNets.",
    commonMisconception:
      "VPN Gateway also connects networks, but it's typically used for on-premises connections over encrypted tunnels.",
    difficulty: "Medium",
  },
  {
    id: "q-ar-6",
    topicId: "storage",
    question:
      "Data that is rarely read but must be kept for years at the lowest storage cost should use which access tier?",
    options: { a: "Hot", b: "Cool", c: "Archive", d: "Premium" },
    correctAnswer: "c",
    explanation:
      "The Archive tier has the lowest storage cost but the highest retrieval cost and latency — ideal for long-term retention.",
    keyConcept: "Hot = often. Cool = sometimes. Archive = almost never.",
    commonMisconception:
      "Cool is cheaper than Hot, but Archive is the cheapest place to store data you rarely touch.",
    difficulty: "Hard",
  },
  {
    id: "q-ar-7",
    topicId: "databases",
    question:
      "A globally distributed app needs a NoSQL database with low-latency reads in many regions. Which service fits?",
    options: {
      a: "Azure SQL Database",
      b: "Azure Cosmos DB",
      c: "Azure Files",
      d: "Azure Database for MySQL",
    },
    correctAnswer: "b",
    explanation:
      "Cosmos DB is a globally distributed NoSQL database built for low latency and multi-region replication.",
    keyConcept: "Cosmos = global by design.",
    commonMisconception:
      "Azure SQL Database is managed and scalable, but it's relational, not a multi-model NoSQL store.",
    difficulty: "Medium",
  },
  // ---------- Management & Governance ----------
  {
    id: "q-mg-1",
    topicId: "azure-policy",
    question:
      "Which Azure capability helps organizations enforce rules and standards across cloud resources?",
    options: { a: "Azure Monitor", b: "Azure Policy", c: "Azure Advisor", d: "Service Health" },
    correctAnswer: "b",
    explanation:
      "Azure Policy evaluates resources against rules you define — like allowed regions or required tags — and can block or flag non-compliant ones.",
    keyConcept: "Policy = the rulebook that's actually enforced.",
    commonMisconception:
      "Advisor gives recommendations, but it doesn't enforce anything. Policy is the one that says 'no'.",
    difficulty: "Medium",
  },
  {
    id: "q-mg-2",
    topicId: "resource-locks",
    question:
      "An administrator wants to prevent a production database from being deleted by accident, while still allowing changes. Which lock should they apply?",
    options: {
      a: "ReadOnly lock",
      b: "CanNotDelete (Delete) lock",
      c: "An Azure Policy initiative",
      d: "A budget alert",
    },
    correctAnswer: "b",
    explanation:
      "A Delete lock allows reads and modifications but blocks deletion. A ReadOnly lock would block changes as well.",
    keyConcept: "Delete lock = 'change me, don't remove me'.",
    commonMisconception:
      "Policies control how resources are configured; locks protect specific resources from deletion or change.",
    difficulty: "Medium",
  },
  {
    id: "q-mg-3",
    topicId: "azure-monitor",
    question:
      "You want to be alerted when a VM's CPU stays above 90% for ten minutes. Which service should you use?",
    options: {
      a: "Azure Monitor",
      b: "Azure Policy",
      c: "Cost Management",
      d: "Microsoft Purview",
    },
    correctAnswer: "a",
    explanation:
      "Azure Monitor collects metrics and logs from resources and lets you create alert rules on them.",
    keyConcept: "Monitor watches your resources; Service Health watches Azure itself.",
    commonMisconception:
      "Service Health reports Azure platform issues, not the performance of your own VM.",
    difficulty: "Easy",
  },
  {
    id: "q-mg-4",
    topicId: "azure-advisor",
    question:
      "Which service analyses your deployed resources and suggests ways to reduce cost and improve security?",
    options: { a: "Azure Advisor", b: "Resource locks", c: "Azure Arc", d: "Azure Blueprints" },
    correctAnswer: "a",
    explanation:
      "Azure Advisor reviews your configuration and usage and gives personalised recommendations across cost, security, reliability, performance and operations.",
    keyConcept: "Advisor advises; Policy enforces.",
    commonMisconception: "Advisor won't change anything for you — it recommends, and you decide.",
    difficulty: "Easy",
  },
  {
    id: "q-mg-5",
    topicId: "service-health",
    question:
      "Users report an outage. You suspect an Azure-wide incident in your region. Where do you check first?",
    options: {
      a: "Azure Advisor",
      b: "Azure Service Health",
      c: "Azure Policy compliance",
      d: "The pricing calculator",
    },
    correctAnswer: "b",
    explanation:
      "Service Health gives a personalised view of Azure incidents, planned maintenance and advisories affecting your regions and services.",
    keyConcept: "Service Health = is Azure okay, for me?",
    commonMisconception:
      "Azure Monitor shows your resources' telemetry, but platform-level incidents are surfaced in Service Health.",
    difficulty: "Medium",
  },
  {
    id: "q-mg-6",
    topicId: "cost-management",
    question:
      "Finance wants an email when a subscription's spending reaches 80% of a monthly limit. What should you configure?",
    options: {
      a: "A resource lock",
      b: "A budget in Cost Management",
      c: "An availability zone",
      d: "An Azure Policy deny effect",
    },
    correctAnswer: "b",
    explanation:
      "Budgets in Cost Management track spending against a threshold and send alerts when it's reached.",
    keyConcept: "Budgets alert; they don't automatically stop resources.",
    commonMisconception:
      "Policies control configuration, not money. Spending thresholds live in Cost Management.",
    difficulty: "Medium",
  },
  {
    id: "q-mg-7",
    topicId: "azure-policy",
    question:
      "Your organisation requires that every resource has a 'CostCenter' tag. What is the best way to enforce this automatically?",
    options: {
      a: "Ask teams to add tags manually",
      b: "Use Azure Policy to require the tag",
      c: "Apply a ReadOnly lock",
      d: "Use Azure Advisor recommendations",
    },
    correctAnswer: "b",
    explanation:
      "Azure Policy can deny creation of resources missing a required tag, or add it automatically.",
    keyConcept: "If it must always be true, make it a policy.",
    commonMisconception:
      "Locks protect existing resources from change; they can't require tags on new ones.",
    difficulty: "Hard",
  },
];

export const getQuestion = (id: string) => questions.find((q) => q.id === id);
