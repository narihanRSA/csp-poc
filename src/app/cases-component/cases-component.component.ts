import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
export class CasesComponentComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['case_number', 'title', 'status','created', 'details'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  cases = new CasesResults();
  dataSource = new MatTableDataSource<CasesType>(this.cases.cases);
  searchText: string = "";
  newSearch: string = "";
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

  constructor(private service: BlogService, private route: ActivatedRoute) {
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
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.searchText = this.route.snapshot.queryParams['search'];
    this.service.fetchCases(this.searchText).pipe(map((data: CasesType[]) => {
      // console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      // console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<CasesType>(json);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

    this.service.getcasesSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchCases(searchText).pipe(map((data: CasesType[]) => {
          // console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
      .subscribe((value: any) => {
        let json = JSON.parse(value);
        this.dataSource = new MatTableDataSource<CasesType>(json);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openClick(): void {
    this.sidebar.toggle();
  }

  onSidenavClose(): void {
    this.sidebar.close();
  }

  applyDateFilter() {
    this.service.fetchCases(this.searchText).pipe(map((data: CasesType[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: CasesType[] = JSON.parse(value);
      json.forEach(e => { e.CreatedDate = new Date(e.CreatedDate);});

      this.dataSource = new MatTableDataSource<CasesType>(json);
      console.log(this.filterForm);
      console.log(this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate));
      this.dataSource.data=this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
      }, 0);
    });
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  public redirectToDetails = (id: string) => {
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
