import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifynumberComponent } from './verifynumber.component';

describe('VerifynumberComponent', () => {
  let component: VerifynumberComponent;
  let fixture: ComponentFixture<VerifynumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifynumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifynumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
