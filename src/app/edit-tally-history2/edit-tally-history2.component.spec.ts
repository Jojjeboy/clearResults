import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTallyHistory2Component } from './edit-tally-history2.component';

describe('EditTallyHistory2Component', () => {
  let component: EditTallyHistory2Component;
  let fixture: ComponentFixture<EditTallyHistory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTallyHistory2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTallyHistory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
