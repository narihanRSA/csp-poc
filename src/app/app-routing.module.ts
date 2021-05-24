import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticledetailsComponentComponent } from './articledetails-component/articledetails-component.component';
import { ArticlesComponentComponent } from './articles-component/articles-component.component';
import { CasedetailsComponentComponent } from './casedetails-component/casedetails-component.component';
import { CasesComponentComponent } from './cases-component/cases-component.component';
import { DefectdetailsComponent } from './defectdetails/defectdetails.component';
import { DefectsComponentComponent } from './defects-component/defects-component.component';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchResultComponent,
    children: [
      {
        path: '',
        component: ArticlesComponentComponent
      },
      {
        path: 'articles',
        component: ArticlesComponentComponent
      },
      {
        path: 'defects',
        component: DefectsComponentComponent
      },
      {
        path: 'cases',
        component: CasesComponentComponent
      }
  ]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'articledetails',
    component: ArticledetailsComponentComponent
  },
  {
    path: 'casedetails',
    component: CasedetailsComponentComponent
  },
  {
    path: 'defectdetails',
    component: DefectdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
