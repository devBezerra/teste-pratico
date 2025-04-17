import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'tp-header',
  imports: [ButtonModule, RouterModule, TooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor() { }

  text = input<string>("");
  createUrl = input<string>("");
  returnUrl = input<string>("")
  redirectUrl = input<string>("");
  save = input<(() => void) | undefined>(() => undefined);
  saveDisable = input<boolean>(false);
  delete = input<(() => void) | undefined>(() => undefined);

  public redirects: { [key: string]: { route: string, label: string } } = {
    "products": { route: "produtos", label: "Produtos" },
    "shops": { route: "lojas", label: "Lojas" }
  }

  execSave(): void {
    if (this.save()) {
      this.save()?.();
    }
  }

  get hasSave(): boolean {
    const fn = this.save();
    return fn !== undefined && fn.toString() !== '() => void 0';
  }

  execDelete(): void {
    if (this.delete()) {
      this.delete()?.();
    }
  }

  get hasDelete(): boolean {
    const fn = this.delete();
    return fn !== undefined && fn.toString() !== '() => void 0';
  }
}
