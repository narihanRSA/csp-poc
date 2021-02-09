import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { SearchResults } from './search-results';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';


export interface PeriodicElement {
  ArticleNumber: number;
  Title: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
  { ArticleNumber: 2222, Title: 'hi' },
 ];

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements AfterViewInit {
  title = 'csp-poc';
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'article_number', 'title'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  public search_results: SearchResults[] = [];
  public dataSource = new MatTableDataSource<SearchResults>(this.search_results);
  searchText:string="";
  newSearch:string="";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit() {
    this.searchText=this.route.snapshot.queryParams['search'];
    this.http.get<SearchResults[]>('http://127.0.0.1:5000/getArticles?msg='+this.searchText, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    })
      .pipe(
        map((data: SearchResults[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.search_results = json;
        this.dataSource = new MatTableDataSource<SearchResults>(this.search_results);
        // this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        console.log(this.search_results);
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openClick(): void {
    this.sidebar.toggle();
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  public search(){
    this.searchText=this.newSearch;
    this.http.get<SearchResults[]>('http://127.0.0.1:5000/getArticles?msg='+this.searchText, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    })
      .pipe(
        map((data: SearchResults[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.search_results = json;
        this.dataSource = new MatTableDataSource<SearchResults>(this.search_results);
        // this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        console.log(this.search_results);
      })
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
