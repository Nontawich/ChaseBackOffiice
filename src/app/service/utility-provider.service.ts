import { Injectable } from '@angular/core';
import * as AppConst from './../appConstrant';

@Injectable()
export class UtilityProviderService {

  constructor() { }

  public isNotNullOrEmpty(value) //check is not null or empty string
  {
    if (value !== undefined && value !== null && value !== "null" && value !== "{}" && value !== "") {
      return true;
    }
    return false;
  }


  public ynToBool(yn): boolean
  {
    yn = yn.toLowerCase();
    return yn == "y" ? true : yn == "n" ? false : null;
  }


  public boolToYN(bool) {
    return bool ? "Y" : "N";
  }
  public validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  
  /**
   * 
   * @param obj  Cast object to Array 1 length
   * Cast object to Array 1 length
   */
  public objToArr(obj) {

    if (obj !== undefined) {
      let arr = new Array();
      arr.push(obj);

      return arr;
    }
  }

  public tmpInitPage: string = "Event init Page.";
  public eventInitPage() {
    console.log(this.tmpInitPage);
  }

  public changeEventInitPage(value) {
    this.tmpInitPage = value;
  }


  public sumArray(values): number {
    let result = 0;
    values.forEach(element => { result += Number(element.price); });
    return result;
  }
  public formatDate = function (date, locale) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (locale === "bc" || locale === "BC") {
      year = Number(year) + 543;
    }
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };
  public removetext = function (sym, value) {
    return value.replace(sym, "");
  };

  public telTo(tel = null) {
    if (this.isNotNullOrEmpty(tel)) {
      window.location.href = "tel:" + tel;
      console.log("=> go tel:" + tel);
    }
  }
  public mailTo(mail = null) {
    if (this.isNotNullOrEmpty(mail)) {
      window.location.href = "mailto:" + mail;
      console.log("=> go mailto:" + mail);
    }
  }

}
