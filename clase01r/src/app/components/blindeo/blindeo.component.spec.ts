import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlindeoComponent } from './blindeo.component';

describe('BlindeoComponent', () => {
  let component: BlindeoComponent;
  let fixture: ComponentFixture<BlindeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlindeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlindeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
