import {Component, OnInit} from '@angular/core';
import {ProfilService} from './profil.service';
import {UserModel, ParcoursModel, VisitGuideModel, VisitUser} from './profil.model';
import {ImageModel} from '../image/image.model';
import {GuideModel} from '../guide/guide.model';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {VisitModel} from '../visit/visit.model';

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css', '../../../node_modules/bulma/css/bulma.css', '../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [ProfilService]
})

export class ProfilComponent implements OnInit {
  userLog: UserModel;
  userGuide: GuideModel;
  userParcours: ParcoursModel[];
  visitsUserWaiting: VisitUser[];
  visitsUserValidated: VisitUser[];
  visitsUserAsked: VisitUser[];
  parcoursSelected: ParcoursModel;
  isGuide: boolean;
  public show: boolean = false;
  public buttonName: any = 'Show';

  constructor(private profilService: ProfilService,
              private appService: AppService,
              private router: Router) {
      if (!this.appService.loggedIn()) {
        this.appService.logOut();
        this.router.navigate(['home']);
        alert('Vous n\'avez pas accés à cette page en étant déconnecté');
    }
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      this.buttonName = "Hide";
    }
    else {
      this.buttonName = "Show";
    }
  }

  /* fermer pop-up récapitulatif d'un parcours enregistré */
  closeModalRecap(event) {
    const modalId = event.currentTarget.dataset.modalId;
    const modal = $(modalId);
    modal.toggleClass('is-active');
    $('html').toggleClass('is-clipped');
    this.parcoursSelected = new ParcoursModel(null, [], '', '');
  }

  /* afficher pop-up récapitulatif d'un parcours enregistré */
  openModalRecap(event: any, parcours: ParcoursModel) {
    this.parcoursSelected = parcours;
    const modalId = event.currentTarget.dataset.modalId;
    const modal = $(modalId);
    modal.toggleClass('is-active');
    $('html').toggleClass('is-clipped');
  }

  ngOnInit() {
    $('.open-modal').click(this.openModalRecap);
    $('.close-modal').click(this.closeModalRecap);

    const tokenDecoded = this.appService.decodeToken();

    this.parcoursSelected = new ParcoursModel(null, [], '', '');

    this.isGuide = this.appService.initialiseIsGuide(tokenDecoded.roles);

    this.userLog = new UserModel(null,
      '', '', '', '', '', new ImageModel(null, '', ''));

    this.userGuide = new GuideModel(null, null, null, null, '',
      '', '', '', null, '', null);

    this.getUserLog(tokenDecoded.username);

    this.userParcours = [];
    this.getUserParcours(tokenDecoded.username);

    this.visitsUserWaiting = [];
    this.getVisitsUserWaiting(tokenDecoded.username);

    this.visitsUserValidated = [];
    this.getVisitsUserValidated(tokenDecoded.username);
  }

  private getVisitsUserWaiting(username: string) {
    this.profilService.getVisitsUserWaiting(username)
      .then(res => {
        const visitsUsers : VisitUser[] = res['hydra:member'];
        for( let i = 0; i < visitsUsers.length; i++) {
          const visitUser =  visitsUsers[i];
          let visitModel : VisitModel = visitUser.visit;
          let user : UserModel = new UserModel(visitUser.user.id, visitUser.user.username, visitUser.user.gender, visitUser.user.firstname, visitUser.user.lastname, visitUser.user.mail, visitUser.user.image)
          let visitGuideModel : VisitGuideModel = visitUser.visitGuide;
          let visitAdded = new VisitUser(visitUser.id, visitModel, user, visitGuideModel, visitUser.isValidated, null, visitUser.isConfirm );
          this.visitsUserWaiting.push( visitAdded );
        }
      })
  }

  private getVisitsUserValidated(username: string) {
    this.profilService.getVisitsUserValidated(username)
      .then(res => {
        const visitsUsers : VisitUser[] = res['hydra:member'];
        for( let i = 0; i < visitsUsers.length; i++) {
          const visitUser =  visitsUsers[i];
          let visitModel : VisitModel = visitUser.visit;
          let user : UserModel = visitUser.user;
          let visitGuideModel : VisitGuideModel = visitUser.visitGuide;
          let visitAdded = new VisitUser(visitUser.id, visitModel, user, visitGuideModel, visitUser.isValidated, null, visitUser.isConfirm );
          this.visitsUserValidated.push( visitAdded );
        }
      })
  }

  private getUserParcours(username: string) {
    this.profilService.getUserParcours(username)
      .then(data => {
        const parcours = data['hydra:member'];

        for (let i = 0; i < parcours.length; i++) {
          const parcoursI = parcours[i];

          const visitUser = [];

          for (let j = 0; j < parcoursI.visitUser.length; j++) {
            if (parcoursI.visitUser[j].visitGuide) {
              parcoursI.visitUser[j].visitGuide.guide.user.image =
                this.appService.initialiseUserImage(parcoursI.visitUser[j].visitGuide.guide.user);
            }
            visitUser.push( parcoursI.visitUser[j] );
          }

          const parcoursAdd = new ParcoursModel(parcoursI.id, visitUser, username, parcoursI.name);

          this.userParcours.push(parcoursAdd);
        }

      });
  }

  private getUserLog(username: string) {
    if (this.isGuide) {
      this.profilService.getGuide(username).then(data => {
        const guide = data['hydra:member'][0];

        const arrayListVisits: VisitGuideModel[] = new Array();

        // let arrayReviews:ReviewsModel[] = new Array();
        // let reviews = recupUser.guide.reviews;
        // for (var i = 0; i < reviews.length; i++) {
        //   let review :ReviewsModel = reviews[i];
        //   console.info("review i " + i);
        //   console.info(review);
        // }

        const image: ImageModel = this.appService.initialiseUserImage(guide.user);

        this.userLog = new UserModel(guide.user.id,
          guide.user.username, guide.user.gender, guide.user.firstname,
          guide.user.lastname, guide.user.mail, image);

        this.userGuide = new GuideModel(guide.id, guide.billfold, guide.reviews, this.userLog, guide.address,
          guide.country, guide.region, guide.city, guide.postalCode, guide.phoneNumber, arrayListVisits);

        localStorage.setItem('idUser', guide.user['@id']);
      });

    } else {
      this.profilService.getUser(username)
        .then(data => {
          const user = data['hydra:member'][0];

          const image: ImageModel = this.appService.initialiseUserImage(user);

          this.userLog = new UserModel(user.id,
            user.username, user.gender, user.firstname,
            user.lastname, user.mail, image);

          localStorage.setItem('idUser', user['@id']);
        });
    }
  }

  declineVisitUser(event: any, visitUser: VisitUser, i : number) {
    event.stopPropagation();
    this.profilService.putUserVisit(false, visitUser.id, this.appService.getLocalVar('token'))
      .then( data => {
        alert('Demande de visite refusée');
        this.visitsUserWaiting.splice(i,1);
      });
  }

  validateVisitUser(event: any, visitUser: VisitUser, i : number) {
    event.stopPropagation();
    this.profilService.putUserVisit(true, visitUser.id, this.appService.getLocalVar('token'))
      .then( data => {
        const visitValidated = data.json();
        let visitModel : VisitModel = visitValidated.visit;
        let user : UserModel = visitValidated.user;
        let visitGuideModel : VisitGuideModel = visitValidated.visitGuide;
        let visitAdded = new VisitUser(visitValidated.id, visitModel, user, visitGuideModel, visitValidated.isValidated, null, visitValidated.isConfirm );
        alert('Demande de visite validée');
        this.visitsUserValidated.push( visitAdded );
        this.visitsUserWaiting.splice(i,1);
      });
  }
}
