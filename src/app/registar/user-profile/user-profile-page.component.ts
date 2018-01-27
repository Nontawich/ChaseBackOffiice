import { Component, OnInit } from '@angular/core';
import * as AppConst from './../../appConstrant';
import { UtilityProviderService } from './../../service/utility-provider.service';
import { HttpProviderService } from './../../service/http-provider.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {

    //Variable Declaration
    currentPage: string = "About"
    private searchInfo = AppConst.REGIS_FORM;
    private regList:any;
    private regDetail:any;
    ngOnInit() {
        // Horizontal Timeline js for user timeline
        $.getScript('./assets/js/vertical-timeline.js');
    }

    constructor( private http : HttpProviderService, private util : UtilityProviderService, private spinnerService: Ng4LoadingSpinnerService){
        
    }

    showPage(page: string) {
        this.currentPage = page;
    }


    
   private search() {
    this.spinnerService.show();
    this.http.httpSend(AppConst.chaseService.candidate.getCandidateList, this.searchInfo, response => {
        if (this.util.isNotNullOrEmpty(response)) {
               this.regList = response.candidateList;
          console.log("Show Success Regispage Case.");
        } else {
          console.log("Response Regispage Not Found.");
          let msg = "Response Regispage Not Found. Please Exit Application and Contact Administor."
          alert(msg);
        }
        this.spinnerService.hide();
      },
        error => {
          console.log("Error Service API Regispage Case.");
          let msg = ""
          msg = "Error Service API Regispage Case."
          alert(msg);
          this.spinnerService.hide();
        });
    }


    private info(id) {
        this.spinnerService.show();
        var param = {id :id }
        this.http.httpSend(AppConst.chaseService.candidate.getCandidateDetail, param, response => {
            if (this.util.isNotNullOrEmpty(response)) {
                   this.regDetail = response.candidateDetail;
              console.log("Show Success Regispage Case.");
            } else {
              console.log("Response Regispage Not Found.");
              let msg = "Response Regispage Not Found. Please Exit Application and Contact Administor."
              alert(msg);
            }
            this.spinnerService.hide();
          },
            error => {
              console.log("Error Service API Regispage Case.");
              let msg = ""
              msg = "Error Service API Regispage Case."
              alert(msg);
              this.spinnerService.hide();
            });
        }
}