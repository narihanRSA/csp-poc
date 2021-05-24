import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleDetails, ArticlesType, AttachmentDetails, AttachmentRecordDetails, AttachmentsResponse, AuthBody, CaseArticle, CaseDetails, CaseStepsTaken, CasesType, DefectDetails, DefectsType, DetailType } from './search.modal';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }
  defectsSubject = new Subject<string>();
  articlesSubject = new Subject<string>();
  casesSubject = new Subject<string>();
  ifArticles: boolean = true;
  ifCases: boolean = true;
  ifDefects: boolean = true;
  token: string = '';

  private environment = {
    salesforceAuthURL: 'https://rsasecurity.my.salesforce.com/services/oauth2/token',
    salesforceURL: 'https://rsasecurity.my.salesforce.com/services/data/v48.0/query',
    salesforceattachmentDetailsURL: 'https://rsasecurity.my.salesforce.com/services/data/v48.0/sobjects/Attachment/',
    CLIENT_ID: '3MVG9VmVOCGHKYBTofxf.CwrnfolOWZ7Lk_TjmNkhFxluyqSfr4TYmvUO6b5oCG_gao6LZ1E_3KNGTe04qS9w',
    CLIENT_SECRET: 'C237797366EE9D93D4A9D4CD30E3EB4BA924E54F0314A576CFDF2BE798BA6100',
    REDIRECT_URI: 'https://rsasecurity.my.salesforce.com/services/oauth2/authorizeRPA',
    USERNAME: 'rpa.integration@rsa.com',
    PASSWORD: 'rsaRPA1nt12#CHPN8iqhD5NxpxxXKJH5yb1x4'
  };

  set setToken(token: string) {
    this.token = token;
  }

  get getToken() {
    return this.token;
  }

  set setIfArticles(ifArticles: boolean) {
    this.ifArticles = ifArticles;
  }

  get getIfArticles() {
    return this.ifArticles;
  }

  set setIfCases(ifCases: boolean) {
    this.ifCases = ifCases;
  }

  get getIfCases() {
    return this.ifCases;
  }

  set setIfDefects(ifDefects: boolean) {
    this.ifDefects = ifDefects;
  }

  get getIfDefects() {
    return this.ifDefects;
  }

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

  private getAccessTokenAPI(): Observable<AuthBody> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', this.environment.CLIENT_ID)
      .set('client_secret', this.environment.CLIENT_SECRET)
      .set('redirect_uri', this.environment.REDIRECT_URI)
      .set('username', this.environment.USERNAME)
      .set('password', this.environment.PASSWORD);
    return this.http.post<AuthBody>(this.environment.salesforceAuthURL, body).pipe(
      map((data: AuthBody) => {
        return data;
      })
    );
  }

  //Get all articles
  getSalesForceCaseArticles(id: string): Observable<CaseArticle> {
    return this.getCaseArticlesAPI(id);
  }

  private getCaseArticlesAPI(id: string): Observable<CaseArticle> {
    this.getAccessTokenAPI().subscribe((accessTokenResp: AuthBody) => {
      this.setToken = accessTokenResp.access_token;
      localStorage.setItem ('token', accessTokenResp.access_token);
    })
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('token')
    });
    const options = { headers };
    const query = "SELECT KnowledgeArticleId, ArticleLanguage, ArticleVersionNumber FROM CaseArticle WHERE CaseId='" + id + "'";
    return this.http.get<CaseArticle>(`${this.environment.salesforceURL}?q=${query}`, options).pipe(
      map((data: CaseArticle) => {
        return data;
      })
    );
  }

  //Get Activity history
  getSalesForceCaseActivityHistory(id: string): Observable<CaseArticle> {
    return this.getCaseActivityHistoryAPI(id);
  }

  private getCaseActivityHistoryAPI(id: string): Observable<CaseArticle> {
    this.getAccessTokenAPI().subscribe((accessTokenResp: AuthBody) => {
      this.setToken = accessTokenResp.access_token;
      localStorage.setItem ('token', accessTokenResp.access_token);
    })
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('token')
    });
    const options = { headers };
    const query = "SELECT (SELECT Id, ActivityDate,ActivitySubtype, ActivityType, CallDurationInSeconds, Status, Priority, StartDateTime,Description, Subject FROM ActivityHistories ORDER BY ActivityDate DESC,LastModifiedDate DESC LIMIT 5) FROM Case where Id = '" + id + "'";
    return this.http.get<CaseArticle>(`${this.environment.salesforceURL}?q=${query}`, options).pipe(
      map((data: CaseArticle) => {
        return data;
      })
    );
  }

  //Get Steps taken
  getSalesForceCaseStepsTaken(id: string): Observable<CaseStepsTaken> {
    return this.getCaseStepsTakenAPI(id);
  }

  private getCaseStepsTakenAPI(id: string): Observable<CaseStepsTaken> {
    this.getAccessTokenAPI().subscribe((accessTokenResp: AuthBody) => {
      this.setToken = accessTokenResp.access_token;
      localStorage.setItem ('token', accessTokenResp.access_token);
    })
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('token')
    });
    const options = { headers };
    const query = "select  Id,Steps_Taken__c from Case where Id='" + id + "'";
    return this.http.get<CaseStepsTaken>(`${this.environment.salesforceURL}?q=${query}`, options).pipe(
      map((data: CaseStepsTaken) => {
        return data;
      })
    );
  }

  //Get all attachments
  getSalesForceAttachmentInformation(detailType: DetailType, id: string): Observable<AttachmentsResponse> {
      return this.getAttachmentsAPI(detailType, id)
  }

  private getAttachmentsAPI(detailType: DetailType, id: string): Observable<AttachmentsResponse> {
    this.getAccessTokenAPI().subscribe((accessTokenResp: AuthBody) => {
      this.setToken = accessTokenResp.access_token;
      localStorage.setItem ('token', accessTokenResp.access_token);
    })
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('token')
    });
    const options = { headers };
    const query = "SELECT Id, Name, ParentId, Parent.Type FROM Attachment where Parent.Type ='" + detailType + "' and ParentId='" + id + "'";
    return this.http.get<AttachmentsResponse>(`${this.environment.salesforceURL}?q=${query}`, options).pipe(
      map((data: AttachmentsResponse) => {
        return data;
      })
    );
  }

  //Get one attachment information
  getSalesForceAttachmentDetailInformation(id: string): Observable<AttachmentDetails> {
   return this.getAttachmentDetails(id);
  }

  private getAttachmentDetails(id: string): Observable<AttachmentDetails> {
    this.getAccessTokenAPI().subscribe((accessTokenResp: AuthBody) => {
      this.setToken = accessTokenResp.access_token;
      localStorage.setItem ('token', accessTokenResp.access_token);
    })
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('token')
    });
    const options = { headers };
    return this.http.get<AttachmentDetails>(`${this.environment.salesforceattachmentDetailsURL}${id}`, options).pipe(
      map((data: AttachmentDetails) => {
        return data;
      })
    );
  }

  getSalesForceAttachmentDetailBody(id: string): Observable<any> {
    return this.getAttachmentDetailsBody(id);
  }

  private getAttachmentDetailsBody(id: string): Observable<any> {
    this.getAccessTokenAPI().subscribe((accessTokenResp: AuthBody) => {
      this.setToken = accessTokenResp.access_token;
      localStorage.setItem ('token', accessTokenResp.access_token);
    })
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('token')
    });
    const options:any = { headers, responseType: 'blob' };
    return this.http.get<any>(`${this.environment.salesforceattachmentDetailsURL}${id}/Body`, options);
  }


  fetchPosts(searchMsg: string): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(`${this.apiUrl}/getArticles?msg=${searchMsg}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(map((data: ArticlesType[]) => {
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

  fetchArticleAttachments(id: string): Observable<ArticleDetails[]> {
    return this.http.get<ArticleDetails[]>(`${this.apiUrl}/getArticle?id=${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',

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

  fetchDefect(id: string): Observable<DefectDetails[]> {
    return this.http.get<DefectDetails[]>(`${this.apiUrl}/getDefect?id=${id}`, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods': 'GET, POST, PATCH, DELETE'
      })
    }).pipe(
      map((data: DefectDetails[]) => {
        console.log(data)
        return data;
      }),
      catchError(err => of([]))
    );
  }
}
