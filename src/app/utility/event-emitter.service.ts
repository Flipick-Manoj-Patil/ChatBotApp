import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeModulePoupEventEmitter=new EventEmitter();
  constructor() { }

  openModulePopup(URL:any){
    this.invokeModulePoupEventEmitter.emit(URL);
  }
}
