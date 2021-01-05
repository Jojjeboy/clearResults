import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTallyComponent } from './add-edit-tally.component';

describe('AddEditTallyComponent', () => {
  let component: AddEditTallyComponent;
  let fixture: ComponentFixture<AddEditTallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
