import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Register],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'angular_mat';
}
