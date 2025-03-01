import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmodelComponent } from './shipmodel.component';

describe('ShipmodelComponent', () => {
  let component: ShipmodelComponent;
  let fixture: ComponentFixture<ShipmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmodelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
