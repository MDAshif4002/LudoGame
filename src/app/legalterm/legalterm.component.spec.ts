import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegaltermComponent } from './legalterm.component';

describe('LegaltermComponent', () => {
  let component: LegaltermComponent;
  let fixture: ComponentFixture<LegaltermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegaltermComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegaltermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
