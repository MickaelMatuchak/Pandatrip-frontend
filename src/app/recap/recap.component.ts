import { Component, OnInit } from '@angular/core';
import { RecapModel } from "./recap.model";

const RECAP: RecapModel[] = [
  { id: 1, image: 'Arc de Triomphe.jpg', nom: 'Arc de Triomphe', date: '22/01/2018 à 14:00', guide: 'Chloé', guide_image: 'girl.png'},
  { id: 2, image: 'Tour Eiffel.jpg', nom: 'Tour Eiffel', date: '22/01/2018 à 15:00', guide: null, guide_image: null},
];


@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css', '../../../node_modules/bulma/css/bulma.css','../../../node_modules/font-awesome/css/font-awesome.css']
})
export class RecapComponent implements OnInit {

  recap = RECAP;
  title : string;
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor() {
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

  ngOnInit() {

    let retrievedObject = null;

    if (localStorage.getItem('visits') != undefined) {
      retrievedObject = JSON.parse(localStorage.getItem('visits'));
    }

    retrievedObject.forEach(function (element) {
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

      let urlImage = document.createTextNode(RECAP[0].image);

      let img = document.createElement("img");
      img.setAttribute("_ngcontent-c2","");
      img.setAttribute("alt","");
      img.setAttribute("src","../assets/img/visit/"+urlImage.textContent);

      figure.appendChild(img);
      tdLieu.appendChild(figure);

      let nomLieu = document.createTextNode(element.name);
      tdNomLieu.appendChild(nomLieu);

      let date = document.createTextNode(RECAP[0].date);
      tdDate.appendChild(date);

      let nomGuide;
      if(element.guide != null){
        nomGuide = document.createTextNode(element.guide);
      }else{

          nomGuide = document.createTextNode("Aucun guide. Choisir un guide ?");
      }

      tdGuide.appendChild(nomGuide);

      tr.appendChild(tdLieu);
      tr.appendChild(tdNomLieu);
      tr.appendChild(tdDate);
      tr.appendChild(tdGuide);

      tbody.appendChild(tr);

    });
  }

}
