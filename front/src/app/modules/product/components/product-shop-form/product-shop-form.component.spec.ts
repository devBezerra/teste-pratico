import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopFormComponent } from './product-shop-form.component';

describe('ProductShopFormComponent', () => {
  let component: ProductShopFormComponent;
  let fixture: ComponentFixture<ProductShopFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductShopFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
