import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawscreenshotComponent } from './withdrawscreenshot.component';

describe('WithdrawscreenshotComponent', () => {
  let component: WithdrawscreenshotComponent;
  let fixture: ComponentFixture<WithdrawscreenshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawscreenshotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawscreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
