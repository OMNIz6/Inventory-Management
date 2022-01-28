import { Component } from 'react';
import "./SideNavi.css"
import '@fortawesome/fontawesome-free/js/all.js';
import { NavLink } from 'react-router-dom';
import AuthService from './service/auth/AuthService';
export default class SideNavi extends Component{
    render() {
        if(AuthService.getRole() === "ROLE_MAIN"){
        return (
            <nav className='navi-con'>
                
                <div className='nav-item-holder text-center'>
                    <NavLink to="/main/dashboard/warehouse/1">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-columns "></i></p>
                            <p className='nav-text'>Dashboard</p>
                        </div>
                    </NavLink>
                </div>
                <div className='nav-item-holder text-center'>
                    <NavLink to="/main/warehouse">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-warehouse"></i></p>
                            <p className='nav-text'>Warehouse</p>
                        </div>
                    </NavLink>
                </div>
                <div className='nav-item-holder text-center'>
                    <NavLink to="/main/retailstore">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-store"></i></p>
                            <p className='nav-text'>Retail Store</p>
                        </div>
                    </NavLink>
                </div>
                <div className='nav-item-holder text-center'>
                    <NavLink to="/main/items">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-wine-bottle"></i></p>
                            <p className='nav-text'>Items</p>
                        </div>
                    </NavLink>
                </div>
                {/* <div className='nav-item-holder text-center'>
                    <NavLink to="/main/categories">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-sitemap"></i></p>
                            <p className='nav-text'>Categories</p>
                        </div>
                    </NavLink>
                </div> */}
                <div className='nav-item-holder text-center'>
                    <NavLink to="/main/suppliers">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-truck"></i></p>
                            <p className='nav-text'>Suppliers</p>
                        </div>
                    </NavLink>
                </div>
                <div className='nav-item-holder text-center'>
                    <NavLink to="/main/request">
                        <div className='nav-item-con'>
                            <p className='nav-icon'><i className="fas fa-comment"></i></p>
                            <p className='nav-text'>Requests</p>
                        </div>
                    </NavLink>
                </div>
                
            </nav>
        )
        }else{
            return(
                <nav className='navi-con'>
                    
                    <div className='nav-item-holder text-center'>
                        <NavLink to="/store/dashboard">
                            <div className='nav-item-con'>
                                <p className='nav-icon'><i className="fas fa-columns "></i></p>
                                <p className='nav-text'>Dashboard</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className='nav-item-holder text-center'>
                        <NavLink to="/store/request">
                            <div className='nav-item-con'>
                                <p className='nav-icon'><i className="fas fa-comment"></i></p>
                                <p className='nav-text'>Requests</p>
                            </div>
                        </NavLink>
                    </div>
                </nav>
            )
        }
    }
}