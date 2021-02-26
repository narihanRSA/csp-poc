
import { MatTableDataSource } from "@angular/material/table";

export interface ArticlesType{
  ArticleNumber: number;
  Title: string;
}

export class ArticlesResults {
  articles_arr: ArticlesType[]=[];
  articles_datasource=new MatTableDataSource<ArticlesType>();
  get articlesResults(): MatTableDataSource<ArticlesType> {
    this.articles_datasource=new MatTableDataSource<ArticlesType>(this.articles_arr);
    return this.articles_datasource;
  }
  set articles(value: ArticlesType[]) {
    this.articles_datasource=new MatTableDataSource<ArticlesType>(value);
    this.articles_arr = value;
  }
}

export interface CasesType{
  CaseNumber: number;
  Subject: string;
}

export class CasesResults {
  cases_arr: CasesType[]=[];
  cases_datasource=new MatTableDataSource<CasesType>();
  get casesResults(): MatTableDataSource<CasesType> {
    this.cases_datasource=new MatTableDataSource<CasesType>(this.cases_arr);
    return this.cases_datasource;
  }
  set cases(value: CasesType[]) {
    this.cases_datasource=new MatTableDataSource<CasesType>(value);
    this.cases_arr = value;
  }
}

export interface DefectsType{
  Id: number;
  TITLE__c: string;
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

