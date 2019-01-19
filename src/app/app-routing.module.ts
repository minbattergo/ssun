import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HeroesComponent} from './heroes/heroes.component';
import {TodoComponent} from './todo/todo.component';

const routes: Routes = [
  {path: 'home',   component: HomeComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'todo',   component: TodoComponent}
  /** {path: '', redirectTo: HomeComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
