import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipositmoneyComponent } from './dipositmoney.component';

describe('DipositmoneyComponent', () => {
  let component: DipositmoneyComponent;
  let fixture: ComponentFixture<DipositmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DipositmoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DipositmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
