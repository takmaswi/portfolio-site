export interface Recognition {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
  documentUrl?: string;
  courses?: string[];
}
export const recognition: Recognition[] = [
  {
    title: "Google AI Professional Certificate",
    issuer: "Google / Coursera",
    date: "3 March 2026",
    description:
      "One Professional Certificate covering seven courses, from AI fundamentals and research to data analysis and app building.",
    url: "https://coursera.org/verify/professional-cert/FZSTEM28BXNS",
    documentUrl:
      "/credentials/google-ai-professional-certificate-FZSTEM28BXNS.pdf",
    courses: [
      "AI Fundamentals",
      "AI for Brainstorming and Planning",
      "AI for Research and Insights",
      "AI for Writing and Communicating",
      "AI for Content Creation",
      "AI for Data Analysis",
      "AI for App Building",
    ],
  },
  {
    title: "GDG Harare Build with AI Hackathon winner",
    issuer: "GDG Harare",
    date: "2026",
    description:
      "Recorded in my professional portfolio: winner of the GDG Harare Build with AI Hackathon 2026.",
  },
];
