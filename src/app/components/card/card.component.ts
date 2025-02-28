import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {NgClass, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-card',
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ContentChild('header') header!: TemplateRef<any>
  @ContentChild('body') body!: TemplateRef<any>

  @Input() fillMode?: string = ''
  @Input() title?: string = ''


}
