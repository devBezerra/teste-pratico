import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'tp-header',
  imports: [ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor() { }

  text = input<string>("");
  createUrl = input<string>("");
  returnUrl = input<string>("")
  redirectUrl = input<string>("");
  action = input<(() => void) | undefined>(() => undefined);
  actionDisable = input<boolean>(false);

  public redirects: { [key: string]: string } = {
    "products": "produtos",
    "shops": "lojas"
  }

  execAction(): void {
    if (this.action) {
      this.action();
    }
  }

  get hasAction(): boolean {
    const fn = this.action();
    return fn !== undefined && fn.toString() !== '() => void 0';
  }
}
