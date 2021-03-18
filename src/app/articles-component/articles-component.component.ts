import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticlesResults, ArticlesType, DetailType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { liveSearch } from '../live-search.operator';
import { BlogService } from '../search.service';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles-component',
  templateUrl: './articles-component.component.html',
  styleUrls: ['./articles-component.component.css']
})
export class ArticlesComponentComponent implements OnInit, AfterViewInit {

  title = 'csp-poc';
  panelOpenState = false;
  displayedColumns: string[] = ['article_number', 'title', 'created', 'details'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  articles = new ArticlesResults();
  dataSource = new MatTableDataSource<ArticlesType>(this.articles.articles);
  filteredAndPagedIssues!: Observable<ArticlesType[]>;
  searchText = "";
  isLoadingResults = true;
  isRateLimitReached = false;
  pipe: DatePipe;

  filterForm = new FormGroup({
    fromDate: new FormControl(null, { validators: [Validators.required] }),
    toDate: new FormControl(null, { validators: [Validators.required] })
  });

  get fromDate() { return this.filterForm.get('fromDate')!.value; }
  get toDate() { return this.filterForm.get('toDate')!.value; }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router, private service: BlogService, private route: ActivatedRoute) {
    this.pipe = new DatePipe('en');
    this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate);
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.CreatedDate >= this.fromDate && data.CreatedDate <= this.toDate;
      }
      return true;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    }, 0);
    this.searchText = this.route.snapshot.queryParams['search'];
    this.service.fetchPosts(this.searchText).pipe(map((data: ArticlesType[]) => {
      // console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      // console.log("$$$$$$$$$$", value);
      let json: ArticlesType[] = JSON.parse(value);
      json.forEach(e => { e.CreatedDate = new Date(e.CreatedDate); console.log(e.CreatedDate) });

      this.dataSource = new MatTableDataSource<ArticlesType>(json);
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 0);
    });

    this.service.getarticlesSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchPosts(searchText).pipe(map((data: ArticlesType[]) => {
          // console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    ).subscribe((value: any) => {
      // console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<ArticlesType>(json);
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 0);
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    }, 0);
  }


  applyDateFilter() {
    this.service.fetchPosts(this.searchText).pipe(map((data: ArticlesType[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: ArticlesType[] = JSON.parse(value);
      json.forEach(e => { e.CreatedDate = new Date(e.CreatedDate);});

      this.dataSource = new MatTableDataSource<ArticlesType>(json);
      console.log(this.filterForm);
      console.log(this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate));
      this.dataSource.data=this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate);
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 0);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  public redirectToDetails = (id: string) => {
    this.router.navigate(['details'],{queryParams: {id: id, type:DetailType.Article}, skipLocationChange: true});
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
