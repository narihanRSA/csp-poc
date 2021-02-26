import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticlesResults, ArticlesType } from '../search-result/search-results';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';


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
  selector: 'app-articles-component',
  templateUrl: './articles-component.component.html',
  styleUrls: ['./articles-component.component.css']
})
export class ArticlesComponentComponent implements AfterViewInit {

  title = 'csp-poc';
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'article_number', 'title'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  articles=new ArticlesResults();
  dataSource = new MatTableDataSource<ArticlesType>(this.articles.articles);
  searchText:string="";
  newSearch:string="";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;
  sub:any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    //this.searchText=this.route.snapshot.queryParams['search'];
    this.sub=this.route.queryParams.subscribe(params => {
      console.log(params);
      const tempArr= params['arr'];
      console.log(JSON.parse(tempArr));
      this.dataSource = new MatTableDataSource<ArticlesType>(JSON.parse(tempArr));
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openClick(): void {
    this.sidebar.toggle();
  }

  onSidenavClose():void{
    this.sidebar.close();
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
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
