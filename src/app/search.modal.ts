
import { MatTableDataSource } from "@angular/material/table";

export enum DetailType {
  Article = 'Article',
  Case = 'Case',
  Defect = 'Defect',
  All = 'All'
}

export interface ArticlesType {
  ArticleNumber: number;
  Title: string;
  CreatedDate: Date;
  KnowledgeArticleId:string;
  ArticleCaseAttachCount:number;
}

export class ArticlesResults {
  articles_arr: ArticlesType[] = [];
  articles_datasource = new MatTableDataSource<ArticlesType>();
  get articlesResults(): MatTableDataSource<ArticlesType> {
    this.articles_datasource = new MatTableDataSource<ArticlesType>(this.articles_arr);
    return this.articles_datasource;
  }
  set articles(value: ArticlesType[]) {
    this.articles_datasource = new MatTableDataSource<ArticlesType>(value);
    this.articles_arr = value;
  }
}

export interface CasesType {
  CaseNumber: number;
  Subject: string;
  Status: string;
  CreatedDate: Date;
}

export class CasesResults {
  cases_arr: CasesType[] = [];
  cases_datasource = new MatTableDataSource<CasesType>();
  get casesResults(): MatTableDataSource<CasesType> {
    this.cases_datasource = new MatTableDataSource<CasesType>(this.cases_arr);
    return this.cases_datasource;
  }
  set cases(value: CasesType[]) {
    this.cases_datasource = new MatTableDataSource<CasesType>(value);
    this.cases_arr = value;
  }
}

export interface DefectsType {
  ID__c: string;
  TITLE__c: string;
  STATE__c: string;
  CreatedDate: Date;
}

export class DefectsResults {
  defect_arr: DefectsType[] = [];
  defects_datasource = new MatTableDataSource<DefectsType>();
  get getDefectsResults(): MatTableDataSource<DefectsType> {
    this.defects_datasource = new MatTableDataSource<DefectsType>(this.defect_arr);
    return this.defects_datasource;
  }
  set setDefects(value: DefectsType[]) {
    this.defects_datasource = new MatTableDataSource<DefectsType>(value);
    this.defect_arr = value;
  }
}

export interface CaseDetails {
  CaseNumber?: number,
  Status?: string,
  Origin?: string,
  Subject?: string,
  Priority?: string,
  Description?: string,
  ClosedDate?: Date,
  IsEscalated?: boolean,
  CurrencyIsoCode?: string,
  CreatedDate?: Date,
  Account_Country__c?: string,
  Action_Owner__c?: string,
  Case_Age__c?: string,
  Current_Action_Owner__c?: string,
  Current_Status__c?: string,
  Entitlement_Start_Created_Date__c?: Date,
  Entitlement_Status__c?: string,
  Escalation_Required__c?: string,
  Implementation_Status__c?: string,
  Initial_Severity__c?: string,
  Milestone_Status_Reporting__c?: string,
  Pref_Communication__c?: string,
  Preferred_Language__c?: string,
  RSA_Product_Set__c?: string,
  Supporting_Information__c?: string,
  case_summary__c?: string
}

export interface ArticleDetails {
  ArticleNumber?: number,
  Product_Details__c?: string,
  ArticleCaseAttachCount?: number,
  ArticleType?: string,
  Cause__c?: string,
  CreatedDate?: Date,
  IsLatestVersion?: boolean,
  Issue__c?: string,
  Summary?: string,
  Title?: string,
  Resolution__c?: string,
  Notes__c?: string
  Body?:string,
  IsOutOfDate?:boolean,
  KnowledgeArticleId?:string,
  Notes_Internal__c?:string,
  Number_of_cases_linked__c?:number,
  Workaround__c?:string
}

export interface AuthBody {
  access_token: string,
  instance_url?: string,
  id?: string,
  token_type?: string,
  issued_at?: string,
  signature?: string
}

export interface AttachmentsResponse {
  totalSize?: number,
  done?: boolean,
  records?: AttachmentRecordDetails[]
}

export interface AttachmentRecordDetails {
  attributes?: AttributesDetails,
  Id?: string,
  Name?: string,
  ParentId?: string,
  Parent?: {
    attributes?: AttributesDetails,
    Type?: string
  }
}

export interface AttributesDetails {
  type?: string,
  url?: string
}

export interface AttachmentDetails {
  attributes?: AttributesDetails,
  Id?: string,
  IsDeleted?: boolean,
  ParentId?: string,
  Name?: string,
  IsPrivate?: boolean,
  ContentType?: string,
  BodyLength?: number,
  Body?: string,
  OwnerId?: string,
  CreatedDate?: Date,
  CreatedById?: string,
  LastModifiedDate?: Date,
  LastModifiedById?: string,
  SystemModstamp?: Date,
  Description?: string,
  IsPartnerShared?: boolean,
  ConnectionReceivedId?: string,
  ConnectionSentId?: string
}

export interface CaseArticle {
  totalSize?: number,
  done?: boolean,
  records?: CaseArticleDetails[]
}

export interface CaseArticleDetails {
  attributes?: AttributesDetails,
  KnowledgeArticleId?: string,
  ArticleLanguage?: string,
  ArticleVersionNumber?: number
}

export interface CaseStepsTaken {
  totalSize?: number,
  done?: boolean,
  records?: CaseArticleDetails[]
}

export interface CaseStepsTakenDetails {
  attributes?: AttributesDetails,
  Id?: string,
  Steps_Taken__c?: string
}

export interface CaseActivityHistory {
  totalSize?: number,
  done?: boolean,
  records?: CaseActivityHistoryDetails[]
}

export interface CaseActivityHistoryDetails {
  attributes?: AttributesDetails,
  ActivityHistories?: CaseActivityHistoryInfo
}

export interface CaseActivityHistoryInfo {
  totalSize?: number,
  done?: boolean,
  records?: CaseActivityHistoryRecords[]
}

//Activity History results needed
export interface CaseActivityHistoryRecords {
  visible: boolean;
  attributes?: AttributesDetails,
  Id?: string,
  ActivityDate?: Date,
  ActivitySubtype?: string,
  ActivityType?: string,
  CallDurationInSeconds?: string,
  Status?: string,
  Priority?: string,
  StartDateTime?: Date,
  Description?: string,
  Subject?: string
}

