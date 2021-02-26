import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ArticlesResults, CasesResults, DefectsResults, DefectsType } from './search-results';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';


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
  articles=new ArticlesResults();
  cases=new CasesResults();
  defects=new DefectsResults();
  searchText:string="";
  newSearch:string="";
  defects_array:DefectsType[]=[];

  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.searchText=this.route.snapshot.queryParams['search'];
    this.http.get<ArticlesResults[]>('http://127.0.0.1:5000/getArticles?msg='+this.searchText, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    })
      .pipe(
        map((data: ArticlesResults[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.articles.articles = json;
        console.log(this.articles.articles);
      })

      this.http.get<DefectsType[]>('http://127.0.0.1:5000/getDefects?msg='+this.searchText, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    })
      .pipe(
        map((data: DefectsType[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.defects.setDefects = json;
        this.defects_array=this.defects.defect_arr;
        console.log(this.defects.defect_arr);
      })

      this.http.get<CasesResults[]>('http://127.0.0.1:5000/getCases?msg='+this.searchText, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    })
      .pipe(
        map((data: CasesResults[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.cases.cases = json;
        console.log(this.cases.cases);
      })
  }

  openClick(): void {
   this.sidebar.toggle();
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  public search(){
    this.searchText=this.newSearch;
    console.log(this.searchText);
    this.http.get<ArticlesResults[]>('http://127.0.0.1:5000/getArticles?msg='+this.searchText, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    })
      .pipe(
        map((data: ArticlesResults[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.articles.articles = json;
        console.log(this.articles.articles);
      })

      this.http.get<DefectsType[]>('http://127.0.0.1:5000/getDefects?msg='+this.searchText, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    })
      .pipe(
        map((data: DefectsType[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.defects.setDefects = json;
        console.log(this.defects.defect_arr);
      })

      this.http.get<CasesResults[]>('http://127.0.0.1:5000/getCases?msg='+this.searchText, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type,Accept, Authortization',
        'Acces-Control-Allow-Methods':'GET, POST, PATCH, DELETE'
      })
    })
      .pipe(
        map((data: CasesResults[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
      .subscribe((data2: any) => {
        let json = JSON.parse(data2);
        this.cases.cases = json;
        console.log(this.cases.cases);
      })

      this.router.navigateByUrl('/search/articles');
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
