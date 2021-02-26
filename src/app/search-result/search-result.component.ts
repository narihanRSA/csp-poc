import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ArticlesResults, ArticlesType, CasesResults, CasesType, DefectsResults, DefectsType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { liveSearch } from '../live-search.operator';
import { BlogService } from '../search.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  title = 'csp-poc';
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'article_number', 'title'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  private searchText="";
  newSearch="";

  articlesSubject = new Subject<string>();
  private casesSubject = new Subject<string>();
  private defectsSubject = new Subject<string>();

  articles_dataSource = new MatTableDataSource<Observable<ArticlesType[]>>();

  readonly articlePosts$=this.articlesSubject.pipe(
    liveSearch(searchText =>
      this.service.fetchPosts(searchText)
    )
  );

  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: BlogService) {}

  ngOnInit() {
    this.searchText=this.route.snapshot.queryParams['search'];
    this.articlePosts$.pipe(map((data: ArticlesType[]) => {
            console.log(data);
      }));
    this.articles_dataSource = new MatTableDataSource<Observable<ArticlesType[]>>();

    //   this.http.get<DefectsType[]>('http://127.0.0.1:5000/getDefects?msg='+this.searchText, {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
    //     'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
    //   })
    // })
    //   .pipe(
    //     map((data: DefectsType[]) => {
    //       return data;
    //     }), catchError(error => {
    //       return throwError('Something went wrong!');
    //     })
    //   )
    //   .subscribe((data2: any) => {
    //     let json = JSON.parse(data2);
    //     this.defects.setDefects = json;
    //     this.defects_array=this.defects.defect_arr;
    //     this.defects_json=JSON.stringify(this.defects_array);
    //     console.log(this.defects.defect_arr);
    //   })

    //   this.http.get<CasesType[]>('http://127.0.0.1:5000/getCases?msg='+this.searchText, {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
    //     'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
    //   })
    // })
    //   .pipe(
    //     map((data: CasesType[]) => {
    //       return data;
    //     }), catchError(error => {
    //       return throwError('Something went wrong!');
    //     })
    //   )
    //   .subscribe((data2: any) => {
    //     let json = JSON.parse(data2);
    //     this.cases.cases = json;
    //     this.cases_array=this.cases.cases_arr;
    //     this.cases_json=JSON.stringify(this.cases_array);
    //     console.log(this.cases.cases_arr);
    //   })
  }

  openClick(): void {
   this.sidebar.toggle();
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  searchPosts(searchText: string) {
    this.articlesSubject.next(searchText);

    // this.articles_json=JSON.stringify(this.articlesSubject);
  }

  open(urlToOpen: string) {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }

    url += urlToOpen;
    window.open(url, '_blank');
  }

}
