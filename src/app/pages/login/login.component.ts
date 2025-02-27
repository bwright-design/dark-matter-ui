import { Component } from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {InputComponent} from "../../components/input/input.component";
import {ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: 'app-login',
  imports: [
    CardComponent,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
