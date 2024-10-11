import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {
  @Input() tipo:string ='';

  constructor(
    public listaService: ListasService,
    private router: Router
  ) { }

  listaSeleccionada(listaItem: Lista){
    const URL = '/agregar/' + listaItem.id 
    this.router.navigateByUrl(URL);
  }

  ngOnInit() {}

}
