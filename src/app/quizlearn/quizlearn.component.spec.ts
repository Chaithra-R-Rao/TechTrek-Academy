import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLearnComponent } from './quizlearn.component';

describe('QuizlearnComponent', () => {
  let component: QuizLearnComponent;
  let fixture: ComponentFixture<QuizLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizLearnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
