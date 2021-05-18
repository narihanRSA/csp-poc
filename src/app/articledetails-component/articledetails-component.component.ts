import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleDetails, AttachmentsResponse, AuthBody, DetailType } from '../search.modal';
import { BlogService } from '../search.service';

@Component({
  selector: 'app-articledetails-component',
  templateUrl: './articledetails-component.component.html',
  styleUrls: ['./articledetails-component.component.css']
})
export class ArticledetailsComponentComponent implements OnInit {
  searchText: string = '';
  closeResult = '';
  id: string = '';
  type:DetailType=DetailType.Article;
  data: any[] = [];
  displayedColumns: string[] = [];
  displayedColumnsAH: string[] =[
    'Subject',
    'DueDate',
    'AssignedTo',
    'Name',
    'LastModified',
    'Status',
    'CreatedDate'
  ];

  displayedColumnsAttach: string[] =[
    'link',
    'FileName',
    'LastModified'
  ];

  dictionary: string[] = [];
  inputCol:string[]=[];
  inputData:any[]=[];
  inputDataAH:any[]=[];
  inputDataAttach:any[]=[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service:BlogService) { }

  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams['search'];
    this.id = this.route.snapshot.queryParams['id'];
    this.type = this.route.snapshot.queryParams['type'];
    this.populateArticle();
    this.data = this.displayedColumns.map(x => this.formatInputRow(x));
    this.inputCol = ["0"].concat(
      this.inputData.map(x => x.ArticleNumber!.toString())
    );
    console.log(this.data);
  }

  back(): void {
    this.router.navigate(['search'], {
      queryParams: {
        search: this.searchText
      }, skipLocationChange: true
    });
  }

  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.inputDataAH.splice(x, 1 );
    }
  }

  populateArticle(): void {
    this.service.fetchArticle(this.id).pipe(map((data: ArticleDetails[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      let json: ArticleDetails[] = JSON.parse(value);
      this.data = json;
      console.log("articles: ",this.data);
    });

    this.displayedColumns = ['ArticleNumber',
      'Product_Details__c',
      'Issue__c',
      'Cause__c',
      'Resolution__c',
      'CreatedDate',
      'ArticleCaseAttachCount',
      'IsLatestVersion',
      'ArticleType',
      'Summary',
      'Notes__c',
      'Title',
      'Body',
      'IsOutOfDate',
      'KnowledgeArticleId',

    ]
    // this.displayedColumnsAH=[
    //   'Action',
    //   'Subject',
    //   'Due Date',
    //   'Assigned To',
    //   'Name',
    //   'Last Modified Date/Time',
    //   'Status',
    //   'Created Date'
    // ]

    this.inputDataAttach=[{
      link:"https://dell-my.sharepoint.com/:p:/r/personal/narihan_ellaithy_rsa_com/Documents/Product%20discovery.pptx?d=w308cb6a75c6d4c849f8fbceb1a374eac&csf=1&web=1&e=cm3pR9",
      FileName: "download.pdf",
      LastModified:"10/03/2021"
    }]

    this.inputDataAH=[{
      Subject:"Comment",
      DueDate:"30/3/2021",
      AssignedTo:"Hassan Ibrahim",
      Name:"Narihan QH728179u21",
      LastModified:"30/3/2021 3:30 AM",
      Status:"Completed",
      CreatedDate:"30/3/2021 3:30 AM"
    }]

    // this.inputData = [{
    //   ArticleNumber: 12,
    //   Product_Details__c: "dhij",
    //   ArticleCaseAttachCount: "string",
    //   IsLatestVersion: true,
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

  formatInputRow(row: string) {
    const output = [];

    output[0] = row;
    for (let i = 0; i < this.inputData.length; ++i) {
      output[this.inputData[i].ArticleNumber] = this.inputData[i][row];
    }

    return output;
  }
}
