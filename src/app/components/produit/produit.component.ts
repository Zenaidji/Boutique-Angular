import { Component,Input } from '@angular/core';
import { Product } from '../produit/data';

import {ProductService} from '../../services/product.service'


@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
  
})
export class ProduitComponent {
  @Input() produit!:Product;
  constructor(private productService: ProductService){


  }

  onImageClick(id:number){
    this.productService.addToCart(id);

  }
 

}
