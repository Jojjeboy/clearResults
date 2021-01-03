import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalliesComponent } from './tallies.component';

describe('TalliesComponent', () => {
  let component: TalliesComponent;
  let fixture: ComponentFixture<TalliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
