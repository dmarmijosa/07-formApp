import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorsService } from '@validators/email-validators.service';
import { emailPattern } from '@validators/validators';
import { ValidatorsService } from '@validatorsServices/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);
  private emailValidator = inject(EmailValidatorsService);

  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(emailPattern)],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.isFieldOneEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSumit() {
    this.myForm.markAllAsTouched();
  }
}
