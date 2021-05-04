import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvenditeComponent } from './svendite.component';

describe('SvenditeComponent', () => {
  let component: SvenditeComponent;
  let fixture: ComponentFixture<SvenditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvenditeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvenditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
