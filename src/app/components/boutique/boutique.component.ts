import { Component, OnInit } from '@angular/core';
import { ProduitComponent } from '../produit/produit.component';
import { Product } from '../produit/data';
import {ProductService} from '../../services/product.service'
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs'; 
@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [ProduitComponent,CommonModule],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent implements OnInit{


  listesProduits!: Product[] ;
  listesProduitsfiltre!:Product[] ;
  private productSubscription!: Subscription; 

 
  constructor(private productService: ProductService){


  }



  ngOnInit(){
    this.productSubscription = this.productService.produits$.subscribe(produits => {
      this.listesProduits = produits;
      this.listesProduitsfiltre = produits; 
    });
    
  }
 
  ngOnDestroy() {
    
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }


  searchProduct(event: Event){

    let motif = (event.target as HTMLInputElement).value; 
    if(motif.trim()===""){
      this.listesProduits=this.listesProduitsfiltre;

    }else{

    this.listesProduits=this.listesProduits.filter(prod => prod.name.includes(motif.toLocaleLowerCase()) ||prod.description.includes(motif.toLocaleLowerCase()));
    }
  }



}
