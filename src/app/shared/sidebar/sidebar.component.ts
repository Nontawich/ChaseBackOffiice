import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { UtilityProviderService } from './../../service/utility-provider.service';
import { HttpProviderService } from './../../service/http-provider.service';
import * as AppConst from './../../appConstrant';
declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public menuShow: any;
    public menuList: any;
    constructor(private router: Router,
        private route: ActivatedRoute, public translate: TranslateService, private http : HttpProviderService, private util : UtilityProviderService) {
        
    }

    ngOnInit() {
        $.getScript('./assets/js/app-sidebar.js');
       // this.menuItems = ROUTES.filter(menuItem => menuItem);
       this.getMenu();
    }

    //NGX Wizard - skip url change
    ngxWizardFunction(path: string) {
        if (path.indexOf('forms/ngx') !== -1)
            this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }

    private getMenu(){
        let param = {
            personType : "1"
        }

        this.http.httpSend(AppConst.chaseService.menu.getMenu, param, response => {
            if (this.util.isNotNullOrEmpty(response)) {
              this.menuShow = response.module;
              this.menuItems = new Array();
              for (let i = 0; i < this.menuShow.length; i++) {
                var module =  { path: "", title: "" ,icon: "", class: "" ,badge: "", badgeClass : "" , isExternalLink : false,
                 submenu : [] }
                    module.title = this.menuShow[i].moduleName;
                    module.path = this.menuShow[i].modulePath;
                    module.icon = this.menuShow[i].moduleIcon;

                if(this.util.isNotNullOrEmpty(this.menuShow[i].menu)&&this.menuShow[i].menu.length >0){
                    module.class = 'has-sub';
                    for(let j = 0; j < this.menuShow[i].menu.length; j++){
                        var menu =  { path: "", title: "" ,icon: "", class: "" ,badge: "", badgeClass : "" , isExternalLink : false,
                        submenu : [] }
                        menu.title =  this.menuShow[i].menu[j].menuName;
                        menu.path =   this.menuShow[i].menu[j].menuPath;
                        module.submenu.push(menu)
                    }
                }    

                this.menuItems.push(module);
              }
              console.log(this.menuItems);
              console.log("Show Success GetMenu Case.");
            } else {
              console.log("Response MenuData Not Found.");
              let msg = "Response MenuData Not Found. Please Exit Application and Contact Administor."
              alert(msg);
            }
          },
            error => {
              console.log("Error Service API GetMenu Case.");
              let msg = ""
              msg = "Error Service API GetMenu Case."
              alert(msg);
            });

    }
}
