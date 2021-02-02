import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText:string="";
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  navigate(navlink: any): void {
    this.router.navigate([navlink],{queryParams: {search: this.searchText}, skipLocationChange: true});
  }
}
