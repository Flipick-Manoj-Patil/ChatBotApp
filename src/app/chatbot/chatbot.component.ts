import { Component, OnInit, ViewChild } from '@angular/core';
import { IChat, ICustomErrorDetails } from '../model/aimodel';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AibotService } from '../services/aibot.service';
import { PopUpConfig, PopUpConfigFactory } from '../feature/popup/popupconfig.model';
import { PopupComponent } from '../feature/popup/popup.component';
import { EventEmitterService } from '../utility/event-emitter.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
 

  studentId="0"; courseId="0";
  submitted = false; chatbotError = false; errorMessage= '';
  chatbotForm: any = FormGroup; 
  errorDetails: ICustomErrorDetails[] = []; 
  chatList: IChat[] = [];
  prePrompt: boolean = false;  
  isShowModulePopup:boolean=false;
  moduleURL:any="";
  //promptList: IPrompt[] =  [] ; 

 // isSidebarToggle = this.getSidebarToggle();
 @ViewChild('popup1') popup?: PopupComponent;
  get f(): { [key: string]: AbstractControl} {
    return this.chatbotForm.controls;
  }
  constructor(public fb: FormBuilder,private aibotService:AibotService,private eventEmitterService:EventEmitterService){
    
  }

  popupConfig: PopUpConfig = PopUpConfigFactory.getPopUpConfig({
    header: '',
    isShowPopup:false
  });
  ngOnInit(): void {
   
    this.initForm();
  }

  initForm(){
   
    this.chatbotForm = this.fb.group({
      prompt: ['', [Validators.required]],
      // studentid: [this.studentId],
      // courseid: [this.courseId],
      // coursename: [""],
      // custom_course_name: ['']        
    }); 

  //   var param:IChat={
  //     answer:"<p>The kidneys have several important functions:</p>\r\n<br/><b>Filtering Blood:</b>\r\n<br/>The kidneys filter waste products and other substances like water, salt, and nutrients from the blood. These waste products are then excreted through urine.</b>\r\n<br/><b>Regulating Blood Pressure:</b>\r\n<br/>A protein called angiotensin II helps regulate kidney function by increasing blood pressure and encouraging the kidneys to retain salt and water.</b>\r\n<br/><b>Excreting Excess Sodium:</b>\r\n<br/>The kidneys help excrete excess sodium into the ureter, where it is flushed away with the urine.</b>\r\n<br/><b>Producing Urine:</b>\r\n<br/>The kidneys filter blood and produce urine.</b>\r\n<br/><b>Regulating Sodium and Aldosterone:</b>\r\n<br/>Angiotensin II promotes the release of aldosterone, which leads to an increase in sodium in the blood, contributing to increased blood pressure.</b>\r\n<p>For more detailed information, you can explore the following 3D models:</p>\r\n<br/><b>Content Title:</b>\r\n<br/>Kidney Function and Regulation</b>\r\n<br/><b>3D Model Link:</b>\r\n<br/><a href=\"https://human.biodigital.com/viewer/?be=5ctP&dk=d2a96bd599bea244d13434ecc378ada2295eccd4&uaid=6rV\" class=\"underline model3d\" style=\"text-underline-offset: 0.25rem\"><u>Kidney Function and Regulation</u></a></b>\r\n<br/><b>Content Title:</b>\r\n<br/>Nephron Function</b>\r\n<br/><b>3D Model Link:</b>\r\n<br/><span href=\"https//human.biodigital.com/viewer/?be=5ctP&dk=d2a96bd599bea244d13434ecc378ada2295eccd4\"  class=\"underline model3d\" style=\"text-underline-offset: 0.25rem\"><u>Nephron Function</u></span></b>\r\n",
  //     question:"what is the function of kidney?"
  //   }
  //   this.chatList.push(param);

  //   setTimeout(() => {
  //     var anchorList:any=document.querySelectorAll(".model3d");
  //     if(anchorList.length>0){
  //        anchorList.forEach((element:any) => {
  //          debugger;                      
  //          element.addEventListener("click",(event:any) => {
  //           event.preventDefault();
  //           this.openModel(event);
  //           });
  //          //element.href="javascript.void(0);";
  //        });
  //     }
  //  }, 200);
  }
  query(){
      var payload={
          Question:this.chatbotForm.value.prompt
      }
      this.aibotService.getQueryResponse(payload).subscribe((data: any) => {
        if (data.isError === false) 
          {
            this.submitted = false;
            //this.chatMessage = data.result.answer;
            var chatItem = {} as IChat;
            chatItem.question = this.chatbotForm.value.prompt;
            chatItem.answer =  data.result.answer;
            this.chatList.push(chatItem);     
            this.initForm();  
            setTimeout(() => {
              var anchorList:any=document.querySelectorAll(".model3d");
              if(anchorList.length>0){
                 anchorList.forEach((element:any) => {
                   debugger;                      
                   element.addEventListener("click",(event:any) => {
                    event.preventDefault();
                    this.openModel(event);
                    });
                   //element.href="javascript.void(0);";
                 });
              }
           }, 200);
                      
          } else {
            this.submitted = true;
            this.chatbotError = true;
            this.errorDetails = data.errorDetails;
            this.errorMessage = this.errorDetails[0].reason;
          } 

      },(error: any) => {
        this.chatbotError = true;
        this.errorMessage = "";
        if(error.error != null &&  error.error.responseException != null && error.error.responseException.customErrors != null)
        {
            for (let key of error.error.responseException.customErrors)
            {
                this.errorMessage += key.reason +"\n";
            } 
        }       
      })
  }
  onKeyDown(event:any){}
  openModel(e:any){
    e.preventDefault();
    console.log(e.currentTarget.href);
    this.openModulePopup(e.currentTarget.href.replaceAll(e.currentTarget.baseURI,''));
  }

  

  openModulePopup(URL:any) {
    if(URL.indexOf("https:")==-1){
      URL=URL.replaceAll("https","https:");
    }
    this.moduleURL=URL
    this.isShowModulePopup=true;    
    this.popupConfig.isShowPopup = true;   
    this.popupConfig.header = "Module";
    this.popupConfig.popupFor = "fullWidth";    
    this.popup?.open(this.popupConfig); 
    this.eventEmitterService.openModulePopup(this.moduleURL);   
  }

  close($event: any) {
    this.popupConfig.isShowPopup = false;
    this.isShowModulePopup=false;
    this.eventEmitterService.invokeModulePoupEventEmitter.unsubscribe();
   
  }
}
