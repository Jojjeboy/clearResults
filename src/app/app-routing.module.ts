/* Modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Components */
import { TallyComponent } from './tally/tally.component';
import { AddEditTallyComponent } from './add-edit-tally/add-edit-tally.component';
import { TallyListComponent } from './tally-list/tally-list.component';
import { SettingsComponent } from './settings/settings.component';
import { AddExampleComponent } from './add-example/add-example.component';

const routes: Routes = [
  {
    path: '',
    component: TallyListComponent,
    data: { title: 'Start Page' }
  },
  {
    path: 'tally/:id',
    component: TallyComponent,
    data: { title: 'Tally details component' }
  },
  {
    path: 'example',
    component: AddExampleComponent,
    data: { title: 'Add example' }
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
    path: 'todo',
    component: TodoComponent,
    data: { title: 'Todo' }
  },
  */
  { path: '**', component: TallyListComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TallyListComponent,
    TallyComponent, 
    AddEditTallyComponent, SettingsComponent, AddExampleComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
