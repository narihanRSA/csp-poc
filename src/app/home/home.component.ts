import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailType } from '../search.modal';
import { BlogService } from '../search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText:string="";
  article:boolean=false;
  case:boolean=false;
  defect:boolean=false;
  constructor(private router: Router, private route: ActivatedRoute, private service: BlogService) { }

  ngOnInit(): void {}

  navigate(navlink: any): void {
    this.service.setarticlesSubject=this.searchText;
    this.service.setcasesSubject=this.searchText;
    this.service.setdefectsSubject=this.searchText;
    this.service.ifArticles=this.article;
    this.service.ifCases=this.case;
    this.service.ifDefects=this.defect
    this.router.navigate([navlink],{queryParams: {search: this.searchText}, skipLocationChange: true});
  }

  searchPosts(searchText: string) {
    this.searchText=searchText;
    this.service.setarticlesSubject=searchText;
    this.service.setcasesSubject=searchText;
    this.service.setdefectsSubject=searchText;
  }
}
