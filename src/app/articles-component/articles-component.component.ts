import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticlesResults, ArticlesType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { liveSearch } from '../live-search.operator';
import { BlogService } from '../search.service';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

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
  searchText="";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private service:BlogService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.searchText=this.route.snapshot.queryParams['search'];
    this.service.fetchPosts(this.searchText).pipe( map((data: ArticlesType[]) => {
      console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value:any) =>{
      console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<ArticlesType>(json);
    });

    this.service.getarticlesSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchPosts(searchText).pipe( map((data: ArticlesType[]) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
    .subscribe((value:any) =>{
      console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<ArticlesType>(json);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.service.getarticlesSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchPosts(searchText).pipe( map((data: ArticlesType[]) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
    .subscribe((value:any) =>{
      console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<ArticlesType>(json);
    })
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
