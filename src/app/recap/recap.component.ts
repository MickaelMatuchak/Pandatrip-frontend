import { Component, OnInit } from '@angular/core';
import { VisitService } from '../visit/visit.service';
import {ImageModel} from "../image/image.model";
import {VisitModel} from "../visit/visit.model";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css', '../../../node_modules/bulma/css/bulma.css','../../../node_modules/font-awesome/css/font-awesome.css'],
  providers: [VisitService]
})
export class RecapComponent implements OnInit {

  title : string;
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor( private visitService: VisitService) {
    this.title = 'Parcours Sans Nom';
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  private visitDetails(itemVisit : any){
    this.visitService.getVisit(itemVisit.name)
      .then(visitRecup => {
        let visitTmp = visitRecup["hydra:member"][0];
        let arrayImages: ImageModel[] = new Array();
        let images = visitTmp["images"];

        for (var i = 0; i < images.length; i++) {
          arrayImages.push(new ImageModel(images[i].id, images[i].url, images[i].description));
        }

        let visit = new VisitModel(visitTmp["id"], visitTmp["name"],
          arrayImages,
          null, null, null, visitTmp["address"],
          visitTmp["country"], visitTmp["region"], visitTmp["city"],
          visitTmp["postalCode"], "", null, null, "");

        this.afficherItemVisit(visit, itemVisit);
      });
  }

  ngOnInit() {

    let retrievedObject = null;

    if (localStorage.getItem('visits') != undefined) {
      retrievedObject = JSON.parse(localStorage.getItem('visits'));
    }

    retrievedObject.forEach(function (element) {
      this.visitDetails(element);

    }, this);
  }

  afficherItemVisit(visit: VisitModel, item) {
    let image = visit.images[0];

    let tbody = document.getElementById("ligne_visite");
    let tr = document.createElement("tr");
    let tdLieu = document.createElement("td");
    let tdNomLieu = document.createElement("td");
    let tdDate = document.createElement("td");
    let tdGuide = document.createElement("td");

    tbody.setAttribute("_ngcontent-c2","");
    tr.setAttribute("_ngcontent-c2","");
    tdLieu.setAttribute("_ngcontent-c2","");
    tdNomLieu.setAttribute("_ngcontent-c2","");
    tdDate.setAttribute("_ngcontent-c2","");
    tdGuide.setAttribute("_ngcontent-c2","");

    let figure = document.createElement("figure");
    figure.className="image is-128x128";
    figure.setAttribute("_ngcontent-c2","");

    let img = document.createElement("img");
    img.setAttribute("_ngcontent-c2","");
    img.setAttribute("alt","");
    img.setAttribute("src","../assets/img/" + image.url);

    figure.appendChild(img);
    tdLieu.appendChild(figure);

    let nomLieu = document.createTextNode(visit.name);
    tdNomLieu.appendChild(nomLieu);

    let date = document.createTextNode(visit.address);
    tdDate.appendChild(date);

    let nomGuide;
    if (item.guide != null){
      nomGuide = document.createTextNode(item.guide);
    } else {
      nomGuide = document.createTextNode("Aucun guide. Choisir un guide ?");
    }

    tdGuide.appendChild(nomGuide);
    tr.appendChild(tdLieu);
    tr.appendChild(tdNomLieu);
    tr.appendChild(tdDate);
    tr.appendChild(tdGuide);
    tbody.appendChild(tr);
  }

}
