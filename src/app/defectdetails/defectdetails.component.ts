import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleDetails, AttachmentsResponse, AuthBody, DefectDetails, DetailType } from '../search.modal';
import { BlogService } from '../search.service';

@Component({
  selector: 'app-defectdetails',
  templateUrl: './defectdetails.component.html',
  styleUrls: ['./defectdetails.component.css']
})
export class DefectdetailsComponent implements OnInit {
  searchText: string = '';
  closeResult = '';
  id: string = '';
  type: DetailType = DetailType.Defect;
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
    this.populateDefect();
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

  populateDefect(): void {
    this.service.fetchDefect(this.id).pipe(map((data: DefectDetails[]) => {
      return data;
    }), catchError(error => {
      return throwError('Something went wrong!');
    })).subscribe((value: any) => {
      console.log('value:', value)

      value = this.removeEmptyOrNull(value);
      let json: any[] = value!=null && value.length>1?JSON.parse(value):value;
      json[0] = this.removeEmptyOrNull(json[0]);
      console.log('Json:', json)
      this.inputData = json;
      for (var key in json[0]) {
        if (key !== 'Body')
          this.displayedColumns.push(key);
      }
      this.inputCol = ["0"].concat(
        this.inputData.map(x => x.Id!.toString())
      );
      this.data = this.displayedColumns.map(x => this.formatInputRow(x));

      console.log("articles: ", value);
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
      output[this.inputData[i].Id] = this.inputData[i][row];
      // }

    }

    return output;
  }

  openArticle() {
    window.open(`https://rsasecurity.my.salesforce.com/${this.id}`);
  }
}
