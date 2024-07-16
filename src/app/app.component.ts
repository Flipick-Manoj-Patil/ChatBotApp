import { Component, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatBot';
  constructor(public fb: FormBuilder){ 
   
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setVHVariable();
  }

  ngOnInit(): void 
  {       
    this.setVHVariable();
  }

  private setVHVariable(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
