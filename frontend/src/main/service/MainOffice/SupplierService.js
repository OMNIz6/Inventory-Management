import { API_BASE_URL, Axioinstance } from "../util/Util";
class SupplierService{
    getSupplierList(){
        return Axioinstance.get(API_BASE_URL + "/main/getsuppliers/")
    }
    addSupplier(request){
        return Axioinstance.post(API_BASE_URL + "/main/addsupplier/", request)
    }
}
export default new SupplierService();