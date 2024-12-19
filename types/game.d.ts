export interface Game {
  uuid: string;
  slug: string;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
  thumbnail_url: string;
  game_url: string;
  created_at: string;
  locale: string;
  keywords?: string;
  category?: {
    uuid: string;
    slug: string;
    name: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
  } | null;
}

export interface GameRecord {
  id: number;
  uuid: string;
  slug: string;
  thumbnail_url: string | null;
  url: string;
  category_id: number | null;
  is_featured: boolean;
  is_home_game: boolean;
  sort: number;
  created_at: string;
  updated_at: string | null;
}

export interface GameTranslation {
  id: number;
  game_id: number;
  locale: string;
  title: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  created_at: string;
}
