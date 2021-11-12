import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorystoreComponent } from './historystore.component';

describe('HistorystoreComponent', () => {
  let component: HistorystoreComponent;
  let fixture: ComponentFixture<HistorystoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorystoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
