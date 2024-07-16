import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopUpConfig } from './popupconfig.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() isShowPopup: boolean = false;
  @Input() config: PopUpConfig=new PopUpConfig();
  @Output() CloseEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() saveButtonName: string = 'Save';
  @Input() closeButtonName: string = 'Cancel';
  @Output() ReturnMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }  
  ngOnChanges(changes: any): void {}
  ngOnInit(): void {  } 

  close() {
    this.config.isShowLeft = false;
    this.config.isShowPopup = false;
    var modalObj:any=document.getElementsByClassName("modal")[0];
    modalObj.style.display="none";
    this.CloseEvent.next(false);
  }
  public open(config: PopUpConfig) {
    this.config = config;
    if(config.isShowPopup){
      var modalObj:any=document.getElementsByClassName("modal")[0];
      modalObj.style.display="block";
    }
    else{
      var modalObj:any=document.getElementsByClassName("modal")[0];
      modalObj.style.display="none";
    }
  } 
  getReturnMessage(evt: any) {
    this.ReturnMessage.next(evt);
  }

}
