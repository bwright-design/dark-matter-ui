import {Component, ContentChild, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-card',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ContentChild('header') header!: TemplateRef<any>
  @ContentChild('body') body!: TemplateRef<any>


}
