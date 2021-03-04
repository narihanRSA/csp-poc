import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefectsResults, DefectsType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { liveSearch } from '../live-search.operator';
import { catchError, map } from 'rxjs/operators';
import { BlogService } from '../search.service';

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
export class DefectsComponentComponent implements AfterViewInit {
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'article_number', 'title', 'status'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
  public width: string = '290px';
  defects=new DefectsResults();
  dataSource = new MatTableDataSource<DefectsType>(this.defects.defect_arr);
  searchText:string="";
  newSearch:string="";
  defects_array: DefectsType[]=[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private service:BlogService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.searchText=this.route.snapshot.queryParams['search'];
    this.service.fetchDefects(this.searchText).pipe( map((data: DefectsType[]) => {
      console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value:any) =>{
      console.log("$$$$$$$$$$", value);
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<DefectsType>(json);
    });
    console.log("here");
    this.service.getdefectsSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchDefects(searchText).pipe( map((data: DefectsType[]) => {
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
      this.dataSource = new MatTableDataSource<DefectsType>(json);
    })
  }

  ngAfterViewInit() {
    // this.route.queryParams.subscribe(params => {
    //   const tempArr= params['arr'];
    //   this.dataSource = new MatTableDataSource<DefectsType>(JSON.parse(tempArr));
    // });
    this.dataSource.paginator = this.paginator;
    this.service.getdefectsSubject.pipe(
      liveSearch(searchText =>
        this.service.fetchDefects(searchText).pipe( map((data: DefectsType[]) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        }))
      )
    )
    .subscribe((value:any) =>{
      let json = JSON.parse(value);
      this.dataSource = new MatTableDataSource<DefectsType>(json);
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
