import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({providedIn: 'root'})

export class HeaderComponent {
  private history: string[] = []
  routeName: string;

  constructor(public router: Router, private location: Location, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })

    this.routeName = route.snapshot.data['routeName'];

  }


  back(): void {
    this.location.back()
  }


  isHomeRoute() {
    return this.router.url === '/';
  }

}
