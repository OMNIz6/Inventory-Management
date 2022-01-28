import { API_BASE_URL, Axioinstance } from "../util/Util";
class ItemService{
    getItemList(){
        return Axioinstance.get(API_BASE_URL + "/main/getitems/")
    }
    getNotAddedItem(id){
        return Axioinstance.get(API_BASE_URL + "/main/getnonincludeditem/"+ id)
    }
    getSuppliableItems(rid, wid){
        return Axioinstance.post(API_BASE_URL + "/main/getsuppliableitems/"+ rid+"/"+wid)
    }
    addItem(request){
        return Axioinstance.post(API_BASE_URL + "/main/additem/", request)
    }
}
export default new ItemService();