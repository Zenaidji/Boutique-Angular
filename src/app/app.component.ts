import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoutiqueComponent } from "./components/boutique/boutique.component";
import { PanierComponent } from "./components/panier/panier.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoutiqueComponent,PanierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'app';
}
