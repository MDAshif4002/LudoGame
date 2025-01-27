import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicludodetailComponent } from './classicludodetail.component';

describe('ClassicludodetailComponent', () => {
  let component: ClassicludodetailComponent;
  let fixture: ComponentFixture<ClassicludodetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicludodetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicludodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
