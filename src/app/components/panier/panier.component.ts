import { Component, OnInit } from '@angular/core';
import { Product } from '../produit/data';
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs'; 
import {ProductService} from '../../services/product.service'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
  
})
export class PanierComponent implements OnInit{

  constructor(private productService: ProductService){
   
  }

  panierProduits !:Product [];  
  private panierProduitsSubscription!: Subscription; 
   totalPrice:number=0;
  private totalPriceSubscription!:Subscription;
  

  ngOnInit(): void {
    this.panierProduitsSubscription=this.productService.panierProduit$.subscribe((produitpanier=>{this.panierProduits=produitpanier}))
    this.totalPriceSubscription=this.productService.totalPrice$.subscribe(t=>{this.totalPrice=t});
    
  }

  ngOnDestroy() {
    
    if (this.panierProduitsSubscription) {
      this.panierProduitsSubscription.unsubscribe();
    }
  }


removeFromCart(id:number){

  this.productService.removeFromCart(id);
}

changeQuantity(id:number,event: Event){
 let val = parseInt((event.target as HTMLInputElement).value); 

  this.productService.changeQuantity(id,val);

}


getMaxStock(id:number){
  return  this.productService.getMaxSotck(id)
}

// getTotalPrice(){  return this.productService.getTotalPrice();
// }

  

}
