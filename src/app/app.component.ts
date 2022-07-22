import { Component ,OnInit} from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'e-co';
  totalItemNumber:number=0
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.cartData.subscribe((res)=>{
      this.totalItemNumber=res.length
    })
  }
}
