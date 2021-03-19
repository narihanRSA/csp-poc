import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ArticleDetails, ArticlesType, CaseDetails, CasesType, DefectsType } from './search.modal';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }
  defectsSubject = new Subject<string>();
  articlesSubject = new Subject<string>();
  casesSubject = new Subject<string>();

  get getarticlesSubject() {
    return this.articlesSubject.asObservable();
  }

  set setarticlesSubject(searchText: string) {
    this.articlesSubject.next(searchText);
  }

  get getcasesSubject() {
    return this.casesSubject.asObservable();
  }

  set setcasesSubject(searchText: string) {
    this.casesSubject.next(searchText);
  }

  get getdefectsSubject() {
    return this.defectsSubject.asObservable();
  }

  set setdefectsSubject(value: string) {
    this.defectsSubject.next(value);
  }

  fetchPosts(searchMsg: string): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(`${this.apiUrl}/getArticles?msg=${searchMsg}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: ArticlesType[]) => {
        return data;
      }),
      catchError(err => of([]))
    );
  }

  fetchArticle(id: string): Observable<ArticleDetails[]> {
    return this.http.get<ArticleDetails[]>(`${this.apiUrl}/getArticle?id=${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: ArticleDetails[]) => {
        return data;
      }),
      catchError(err => of([]))
    );
  }

  fetchCases(searchMsg: string): Observable<CasesType[]> {
    return this.http.get<CasesType[]>(`${this.apiUrl}/getCases?msg=${searchMsg}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: CasesType[]) => {
        return data;
      }),
      catchError(err => of([]))
    );
  }

  fetchCase(id: string): Observable<CaseDetails[]> {
    return this.http.get<CaseDetails[]>(`${this.apiUrl}/getCase?id=${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: CaseDetails[]) => {
        return data;
      }),
      catchError(err => of([]))
    );
  }

  fetchDefects(searchMsg: string): Observable<DefectsType[]> {
    return this.http.get<DefectsType[]>(`${this.apiUrl}/getDefects?msg=${searchMsg}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: DefectsType[]) => {
        return data;
      }),
      catchError(err => of([]))
    );
  }
}
