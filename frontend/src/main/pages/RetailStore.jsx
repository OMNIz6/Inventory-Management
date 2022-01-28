import { Component } from "react";
import { Link } from "react-router-dom";
import RetailStoreService from "../service/MainOffice/RetailStoreService";
import { AddRetailModal } from "./Modals";

export default class RetailStore extends Component{

    constructor(props){
        super(props);
        this.state = {
            stores: []
        }
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount(){
            this.getContent();
        }
    getContent(){
        RetailStoreService.getRetailStoreList()
        .then((response) => {
            console.log(response.data)
            this.setState({
                stores: response.data
            })
           
        })
    }

    render (){
        return(
            <>
            <div className="table-head-con">
                <p className="table-head-text">Retail Store List</p>
                <AddRetailModal handler = {this.getContent}/>
            </div>
            <div className="table-container">
                <div className="table-header">
                    <div className="col-2 t-header">Retail Store</div>
                    <div className="col-3 t-header">Description</div>
                    <div className="col-2 t-header">Location</div>
                    <div className="col-2 t-header text-center">Number of Items</div>
                </div>
                {this.state.stores.map(store => 
                    
                <div className="table-row ">
                    <div className="col-2 t-row">Retail Store {store.retail_id}</div>
                    <div className="col-3 t-row">{store.des}</div>
                    <div className="col-2 t-row">{store.location}</div>
                    <div className="col-2 t-row text-center">{store.itemRetails.length}</div>
                    <div className="col-3 t-row"><Link to={`/main/dashboard/retail/${store.retail_id}`}><button className="btn-view " >View</button></Link></div>
                </div>)}
                
            </div>
        </>
        )
    }
}