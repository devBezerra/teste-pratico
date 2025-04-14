import { AbstractControl } from "@angular/forms";

export function ValidateRequired(control: AbstractControl): any {
  if (!control.value) {
    return {
      validate: false,
      message: '* Campo obrigatório',
    };
  }

  return null;
}
