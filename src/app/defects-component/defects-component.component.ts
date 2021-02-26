import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefectsResults, DefectsType } from '../search-result/search-results';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  displayedColumns: string[] = ['position', 'article_number', 'title'];//, 'type', 'publish_date', 'knowledge_article', 'actions'];
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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.searchText=this.route.snapshot.queryParams['search'];
    console.log(this.defects.defect_arr);
    this.dataSource=this.defects.getDefectsResults;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.defects.defect_arr);
    this.dataSource=this.defects.getDefectsResults;
    this.defects.getDefectsResults
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
