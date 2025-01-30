import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularcourseComponent } from './popularcourse.component';

describe('PopularcourseComponent', () => {
  let component: PopularcourseComponent;
  let fixture: ComponentFixture<PopularcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularcourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
