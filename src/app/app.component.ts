import { Component } from '@angular/core';
import { AppService } from '@services/base/apps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public baseService: AppService
  ) { }

  isToggle: boolean = false;
  isLoading: boolean;

  title = 'iCart-Angular';

  ngOnInit(): void {
    this.baseService.getIsLoading().subscribe(x => this.isLoading = x)
  }
}
