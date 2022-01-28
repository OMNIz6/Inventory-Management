import { Component } from "react";
import './Warehouse.css'
import WarehouseService from "../service/MainOffice/WarehouseService";
import { Link } from "react-router-dom";
import { AddWareModal } from "./Modals";
export default class Warehouse extends Component{
    constructor(props){
        super(props);
        this.state = {
            warehouses: []
        }
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount(){
       this.getContent();
    }
    getContent(){
        WarehouseService.getWarehouseList()
        .then((response) => {
            console.log(response.data)
            this.setState({
                warehouses: response.data
           })
           
        })
    }
    render (){
        return(
            <>
            <div className="table-head-con">
                <p className="table-head-text">Warehouse List</p>
                <AddWareModal handler = {this.getContent}/>
            </div>
            <div className="table-container">
                <div className="table-header">
                    <div className="col-2 t-header">Warehouse</div>
                    <div className="col-3 t-header">Description</div>
                    <div className="col-2 t-header">Location</div>
                    <div className="col-2 t-header text-center">Number of Items</div>
                </div>
                {this.state.warehouses.map(warehouse => 

                <div className="table-row ">
                    <div className="col-2 t-row">Warehouse {warehouse.warehouse_id} </div>
                    <div className="col-3 t-row">{warehouse.des}</div>
                    <div className="col-2 t-row">{warehouse.location}</div>
                    <div className="col-2 t-row text-center">{warehouse.itemWares.length}</div>
                    <div className="col-3 t-row"><Link to={`/main/dashboard/warehouse/${warehouse.warehouse_id}`}><button className="btn-view " >View</button></Link></div>
                </div>
                )}
                
                
            </div>
        </>
        )
    }
}