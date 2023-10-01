export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  genres: string[];
  popularity: number;
  type: string;
  uri: string;
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
  release_date: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Track {
  id: string;
  name: string;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  preview_url: string;
  type: string;
  uri: string;
}