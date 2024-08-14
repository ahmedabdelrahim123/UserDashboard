import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component'; 
import { UserDetailsComponent } from './component/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: MainPageComponent } ,
  { path: 'user-details/:id', component: UserDetailsComponent } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
