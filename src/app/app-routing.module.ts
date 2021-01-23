/* Modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/modules/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

/* Components */
import { DetailComponent } from './tally/components/detail/detail.component';
import { ListComponent } from './tally/components/list/list.component';
import { AddExampleComponent } from './add-example/add-example.component';
import { EditTallyHistoryComponent } from './history/components/edit-tally-history/edit-tally-history.component';
import { HistorySummaryComponent } from './shared/components/history-summary/history-summary.component';
import { UpsertTallyComponent } from './tally/components/upsert/upsert-tally.component';;

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { title: 'Start Page' }
  },
  {
    path: 'tally/:id',
    component: DetailComponent,
    data: { title: 'Tally details component' }
  },
  {
    path: 'example',
    component: AddExampleComponent,
    data: { title: 'Add example' }
  },
  {
    path: 'add',
    component: UpsertTallyComponent,
    data: { title: 'Add Tally' }
  },
  {
    path: 'edit/:id',
    component: UpsertTallyComponent,
    data: { title: 'Edit Tally' }
  },
  {
    path: 'history/edit/:id',
    component: EditTallyHistoryComponent,
    data: { title: 'Edit tally history' }
  },

  { path: '**', component: ListComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    AddExampleComponent,
    EditTallyHistoryComponent,
    HistorySummaryComponent,
    UpsertTallyComponent
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
