import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchitemssComponent } from './serchitemss.component';

describe('SerchitemssComponent', () => {
  let component: SerchitemssComponent;
  let fixture: ComponentFixture<SerchitemssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerchitemssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchitemssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
