import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { MatSortModule } from '@angular/material/sort';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ArticlesComponentComponent } from './articles-component/articles-component.component';
import { CasesComponentComponent } from './cases-component/cases-component.component';
import { DefectsComponentComponent } from './defects-component/defects-component.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticledetailsComponentComponent } from './articledetails-component/articledetails-component.component';
import { CasedetailsComponentComponent } from './casedetails-component/casedetails-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultComponent,
    ArticlesComponentComponent,
    CasesComponentComponent,
    DefectsComponentComponent,
    DetailsComponentComponent,
    ArticledetailsComponentComponent,
    CasedetailsComponentComponent
  ],
  imports: [
    SidebarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSortModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCardModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
