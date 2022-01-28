import {API_BASE_URL, ACCESS_TOKEN, Axioinstance} from "../util/Util"
import { Component } from "react";

class AuthService extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.logout = this.logout.bind(this)
    }
    registerUser(regRequest){
        return Axioinstance.post(API_BASE_URL + "/auth/register/",regRequest)
    }
    loginUser(loginRequest){
        return Axioinstance.post(API_BASE_URL + "/auth/login/", loginRequest)
    }
    saveLogin(email, token, role) {
        console.log("login successful")
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem('authenticatedUser', email);
        localStorage.setItem('userRole', role);
        // sessionStorage.setItem('authenticatedUser', username)
        //this.setupAxiosInterceptors(this.createJWTToken(token))
        
    }
    

    isAuthenticated(){
        if(localStorage.getItem(ACCESS_TOKEN)){
            return true;
        }else{
            return false;
        }
    }

    getRole(){
        return localStorage.getItem('userRole')
    }

    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem("userRole");
        console.log(this.isAuthenticated());
        window.location.href= "/login"
    }
}
export default new AuthService();