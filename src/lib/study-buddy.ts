// Built-in replies used until an AI tutor is connected.
const replies: { match: RegExp; text: string }[] = [
  {
    match: /policy/i,
    text: 'Azure Policy is a rulebook for your cloud.\n\nYou write rules like "resources may only be created in West Europe" or "every resource must have a CostCenter tag". Azure then checks resources against those rules and can block anything that breaks them.\n\nTip: Advisor suggests, Policy enforces.',
  },
  {
    match: /iaas|paas|saas/i,
    text: "Think of pizza 🍕\n\n• IaaS — you get a kitchen (servers, network). You manage the OS, runtime and app.\n• PaaS — the kitchen and oven are run for you. You just bring your recipe (your code).\n• SaaS — the pizza is delivered. You simply use the software.\n\nThe further you go, the less you manage.",
  },
  {
    match: /real.?world|example/i,
    text: "Real-world example: a ticketing site expects a rush when concert tickets go on sale.\n\nWith elasticity it scales out automatically during the rush and back in afterwards. Availability zones keep it running if one datacenter fails, and a Cost Management budget alerts finance if spending climbs too high.",
  },
  {
    match: /storage/i,
    text: "Quick quiz! 🧠\n\nYou need to keep compliance records for 7 years, and they'll almost never be read. Which blob access tier is cheapest?\n\nA) Hot  B) Cool  C) Archive\n\nType your answer and I'll explain — or try the Practice page for full feedback.",
  },
  {
    match: /^\s*c\b|archive/i,
    text: "Correct — Archive! It has the lowest storage price but slow, more expensive retrieval, which is fine for data you rarely touch.",
  },
  {
    match: /^\s*[ab]\b|hot|cool/i,
    text: "Close, but the answer is Archive. Hot and Cool are for data you read more often; Archive is cheapest for data you almost never read.",
  },
];

export function getBuddyReply(input: string): string {
  return (
    replies.find((r) => r.match.test(input))?.text ??
    "I can't answer free-form questions yet — the AI tutor is still being built. For now, try one of the suggested prompts, or explore the Topics page."
  );
}
