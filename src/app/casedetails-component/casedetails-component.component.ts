import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AttachmentDetails, AttachmentRecordDetails, AttachmentsResponse, CaseDetails, DetailType } from '../search.modal';
import { BlogService } from '../search.service';

@Component({
  selector: 'app-casedetails-component',
  templateUrl: './casedetails-component.component.html',
  styleUrls: ['./casedetails-component.component.css']
})
export class CasedetailsComponentComponent implements OnInit {
  searchText: string = '';
  closeResult = '';
  id: string = '';
  showMore = false;
  data: any[] = [];
  type: DetailType = DetailType.Case;
  displayedColumns: string[] = [];
  displayedColumnsAH: string[] = [
    'Subject',
    'DueDate',
    'AssignedTo',
    'Name',
    'LastModified',
    'Status',
    'CreatedDate'
  ];

  displayedColumnsAttach: string[] = [
    //'link',
    'Name',
    'CreatedDate',
    'LastModifiedDate'
  ];

  dictionary: string[] = [];
  inputCol: string[] = [];
  inputData: any[] = [];
  inputDataAH: any[] = [];
  inputDataAttach: any[] = [];

  temp= new MatTableDataSource<string>(this.service.attachmentsResponse);

  // attachmentResponse: AttachmentDetails[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: BlogService) { }

  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams['search'];
    this.id = this.route.snapshot.queryParams['id'];
    this.type = this.route.snapshot.queryParams['type'];
    setTimeout(() => {
      this.getAttachments("5004u00002QJUQmAAP");
    }, 0);
    // this.populateCase();
    this.data = this.displayedColumns.map(x => this.formatInputRow(x));
    this.inputCol = ["0"].concat(
      this.inputData.map(x => x.CaseNumber!.toString())
    );
    // console.log(this.data);

    //this.getAttachmentDetails("00P4u00001xNWKiEAO");
    //this.getAttachmentBody("00P4u00001xNWKiEAO");
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
    // this.service.fetchCase(this.id).pipe(map((data: CaseDetails[]) => {
    //   return data;
    // }), catchError(error => {
    //   return throwError('Something went wrong!');
    // })).subscribe((value: any) => {
    //   let json: CaseDetails[] = JSON.parse(value);
    //   this.inputData = json;
    //   console.log("cases: ",this.inputData);
    // });

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

    this.inputDataAttach = [{
      link: "https://dell-my.sharepoint.com/:p:/r/personal/narihan_ellaithy_rsa_com/Documents/Product%20discovery.pptx?d=w308cb6a75c6d4c849f8fbceb1a374eac&csf=1&web=1&e=cm3pR9",
      FileName: "download.pdf",
      LastModified: "10/03/2021"
    }]

    this.inputDataAH = [{
      Subject: "Comment",
      DueDate: "30/3/2021",
      AssignedTo: "Hassan Ibrahim",
      Name: "Narihan QH728179u21",
      LastModified: "30/3/2021 3:30 AM",
      Status: "Completed",
      CreatedDate: "30/3/2021 3:30 AM"
    }]

    this.inputData = [{
      CaseNumber: 123,
      CreatedDate: new Date(),
      Status: "string",
      Origin: "string",
      Priority: "string",
      Description: "string",
      ClosedDate: new Date(),
      IsEscalated: true,
      CurrencyIsoCode: "string",
      Account_Country__c: "string",
      Action_Owner__c: "string",
      Case_Age__c: "string",
      Current_Action_Owner__c: "string",
      Current_Status__c: "string",
      Entitlement_Start_Created_Date__c: new Date(),
      Entitlement_Status__c: "string",
      Escalation_Required__c: "Omar",
      Implementation_Status__c: "string",
      Initial_Severity__c: "string",
      Milestone_Status_Reporting__c: "string",
      Pref_Communication__c: "string",
      Preferred_Language__c: "string",
      RSA_Product_Set__c: "string",
      Supporting_Information__c: "string",
      case_summary__c: "string"
    }] as CaseDetails[];
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
      this.service.getSalesForceAttachmentInformation(this.type, id).subscribe((value: any)=>{
        const arr:string[]=[];
        (value.records).forEach((record: AttachmentRecordDetails) => {
            arr.push(record.Id)
        })
        setTimeout(() => {
          this.temp = new MatTableDataSource<string>(arr);
          console.log(this.temp)
        }, 0)
      })
    }

  getAttachmentDetails(id: string){
      // this.attachmentResponse.push(this.service.getSalesForceAttachmentDetailInformation(id));
  }

  // getAttachmentBody(id: string){
  //     let imageData;
  //     this.service.getSalesForceAttachmentDetailBody(id).then((res: any) => { console.log(res); return res.blob() })
  //       .then((blob: any) => {
  //         var img = URL.createObjectURL(blob);
  //         // Do whatever with the img
  //         document.getElementById('myImage')!.setAttribute('src', img);
  //       }).catch((err: any) => {
  //         console.log(err);
  //       });
  //   }
}

