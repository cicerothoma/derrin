import { Component, OnInit } from '@angular/core';
import { faTwitter, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarker } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarker = faMapMarker;

  date = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
