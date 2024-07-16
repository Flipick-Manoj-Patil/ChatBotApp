import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'trustHtml'
})
export class TrustHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string,type?:string): SafeHtml {
    switch(type){
      case 'url':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
        break;
      default:
        return this._sanitizer.bypassSecurityTrustHtml(value);
      break;
    }
  }

}
