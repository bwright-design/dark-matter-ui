import {Component, inject} from '@angular/core';
import {ShipmodelComponent} from "./shipmodel/shipmodel.component";
import {CardComponent} from "../../components/card/card.component";
import {ShipService} from "../../services/ship.service";

@Component({
  selector: 'app-ship',
  imports: [ShipmodelComponent, CardComponent],
  templateUrl: './ship.component.html',
  standalone: true,
  styleUrl: './ship.component.scss'
})
export class ShipComponent {

  private shipService = inject(ShipService);

  getPlayerShip(){
    this.shipService.getShips().subscribe( data => {
      console.log(data);
    })

  }

}
