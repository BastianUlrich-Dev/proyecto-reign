export interface Post {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  objectID: string;
  isFavorite?: boolean;
}

export interface Params {
  query: string;
  page: string;
}


