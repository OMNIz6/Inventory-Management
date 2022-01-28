import { Component } from "react";
import RegisterComponent from "./pages/RegisterComponent";
import LoginComponent from "./pages/LoginComponent";

import { Route, Navigate, Routes, Outlet } from 'react-router-dom';
import AuthService from "./service/auth/AuthService";
import WDashboard from "./pages/WDashboard";
import Header from "./Header";
import "./JumpstartApp.css"
import SideNavi from "./SideNavi";
import Category from "./pages/Category";
import RetailStore from "./pages/RetailStore";
import Warehouse from "./pages/Warehouse"
import Item from "./pages/Item";
import Supplier from "./pages/Supplier";
import RDashboard from "./pages/RDashboard";
import SDashboard from "./pages/SDashboard";
import RetailRequest from "./pages/RetailRequest";
import AllRequest from "./pages/AllRequest";

export default class JumpstartApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render (){
        
        return(
            <Routes>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/register" element={<RegisterComponent/>}/>
                <Route exact path='/'  element={<PrivateRoute />}>
                    <Route exact path='/'   element={<Navigate to="/main" />}/>

                    <Route exact path='/main'  element={<MainRoute />}>
                        <Route exact path='/main'   element={<Navigate to="/main/dashboard/warehouse/1" />}/>
                        <Route exact path={"/main/dashboard/warehouse/:id"}   element={<WDashboard />}/>
                        <Route exact path={"/main/dashboard/retail/:id"}   element={<RDashboard />}/>
                        <Route exact path='/main/items'   element={<Item />}/>
                        <Route exact path='/main/categories'   element={<Category />}/>
                        <Route exact path='/main/warehouse'   element={<Warehouse />}/>
                        <Route exact path='/main/retailstore'   element={<RetailStore />}/>
                        <Route exact path='/main/suppliers'   element={<Supplier />}/>
                        <Route exact path='/main/request'   element={<AllRequest />}/>
                    </Route>

                    <Route exact path='/store'  element={<RetailRoute />}>
                        <Route exact path='/store'   element={<Navigate to="/store/dashboard" />}/>
                        <Route exact path={"/store/dashboard"}   element={<SDashboard />}/>
                        <Route exact path={"/store/request"}   element={<RetailRequest />}/>
                    </Route>
                    
                    
                </Route>
            </Routes>
        )
    }
   
    
}

const PrivateRoute = () => {
    let auth = AuthService.isAuthenticated(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ?
        <div className="content-body">
            <Header/>
            
            <div className="content-con">
                <SideNavi/>
                <div className="content"><Outlet /></div>
                
            </div>
        </div>      
    : <Navigate to="/login" />;
}
const MainRoute = () => {
    let auth = AuthService.getRole();
    return auth === "ROLE_MAIN" ?<Outlet /> : <Navigate to="/store" />;
}
const RetailRoute = () => {
    let auth = AuthService.getRole();
    return auth === "ROLE_RETAIL"?<Outlet /> : <Navigate to="/main" />;
}
    