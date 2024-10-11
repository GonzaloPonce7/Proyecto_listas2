import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { AlertController, ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class ListasService {
  public listas: Lista[] = []; //almacena las listas de actividades.
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListasService
  ) {
    this.cargarStorage();
    this.listas[0];
    
  }

  crearLista(nombreLista: string) {
    let ObjetoLista = new Lista(nombreLista);
    // //creamos una variable de tipo array
    // id: 0,
    // titulo: nombreLista,
    // creadaEn: new Date(),
    // terminadaEn: null,
    // completada: false,
    // item: [], //Para guardar la lista de actividades

    this.listas.push(ObjetoLista); //ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();

    return ObjetoLista.titulo;
  }

  // EditarLista(lista: Lista) {
  //   let listaEditar = this.listas.find(
  //     (listaItem) => listaItem.id == lista.id
  //   ); //Guardamos todas las listas menos la lista a eliminar //find devuelve el primer valor que encuentra
  //   if (listaEditar) {
  //     listaEditar.titulo = lista.titulo;
  //   }
  //   this.guardarStorage();
  // }

  EliminarLista(lista: Lista) {
    let nuevoListado = this.listas.filter(
      (listaItem) => listaItem.id !== lista.id
    ); //Guardamos todas las listas menos la lista a eliminar //filter devuelve un arreglo de listas
    this.listas = nuevoListado;
    this.guardarStorage();
  }

  validarInput(input: any): boolean {
    if (input && input.titulo) {
      return true;
    }
    this.listaService.presentToast('Debe ingresar un valor');
    return false;
  }

  async presentToast(mensage: string) {
    let toast = await this.toastController.create({
      message: mensage,
      duration: 2000,
    });
    toast.present();
  }

  async EditarLista(lista: Lista) {
    let alerta = await this.listaService.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          type: 'text',
          name: 'titulo',
          placeholder: 'Ingresar nuevo nombre de la lista',
          value: lista.titulo,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Editar',
          handler: (data: any) => {
            let esValido: boolean = this.listaService.validarInput(data);
            if (esValido) {
              (lista.titulo = data.titulo),
                this.listaService.editarLista(lista);
              this.listaService.presentToast('Lista editada correctamente!');
            }
          },
        },
      ],
    });
    await alerta.present();
  }

  editarLista(listaItem: Lista) {
    this.EditarLista(listaItem);
  }
  
  eliminarLista(listaItem: Lista) {
    this.listaService.eliminarLista(listaItem);
    console.log('Eliminar lista:', listaItem);
  }

  obtenerLista(idLista: string | number) {
    const id = Number(idLista); //Parseamos el dato a Number, por si viene de tipo string, de esta manera siempre trabajaremos con un Number
    let lista = this.listas.find((itemLista)=> itemLista.id == id);
    return lista;
  }

  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas); //Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el se-gundo el contenido
  }

  cargarStorage() {
    const listaStorage = localStorage.getItem('listas'); //Se debe ingresar el parámetro con el nombre del objeto que queremos recuperar
    if (listaStorage === null) {
      return (this.listas = []); //Si el Storage está vacío devolvemos el objeto listas vacío también
    } else {
      let objLista = JSON.parse(listaStorage); //Convierte el texto plano a objeto para poder ingresarlo
      return (this.listas = objLista);
    }
  }
}
