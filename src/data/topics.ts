// Content layer. Mirrors the `topics` table in supabase/schema.sql so it can be
// swapped for a database query without changing UI components.
export type CategoryId = "cloud" | "architecture" | "governance";

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
}

export interface Topic {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
}

export const categories: Category[] = [
  {
    id: "cloud",
    name: "Cloud Concepts",
    shortName: "Cloud Concepts",
    description:
      "The foundations: what cloud computing is, its benefits, and how responsibility is shared.",
  },
  {
    id: "architecture",
    name: "Azure Architecture & Services",
    shortName: "Architecture & Services",
    description:
      "How Azure is organised globally and the core compute, networking, storage and database services.",
  },
  {
    id: "governance",
    name: "Azure Management & Governance",
    shortName: "Management & Governance",
    description:
      "Tools for controlling, monitoring, protecting and optimising cost across Azure resources.",
  },
];

export const topics: Topic[] = [
  {
    id: "cloud-concepts",
    name: "Cloud concepts",
    category: "cloud",
    description: "On-demand, metered computing delivered over the internet.",
  },
  {
    id: "shared-responsibility",
    name: "Shared responsibility",
    category: "cloud",
    description: "Which security duties belong to the provider and which to you.",
  },
  {
    id: "service-models",
    name: "Cloud service models",
    category: "cloud",
    description: "IaaS, PaaS and SaaS — how much you manage versus the provider.",
  },
  {
    id: "cloud-benefits",
    name: "Cloud benefits",
    category: "cloud",
    description: "High availability, scalability, elasticity, reliability and predictability.",
  },
  {
    id: "cloud-migration",
    name: "Cloud migration concepts",
    category: "cloud",
    description: "CapEx vs OpEx, consumption-based pricing and moving workloads.",
  },
  {
    id: "regions",
    name: "Azure regions",
    category: "architecture",
    description: "Geographic areas with one or more datacenters, plus region pairs.",
  },
  {
    id: "availability-zones",
    name: "Availability zones",
    category: "architecture",
    description: "Physically separate locations within a region for resilience.",
  },
  {
    id: "compute",
    name: "Compute",
    category: "architecture",
    description: "Virtual machines, containers, App Service and serverless functions.",
  },
  {
    id: "networking",
    name: "Networking",
    category: "architecture",
    description: "Virtual networks, VPN Gateway, peering and private connectivity.",
  },
  {
    id: "storage",
    name: "Storage",
    category: "architecture",
    description: "Blob, file, queue and disk storage, plus redundancy and access tiers.",
  },
  {
    id: "databases",
    name: "Databases",
    category: "architecture",
    description: "Managed relational and NoSQL database options.",
  },
  {
    id: "azure-policy",
    name: "Azure Policy",
    category: "governance",
    description: "Create and enforce rules about how resources may be configured.",
  },
  {
    id: "resource-locks",
    name: "Resource locks",
    category: "governance",
    description: "Prevent accidental deletion or modification of resources.",
  },
  {
    id: "azure-monitor",
    name: "Azure Monitor",
    category: "governance",
    description: "Collect metrics and logs, and alert on resource behaviour.",
  },
  {
    id: "azure-advisor",
    name: "Azure Advisor",
    category: "governance",
    description: "Personalised recommendations for cost, security and performance.",
  },
  {
    id: "service-health",
    name: "Service Health",
    category: "governance",
    description: "Know when Azure platform issues affect your resources.",
  },
  {
    id: "cost-management",
    name: "Cost management",
    category: "governance",
    description: "Track spending, set budgets and estimate costs.",
  },
    {
    id: "identity-security",
    name: "Identity and security",
    category: "architecture",
    description:
      "Identity, authentication and security concepts used to protect Azure resources.",
  },
  {
    id: "resource-organization",
    name: "Resource organization",
    category: "governance",
    description:
      "Resource groups and other ways to organise Azure resources for management.",
  },
  {
    id: "azure-rbac",
    name: "Azure RBAC",
    category: "governance",
    description:
      "Control who can access Azure resources and what actions they can perform.",
  },
  {
    id: "azure-management",
    name: "Azure management tools",
    category: "governance",
    description:
      "Tools and approaches for managing Azure resources, including Cloud Shell and infrastructure as code.",
  },
];

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const getTopic = (id: string) => topics.find((t) => t.id === id);
