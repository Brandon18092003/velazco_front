import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  currentView: string = 'link1';
  isHandset$: Observable<boolean>;

  menuAbierto: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router:Router) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
        const saveView = localStorage.getItem('currentView');
        if (saveView) {
            this.currentView = saveView;
        }
    }
}

  setView(view: string) {
    this.currentView = view;
    localStorage.setItem('currentView', view);
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  toggleVolver(): void {
    this.router.navigate(['/inicio']);
  }

  togglePerfil(): void {
  }
}