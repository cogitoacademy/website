export const EVENT_SLUGS = {
  "monthly-town-hall": {
    title: "Monthly Town Hall",
    subtitle: "Join us every month for updates, Q&A, and community bonding.",
    description:
      "Our monthly town hall meetings are the heartbeat of our community. We discuss upcoming events, share achievements, and open the floor for questions and suggestions.",
    image: "/images/town-hall-hero.jpg", // Placeholder
    cards: [
      {
        id: "jan-2024",
        title: "January Town Hall",
        description: "Kicking off the year with new goals and roadmap.",
        date: "2024-01-15",
        image: "/images/town-hall-jan.jpg",
        link: "#",
      },
      {
        id: "feb-2024",
        title: "February Town Hall",
        description: "Reviewing Q1 progress and upcoming hackathons.",
        date: "2024-02-12",
        image: "/images/town-hall-feb.jpg",
        link: "#",
      },
      {
        id: "mar-2024",
        title: "March Town Hall",
        description: "Special guest speaker and community awards.",
        date: "2024-03-10",
        image: "/images/town-hall-mar.jpg",
        link: "#",
      },
    ],
  },
  "cogito-101-series": {
    title: "Cogito 101 Series",
    subtitle: "A beginner-friendly series to get you started with Cogito Academy.",
    description:
      "Whether you're new to coding or just new to our platform, the Cogito 101 Series covers everything you need to know to get started.",
    image: "/images/cogito-101-hero.jpg", // Placeholder
    cards: [
      {
        id: "ep-1",
        title: "Episode 1: Introduction",
        description: "What is Cogito Academy and how to navigate the platform.",
        date: "2024-01-20",
        image: "/images/cogito-101-ep1.jpg",
        link: "#",
      },
      {
        id: "ep-2",
        title: "Episode 2: Your First Project",
        description: "Step-by-step guide to submitting your first assignment.",
        date: "2024-01-27",
        image: "/images/cogito-101-ep2.jpg",
        link: "#",
      },
      {
        id: "ep-3",
        title: "Episode 3: Community Guidelines",
        description: "How to interact and collaborate effectively.",
        date: "2024-02-03",
        image: "/images/cogito-101-ep3.jpg",
        link: "#",
      },
    ],
  },
};

export type EventSlug = keyof typeof EVENT_SLUGS;
