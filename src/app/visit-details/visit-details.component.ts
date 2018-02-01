import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isNull} from 'util';
import {VisitService} from '../visit/visit.service';
import {VisitModel} from '../visit/visit.model';
import {ImageModel} from '../image/image.model';
import {ReviewsModel} from '../reviews/reviews.model';

import {ICarouselConfig, AnimationConfig} from 'angular4-carousel';
import {ItemVisitModel} from "./item-visit.model";
import {GuideVisitService} from "./guide-visit.service";
import {VisitGuideModel} from "../profil/profil.model";
import {GuideModel} from "../guide/guide.model";

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [VisitService, GuideVisitService]
})
export class VisitDetailsComponent implements OnInit {
  lineVisits = [];
  visitSelected: VisitModel;
  noReviews: boolean = false;
  public imageSources: string[] = [];
  private sub: any;
  itemsVisitGuide: VisitGuideModel[] = new Array();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private visitService: VisitService,
              private guidevisit: GuideVisitService) {
  }

  private getVisitDetails(nameVisit: string) {
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
        }

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

        this.guidevisit.getGuidesByVisit(visitTmp["id"])
          .then(guideVisit => {

            let visitGuides = guideVisit["hydra:member"];

            for (i = 0; i < visitGuides.length; i++) {
              let guide = visitGuides[i].guide;
              let image: ImageModel;

              if (guide.user.image) {
                image = new ImageModel(guide.user.image.id, guide.user.image.url, guide.user.image.description);
              } else {
                if (guide.user.gender == 'male') {
                  image = new ImageModel(null, "boy.png", "boy");
                } else {
                  image = new ImageModel(null, "girl.png", "girl");
                }
              }

              guide.user.image = image;
              this.itemsVisitGuide.push(new VisitGuideModel(visitGuides[i].id, null, guide, visitGuides[i].date, visitGuides[i].duration, visitGuides[i].price, true));
            }
          });
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let nameVisit: any = params['name'];
      this.visitSelected = new VisitModel(null, '', [new ImageModel(null, '', '')], null, 0, 0, 'addresse', 'country', 'region', 'city', null, '', 0, 0, '');
      this.noReviews = true;

      if (!isNull(nameVisit)) {
        this.getVisitDetails(nameVisit);
      }
    });

    $('.open-modal').click(this.toggleModalClasses);
    $('.close-modal').click(this.toggleModalClasses);

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

    if (guideBalise != undefined) {
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
        i.addEventListener("click", function () {
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

        if (element.guide != null) {
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
