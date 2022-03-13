import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import { News , ApiResponse} from '../models/news.model';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://hn.algolia.com/api/v1/items/1';
  // private urlAngular = 'https://hn.algolia.com/api/v1/search_by_date?query=angular&page=1';
  // private urlReact = 'https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0';
  // private urlVuejs = 'https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=0';

  constructor(
    private httpClient: HttpClient
  )
  {

  }


  getAllNews(): Observable<News[]>{
    return this.httpClient.get<ApiResponse>(this.apiUrl)
    .pipe(
      map((result) => {
        const { id, create_at_i, type, text, points, parent_id, story_id, children, ...items } = result;
        return Object.values(items);
      })
    );
  }

  // getAllNews(): Observable<News[]>{
  //   return this.httpClient.get<ApiResponse[]>(this.apiUrl)
  //   .pipe(
  //     map(result => result.map(item => {
  //       return{
  //         ...item,
  //       }
  //     }))
  //   );
  // }


  // getAllNews(){
  //   return this.httpClient.get<News[]>(this.apiUrl);
  //   // return Object.values(items);
  // }

}
