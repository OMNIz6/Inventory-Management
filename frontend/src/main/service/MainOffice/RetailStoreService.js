import { API_BASE_URL, Axioinstance } from "../util/Util";
class RetailStoreService{
    getRetailStoreList(){
        return Axioinstance.get(API_BASE_URL + "/main/getretailstores/")
    }

    getRetailStoreDashboard(id){
        return Axioinstance.get(API_BASE_URL + "/main/getretailstore/"+ id);
    }
    getRetailStore(email){
        return Axioinstance.get(API_BASE_URL + "/retail/getstore/"+ email);
    }
    addRetailStore(request){
        return Axioinstance.post(API_BASE_URL + "/main/addretail/", request)
    }
}
export default new RetailStoreService();