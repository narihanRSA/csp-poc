import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { CasesResults, CasesType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../search.service';
import { liveSearch } from '../live-search.operator';

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
  selector: 'app-cases-component',
  templateUrl: './cases-component.component.html',
  styleUrls: ['./cases-component.component.css']
})
export class CasesComponentComponent implements AfterViewInit {
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'article_number', 'title', 'status'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  cases = new CasesResults();
  dataSource = new MatTableDataSource<CasesType>(this.cases.cases);
  searchText: string = "";
  newSearch: string = "";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private service: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.searchText = this.route.snapshot.queryParams['search'];
    this.service.fetchCases(this.searchText).pipe(map((data: CasesType[]) => {
      console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<CasesType>(json);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

    console.log("here");
    this.service.getcasesSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchCases(searchText).pipe(map((data: CasesType[]) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
      .subscribe((value: any) => {
        console.log("$$$$$$$$$$", value);
        let json = JSON.parse(value);
        this.dataSource = new MatTableDataSource<CasesType>(json);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      })
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.service.getcasesSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchCases(searchText).pipe(map((data: CasesType[]) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
      .subscribe((value: any) => {
        console.log("$$$$$$$$$$", value);
        let json = JSON.parse(value);
        this.dataSource = new MatTableDataSource<CasesType>(json);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      })
  }

  openClick(): void {
    this.sidebar.toggle();
  }

  onSidenavClose(): void {
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
