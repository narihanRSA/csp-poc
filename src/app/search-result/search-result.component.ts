import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ArticlesResults, ArticlesType, CasesResults, CasesType, DefectsResults, DefectsType } from '../search.modal';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { liveSearch } from '../live-search.operator';
import { BlogService } from '../search.service';
import { ArticlesComponentComponent } from '../articles-component/articles-component.component';


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
  searchText = "";
  newSearch = "";
  public ifArticles: boolean = true;
  public ifCases: boolean = true;
  public ifDefects: boolean = true;

  @ViewChild('sidebar')
  public sidebar!: SidebarComponent;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: BlogService) { }

  ngOnInit() {
    this.searchText = this.route.snapshot.queryParams['search'];
    setTimeout(() => {
      this.ifArticles = (this.route.snapshot.queryParams['articles'].toLowerCase() == 'true');
      this.ifCases = (this.route.snapshot.queryParams['cases'].toLowerCase() == 'true');
      this.ifDefects = (this.route.snapshot.queryParams['defects'].toLowerCase() == 'true');
      if (!this.ifArticles && !this.ifCases && !this.ifDefects) {
        this.ifArticles = true;
        this.ifCases = true;
        this.ifDefects = true;
      }
    }, 0);
    this.service.setarticlesSubject = this.searchText;
    this.service.setcasesSubject = this.searchText;
    this.service.setdefectsSubject = this.searchText;
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  searchPosts(searchText: string) {
    this.searchText = searchText;
    this.service.setarticlesSubject = searchText;
    this.service.setcasesSubject = searchText;
    this.service.setdefectsSubject = searchText;
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
