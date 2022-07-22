import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data:any=[];
  view:any[]=[];
  loading:boolean=false;

  constructor(private api:ApiService,private activateRoute:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading=true;
    this.activateRoute.params.subscribe((res)=>{
      this.getData(res['id'])

    })
  }
  getData(id:number){
    this.loading=true;
    this.api.getDataById(id).subscribe((data)=>{

      this.loading=false
      console.log(data)
      this.data=data
    })

  }
  addToCart(data:any){
    const update={
      quantity:1,
      image:data.image,
      price:data.price,
      title:data.title
    }

    this.view.push(update)
    this.api.cartData.next(this.view);
    console.log(this.view);
    localStorage.setItem('key',JSON.stringify(this.view))


    this.toastr.success("تم ارسال المنتج ألي العربه بنجاح" ,'success',{
      timeOut:3000,
      closeButton:true,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass: 'toast-bottom-left',
    })



  }

}
