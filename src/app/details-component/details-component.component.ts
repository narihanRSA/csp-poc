import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleDetails, CaseDetails, DetailType } from '../search.modal';
import { BlogService } from '../search.service';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {

  id:string='';
  type:DetailType=DetailType.Article;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  constructor(private route: ActivatedRoute,private service: BlogService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.type=this.route.snapshot.queryParams['type'];
    switch(this.type){
      case DetailType.Article: this.populateArticle(); break;
      case DetailType.Case: this.populateCase();break;
      default:break;
    }
  }

  populateArticle(): void{
    this.service.fetchArticle(this.id).pipe(map((data: ArticleDetails[]) => {
      // console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: ArticleDetails[] = JSON.parse(value);
      this.dataSource = new MatTableDataSource<ArticleDetails>(json);
    });
    this.displayedColumns=['ArticleNumber',
      'Product_Details__c',
      'ArticleCaseAttachCount',
      'ArticleType',
      'Cause__c',
      'CreatedDate',
      'IsLatestVersion',
      'Issue__c',
      'Summary',
      'Title',
      'Body']
  }

  populateCase(): void{
    this.service.fetchCase(this.id).pipe(map((data: CaseDetails[]) => {
      // console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: CaseDetails[] = JSON.parse(value);
      this.dataSource = new MatTableDataSource<CaseDetails>(json);
    });
  }
}
