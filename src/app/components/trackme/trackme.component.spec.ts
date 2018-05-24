import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackmeComponent } from './trackme.component';

describe('TrackmeComponent', () => {
  let component: TrackmeComponent;
  let fixture: ComponentFixture<TrackmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
