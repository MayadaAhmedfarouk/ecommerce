import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  p: number = 1;
  collection: any[] = [];
  cart: any = [];
  data: any = [];
  products: any = [];
  loading: boolean = false;

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategory();
    this.getData();
  
  }
  getCategory() {
    this.loading = true;
    this.api.getAllCategories().subscribe((res) => {
      this.loading = false;
      this.data = res;
      console.log(res);
    });
  }
  getData() {
    this.loading = true;
    this.api.getAllproducts().subscribe((res) => {
      this.loading = false;
      this.products = res;
    });
  }

  filter(event: any) {
    let value = event.target.value;
    if (value == 'All') {
      this.getData();
    } else {
      this.getproductsCategory(value);
    }
  }
  getproductsCategory(keyword: string) {
    this.loading = true;
    this.api.getproductsBycateogory(keyword).subscribe((res) => {
      this.loading = false;

      this.products = res;
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
