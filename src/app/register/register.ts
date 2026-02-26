import { DatePipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Existing Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

// NEW Material Imports for your 3 chosen components
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';

// --- 1. NEW: The Bottom Sheet Component ---
@Component({
  selector: 'help-sheet',
  standalone: true,
  template: `
    <div style="padding: 24px; font-family: Roboto, sans-serif; background-color: #1a1e29; color: #e0e0e0;">
      <h3 style="margin-top: 0; color: #b39ddb;">Registration Help</h3>
      <p>Here is some assistance for your form:</p>
      <ul style="line-height: 1.8;">
        <li>Ensure your password meets the 8-character security requirement.</li>
        <li>Select your development interests using the interactive chips.</li>
        <li>Double-check your web application details before submitting.</li>
      </ul>
    </div>
  `
})
export class HelpSheet {}

// --- 2. Main Register Component ---
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatSliderModule, MatRadioModule, MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule, FormsModule,
    // Add the new modules to the imports array
    MatBottomSheetModule, MatChipsModule, MatRippleModule
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

  // NEW: Store selected chips
  selectedInterests: string[] = [];

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5),
    // NEW: Form control for the chips
    interests: new FormControl([])
  });

  // NEW: Inject the MatBottomSheet service
  constructor(private bottomSheet: MatBottomSheet) {}

  // NEW: Method to open the help sheet
  openHelpSheet() {
    this.bottomSheet.open(HelpSheet);
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

    // NEW: Capture chip data
    this.selectedInterests = data.interests || [];

    if (this.formdata.valid) {
      console.log("Form Submitted!", this.formdata.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
