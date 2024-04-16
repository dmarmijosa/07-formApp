import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 100,
  inStorage: 2,
};

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    //this.myForm.reset(rtx5090);
  }
  isValidField(field: 'name' | 'price' | 'inStorage') {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  getFielError(field: 'name' | 'price' | 'inStorage'): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': {
          return 'El campo es requerido';
        }
        case 'minlength': {
          return `Este campo requiere mínimo ${errors['minlength'].requiredLength} letras`;
        }
      }
    }
    return null;
  }

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
