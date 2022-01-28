import { API_BASE_URL, Axioinstance } from "../util/Util";
class RetailService{

    getRetailStoreDashboard(id){
        return Axioinstance.get(API_BASE_URL + "/retail/getretailstore/"+ id);
    }
    getRetailStore(email){
        return Axioinstance.get(API_BASE_URL + "/retail/getstore/"+ email);
    }
    getRetailStoreById(id){
        return Axioinstance.get(API_BASE_URL + "/retail/getstorebyid/"+ id);
    }
    getNotAddedItem(id){
        console.log(id);
        return Axioinstance.get(API_BASE_URL + "/retail/getnonincludeditem/"+ id)
    }
    addItem(request){
        console.log('item added');
        return Axioinstance.post(API_BASE_URL + "/retail/additemtostore/", request);
    }
    getRetailRequests(id){
        return Axioinstance.get(API_BASE_URL + "/retail/getretailrequests/"+ id);
    }
    addRetailRequest(request){
        return Axioinstance.post(API_BASE_URL + "/retail/makerequests/", request);
    }
    deleteRetailRequest(request){
        return Axioinstance.post(API_BASE_URL + "/retail/deleterequests/", request);
    }
    deleteRetailItem(request){
        return Axioinstance.post(API_BASE_URL + "/retail/deleteitem/", request);
    }
}
export default new RetailService();