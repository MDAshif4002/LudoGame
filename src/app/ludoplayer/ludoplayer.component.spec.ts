import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudoplayerComponent } from './ludoplayer.component';

describe('LudoplayerComponent', () => {
  let component: LudoplayerComponent;
  let fixture: ComponentFixture<LudoplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LudoplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LudoplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
