import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './feature/loader/loader.component';
import { LoaderInterceptorService } from './feature/loader/loader-interceptor.service';
import { PopupComponent } from './feature/popup/popup.component';
import { ModulePopupComponent } from './chatbot/module-popup/module-popup.component';
import { PopupModule } from './feature/popup/popup.module';
import { TrustHtmlPipe } from './pipes/trust-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    LoaderComponent,    
    ModulePopupComponent,
    TrustHtmlPipe,    
  ],
  imports: [    
    PopupModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
