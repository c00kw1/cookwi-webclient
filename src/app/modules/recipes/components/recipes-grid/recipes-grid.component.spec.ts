import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesGridComponent } from './recipes-grid.component';

describe('ListReceipesComponent', () => {
  let component: RecipesGridComponent;
  let fixture: ComponentFixture<RecipesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
