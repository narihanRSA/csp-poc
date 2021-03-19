
import { MatTableDataSource } from "@angular/material/table";

export enum DetailType{
  Article='Article',
  Case='Case',
  Defect='Defect'
}

export interface ArticlesType{
  ArticleNumber: number;
  Title: string;
  CreatedDate:Date;
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
  Status: string;
  CreatedDate:Date;
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
  ID__c: string;
  TITLE__c: string;
  STATE__c: string;
  CreatedDate:Date;
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

export interface CaseDetails{
  CaseNumber?:number,
  Status?:string,
  Origin?:string,
  Subject?:string,
  Priority?:string,
  Description?:string,
  ClosedDate?:Date,
  IsEscalated?:boolean,
  CurrencyIsoCode?: string,
  CreatedDate?:Date,
  Account_Country__c?:string,
  Record_Type__c?:string,
  Action_Owner__c?:string,
  Case_Age__c?:string,
  Current_Action_Owner__c?:string,
  Current_Status__c?:string,
  Entitlement_Start_Created_Date__c?:Date,
  Entitlement_Status__c?:string,
  Implementation_Status__c?:string,
  Initial_Severity__c?:string,
  Milestone_Status_Reporting__c?:string,
  Pref_Communication__c?:string,
  Preferred_Language__c?:string,
  RSA_Product_Set__c?:string,
  Supporting_Information__c?:string,
  case_summary__c?:string
}

export interface ArticleDetails{
  ArticleNumber?:number,
  Product_Details__c?:string,
  ArticleCaseAttachCount?:string,
  ArticleType?:string,
  Cause__c?:string,
  CreatedDate?:Date,
  IsLatestVersion?:boolean,
  Issue__c?:string,
  Summary?:string,
  Title?:string,
  Resolution__c?:string,
  Notes__c?:string
}

