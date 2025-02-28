import { Component } from '@angular/core';
import {ShipmodelComponent} from "./shipmodel/shipmodel.component";
import {CardComponent} from "../../components/card/card.component";

@Component({
  selector: 'app-ship',
  imports: [ShipmodelComponent, CardComponent],
  templateUrl: './ship.component.html',
  standalone: true,
  styleUrl: './ship.component.scss'
})
export class ShipComponent {

}
