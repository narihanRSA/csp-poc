import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ArticlesType } from './search.modal';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://127.0.0.1:5000/getArticles';
  constructor(private http: HttpClient) { }

  fetchPosts(id: string): Observable<ArticlesType[]> {
    console.log("FETCHING");
    return this.http.get<ArticlesType[]>(`${this.apiUrl}?msg=${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: ArticlesType[]) => {
      return data;
    }),
      catchError(err => of([]))
    );
  }
}
