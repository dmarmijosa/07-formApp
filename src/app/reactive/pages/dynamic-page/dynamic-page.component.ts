import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  // myForm2 = new FormGroup({
  //   favoritesGame: new FormArray([]),
  // });

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', [Validators.required, Validators.minLength(3)]],
      ['Death Stranding', [Validators.required]],
    ]),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
