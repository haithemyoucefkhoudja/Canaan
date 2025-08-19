import { InteractiveHistoricalMap } from "@/components/interactive-historical-map"

// Sample historical events for demonstration
const sampleEvents = [
  {
    id: "1",
    name: "French Revolution",
    description: "A period of radical political and societal change in France",
    startDate: new Date("1789-07-14"),
    endDate: new Date("1799-11-09"),
    location: "France",
    coordinates: "48.8566,2.3522",
    actors: [
      { name: "Maximilien Robespierre", role: "leader" },
      { name: "Louis XVI", role: "victim" },
    ],
  },
  {
    id: "2",
    name: "Battle of Trafalgar",
    description: "Naval engagement between British and Franco-Spanish fleets",
    startDate: new Date("1805-10-21"),
    location: "Spain",
    coordinates: "36.1833,-6.0167",
    actors: [
      { name: "Admiral Nelson", role: "leader" },
      { name: "Napoleon Bonaparte", role: "opponent" },
    ],
  },
  {
    id: "3",
    name: "Congress of Vienna",
    description: "Conference to provide a long-term peace plan for Europe",
    startDate: new Date("1814-09-01"),
    endDate: new Date("1815-06-09"),
    location: "Austria",
    coordinates: "48.2082,16.3738",
    actors: [
      { name: "Klemens von Metternich", role: "organizer" },
      { name: "Tsar Alexander I", role: "participant" },
    ],
  },
]

export default function MapsPage() {
  return (
      <div className="space-y-6 p-16">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Interactive Historical Maps</h1>
          <p className="text-muted-foreground mt-2">
            Explore historical events through interactive maps with timeline controls
          </p>
        </div>

        <InteractiveHistoricalMap events={sampleEvents as any} selectedYear={1800} />
      </div>
  )
}
