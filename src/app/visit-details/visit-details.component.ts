import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isNull} from 'util';
import {VisitService} from '../visit/visit.service';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';

import {ICarouselConfig, AnimationConfig} from 'angular4-carousel';
import {ItemVisitModel} from "./item-visit.model";

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [VisitService]
})
export class VisitDetailsComponent implements OnInit {
  lineVisits = [];
  visitSelected: VisitModel;
  noReviews: boolean = false;
  public imageSources: string[] = [];
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private visitService: VisitService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let nameVisit: any = params['name'];
      this.visitSelected = new VisitModel(null, '', [new ImageModel(null, '', '')], null, 0, 0, 'adresse', 'country', 'region', 'city', null, '', 0, 0, '');
      this.noReviews = true;

      if (!isNull(nameVisit)) {
        this.visitService.getVisit(nameVisit)
          .then(visit => {
            let visitTmp = visit["hydra:member"][0];
            let arrayImages: ImageModel[] = new Array();
            let arrayReviews: ReviewsModel[] = new Array();
            let i: number = 0;

            let images = visitTmp["images"];

            for (i = 0; i < images.length; i++) {

              arrayImages.push(new ImageModel(images[i].id, images[i].url, images[i].description));
              this.imageSources.push('./assets/img/' + images[i].url);

              console.log('./assets/img/' + images[i].url);
            }

            console.log(this.imageSources);
            let reviews = visitTmp["reviews"];

            for (i = 0; i < reviews.length; i++) {
              arrayReviews.push(new ReviewsModel(reviews[i].id, reviews[i].note, reviews[i].title, reviews[i].text, reviews[i].date, reviews[i].user));
            }

            this.noReviews = false;

            this.visitSelected = new VisitModel(visitTmp["id"], visitTmp["name"],
              arrayImages,
              arrayReviews,
              visitTmp["latitude"], visitTmp["longitude"], visitTmp["address"],
              visitTmp["country"], visitTmp["region"], visitTmp["city"],
              visitTmp["postalCode"], visitTmp["description"], visitTmp["note"],
              visitTmp["nbNotes"], visitTmp["site"]);
          });
      } else {

      }
    });

    $('.open-modal').click(this.toggleModalClasses);
    $('.close-modal').click(this.toggleModalClasses);

    $('tr').on('click', function () {
      $('tr').removeClass('selected');
      $(this).addClass('selected');

    });

    this.afficherPanier();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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
  }

  stockerEnSession(visit: ItemVisitModel) {
    let retrievedObject = null;

    if (localStorage.getItem('visits') != null) {
      retrievedObject = JSON.parse(localStorage.getItem('visits'));
    }

    // Sauvegarder les informations dans l'espace local courant

    if (retrievedObject != null) {
      let isExist = false;

      retrievedObject.forEach(function (element) {
        if (element.name == visit.name) {
          isExist = true;
        }
      });

      if (isExist == false) {
        retrievedObject.push(visit);
      }
    } else {
      retrievedObject = [visit];
    }

    localStorage.setItem("visits", JSON.stringify(retrievedObject));
  }

  ajouterPanier() {
    let visit = new ItemVisitModel(this.visitSelected["name"], null);

    this.stockerEnSession(visit);

    this.afficherPanier();
  }

  ajouterPanierGuide() {
    let trSelected = document.getElementsByClassName("selected")[0];
    let guideBalise = trSelected.getElementsByClassName("guide")[0];

    let guide = null;

    if(guideBalise != undefined) {
      guide = guideBalise.textContent;
    }

    let visit = new ItemVisitModel(this.visitSelected["name"], guide);

    this.stockerEnSession(visit);

    this.afficherPanier();
  }

  afficherPanier() {

    $(".panier_item").remove();

    let retrievedObject = null;

    if (localStorage.getItem('visits') != undefined) {
      retrievedObject = JSON.parse(localStorage.getItem('visits'));

      retrievedObject.forEach(function (element, index) {
        let div = document.createElement("div");
        div.className = "panier_item";

        let span = document.createElement("span");
        span.className = "panier_supprimer";

        let i = document.createElement("i");
        i.className = "fa fa-window-close";
        i.setAttribute("_ngcontent-c2", "");
        i.addEventListener("click", function(){
          retrievedObject.splice(index, 1);

          localStorage.setItem("visits", JSON.stringify(retrievedObject));

          this.afficherPanier();
        }.bind(this));
        span.appendChild(i);

        let h4 = document.createElement("h4");
        h4.setAttribute("_ngcontent-c2", "");
        let titre = document.createTextNode(element.name);
        h4.appendChild(titre);

        let p = document.createElement("p");
        p.setAttribute("_ngcontent-c2", "");
        p.className = "content";

        let contenu;

        if(element.guide != null){
          console.log(element.guide);
          contenu = document.createTextNode(element.guide);
        } else {
          contenu = document.createTextNode("Visite non guidée (Envie d'un guide ?)");
        }

        p.appendChild(contenu);

        div.appendChild(span);
        div.appendChild(h4);
        div.appendChild(p)

        let hr = document.createElement("hr");
        hr.setAttribute("_ngcontent-c2", "");

        let panier = document.getElementById("mon_panier");
        panier.appendChild(div);
        div.appendChild(hr);
      }, this);
    }
  }
}
