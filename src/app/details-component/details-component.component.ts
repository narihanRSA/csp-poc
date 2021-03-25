import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';
  id: string = '';
  type: DetailType = DetailType.Article;
  data: any[] = [];
  displayedColumns: string[] = [];
  dictionary: string[] = [];
  searchText: string = '';
  article: boolean = false;
  case: boolean = false;
  defect: boolean = false;

  constructor(private modalService: NgbModal,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.type = this.route.snapshot.queryParams['type'];
    this.searchText = this.route.snapshot.queryParams['search'];
    switch (this.type) {
      case DetailType.Article:
        this.populateArticle();
        break;
      case DetailType.Case:
        this.populateCase();
        break;
      default: break;
    }
  }

  populateArticle(): void {
    // this.service.fetchArticle(this.id).pipe(map((data: ArticleDetails[]) => {
    //   return data;
    // }), catchError(error => {
    //   return throwError('Something went wrong!');
    // })).subscribe((value: any) => {
    //   let json: ArticleDetails[] = JSON.parse(value);
    //   this.data = json;
    //   console.log("articles: ",this.data);
    // });
    this.displayedColumns = ['ArticleNumber',
      'Product_Details__c',
      'Issue__c',
      'Cause__c',
      'Resolution__c',
      'Notes__c',
      'CreatedDate',
      'ArticleCaseAttachCount',
      'IsLatestVersion',
      'ArticleType',
      'Summary'
    ]

    this.data = [{
      ArticleNumber: 12,
      Product_Details__c: "..",
      ArticleCaseAttachCount: "string",
      IsLatestVersion: true,
      ArticleType: "string",
      Cause__c: "string",
      CreatedDate: new Date(),
      Issue__c: "string",
      Summary: "SUMMARY",
      Title: "string",
      Resolution__c: "string",
      Notes__c: "So the differences between the two templates are quite major. In the first, each column is explicitly defined: column headers tied to a hard-coded string array in the component, the object declared each time, the object property-values hard-coded.The second example, however, reduces the code down to a single “container” definition in which we make use of *ngFor to iterate through an array of columns, which won’t be predefined in the component. We bind the matColumnDef to the current column (which is an object property), tell it to display the current column as a header, and to display the value of that property for the current object that’s been passed from the dataSource. We’re also setting the *matHeaderRowDef to the non-predefined columns.Ok, so now that we know how our template should look the question becomes how do we create the rows, columns, and dataSource dynamically at runtime. For that we’ll start at the beginning. Don’t worry there are lots of pictures 😄I wanted to give the user choices that would then reveal more choices, continually narrowing down the data they wanted to see. I handled that through using ngbDropdown menu, toggle, and item and *ngIf statements. So first we present options for types of object lists that can be selected."
    }] as ArticleDetails[]
  }

  populateCase(): void {
    // this.service.fetchCase(this.id).pipe(map((data: CaseDetails[]) => {
    //   return data;
    // }), catchError(error => {
    //   return throwError('Something went wrong!');
    // })).subscribe((value: any) => {
    //   let json: CaseDetails[] = JSON.parse(value);
    //   this.data = json;
    //   console.log("Cases: ",this.data);
    // });
    this.displayedColumns = ['CaseNumber',
      'CreatedDate',
      'RSA_Product_Set__c',
      'Description',
      'Supporting_Information__c',
      'case_summary__c',
      'Priority',
      'Initial_Severity__c',
      'Status',
      'Origin',
      'ClosedDate',
      'IsEscalated',
      'CurrencyIsoCode',
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
      'Milestone_Status_Reporting__c',
      'Pref_Communication__c',
      'Preferred_Language__c'
    ]
  }

  back(): void {
    this.router.navigate(['search'], {
      queryParams: {
        search: this.searchText
      }, skipLocationChange: true
    });
  }

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  isNotString(val: any): boolean {
    return typeof val === 'number' || typeof val === 'boolean' || val instanceof Date;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
