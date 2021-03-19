import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '@syncfusion/ej2-angular-grids';
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

  id: string = '';
  type: DetailType = DetailType.Article;
  // dataSource = new MatTableDataSource<any>();
  data: any[] = [];
  displayedColumns: string[] = [];
  dictionary:string[]=[];
  searchText:string='';

  constructor(private router: Router, private service: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.type = this.route.snapshot.queryParams['type'];
    this.searchText=this.route.snapshot.queryParams['search'];
    switch (this.type) {
      case DetailType.Article: this.populateArticle(); break;
      case DetailType.Case: this.populateCase(); break;
      default: break;
    }
  }

  populateArticle(): void {
    this.service.fetchArticle(this.id).pipe(map((data: ArticleDetails[]) => {
      console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: ArticleDetails[] = JSON.parse(value);
      console.log(json);
      this.data=json;
      // this.dataSource = new MatTableDataSource<ArticleDetails>(json);
    });
    this.displayedColumns = [
      'Product_Details__c',
      'ArticleCaseAttachCount',
      'IsLatestVersion',
      'ArticleType',
      'Cause__c',
      'CreatedDate',
      'Issue__c',
      'Summary',
      'Resolution__c',
      'Notes__c']

    // this.data = [{
    //   ArticleNumber: 12,
    //   Product_Details__c: "dhij",
    //   ArticleCaseAttachCount: "string",
    //   IsLatestVersion:true,
    //   ArticleType: "string",
    //   Cause__c: "string",
    //   CreatedDate: new Date(),
    //   Issue__c: "string",
    //   Summary: "SUMMARY",
    //   Title: "string",
    //   Resolution__c: "string",
    //   Notes__c: "So the differences between the two templates are quite major. In the first, each column is explicitly defined: column headers tied to a hard-coded string array in the component, the object declared each time, the object property-values hard-coded.The second example, however, reduces the code down to a single “container” definition in which we make use of *ngFor to iterate through an array of columns, which won’t be predefined in the component. We bind the matColumnDef to the current column (which is an object property), tell it to display the current column as a header, and to display the value of that property for the current object that’s been passed from the dataSource. We’re also setting the *matHeaderRowDef to the non-predefined columns.Ok, so now that we know how our template should look the question becomes how do we create the rows, columns, and dataSource dynamically at runtime. For that we’ll start at the beginning. Don’t worry there are lots of pictures 😄I wanted to give the user choices that would then reveal more choices, continually narrowing down the data they wanted to see. I handled that through using ngbDropdown menu, toggle, and item and *ngIf statements. So first we present options for types of object lists that can be selected."
    // }] as ArticleDetails[]

  }

  populateCase(): void {
    this.service.fetchCase(this.id).pipe(map((data: CaseDetails[]) => {
      // console.log(data);
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: CaseDetails[] = JSON.parse(value);
      this.data = json;
      // this.dataSource = new MatTableDataSource<CaseDetails>(json);
    });
    this.displayedColumns = [
      'Status',
      'Origin',
      'Priority',
      'Description',
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

      // this.data=[{CaseNumber:123,
      //   Status:"string",
      //   Origin:"string",
      //   Subject:"string",
      //   Priority:"string",
      //   Description:"string",
      //   ClosedDate:new Date(),
      //   IsEscalated:true,
      //   CurrencyIsoCode: "string",
      //   CreatedDate:new Date(),
      //   Account_Country__c:"string",
      //   Record_Type__c:"string",
      //   Action_Owner__c:"string",
      //   Case_Age__c:"string",
      //   Current_Action_Owner__c:"string",
      //   Current_Status__c:"string",
      //   Entitlement_Start_Created_Date__c:new Date(),
      //   Entitlement_Status__c:"string",
      //   Implementation_Status__c:"string",
      //   Initial_Severity__c:"string",
      //   Milestone_Status_Reporting__c:"string",
      //   Pref_Communication__c:"string",
      //   Preferred_Language__c:"string",
      //   RSA_Product_Set__c:"string",
      //   Supporting_Information__c:"string",
      //   case_summary__c:"string"}]
  }

  back():void{
    console.log("DETAILS:  "+this.searchText);
    this.router.navigate(['search'],{queryParams: { search:this.searchText}, skipLocationChange: true});
  }
}
