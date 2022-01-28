import { API_BASE_URL, Axioinstance } from "../util/Util";

class CategoryService{
    getCategoryList(){
        return Axioinstance.get(API_BASE_URL + "/main/getcategories/")
    }
}
export default new CategoryService();