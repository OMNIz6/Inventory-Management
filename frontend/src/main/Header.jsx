import './Header.css'
import { Component } from 'react';
import AuthService from './service/auth/AuthService';
export default class Header extends Component{
    render() {
    return (
        <header className="header-con">
            <div className="logo-con">
                    <div className="logo-holder">
                        <p className='logo text-center'>Jumpstart</p>
                    </div>
                </div> 
            <button onClick={AuthService.logout} className="btn-out" >Log out</button>   
        </header>
    )
    }
}