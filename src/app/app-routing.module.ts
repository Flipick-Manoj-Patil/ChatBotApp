import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = 
[ 
  
  
  { path: 'chat', component: ChatbotComponent, data: { title: 'Chat' } },
  { path: '**', redirectTo: 'chat'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
