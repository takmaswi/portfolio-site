export interface Capability {
  number: string;
  title: string;
  description: string;
}
export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Engineering",
    description:
      "Web and mobile software, from the interface to the data model and the rules that keep it dependable.",
  },
  {
    number: "02",
    title: "AI and automation",
    description:
      "AI systems that work within clear boundaries, connected to the workflows where they can be useful.",
  },
  {
    number: "03",
    title: "Creative development",
    description:
      "Interfaces with a point of view, built with careful typography, motion, and attention to how people use them.",
  },
  {
    number: "04",
    title: "Practical AI training",
    description:
      "Helping people understand AI tools, evaluate their outputs, and apply them to everyday work.",
  },
];
