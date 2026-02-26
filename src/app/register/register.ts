import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Existing Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

// NEW Material Imports for chosen components & Dark Mode
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// --- The Bottom Sheet Component ---
@Component({
  selector: 'help-sheet',
  standalone: true,
  template: `
    <div style="padding: 24px; font-family: Roboto, sans-serif; background-color: #1a1e29; color: #e0e0e0;">
      <h3 style="margin-top: 0; color: #b39ddb;">Registration Help</h3>
      <p>Here is some assistance for your form:</p>
      <ul style="line-height: 1.8;">
        <li>Ensure your password meets the 8-character security requirement (starts with a letter, alphanumeric only).</li>
        <li>Select your development interests using the interactive chips.</li>
        <li>Double-check your web application details before submitting.</li>
      </ul>
    </div>
  `
})
export class HelpSheet {}

// --- Main Register Component ---
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatSliderModule, MatRadioModule, MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule, FormsModule,
    MatBottomSheetModule, MatChipsModule, MatRippleModule, MatSlideToggleModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;

  selectedInterests: string[] = [];

  // Maximum date allowed (Dec 31, 2006)
  maxDate = new Date(2006, 11, 31);

  // Track dark mode state
  isDarkMode = false;

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),

    // Password: Starts with a letter, followed by at least 7 alphanumeric characters
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{7,}$/)
    ]),

    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5),
    interests: new FormControl([])
  });

  constructor(private bottomSheet: MatBottomSheet) {}

  openHelpSheet() {
    this.bottomSheet.open(HelpSheet);
  }

  // Method to toggle the theme boolean
  toggleTheme(event: any) {
    this.isDarkMode = event.checked;
  }

  onClickSubmit(data: any) {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;

    this.selectedInterests = data.interests || [];

    if (this.formdata.valid) {
      console.log("Form Submitted!", this.formdata.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
