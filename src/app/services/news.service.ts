import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Post, Params } from '../models/news.model';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  private Url = 'https://hn.algolia.com/api/v1/search_by_date';

  constructor(private httpClient: HttpClient) {}

  getPosts(params: Record<string, string>): Observable<Post[]> {
    return (
      this.httpClient
        .get<{ hits: Post[] }>(this.getSearchUrlFor(params))
        .pipe(
          map((res) =>
            res.hits.filter(
              ({ author, story_title, story_url, created_at }) =>
                author && story_title && story_url && created_at
            )
          )
        )
    );
  }

  private getSearchUrlFor(params: Record<string, string>): string {
    const query = new URLSearchParams(params);
    return `${this.Url}?${query}`;
  }

}
