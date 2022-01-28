import { API_BASE_URL, Axioinstance } from "../util/Util";

class RequestService{
    getRequests(){
        return Axioinstance.get(API_BASE_URL + "/main/getrequests/")
    }
}

export default new RequestService();