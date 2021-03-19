import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefectsResults, DefectsType, DetailType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { liveSearch } from '../live-search.operator';
import { catchError, map } from 'rxjs/operators';
import { BlogService } from '../search.service';
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
  selector: 'app-defects-component',
  templateUrl: './defects-component.component.html',
  styleUrls: ['./defects-component.component.css']
})
export class DefectsComponentComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['defect_number', 'title', 'status', 'created', 'details'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  defects = new DefectsResults();
  dataSource = new MatTableDataSource<DefectsType>(this.defects.defect_arr);
  searchText: string = "";
  newSearch: string = "";
  defects_array: DefectsType[] = [];
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
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.searchText = this.route.snapshot.queryParams['search'];
    this.service.fetchDefects(this.searchText).pipe(map((data: DefectsType[]) => {
      // console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<DefectsType>(json);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
    this.service.getdefectsSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchDefects(searchText).pipe(map((data: DefectsType[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
      .subscribe((value: any) => {
        let json = JSON.parse(value);
        this.dataSource = new MatTableDataSource<DefectsType>(json);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter() {
    this.service.fetchDefects(this.searchText).pipe(map((data: DefectsType[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: DefectsType[] = JSON.parse(value);
      json.forEach(e => { e.CreatedDate = new Date(e.CreatedDate);});

      this.dataSource = new MatTableDataSource<DefectsType>(json);
      console.log(this.filterForm);
      console.log(this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate));
      this.dataSource.data=this.dataSource.data.filter(e => e.CreatedDate > this.fromDate && e.CreatedDate < this.toDate);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
      }, 0);
    });
  }

  openClick(): void {
    this.sidebar.toggle();
  }

  public redirectToDetails = (id: string) => {
    this.router.navigate(['details'],{queryParams: {id: id, type:DetailType.Defect, search:this.searchText}, skipLocationChange: true});
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
