import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  product: any = [];
  totalPrice = 0;
  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('key') != null) {
      this.product = JSON.parse(localStorage.getItem('key') || '');
      this.api.cartData.next(this.product);
      this.calculator();
      console.log(this.product);
    }
  }
  increase(item: any) {
    if (item.quantity != 5) {
      item.quantity += 1;
      this.calculator();
    }
  }
  decrease(item: any) {
    if (item.quantity != 1) {
      item.quantity -= 1;
      this.calculator();
    }
  }
  delete(item: any) {
    this.product.map((a: any) => {
      if (item.id === a['id']) {
        let index = this.product.indexOf(a);
        this.product.splice(index, 1);
        this.api.cartData.next(this.product);
        localStorage.setItem('key', JSON.stringify(this.product));
        this.calculator();
        this.toastr.success('تم حذف البيانات بنجاح', 'success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-left',
        });
      }
    });
  }

  RemoveAll() {
    localStorage.removeItem('key');
    this.api.cartData.next([]);
    this.product = [];
    this.toastr.success('تم حذف جميع البيانات بنجاح', 'success', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-left',
    });
  }
  calculator() {
    this.totalPrice = 0;
    this.product.map((a: any) => {
      this.totalPrice = this.totalPrice + a.quantity * a.price;
    });
  }
  buyNow() {
    let buyData = {
      productData: this.product,
      subTotal: this.totalPrice,
    };
    console.log(buyData);
    this.toastr.success('تم شراء المنتجات بنجاح', 'success', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-left',
    });
  }


}
