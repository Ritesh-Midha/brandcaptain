import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcardComponent } from './addnewcard.component';

describe('AddnewcardComponent', () => {
  let component: AddnewcardComponent;
  let fixture: ComponentFixture<AddnewcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
