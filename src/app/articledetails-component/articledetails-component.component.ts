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
  type: DetailType = DetailType.Article;
  data: any[] = [];
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
    'link',
    'FileName',
    'LastModified'
  ];

  dictionary: string[] = [];
  inputCol: string[] = [];
  inputData: any[] = [];
  inputDataAH: any[] = [];
  inputDataAttach: any[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: BlogService) { }

  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams['search'];
    this.id = this.route.snapshot.queryParams['id'];
    this.type = this.route.snapshot.queryParams['type'];
    this.populateArticle();

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

  populateArticle(): void {
    // this.displayedColumns = ['ArticleNumber',
    //   'Product_Details__c',
    //   'Issue__c',
    //   'Cause__c',
    //   'Resolution__c',
    //   'CreatedDate',
    //   'ArticleCaseAttachCount',
    //   'IsLatestVersion',
    //   'ArticleType',
    //   'Summary',
    //   'Notes__c',
    //   'Title',
    //   'IsOutOfDate',
    //   'KnowledgeArticleId',
    // ]
    this.service.fetchArticle(this.id).pipe(map((data: ArticleDetails[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      // console.log('Value:',value)
      // let json: ArticleDetails[] = JSON.parse(value);
      for(var key in value[0]){
        if(typeof value[0][key] === 'string'){
          var html=value[0][key]
          html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
          html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
          html = html.replace(/<\/div>/ig, '\n');
          html = html.replace(/<\/li>/ig, '\n');
          html = html.replace(/<li>/ig, '  *  ');
          html = html.replace(/<\/ul>/ig, '\n');
          html = html.replace(/<\/p>/ig, '\n');
          html = html.replace(/<br\s*[\/]?>/gi, '\n');
          html = html.replace(/<[^>]+>/ig, '');
          value[0][key]=html;
        }
      }
      // console.log('value:', value)
      value= this.removeEmptyOrNull(value)
      console.log('value:', value)
      this.inputData = value;
      for(var key in value[0]){
        if(key!=='Body')
          this.displayedColumns.push(key);
      }
      this.inputCol = ["0"].concat(
        this.inputData.map(x => x.ArticleNumber!.toString())
      );
      this.data = this.displayedColumns.map(x => this.formatInputRow(x));

      console.log("articles: ", this.data);
    });

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

  removeEmptyOrNull = (obj: { [x: string]: any; }) => {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && this.removeEmptyOrNull(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
  };

  formatInputRow(row: string) {
    const output = [];

    output[0] = row;
    for (let i = 0; i < this.inputData.length; ++i) {
      // if(this.inputData[i][row] != null){
        output[this.inputData[i].ArticleNumber] = this.inputData[i][row];
      // }

    }

    return output;
  }

  openArticle(){
    window.open(`https://rsasecurity.my.salesforce.com/${this.id}`);
  }
}
