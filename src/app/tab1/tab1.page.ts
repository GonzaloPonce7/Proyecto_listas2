import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AlertController, ToastController } from '@ionic/angular';
import { ListasService } from '../services/listas.service';
import { CommonModule } from '@angular/common';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class Tab1Page {
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListasService
  ) {}

  /**
   * @function AgregarLista
   * @description La función será ejecutada cuando el usuario haga click en el botón Agregar
   * Muestra una alerta donde solicita el nombre de la lista
   */

  async AgregarLista() {
    let alerta = await this.alertController.create({
      header: 'Agregar lista',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Ingresar nombre de la lista',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data: any) => {
            let esValido: boolean = this.listaService.validarInput(data);
            if (esValido) {
              let creadaOk = this.listaService.crearLista(data.titulo);

              if (creadaOk) {
                //Se verifica si la variable tiene un valor, es decir, que fue creada
                this.listaService.presentToast('Lista creada correctamente!');
              }
            }
          },
        },
      ],
    });
    await alerta.present();
    console.log('Hola Mundo!');
  }


  
}
