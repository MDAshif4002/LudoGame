import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeladderdetailComponent } from './snakeladderdetail.component';

describe('SnakeladderdetailComponent', () => {
  let component: SnakeladderdetailComponent;
  let fixture: ComponentFixture<SnakeladderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeladderdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeladderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
