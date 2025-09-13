
export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  tags: string[];
  locationId: string;
  actorIds: string[];
}

export interface Actor {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface Media {
  id: string;
  eventId: string;
  type: 'image' | 'video' | 'document';
  url: string;
  caption: string;
}

export interface Source {
  id: string;
  eventId: string;
  title: string;
  author: string;
  url: string;
  description: string;
}

export interface Document {
  id: string;
  mediaId: string;
  content: string;
  metadata: Record<string, any>;
}
