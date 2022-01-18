import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocserchdetComponent } from './docserchdet.component';

describe('DocserchdetComponent', () => {
  let component: DocserchdetComponent;
  let fixture: ComponentFixture<DocserchdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocserchdetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocserchdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
