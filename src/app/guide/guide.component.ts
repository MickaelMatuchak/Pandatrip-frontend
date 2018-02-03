import { Component, OnInit } from '@angular/core';
import { GuideModel } from './guide.model';
import { GuideService } from './guide.service';
import { ReviewsModel } from '../reviews/reviews.model';
import { VisitGuideModel, UserModel } from '../profil/profil.model';
import { ImageModel } from '../image/image.model';
import { AppService } from '../app.service';

@Component({
  selector: 'guides',
  templateUrl: 'guide.component.html',
  styleUrls: ['guide.component.css', '../../../node_modules/bulma/css/bulma.css', '../reviews/star-rating.scss'],
  providers: [ GuideService, AppService ]
})

export class GuideComponent implements OnInit {

  constructor(
    private guideService: GuideService,
    private appService: AppService ) {}

  guides: GuideModel[];

  detail() { // Name to Change
    this.guideService.getNumbersGuides(3)
      .then(data => {
        let guides = data["hydra:member"];
        for (var i = 0; i < guides.length; i++) {
          let guide = guides[i];
          let arrayReviews: ReviewsModel[] = new Array();
          for (var j = 0; j < guide.reviews.length; j++) {

          }

          let arrayVisits: VisitGuideModel[] = new Array();
          for (var j = 0; j < guide.listVisits.length; j++) {
            // To Complete
          }

          this.guides.push( new GuideModel(guide.id, guide.billfold,
            arrayReviews, guide.user, guide.address, guide.country,
            guide.region, guide.city, guide.postalCode, guide.phoneNumber,
            arrayVisits) );
        }
        console.info(data);
      });
  }

  ngOnInit() {
    this.guides = [];
    let nbGuideAccueil = 3;
    for (var i = 0; i < nbGuideAccueil; i++) {
      let user = new UserModel(null, "", "", "", "", "",
        new ImageModel(null, "", ""));

      this.guides.push( new GuideModel(null, null,
      null, user, "", "", "", "", null, "", null) );
    }

    this.guideService.getNumbersGuides(nbGuideAccueil)
      .then(data => {
        this.guides = [];
        let guidesSelect = data["hydra:member"];
        let guide;
        let nbNotes;

        for (var i = 0; i < guidesSelect.length; i++) {
          guide = guidesSelect[i];
          let arrayReviews: ReviewsModel[] = new Array();

          // compter reviews
          for (var j = 0; j < guide.reviews.length; j++) {
            arrayReviews.push(new ReviewsModel(guide.reviews[j].id, guide.reviews[j].note, null, null, null, null));
          }
          nbNotes = guide.reviews.length;
          //console.log(nbNotes);

          let userRecup : UserModel = guide.user;

          let image = this.appService.initialiseUserImage(userRecup);

          let user = new UserModel(userRecup.id, userRecup.username,
            userRecup.gender, userRecup.firstname, userRecup.lastname, "",
            image);

          //console.log(user);

          this.guides.push( new GuideModel(guide.id, null,
            arrayReviews, user, "", "", "", "", null, "", null) );
          //console.info(guide.user);
          //console.info(this.guides[i]);

          this.calculMoyenne();
        }
      });
  }

  calculMoyenne() {
    for (let i = 0; i < this.guides.length; i++) {
      let somme = 0;

      if (this.guides[i].reviews.length != 0) {
        this.guides[i].reviews.forEach(function(element){
          somme += element.note;
        });

        somme /= this.guides[i].reviews.length;
      } else {
        somme = 2.5;
      }

      this.guides[i].note = somme;
    }
  }
}
