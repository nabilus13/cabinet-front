import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormComponentComponent } from './dialog-form-component.component';

describe('DialogFormComponentComponent', () => {
  let component: DialogFormComponentComponent;
  let fixture: ComponentFixture<DialogFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
