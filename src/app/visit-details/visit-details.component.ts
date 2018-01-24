import { Component, OnInit } from '@angular/core';
import {VisitDetailsModel} from "./visit-details.model";
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

declare var $: any;
declare var jquery:any;

const VISITSDETAILS: VisitDetailsModel =
  { id: 1, name: 'Arc de Triomphe', address: '1 rue mock', city: 'Paris', postalCode: 93000, description: "L’arc de triomphe de l’Étoile souvent appelé simplement l'Arc de Triomphe, dont la construction, décidée par l'empereur Napoléon Ier, débuta en 1806 et s'acheva en 1836 sous Louis-Philippe, est situé à Paris, dans le 8e arrondissement. Il s'élève au centre de la place Charles-de-Gaulle (anciennement place de l’Étoile), dans l'axe et à l’extrémité ouest de l’avenue des Champs-Élysées, à 2,2 kilomètres de la place de la Concorde"};

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css', "../../../node_modules/font-awesome/css/font-awesome.css"]
})
export class VisitDetailsComponent implements OnInit {
  visitDetails = VISITSDETAILS;

  public imageSources: string[] = [
    './assets/img/visit/Tour Eiffel.jpg',
    '../assets/img/visit/Tour Eiffel.jpg',
    './assets/img/visit/Tour Eiffel.jpg',
    './assets/img/visit/Arc de Triomphe.jpg'

  ];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 4000,
    stopAutoplayMinWidth: 768
  };

  /* afficher pop-up*/
  toggleModalClasses(event) {
    let modalId = event.currentTarget.dataset.modalId;
    let modal = $(modalId);
    modal.toggleClass('is-active');
    $('html').toggleClass('is-clipped');
  };



  constructor() {
  }

  ngOnInit() {
    $('.open-modal').click(this.toggleModalClasses);
    $('.close-modal').click(this.toggleModalClasses);

    $('tr').on('click', function(){
      $('tr').removeClass('selected');
      $(this).addClass('selected');
    });
  }


}
