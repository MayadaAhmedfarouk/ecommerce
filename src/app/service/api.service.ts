import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cartData=new Subject<any>();
  apiUrl='https://fakestoreapi.com'

  constructor(private http:HttpClient) { }
  getAllproducts(){
    return this.http.get(this.apiUrl +'/products')
  }
  getDataById(id:number){
    return this.http.get(this.apiUrl +'/products/'+id)

  }
  getAllCategories(){
    return this.http.get(this.apiUrl +'/products/categories')

  }

  getproductsBycateogory(keyword:string){
    return this.http.get(this.apiUrl+'/products/category/'+keyword)

  }
  passData(data:string){
  return this.http.post(this.apiUrl +'/auth/login/',data)
  }
}
