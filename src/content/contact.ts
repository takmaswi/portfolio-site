export const contact = {
  email: "takmaswi@gmail.com",
  location: "Harare, Zimbabwe",
  timezone: "UTC+2",
  github: "https://github.com/takmaswi",
  linkedin: "https://linkedin.com/in/takunda-christopher-maswi-97672045",
  cvUrl: "/Takunda-Maswi-CV.pdf",
};

export const enquiries = {
  project: { title: "Build a product or automate a workflow", description: "Tell me what needs to work better. I can help scope the problem and build the software around it.", label: "Discuss my project", subject: "Project enquiry", body: "Hi Takunda,\n\nI need help with:\nThe outcome I want:\nTiming and budget, if known:\n\n" },
  training: { title: "Help my team use AI", description: "Practical training around your team's tasks, from choosing tools to checking their outputs.", label: "Discuss team training", subject: "AI training enquiry", body: "Hi Takunda,\n\nMy team works on:\nWe would like help with:\nTeam size and preferred timing:\n\n" },
  role: { title: "Bring me into your team", description: "Looking for a developer who understands the product and the business behind it? Send me the role or collaboration you have in mind.", label: "Contact me about a role", subject: "Role or collaboration", body: "Hi Takunda,\n\nCompany and role:\nWhat we are building:\nLocation or remote arrangement:\n\n" },
};

export function enquiryUrl(intent: keyof typeof enquiries, context?: string) {
  const enquiry = enquiries[intent];
  return `mailto:${contact.email}?subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(enquiry.body + (context ? `I was looking at your ${context} project.\n` : ""))}`;
}
