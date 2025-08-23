import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasCarrusel } from './noticias-carrusel';

describe('NoticiasCarrusel', () => {
  let component: NoticiasCarrusel;
  let fixture: ComponentFixture<NoticiasCarrusel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasCarrusel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasCarrusel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
