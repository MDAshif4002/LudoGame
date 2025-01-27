import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeAndLadderComponent } from './snake-and-ladder.component';

describe('SnakeAndLadderComponent', () => {
  let component: SnakeAndLadderComponent;
  let fixture: ComponentFixture<SnakeAndLadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeAndLadderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeAndLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
