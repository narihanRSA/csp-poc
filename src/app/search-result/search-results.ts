
import { MatTableDataSource } from "@angular/material/table";

export class ArticlesResults {
  ArticleNumber: number=0;
  Title: string='';
  articles_results: ArticlesResults[]=[];
  articles_datasource=new MatTableDataSource<ArticlesResults>();
  get articlesResults(): MatTableDataSource<ArticlesResults> {
    this.articles_datasource=new MatTableDataSource<ArticlesResults>(this.articles_results);
    return this.articles_datasource;
  }
  set articles(value: ArticlesResults[]) {
    this.articles_datasource=new MatTableDataSource<ArticlesResults>(value);
    this.articles_results = value;
  }
}

export class CasesResults {
  CaseNumber: number=0;
  Subject: string='';
  case_results: CasesResults[]=[];
  cases_datasource=new MatTableDataSource<CasesResults>();
  get casesResults(): MatTableDataSource<CasesResults> {
    this.cases_datasource=new MatTableDataSource<CasesResults>(this.case_results);
    return this.cases_datasource;
  }
  set cases(value: CasesResults[]) {
    this.cases_datasource=new MatTableDataSource<CasesResults>(value);
    this.case_results = value;
  }
}

export class DefectsType{
  Id: number=0;
  TITLE__c: string='';
}

export class DefectsResults {
  defect_arr: DefectsType[]=[];
  defects_datasource=new MatTableDataSource<DefectsType>();
  get getDefectsResults(): MatTableDataSource<DefectsType> {
    this.defects_datasource=new MatTableDataSource<DefectsType>(this.defect_arr);
    return this.defects_datasource;
  }
  set setDefects(value: DefectsType[]) {
    this.defects_datasource=new MatTableDataSource<DefectsType>(value);
    this.defect_arr = value;
  }
}

