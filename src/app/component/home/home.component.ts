import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any = [];
  p: number = 1;
  collection: any[] = [];
  cart: any = [];
  loading: boolean = false;

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.loading = true;
    this.api.getAllproducts().subscribe((res) => {
      this.loading = false;
      console.log(res);
      this.data = res;
    });
  }
  addToCart(item: any) {
    const update = {
      quantity: 1,
      image: item.image,
      price: item.price,
      title: item.title,
    };
    this.cart.push(update);
    this.api.cartData.next(this.cart);
    console.log(this.cart);
    localStorage.setItem('key', JSON.stringify(this.cart));

    this.toastr.success('تم ارسال المنتج ألي العربه بنجاح', 'success', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-left',
    });
  }

}
