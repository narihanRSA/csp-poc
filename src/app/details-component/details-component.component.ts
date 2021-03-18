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
      console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: ArticleDetails[] = JSON.parse(value);
      console.log(json);
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
    this.displayedColumns=['Id',
      'IsDeleted',
      'CaseNumber',
      'ContactId',
      'AccountId',
      'Status',
      'Origin',
      'Subject',
      'Priority',
      'Description',
      'IsClosed',
      'ClosedDate',
      'IsEscalated',
      'CurrencyIsoCode',
      'CreatedDate',
      'Account_Country__c',
      'Record_Type__c',
      'Action_Owner__c',
      'Case_Age__c',
      'Current_Action_Owner__c',
      'Current_Status__c',
      'Entitlement_Start_Created_Date__c',
      'Entitlement_Status__c',
      'Escalation_Required__c',
      'Implementation_Status__c',
      'Initial_Severity__c',
      'Milestone_Status_Reporting__c',
      'Pref_Communication__c',
      'Preferred_Language__c',
      'RSA_Product_Set__c',
      'Supporting_Information__c',
      'case_summary__c']
  }
}
