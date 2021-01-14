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
import { AddExampleComponent } from './add-example/add-example.component';
import { EditTallyHistoryComponent } from './edit-tally-history/edit-tally-history.component';
import { ModalComponent } from './modal/modal.component';
import { HistorySummaryComponent } from './history-summary/history-summary.component';

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
  {
    path: 'add',
    component: AddEditTallyComponent,
    data: { title: 'Add Tally' }
  },
  {
    path: 'edit/:id',
    component: AddEditTallyComponent,
    data: { title: 'Edit Tally' }
  },
  {
    path: 'history/edit/:id',
    component: EditTallyHistoryComponent,
    data: { title: 'Edit tally history' }
  },

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
    AddEditTallyComponent,
    AddExampleComponent,
    EditTallyHistoryComponent,
    ModalComponent,
    HistorySummaryComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
