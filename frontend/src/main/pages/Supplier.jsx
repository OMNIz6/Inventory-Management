import { Component } from "react";
import SupplierService from "../service/MainOffice/SupplierService";
import { AddSupplierModal } from "./Modals";

export default class Supplier extends Component{
    constructor(props){
        super(props);
        this.state = {
            suppliers: []
        }
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount(){
        this.getContent();
    }
    getContent(){
        SupplierService.getSupplierList()
        .then((response) => {
            this.setState({
                suppliers: response.data
           })
        })
    }
    render (){
        return(
            <>
                <div className="table-head-con">
                    <p className="table-head-text">Supplier List</p>
                    <AddSupplierModal handler = {this.getContent}/>
                </div>
                <div className="table-container">
                    <div className="table-header">
                        <div className="col-1 t-header">Id</div>
                        <div className="col-2 t-header">Name</div>
                        <div className="col-2 t-header">Phone</div>
                        <div className="col-2 t-header">Email</div>
                        <div className="col-1 t-header">Location</div>
                        <div className="col-2 t-header">Description</div>
                    </div>
                    {this.state.suppliers.map(supplier => 
                        
                    <div className="table-row ">
                        <div className="col-1 t-row">{supplier.supplier_id}</div>
                        <div className="col-2 t-row">{supplier.name}</div>
                        <div className="col-2 t-row">{supplier.phone}</div>
                        <div className="col-2 t-row">{supplier.email}</div>
                        <div className="col-1 t-row">{supplier.location}</div>
                        <div className="col-2 t-row">{supplier.des}</div>
                        <div className="col-2 t-row">
                            <button className="btn-edit text-center" >Edit</button>
                            <button className="btn-edit text-center" >Delete</button>
                        </div>
                    </div>)}
                    
                </div>
            </>
        )
    }
}