import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicludoComponent } from './classicludo.component';

describe('ClassicludoComponent', () => {
  let component: ClassicludoComponent;
  let fixture: ComponentFixture<ClassicludoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicludoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicludoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
