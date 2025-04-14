import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateRequired } from '../../../../shared/validators/required.validator';
import { ShopService } from '../../shop.service';
import { ShopInterface } from '../../interfaces/shop.interface';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'tp-shop-form',
  imports: [DialogModule, ButtonModule, FormsModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './shop-form.component.html',
  styleUrl: './shop-form.component.scss'
})
export class ShopFormComponent {
  visible = input<boolean>(false);
  closed = output<'created' | 'updated' | 'none'>();

  id = input<number | null>(null);

  private result: 'created' | 'updated' | 'none' = 'none';

  form!: FormGroup;
  shop!: ShopInterface;

  private readonly shopService = inject(ShopService);

  constructor() {
    this.initForm();
    effect(() => {
      const shopId = this.id();
      if (!!shopId) {
        this.verifyId();
      }
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      description: new FormControl(null, [ValidateRequired])
    })
  }

  verifyId(): void {
    const id = this.id();
    if (!!id) {
      void this.shopService
        .getShop(id)
        .subscribe((shop: ShopInterface) => {
          this.shop = shop;
          this.form.patchValue(this.shop);
        });
    };
  }

  handleSaveOrUpdate(): void {
    const id = this.id();
    if (!!id) {
      this.shopService
        .updateShop({ ...this.form.value, id }, id)
        .subscribe(() => {
          this.result = 'updated';
          this.close()
        });
    } else {
      this.shopService.createShop(this.form.value)
        .subscribe(() => {
          this.result = 'created';
          this.close()
        });
    }
  }

  close(): void {
    this.form.reset();
    this.closed.emit(this.result);
    this.result = 'none';
  }
}
