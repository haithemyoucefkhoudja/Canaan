
import type { Event, Actor, Location, Media, Source } from '../types';

// --- MOCK DATABASE ---

const mockActors: Actor[] = [
  { id: '1', name: 'Key Figure A', bio: 'A prominent figure in the history of Palestine, known for their influential role.', avatarUrl: 'https://picsum.photos/seed/actor1/100/100' },
  { id: '2', name: 'Community Leader B', bio: 'A local leader who organized several key community initiatives.', avatarUrl: 'https://picsum.photos/seed/actor2/100/100' },
];

const mockLocations: Location[] = [
  { id: '1', name: 'Historic Jerusalem', description: 'A city of immense historical and cultural significance.', latitude: 31.7683, longitude: 35.2137 },
  { id: '2', name: 'Old City of Hebron', description: 'Known for its ancient architecture and vibrant markets.', latitude: 31.5248, longitude: 35.1102 },
];

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'The Great Olive Harvest Festival',
    description: 'A cultural event celebrating the annual olive harvest, a cornerstone of Palestinian agriculture and heritage. It involved communities from several villages.',
    startDate: '1946-10-15',
    endDate: '1946-10-25',
    tags: ['Culture', 'Agriculture', 'Community'],
    locationId: '1',
    actorIds: ['1', '2'],
  },
  {
    id: '2',
    name: 'Architectural Revival Movement',
    description: 'A movement focused on preserving and restoring historic buildings in the Old City.',
    startDate: '1985-03-01',
    endDate: null,
    tags: ['Architecture', 'Preservation', 'Art'],
    locationId: '2',
    actorIds: ['2'],
  }
];

const mockMedia: Media[] = [
  { id: '1', eventId: '1', type: 'image', url: 'https://picsum.photos/seed/event1-img1/800/600', caption: 'Villagers gathering olives during the festival.' },
  { id: '2', eventId: '1', type: 'image', url: 'https://picsum.photos/seed/event1-img2/800/600', caption: 'Traditional music and dance performances.' },
  { id: '3', eventId: '1', type: 'video', url: 'placeholder_video.mp4', caption: 'A short documentary film about the harvest.' },
  { id: '4', eventId: '2', type: 'image', url: 'https://picsum.photos/seed/event2-img1/800/600', caption: 'Restoration work on a historic facade.' },
];

const mockSources: Source[] = [
  { id: '1', eventId: '1', title: 'A Chronicle of the Harvest', author: 'Dr. Fatima Said', url: '#', description: 'An academic paper detailing the economic and social impact of the olive harvest festival.' },
  { id: '2', eventId: '1', title: 'Local Newspaper Archives', author: 'Al-Quds Daily', url: '#', description: 'A collection of newspaper articles covering the 10-day event.' },
  { id: '3', eventId: '2', title: 'The Stones of Hebron Speak', author: 'Yusuf Ahmed', url: '#', description: 'A book on the architectural history and preservation efforts in Hebron.' },
];

// --- MOCK API FUNCTIONS ---

// This function simulates a network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getEvents = async (): Promise<Event[]> => {
  await sleep(500);
  return mockEvents;
};

export const getEvent = async (eventId: string): Promise<Event | null> => {
  await sleep(500);
  return mockEvents.find(e => e.id === eventId) || null;
};

export const getActors = async (): Promise<Actor[]> => {
  await sleep(500);
  return mockActors;
};

export const getActor = async (actorId: string): Promise<Actor | null> => {
  await sleep(500);
  return mockActors.find(a => a.id === actorId) || null;
};

export const getLocations = async (): Promise<Location[]> => {
    await sleep(500);
    return mockLocations;
};

export const getLocation = async (locationId: string): Promise<Location | null> => {
    await sleep(500);
    return mockLocations.find(l => l.id === locationId) || null;
};

export const getMediaForEvent = async (eventId: string): Promise<Media[]> => {
  await sleep(500);
  return mockMedia.filter(m => m.eventId === eventId);
};

export const getSourcesForEvent = async (eventId: string): Promise<Source[]> => {
  await sleep(500);
  return mockSources.filter(s => s.eventId === eventId);
};

export const getActorsForEvent = async (eventId: string): Promise<Actor[]> => {
    await sleep(500);
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return [];
    return mockActors.filter(actor => event.actorIds.includes(actor.id));
};
