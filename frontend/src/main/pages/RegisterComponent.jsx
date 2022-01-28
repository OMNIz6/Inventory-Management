import { Component } from "react";
import './FormComponent.css';
import { Link } from "react-router-dom";
import AuthService from "../service/auth/AuthService.js";

export default class RegisterComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            email : "",
            password : "",
            role : "" ,
            merror: "" 
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        
        this.setState({
            [inputName] : inputValue
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state.email);
        const regRequest = Object.assign({}, this.state);
        
        AuthService.registerUser(regRequest)
        .then(
            response =>{
                window.location.href= "/login"
            }
        ).catch(error => {
            this.setState({
                merror : error.response.data
            })
            
        });
    }

    render(){
        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup with Jumpstart</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-item">
                            <input type="email" name="email" 
                                className="form-control" placeholder="Email"
                                value={this.state.email} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="password" name="password" 
                                className="form-control" placeholder="Password"
                                value={this.state.password} onChange={this.handleInputChange}  required/>
                        </div>
                        <div className="form-item">
                            <input type="password" name="cpassword" 
                                className="form-control" placeholder="Confirm Password"
                                 required/>
                        </div>
                        <div className="form-item">
                            <select name="role" id="cars"  className="form-select form-select-sm" value={this.state.role} onChange={this.handleInputChange} >
                                <option selected disabled>Choose a Position</option>
                                <option value="main">Main Office Employee</option>
                                <option value="retail">Retail Store Employee</option>
                            </select>
                        </div>
                        <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                        <div className="form-item">
                            <button type="submit" className="btn-block" >Sign Up</button>
                        </div>
                        <div className="form-item ferror">
                            {this.state.merror.message}
                        </div>
                    </form>             
                    
                </div>
            </div>
        );
    }
}