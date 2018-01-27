import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import * as $ from 'jquery';
import * as AppConst from './../../appConstrant';
import { UtilityProviderService } from './../../service/utility-provider.service';
import { HttpProviderService } from './../../service/http-provider.service';
import * as swal from 'sweetalert2';

@Component({
    selector: 'register-forms',
    templateUrl: './register-forms.component.html',
    styleUrls: ['./register-forms.component.scss']
})


export class RegisterFormComponent implements OnInit {
    private regispageList : any;
    private titleList : any;
    private provinceList : any;
    private districtList : any;
    private subDistrictList : any;
    private regisSexualList : any;
    private educationTypeList : any;
    private regisInfo = AppConst.REGIS_FORM;
    private birthDate ;
    private registerId ;
    private allSave ;
    private minDate = {year: 1880, month: 1, day: 1};
    private resultSave :Boolean = false;
   // private numberpattern = /([0-9]{9})/;
    private img: string =  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0xMC0wN1QxOTo0Mjo1MyswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMTctMTAtMDdUMTQ6MTg6MzkrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTctMTAtMDdUMTQ6MTg6MzkrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxMEI5QzE2QTM4RTExRTdBMUIzRDEzOUE4ODZDNDEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMxREE0QUE4QTM4RTExRTdBMUIzRDEzOUE4ODZDNDEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzEwQjlDMTRBMzhFMTFFN0ExQjNEMTM5QTg4NkM0MTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzEwQjlDMTVBMzhFMTFFN0ExQjNEMTM5QTg4NkM0MTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4WsIbiAAASQ0lEQVR42uzd229UVf/AYd9fXjBBJpymliJYjKBSAxQjBdJDwAQhEMO9fyVelAtJLEEaOTRSgkAiKtKgbdOCkGIvXm5+33SSZrLXAJ3pzO7s6fNcGBmlnU7XXp+1D7PnPxMTE+8AsP78n5cAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABABAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAgJX5r5egAS9evHj16tXqv065XG71c9uyZcuGDRta8SLMz8/Pzc09e/bsf0uePn0aD/b09MQ/N2/evG3btq6urvjuRktdL2lTvk7HjKuXL18uLCxkxtWuXbs2bdpktAjAmrl69WplXK7St99+29wn9uDBg9u3b1c/8vXXXzd3Oojt89GjR48fP47tM/2v09PT1X8slUqHDx/+8MMPjZmV+P7775vydZo+ru7cuXPv3r0cxtXDhw9r/tfMuNqxY8eBAweMKwFYG02Z/ZsrVmfXrl3LbCdNX5rdvXu3rm8RL1Q8q8jAiRMnWrEsJYdx9cMPP1R271okRtTExERd21Q8nxhXkYHjx4/byxSA9S52z5u1U1LT4uJi7FjEqr/hXsbadmhoyJLtzS9yuz2lSP6VK1dq7uo160e+ceNGw6uWyMDo6KhxJQDrekOdmpqK1VBLF2jj4+OrnwXiSdpWCzSu0sOJTR+3N2/eNK4EwIba+O755OTk6w6bNsVvv/0WW2nN/1QqlWKre//99zdt2rS8Gx5PKXZH/vrrr3hW6bYd2+r58+fts7e5+CXGL73hHb6VSE8qpOMqxsnyyd54SrE78uTJk5onn+LZlstlZ4YFYG00/ZzbSsQ8e/369ZYenA1dXV0bN27MbHI9PT2fffZZ5cKMjA0bNpSX9PX11YzTzz//fOrUKWOm5rTbJuOqpYcTK/bu3ZsGIEbUwYMHa54rinHVs6S/vz+NU4zPGzduGFcN8D6AJmyo+Zuenr58+XI6+8e+cHO/UazCBgcHl/8YMYhvEVtazdk/s8UePXp0//796TNv1sWOHeb58+fVf9yxY0f+z2FqairGVTr7p7/H1Y+r6rEa4+rUkrdeKRDjKgZkzXEV6TKKBKDzN9TYfR4bG8usyiubUCv2gmOu//zzzyv/cuHChboOtkYD0lQ8evTIKHqr+IXmvKy5devWtWvX0nF1/vz5jz76qOnfMQZSZR7v7e2NcfXWJUVmXKXb3Z9//mnY1MshoCJtqK+71rNUKo2MjMSqqkWL68OHD2/btq2x82yxU595wrH/HhuwkZPRuott3mpxcfHHH39Mdyhjkh0eHo5VRYvGVX9/f3d3d2Pj6tChQ7EMqn5kZmYmBqqBJACduaHG7P/dd9+l3z2WTrE33aK3ZVav1xr7i7FTH32qPqoQP0L8LK1+woXz7Nmz6j9u3749t9n/0qVL6biKhfnAwEBLf03xxRseVzHsM2enWn0+rCM5BLTaDXXnzp35fN/YWmKbzDwYO9GnTp1q88k0ncscrm2fPctY4KeHX44cOTI4ONjm4yo9CtSG76WwB0DTHD16NPKzvNIpyuXPEYCWXlOYSUvmLH3MYo1deJoe99i0pPPGVaz0Y1xV9tIiPPHHQoyrzZs3pwFwMagAdLLh4eHYYY9/OX36tAvqU3Nzc+kbFxp480H6BoiYGc+dO9e6Z545U9LV1ZXbixaNHBkZuXz58rvvvls5mWQnSQBouw21sgg9efJksZaieZ412bdv3+zsbGaH4/r162fOnKlrN2JycjLz4ODgYAevLivX+5bL5QKdm8kcjK38FCaoujgHUDyFe9NjuqG29MZwAwMDmbXh06dPHzx4sPKvEMHIRGv//v11XadYRPEDFuvMfLqwcGWBANB2MpdnlEqlln67ynuFMg/evn17hWeeIxXpE+7v72/pc07PN7h5ar3jak3eOicA64sNtV4x7WZWajlcN7X85rVqV69efeu7uOPZpndAGxkZsbRsN+m7YXK7Hk8AYKV+/fXXzCO7d+/O4fv29fVlloQLCwv3799/89+6fv165pEjR444styG/vjjj8wje/fu9bLUy0ng1Vpc8vz581hdxlK3+nj39u3bN27c+N57721Zsj5fnMz94OIFyedgeqzZjx8/Pjo6Wv3gvXv3Pvjgg9fttN25cyc9qnDgwIEcnm3m/iLxElXG1dzc3DtLB7vTcbV169bq+2Wut3GVOc9fKpV0WgDy3lDDxYsXV7KXGltsb2/vJ598sq6GaXrHx/TITOvESz0wMJC5mvOnn346e/Zsekhnfn4+82zjVzY8PJzPU80cm4qRs8JxVbl5cix+19W4unHjRuYRN4FojENAq9pQVy4WcbEWjgXp2NjYOnkfbEyp6fJ/3759eT6H+HaZHY6FhYX0jQLxa40wZB6MeLT/+jp+nOhWZVytk/fBTi/JLP99IIwAFGb4xuZa11WJBS1lOqX29/fnfzZ1aGgoc1Xo48ePMzPI/fv3M/dAjt21POeU9ErZBsZV7DRMTU11/LgaHx/PPPjll1+aWAQgD5UPSFn917l9+/atW7c6+IWanJzMTKmxEs95+V9R86rQmESWd+Zi6swc/IkVZSz/83ySe/bsacq4unbtWmePq/SG1ZHqjn+LRus4B1Cfcrl84cKFymcSxRa7Y8eO5TNy6dp2bm4uVnYxv9R8K2zl8EhH3hg59m/Sgz/Hjh1bq+dTuSq0epaP30j8EiMMNVeUJ06cyHlPJfY2YmjFsiDGVeRn8+bNlXGVvs88nvDz589jXL3u9krxysdfz+fcdc6ibZldt8qdi8xLApD3ijJdVNasReVfYsf8zp076Qctxba6e/fuDlu/xA+bXkq/5vdR6Ovrm5mZqb7IJybQ7u7u2dnZTJ6PHDmyJu/tiNdnheOqMmBi4ovZsOa4itc/ytFh71CJcZV+wujp06e9RWM1HALKaX33zTff1LwAZmJiosO20thJzzwYU9WaR65yVWjmwcnJycw6OrfrPpvyE8W4Onv2bM3Pa0xPwHTeuBoaGnLppwAUxuHDh2N1mXkwlm8dc+LuxYsX6QU2MT2tyaH/VOWq0OpH0o8/zO26zyZmoOZnL8e4St8r20mzfyynXPkjAAUTq8t0Lfz77793xux/+fLlzJQaP2xbneRIrwrN7KkU9H1VNT8jN32vbBHNz8+ns38Ez4X/AlBIBw8ezDzSASu1mrN/TEmxk95uTzW9KrQi5+s+m+7QoUMdOa6uXLmS/qZ8prQAFFW5XE4Xay360O21nf2/+uqrNjxBF0+p5k7Anj17Cj2u4ofK3GY1fiOFfsvh68aVy34EoNjS2xYW9z2cxZr931n6qK+aF1DevHmz6O+kTT97ueE3rhtXAkCrpIcg/v33X1tpPk84/aiv5fVyeoeZogfA7I8AtJ2cP0XSVros/aivatPT0x1/iw7jCgFgPW6l6d2ee3p6MntjK//gMIwrAaARlZu8V9u6dauttKVq3u352LFj6TtvV/LBYeQ2rvbv32/2F4COUugPsy7i7B8Teno1YeWq/9gJ6O3trX58YWHhdecJ2lx6S9Gij6uY/Y8ePWr2F4COMjMzk3mkKO9oL+ge+s2bN9NbSC5f9R8lyFxA+fDhwyJeRJ8GoNDjqjL7my4EoNP2c9PPHSzEGqegs3963WfmFpLx5E+cOJH5W+Pj48W6KnR+fj79SAOzPwLQXn755ZfMIx9//HFxt9IzZ8608+xf87rPkydPZp5zuVzO3KqvcFeF3r17N/NIId7aZvYXgHVkamoqfRfSrl27bKUtkl73GRN9zfsk9/X1Zd6hXaCrQmMvJ71RfvvfZtzsLwBFEtPBaq4RrHlTwxjubX4DsuJupel1nzHFx0Rf83+ueb/ofK4KjXG1msNNMa7Sm7BG59r8uKLZXwAKZmZmZnR0dHx8vN4zhK9evYrJKJ39Y5nW399vK22F9LrPEFP8G6bFLVu2pPfrzuGq0BhXFy9evHXrVr23hIpsxGhMx1WpVGqTW3Cb/ducTwSr2+MlMXf39vZ2d3dvWfKGaejRo0fx/9d8A2p6MLqtxPySbqXh5cuXY2Njq//6X3zxRYsuU6l53WdM7m/9dgcOHIgFdfV+Q+Wq0BwmpodLYu7euXNnjKtyufyGXcNYgjx58iT9hKzKqmJkZMS4MlMJQAvF8K1sscvHFjLvKY3/IXP8IWNoaKjNP7QvNtSa3WrWJZKtW1mn13329PSs8KO+Yi8hMz3l+cmdC0tWM64GBgbafPor7rgSAGp78zaZrtEGBwc77KOA20fN6z5X/pH0MXv29/dnjqqPj4+fO3cu/7M19Y6r06dPW/yycs4BvFPXBrb6LxLzfkwlZv8WqXndZ70f9ZV+cFhLrwptyrjq7e29cOGC2R97AK0Sy/Y9e/Y8ePCgrnVZ9dR/8ODBNj/sU3TpdZ+NfdRX7DFcunSp+ktVrgptxUfGr3JcxQ/46aefGlc04D8TExNehXotLi7+/fff//zzz7Nnz9680ZZKpe3bt3d3d+/atSuHAwjxxDJHP2J2aPj7pl+tuVbz3F63/I/fS7qcb+yM6Pz8fHrbvlYEIDOuZmdnX758uZJxFdmIVUUO53vX+bgSAN7k1atX6dXisVnaH8e4QgAAaDtOAgMIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAIgJcAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAGBV/l+AAQCMbYlr6tCE7wAAAABJRU5ErkJggg==";
    constructor(private domSanitizer : DomSanitizer, private http : HttpProviderService, private util : UtilityProviderService){
        
    }
    @ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regisform: FormGroup;
    radioOptions = ['Option one is this', 'Option two can be something else'];


    ngOnInit() {
        $.getScript('./assets/js/jquery.steps.min.js');
        $.getScript('./assets/js/wizard-steps.js');
        this.getMasterPage();
        this.regisform = new FormGroup({
            'inputEmail': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'textArea': new FormControl(null, [Validators.required]),
            'radioOption': new FormControl('Option one is this')
        }, {updateOn: 'blur'});


    }

   private save() {
    var formData = new FormData();
        if(this.birthDate !== ""&&this.birthDate!==undefined){
            var day = String(this.birthDate.day).length == 1 ? "0"+this.birthDate.day : String(this.birthDate.day);
            var month = String(this.birthDate.month).length == 1 ? "0"+this.birthDate.month : String(this.birthDate.month);
            var year = this.birthDate.year >2300  ?  this.birthDate.year -543 : this.birthDate.year;
            this.regisInfo.candidateBirthDate =  day  +"/"+month+"/"+year;
            this.regisInfo.jobDto= this.getSeriarize();
            this.registerCandidate();
            if(this.resultSave){
                this.upload().then( (val) => 
                this.allSave = val.result,() => console.log("Task Errored!"),);
                if(this.allSave == "1"){
                    swal({
                        title: 'Upload File',
                        type: 'success',
                        confirmButtonColor: '#0CC27E',
                        confirmButtonText: 'Register',
                        confirmButtonClass: 'btn btn-success btn-raised mr-5',
                        buttonsStyling: false
                    }).then(function () {
                        window.location.reload();
                    })
                }else{
                    swal("Error!", "Please Contact Administrator", "error");
                }
            }
        }else{
            alert("Please Input Birthdate");
            return;
        }
    }

    handleFileSelect(evt){
        var files = evt.target.files;
        var file = files[0];
      
      if (files && file) {
          var reader = new FileReader();
  
          reader.onload =this._handleReaderLoaded.bind(this);
  
          reader.readAsBinaryString(file);
      }
    }
    
    _handleReaderLoaded(readerEvt) {
       var binaryString = readerEvt.target.result;
              this.img=  "data:image/jpeg;base64,"+btoa(binaryString);
             this.regisInfo.candidatePicture= this.img;
      }

     addSite(){
        $("#workingfield").clone().insertAfter("#regisform fieldset:last");
        
    }
    
     remove(){
        var i = 0;
        var formtest = $('#regisform');
        formtest.each(function() {  
            $(this).find("fieldset").each( function() {
                  var $this = $(this);
                  i++;
             }); 
        });
        if(i>1){
            $( "#workingfield" ).remove( "fieldset:last");
        }
    }

     getSeriarize(){
        var obj = new Array();
        var formtest = $('#regisform');
        formtest.each(function() {              
            $(this).find("fieldset").each( function() {
                  var $this = $(this);
                  var name = $this.attr("name");
                  var results = {};
                    $.each($this.serializeArray(), function() {
                        results[this.name] = this.value;
                    });
                    obj.push(results);
             }); 
        });
        console.log(obj);
        return obj;
    };


    private getMasterPage(){
        let param = {
            token : "1"
        }
        this.http.httpSend(AppConst.chaseService.registar.getRegispage, param, response => {
            if (this.util.isNotNullOrEmpty(response)) {
              this.regispageList = response.registerPageDto;
            
              if(this.util.isNotNullOrEmpty(this.regispageList.titleList)){
                    this.titleList = this.regispageList.titleList;
              }
              if(this.util.isNotNullOrEmpty(this.regispageList.provinceList)){
                this.provinceList = this.regispageList.provinceList;
              }
              if(this.util.isNotNullOrEmpty(this.regispageList.educationTypeList)){
                this.educationTypeList = this.regispageList.educationTypeList;
              }

              if(this.util.isNotNullOrEmpty(this.regispageList.sexualDtoList)){
                this.regisSexualList = this.regispageList.sexualDtoList;
              }
              
              
              console.log("Show Success Regispage Case.");
            } else {
              console.log("Response Regispage Not Found.");
              let msg = "Response Regispage Not Found. Please Exit Application and Contact Administor."
              alert(msg);
            }
          },
            error => {
              console.log("Error Service API Regispage Case.");
              let msg = ""
              msg = "Error Service API Regispage Case."
              alert(msg);
            });
    }


    private getDistrict(){
        let param = {
            provinceId :this.regisInfo.candidateProvince
        }
        this.http.httpSend(AppConst.chaseService.registar.getDistrict, param, response => {
            if (this.util.isNotNullOrEmpty(response)) {
              this.districtList = response.districtList;
              console.log("Show Success Regispage Case.");
            } else {
              console.log("Response Regispage Not Found.");
              let msg = "Response Regispage Not Found. Please Exit Application and Contact Administor."
              alert(msg);
            }
          },
            error => {
              console.log("Error Service API Regispage Case.");
              let msg = ""
              msg = "Error Service API Regispage Case."
              alert(msg);
            });
    }

    private registerCandidate(){

        this.http.httpSend(AppConst.chaseService.candidate.saveCandidate, this.regisInfo, response => {
            if (this.util.isNotNullOrEmpty(response)) {
                    if(response.result==1){
                        this.resultSave = true;
                        this.registerId = response.regisId;
                    }
              console.log("Show Success Regispage Case.");
            } else {
              console.log("Response Regispage Not Found.");
              let msg = "Response Regispage Not Found. Please Exit Application and Contact Administor."
              alert(msg);
            }
          },
            error => {
              console.log("Error Service API Regispage Case.");
              let msg = ""
              msg = "Error Service API Regispage Case."
              alert(msg);
            });
    }

    private getSubDistrict(){
        let param = {
            districtId :this.regisInfo.candidateDistrict
        }
        this.getPostal(this.regisInfo.candidateDistrict);
        this.http.httpSend(AppConst.chaseService.registar.getSubDistrict, param, response => {
            if (this.util.isNotNullOrEmpty(response)) {
              this.subDistrictList = response.subDistrictList;
              console.log("Show Success Regispage Case.");
            } else {
              console.log("Response Regispage Not Found.");
              let msg = "Response Regispage Not Found. Please Exit Application and Contact Administor."
              alert(msg);
            }
          },
            error => {
              console.log("Error Service API Regispage Case.");
              let msg = ""
              msg = "Error Service API Regispage Case."
              alert(msg);
            });
    }

    private getPostal(distictId){
        for(let i = 0 ; i<this.districtList.length;i++){
            if(this.districtList[i].districtId==distictId){
                this.regisInfo.candidatePostalCode = this.districtList[i].postalCode;
                break;
            }
        }
    }

    // private alertAsk(){
     
    // }


    public upload (): Promise<any> {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
                var files = (<HTMLInputElement> $('#resumeFile')[0]).files[0];
                formData.append('regisId', this.registerId);
                formData.append('files', files);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', AppConst.chaseService.candidate.uploadFile, true);
            xhr.send(formData);
        });
    }
}