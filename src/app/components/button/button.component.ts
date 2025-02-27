import {Component, Input, Signal, signal} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  //@Input() text: Signal<string> = signal('Text');


}
