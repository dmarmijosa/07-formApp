import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotification: [true, [Validators.required]],
    termsAndConditions: [false, [Validators.requiredTrue]],
  });

  public person = {
    gender: 'F',
    wantNotification: false,
  };

  isValidField(field: string) {
    return this.myForm.controls[field].errors;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.person);
    console.log(this.myForm.value);
  }
}
