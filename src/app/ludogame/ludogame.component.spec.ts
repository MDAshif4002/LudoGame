import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudogameComponent } from './ludogame.component';

describe('LudogameComponent', () => {
  let component: LudogameComponent;
  let fixture: ComponentFixture<LudogameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LudogameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LudogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
