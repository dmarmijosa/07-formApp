import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  public newFavorite: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  getFielError(field: string): string | null {
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
  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }
  isValidField(field: string) {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  onDeleteFavorite($index: number) {
    this.favoriteGames.removeAt($index);
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) {
      this.newFavorite.markAsTouched;
      return;
    }
    const newGame = this.newFavorite.value;
    //this.favoriteGames.push(new FormControl(newGame, [Validators.required]));
    this.favoriteGames.push(this.fb.control(newGame, [Validators.required]));
    this.newFavorite.reset();
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
