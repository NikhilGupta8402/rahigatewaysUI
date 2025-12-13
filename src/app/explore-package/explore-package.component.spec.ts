import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePackageComponent } from './explore-package.component';

describe('ExplorePackageComponent', () => {
  let component: ExplorePackageComponent;
  let fixture: ComponentFixture<ExplorePackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorePackageComponent]
    });
    fixture = TestBed.createComponent(ExplorePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
