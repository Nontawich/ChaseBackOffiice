export const serviceAddress =  "http://localhost:8080/ChaseService"
export const HTTPType: String = "POST"; // "GET", "POST"
export const TimeOutHttp = 30000; //1000 = 1 sec
export const isDev = true;
export const saveDir = {
    temp: "temp",
    userData: "mars_user_data",
    notidata: "mars_notification_data",
}
export const httpHeader = {
    post: {
        contentType: "application/json"
    },
    postwithform: {
        contentType: "multipart/form-data"
    },
    get: {}
}
export const chaseService = {
    menu: {
        getMenu: serviceAddress + "/master/getMenu"
    },
    registar: {
        getRegispage: serviceAddress + "/master/getMasterRegisterList",
        getDistrict: serviceAddress + "/master/getDistrictByProvince",
        getSubDistrict: serviceAddress + "/master/getSubDistrictByDistrict"
    },
    candidate: {
        saveCandidate: serviceAddress + "/register/saveCandidate",
        uploadFile: serviceAddress + "/register/uploadFile",
        getCandidateList : serviceAddress + "/register/getCandidateList",
        getCandidateDetail : serviceAddress + "/register/getCandidateDetail"
    },
};

export const REGIS_FORM = 
{
    candidateTitleId  :  "",
    candidateName   :  "",
    candidateSurName   :  "",
    candidateIdCard   :  "",
    candidateBirthDate  :  "",
    candidateAddressNo  :  "",
    candidateDistrict  :  "",
    candidateSubDistrict  :  "",
    candidateProvince  :  "",
    candidatePostalCode  :  "",
    expectSalary  :  "",
    candidatePicture  :  "",
    candidateEmail  :  "",
    candidatePhone  :  "",
    candidateMobile  :  "",
    experience  :  "",
    avaliableId  :  "",
    sexual  :  "",
    education  :  {
        educationType : "",
        educationFaculty : "",
        educationBranch : "",
        educationInstitute : "",
        educationStart : "",
        educationEnd : "",
        educationGpa : "",
    },
    jobDto  :  []
}


export const SEARCH_FORM = 
{
    registerDate  :  "",
    fullName   :  "",
    idCard   :  ""
}
