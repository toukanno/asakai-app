export interface Member {
  id: string;
  name: string;
  createdAt: number;
}

export interface Topic {
  id: string;
  text: string;
  category: TopicCategory;
}

export type TopicCategory = 'icebreaker' | 'work' | 'fun' | 'growth';

export interface AsakaiSession {
  date: string;
  facilitator: Member | null;
  topics: Topic[];
}
