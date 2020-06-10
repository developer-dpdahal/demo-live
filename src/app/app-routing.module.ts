import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LiveComponent} from "./live/live.component";



const routes: Routes = [
  {
    path:'video',
    component:LiveComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
