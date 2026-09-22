import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaIdeiaComponent } from './lista-ideia.component';

describe('ListaIdeiaComponent', () => {
  let component: ListaIdeiaComponent;
  let fixture: ComponentFixture<ListaIdeiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaIdeiaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaIdeiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
