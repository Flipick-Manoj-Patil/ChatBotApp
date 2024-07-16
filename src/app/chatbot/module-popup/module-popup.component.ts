import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Sanitizer, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventEmitterService } from 'src/app/utility/event-emitter.service';

@Component({
  selector: 'app-module-popup',
  templateUrl: './module-popup.component.html',
  styleUrls: ['./module-popup.component.css']
})
export class ModulePopupComponent implements OnInit,OnDestroy {
  @ViewChild('iframe', { static: false }) iframe?: ElementRef<HTMLIFrameElement>;
    @Input() URL:any;
    iframeUrl?: SafeResourceUrl;
    constructor(private eventEmitterService:EventEmitterService,private sanitizer:DomSanitizer){

    }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['PlayerURL']) {
  //       if(this.URL!=""){
  //         this.URL="";
  //       }
  //       this.URL=changes['PlayerURL'].currentValue;
  //   }
  // }
  ngOnDestroy(): void {
    if (this.URL) {     
      this.URL=null;  
    }
  }
    ngOnInit(): void { 

      this.eventEmitterService.invokeModulePoupEventEmitter.subscribe((url: string) => {
          
          var secureURL:any=this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.iframeUrl=secureURL;//.changingThisBreaksApplicationSecurity;
          this.URL=url;
          //this.URL = this.sanitizer.bypassSecurityTrustResourceUrl('https://human.biodigital.com/viewer');
      });
     }
}
