import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcategoriaComponent } from './vcategoria.component';

describe('VcategoriaComponent', () => {
  let component: VcategoriaComponent;
  let fixture: ComponentFixture<VcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
