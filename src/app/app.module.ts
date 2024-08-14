import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './component/main-page/main-page.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarComponent } from './component/loading-bar/loading-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserDetailsComponent,
    LoadingBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
