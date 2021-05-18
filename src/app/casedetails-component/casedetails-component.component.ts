import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleDetails, AttachmentDetails, AttachmentRecordDetails, AttachmentsResponse, CaseActivityHistoryDetails, CaseActivityHistoryRecords, CaseArticle, CaseArticleDetails, CaseDetails, CaseStepsTakenDetails, DetailType } from '../search.modal';
import { BlogService } from '../search.service';

@Component({
  selector: 'app-casedetails-component',
  templateUrl: './casedetails-component.component.html',
  styleUrls: ['./casedetails-component.component.css']
})
export class CasedetailsComponentComponent implements AfterViewInit {
  searchText: string = '';
  closeResult = '';
  caseNumber: string = '';
  caseId: string = '';
  showMore = false;
  data: any[] = [];
  type: DetailType = DetailType.Case;
  displayedColumns: string[] = [];
  displayedColumnsArticles: string[] = [
    'KnowledgeArticleId',
    'Title',
    'CreatedDate'
  ];

  displayedColumnsStepsTaken: string[] = [
    'Steps_Taken__c'
  ];

  displayedColumnsActivityHistory: string[] = [
    "ActivityDate",
    "ActivitySubtype",
    "Id",
    "Status",
    "Priority",
    "StartDateTime",
    "Description",
    "Subject"
  ];

  displayedColumnsAttach: string[] = [
    'link',
    'Name',
    'CreatedDate',
    'LastModifiedDate'
  ];

  dictionary: string[] = [];
  inputCol: string[] = [];
  inputData: any[] = [];
  inputDataAH: any[] = [];
  inputDataAttach: any[] = [];

  dataSourceAttachments = new MatTableDataSource<AttachmentDetails>();
  dataSourceActivityHistory = new MatTableDataSource<CaseActivityHistoryRecords>();
  dataSourceStepsTaken = new MatTableDataSource<string>();
  dataSourceArticles = new MatTableDataSource<ArticleDetails>();


  @ViewChild('paginatorST', { static: true })
  paginatorST!: MatPaginator;
  @ViewChild('paginatorAH', { static: true })
  paginatorAH!: MatPaginator;
  @ViewChild('paginatorA', { static: true })
  paginatorA!: MatPaginator;
  @ViewChild('paginatorATT', { static: true })
  paginatorATT!: MatPaginator;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: BlogService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSourceAttachments.paginator = this.paginatorATT
      this.dataSourceActivityHistory.paginator = this.paginatorAH
      this.dataSourceStepsTaken.paginator = this.paginatorST
      this.dataSourceArticles.paginator = this.paginatorA
    });

    this.searchText = this.route.snapshot.queryParams['search'];
    this.caseNumber = this.route.snapshot.queryParams['num'];
    this.caseId = this.route.snapshot.queryParams['id'];
    this.type = this.route.snapshot.queryParams['type'];
    console.log(this.caseId);
    console.log(this.caseNumber);
    setTimeout(() => {
      this.getAttachments(this.caseId);
      this.getArticles(this.caseId);
      this.getStepsTaken(this.caseId);
      this.getActivityHistory(this.caseId);
    }, 0);
    this.populateCase();


    //this.getAttachmentDetails("00P4u00001xNWKiEAO");
    //this.getAttachmentBody("00P4u00001xNWKiEAO");
  }

  ngAfterViewInit() {
    this.dataSourceAttachments.paginator = this.paginatorATT
    this.dataSourceActivityHistory.paginator = this.paginatorAH
    this.dataSourceStepsTaken.paginator = this.paginatorST
    this.dataSourceArticles.paginator = this.paginatorA
  }

  back(): void {
    this.router.navigate(['search'], {
      queryParams: {
        search: this.searchText
      }, skipLocationChange: true
    });
  }

  deleteRow(x: number) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      this.inputDataAH.splice(x, 1);
    }
  }

  populateCase(): void {
    this.service.fetchCase(this.caseNumber).pipe(map((data: CaseDetails[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: CaseDetails[] = JSON.parse(value);
      this.inputData = json;
      console.log("cases: ",this.inputData);
      console.log("cases json: ",json);
    });

    this.displayedColumns = ['CaseNumber',
      'CreatedDate',
      'RSA_Product_Set__c',
      'Description',
      'Supporting_Information__c',
      'Priority',
      'Initial_Severity__c',
      'Status',
      'Origin',
      'ClosedDate',
      'IsEscalated',
      'CurrencyIsoCode',
      'Account_Country__c',
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
      'Preferred_Language__c',
      'case_summary__c'
    ]
    this.inputCol = ["0"].concat(
      this.inputData.map(x => x.CaseNumber!.toString())
    );
    this.data = this.displayedColumns.map(x => this.formatInputRow(x));

    console.log('data: ',this.data);
    console.log('input data: ',this.inputData);

    // this.inputData = [{
    //   CaseNumber: 123,
    //   CreatedDate: new Date(),
    //   Status: "string",
    //   Origin: "string",
    //   Priority: "string",
    //   Description: "string",
    //   ClosedDate: new Date(),
    //   IsEscalated: true,
    //   CurrencyIsoCode: "string",
    //   Account_Country__c: "string",
    //   Action_Owner__c: "string",
    //   Case_Age__c: "string",
    //   Current_Action_Owner__c: "string",
    //   Current_Status__c: "string",
    //   Entitlement_Start_Created_Date__c: new Date(),
    //   Entitlement_Status__c: "string",
    //   Escalation_Required__c: "Omar",
    //   Implementation_Status__c: "string",
    //   Initial_Severity__c: "string",
    //   Milestone_Status_Reporting__c: "string",
    //   Pref_Communication__c: "string",
    //   Preferred_Language__c: "string",
    //   RSA_Product_Set__c: "string",
    //   Supporting_Information__c: "string",
    //   case_summary__c: "string"
    // }] as CaseDetails[];
  }

  isNotString(val: any): boolean {
    return typeof val === 'number' || typeof val === 'boolean' || val instanceof Date;
  }

  formatInputRow(row: string) {
    const output = [];

    output[0] = row;
    for (let i = 0; i < this.inputData.length; ++i) {
      output[this.inputData[i].CaseNumber] = this.inputData[i][row];
    }

    return output;
  }

  getAttachments(id: string) {
    this.service.getSalesForceAttachmentInformation(this.type, id).subscribe((value: any) => {
      const arr: string[] = [];
      (value.records).forEach((record: AttachmentRecordDetails) => {
        arr.push(record.Id ? record.Id : "")
      })

      const arrAllInfo: AttachmentDetails[] = [];
      //For each record id get single attachment details
      arr.forEach((id: string) => {
        this.service.getSalesForceAttachmentDetailInformation(id).subscribe((value: any) => {
          arrAllInfo.push(value)
          setTimeout(() => {
            this.dataSourceAttachments = new MatTableDataSource<AttachmentDetails>(arrAllInfo);
            this.dataSourceAttachments.paginator = this.paginatorATT
          }, 0)
        })
      })
    })
  }

  getActivityHistory(id: string) {
    this.service.getSalesForceCaseActivityHistory(id).subscribe((value: any) => {
      const arr: CaseActivityHistoryRecords[] = [];
      (value.records).forEach((record: CaseActivityHistoryDetails) => {
        record.ActivityHistories?.records?.forEach((rec: CaseActivityHistoryRecords) => {
          rec.visible = false;
          arr.push(rec);
        }
        )
      })
      setTimeout(() => {
        this.dataSourceActivityHistory = new MatTableDataSource<CaseActivityHistoryRecords>(arr);
        this.dataSourceActivityHistory.paginator = this.paginatorAH
      }, 0)
    })
  }

  getStepsTaken(id: string) {
    this.service.getSalesForceCaseStepsTaken(id).subscribe((value: any) => {
      const arr: string[] = [];
      (value.records).forEach((record: CaseStepsTakenDetails) => {
        let steps = record.Steps_Taken__c != undefined ? record.Steps_Taken__c!.split("***STEPS TAKEN***") : [];
        console.log(steps)
        steps.forEach((step: string) => {
          if (step.length > 1)
            arr.push(step);
        })
      })
      setTimeout(() => {
        this.dataSourceStepsTaken = new MatTableDataSource<string>(arr);
        this.dataSourceStepsTaken.paginator = this.paginatorST
      }, 0)
    })
  }

  getArticles(id: string) {
    var arr2: string[] = [];
    const arr: ArticleDetails[] = [];
    this.service.getSalesForceCaseArticles(id).subscribe((value: any) => {
      (value.records).forEach((record: CaseArticleDetails) => {
        arr2.push(record.KnowledgeArticleId ? record.KnowledgeArticleId : '');
      })
      arr2.forEach((articleId: string) => {
        this.service.fetchArticle(articleId).pipe(map((data: ArticleDetails[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })).subscribe((value: ArticleDetails[]) => {
          this.dataSourceArticles = new MatTableDataSource<ArticleDetails>(value);
          setTimeout(() => {
            this.dataSourceArticles.paginator = this.paginatorA
          }, 0)
        });
      })
    });
  }

  getAttachmentBody(id: string, fileName: string) {
    this.service.getSalesForceAttachmentDetailBody(id).subscribe((value: any) => {
      console.log(value)
      let url = window.URL.createObjectURL(value);
      // let pwa = window.open(url);
      var link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
    })
  }

  getAttachmentBodyView(id: string) {
    this.service.getSalesForceAttachmentDetailBody(id).subscribe((value: any) => {
      console.log(value)
      let url = window.URL.createObjectURL(value);
      let pwa = window.open(url);
    })
  }
}

