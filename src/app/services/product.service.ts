import { Injectable } from '@angular/core';
import products, { Product } from '../components/produit/data';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private produitsSubject = new BehaviorSubject<Product[]>(products);
  produits$ = this.produitsSubject.asObservable();

  private PanierProduitsSubject = new BehaviorSubject<Product[]>([]);
  panierProduit$=this.PanierProduitsSubject.asObservable(); 

  private totalPriceSubject = new BehaviorSubject<number>(0);
   totalPrice$=this.totalPriceSubject.asObservable();


  constructor() {}

  
  getProducts() {
    return this.produitsSubject.value;
  }

 
 


 
  addToCart(id: number) {
    const produits = this.produitsSubject.value;
    const selected = produits.find(p => p.id === id);

    if (selected && selected.stock > 0) {
      
        selected.stock -= 1; 
        this.produitsSubject.next([...produits]); 

      
        const panier = this.PanierProduitsSubject.value;
        const produitDansPanier = panier.find(p => p.id === id);

        if (produitDansPanier) {
           
            produitDansPanier.stock += 1;
            this.getTotalPrice();
            this.PanierProduitsSubject.next([...panier]);
            
        } else {
         
            this.PanierProduitsSubject.next([...panier, { ...selected, stock: 1 }]);
            this.getTotalPrice();
        }

       
    }
}

removeFromCart(id: number) {
  const panier = this.PanierProduitsSubject.value;
  const produits = this.produitsSubject.value;
  const selected = panier.find(p => p.id === id);
  const selected2 = produits.find(p => p.id === id);

  if(selected &&    selected2){
  
    selected2.stock+=selected.stock;
   
    this.PanierProduitsSubject.next([...panier.filter(p => p.id !== id)])
    this.produitsSubject.next([...produits])
    this.getTotalPrice();
  }

}




changeQuantity(id: number, val: number) {
  const panier = this.PanierProduitsSubject.value;
  const produits = this.produitsSubject.value; 
  const selected = panier.find(p => p.id === id);
  const selected2 = produits.find(p => p.id === id);

 
  if (selected && selected2) {
    const stockDisponible = selected2.stock + selected.stock;
    if (val <= stockDisponible ) {
      selected2.stock = stockDisponible - val; 
      selected.stock = val;                    
      this.getTotalPrice();
      
      this.PanierProduitsSubject.next([...panier]);
      this.produitsSubject.next([...produits]);
    }
  }
}




getMaxSotck(id:number){
  let stockDisponible=null;
  const panier = this.PanierProduitsSubject.value;
  const produits = this.produitsSubject.value; 
  const selected = panier.find(p => p.id === id);
  const selected2 = produits.find(p => p.id === id);
  if (selected && selected2) {
    stockDisponible=selected2.stock + selected.stock;
    
  }

  return stockDisponible;

  }

  getTotalPrice(){
    const panier = this.PanierProduitsSubject.value;
    let total=this.totalPriceSubject.value;
    total=0;
    panier.forEach(item=>{
      total+=(item.price*item.stock)
      
    
    })
  
    this.totalPriceSubject.next(total);

    

  }

 
}

