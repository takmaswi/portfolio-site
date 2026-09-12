export interface Service {
  number: string;
  title: string;
  description: string;
  topics: string[];
}
export const services: Service[] = [
  {
    number: "01",
    title: "Understand the tools",
    description:
      "Get comfortable with what AI can do and where human judgement still matters.",
    topics: [
      "Choosing a tool for the task",
      "Giving useful context and instructions",
      "Recognising limitations and checking outputs",
    ],
  },
  {
    number: "02",
    title: "Apply it to real work",
    description: "Use familiar tasks as the starting point for learning.",
    topics: [
      "Research and document workflows",
      "Writing, planning, and communication",
      "Reviewing results before sharing them",
    ],
  },
  {
    number: "03",
    title: "Find useful automation",
    description: "Look at repetitive work and decide what is worth changing.",
    topics: [
      "Mapping the current workflow",
      "Identifying useful AI and software support",
      "Keeping human review in the right places",
    ],
  },
];
