import { Component, OnInit } from '@angular/core';
import { faChevronDown, faCoffee, faDog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  faDog = faDog;
  chevronDown = faChevronDown;
  opcionSeleccionada = false;
  cboActivo = false;

  constructor() { }

  toggleButton(){
    this.opcionSeleccionada = !this.opcionSeleccionada;
  }

  toggleCboActivo(){
    this.cboActivo = !this.cboActivo;
  }

  ngOnInit(): void {
  }

  activarCbo(){
    this.toggleButton();
    this.toggleCboActivo();
  }

}
