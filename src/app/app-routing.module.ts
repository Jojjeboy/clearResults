import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalliesComponent } from './tallies/tallies.component';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';
import { TallyComponent } from './tally/tally.component';

const routes: Routes = [
  {
      path: '',
      component: TalliesComponent,
      data: { title: 'Start Page' }
    },
    /*{
      path: 'add',
      component: AddTallyComponent,
      data: { title: 'Add Tally' }
    },
    {
      path: 'edit/:id',
      component: EditTallyComponent,
      data: { title: 'Edit Tally' }
    },
    {
      path: 'clear',
      component: ClearCacheComponent,
      data: { title: 'Clear Cache' }
    },
    {
      path: 'example',
      component: AddExampleComponent,
      data: { title: 'Add example' }
    },
    {
      path: 'todo',
      component: TodoComponent,
      data: { title: 'Todo' }
    },
    */
    { path: '**', component: TalliesComponent }
  ];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [
    TalliesComponent, 
    TallyComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
