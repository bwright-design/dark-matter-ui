import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkNetComponent } from './dark-net.component';

describe('DarkNetComponent', () => {
  let component: DarkNetComponent;
  let fixture: ComponentFixture<DarkNetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkNetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
