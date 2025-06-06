import { Component, OnInit } from '@angular/core';
import { Theater } from './models/theater.type';
import { TheaterService } from './services/theater.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.page.html',
  styleUrls: ['./theater.page.scss'],
  standalone: false
})
export class TheaterPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  theaterList: Theater[] = []

  constructor(private theaterService: TheaterService, private alertController: AlertController, private toastController: ToastController,) { }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
    this.theaterService.getList().subscribe({
      next: (response) => {
        this.theaterList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de teatros');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  remove(theater: Theater) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão do teatro ${theater.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.theaterService.remove(theater).subscribe({
              next: (response) => {
                this.theaterList = this.theaterList.filter(g => g.id !== response.id);
                this.toastController.create({
                  message: `Teatro ${theater.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert('Erro ao excluir o teatro ' + theater.name);
                console.error(error);
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }

}
