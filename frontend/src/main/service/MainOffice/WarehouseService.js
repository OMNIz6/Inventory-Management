import { API_BASE_URL, Axioinstance } from "../util/Util";
class WarehouseService{
    getWarehouseList(){
        return Axioinstance.get(API_BASE_URL + "/main/getwarehouses/");
    }

    getWarehouseDashboard(id){
        return Axioinstance.get(API_BASE_URL + "/main/getwarehouse/"+ id);
    }
    restockWarehouse(stocksRequest){
        console.log('stocks added');
        return Axioinstance.post(API_BASE_URL + "/main/restock/", stocksRequest);
    }
    addItem(request){
        console.log('item added');
        return Axioinstance.post(API_BASE_URL + "/main/additemtowarehouse/", request);
    }
    sendStocks(request){
        return  Axioinstance.post(API_BASE_URL + "/main/sendstocks/", request);
    }
    addStocks(request){
        console.log("in the add stock")
        console.log( request)
        return Axioinstance.post(API_BASE_URL + "/main/receivestocks/", request);
    }
    addWarehouse(request){
        return Axioinstance.post(API_BASE_URL + "/main/addwarehouse/", request)
    }
}
export default new WarehouseService();