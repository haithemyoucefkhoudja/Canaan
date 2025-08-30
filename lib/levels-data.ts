// lib/levels-data.ts

export interface GameEvent {
  id: string;
  name: string;
  description: string;
  actualYear: number;
  actualCoordinates: [number, number];
  location: string;
}

export interface Level {
  id: number;
  name: string;
  events: GameEvent[];
}

export const gameLevels: Level[] = [
  {
    id: 101,
    name: "The Foundation",
    events: [
        { id: "event-1", name: "The Great Revolt", description: "A nationalist uprising by Palestinian Arabs against British rule.", actualYear: 1936, actualCoordinates: [31.771959, 35.217018], location: "Jerusalem" },
        { id: "event-2", name: "The Nakba", description: "The 1948 Palestinian expulsion and flight.", actualYear: 1948, actualCoordinates: [32.8184, 34.9892], location: "Haifa" },
        { id: "event-3", name: "Deir Yassin", description: "A significant event that occurred on April 9, 1948.", actualYear: 1948, actualCoordinates: [31.7900, 35.1717], location: "Deir Yassin" },
        { id: "event-4", name: "Founding of the PLO", description: "The Palestine Liberation Organization was founded in Jerusalem.", actualYear: 1964, actualCoordinates: [31.771959, 35.217018], location: "Jerusalem" },
        { id: "event-5", name: "The Six-Day War", description: "A conflict that significantly impacted the region.", actualYear: 1967, actualCoordinates: [31.5332, 34.4667], location: "Gaza Strip" },
        { id: "event-6", name: "Battle of Karameh", description: "A 15-hour military engagement in the town of Karameh, Jordan.", actualYear: 1968, actualCoordinates: [31.9333, 35.5833], location: "Karameh, Jordan" },
        { id: "event-7", name: "Land Day", description: "A day of commemoration for Palestinian citizens against land confiscation.", actualYear: 1976, actualCoordinates: [32.7940, 35.2908], location: "Galilee" },
        { id: "event-8", name: "First Intifada", description: "A sustained series of Palestinian protests and riots.", actualYear: 1987, actualCoordinates: [31.5000, 34.4667], location: "Gaza" },
        { id: "event-9", name: "Oslo Accords", description: "A set of agreements between the Government of Israel and the PLO.", actualYear: 1993, actualCoordinates: [38.9072, -77.0369], location: "Washington, D.C." },
        { id: "event-10", name: "Second Intifada", description: "A period of intensified Israeli-Palestinian violence.", actualYear: 2000, actualCoordinates: [31.9522, 35.2332], location: "Ramallah" },
    ]
  },
];