import { Component } from "react";
import ItemService from "../service/MainOffice/ItemService";
import "./Item.css"
import { AddItemFormModal } from "./Modals";
export default class Item extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: []
        }
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount(){
        this.getContent();
    }
    getContent(){
        ItemService.getItemList()
            .then((response) => {
                this.setState({
                    items: response.data
               })
               console.log(response.data)
            })
    }


    render (){
        return(
            <>
                <div className="table-head-con">
                    <p className="table-head-text">item List</p>
                    <AddItemFormModal handler = {this.getContent}/> 
                </div>
                <div className="table-container">
                    <div className="table-header">
                        <div className="col-1 t-header">Id</div>
                        <div className="col-2 t-header">Name</div>
                        <div className="col-1 t-header">Category</div>
                        <div className="col-2 t-header">Description</div>
                        <div className="col-1 t-header">Price</div>
                        <div className="col-1 t-header">Date</div>
                        <div className="col-2 t-header">Supplier</div>
                    </div>
                    {this.state.items.map(item => 
                    <div className="table-row ">
                        <div className="col-1 t-row">{item.item_id}</div>
                        <div className="col-2 t-row">{item.name}</div>
                        <div className="col-1 t-row">{item.category.name}</div>
                        <div className="col-2 t-row">{item.des}</div>
                        <div className="col-1 t-row">${item.price}</div>
                        <div className="col-1 t-row">{item.addedDate}</div>
                        <div className="col-2 t-row">{item.supplier.name}</div>
                        <div className="col-2 t-row">
                            <button className="btn-edit text-center" >Edit</button>
                            <button className="btn-edit text-center" >Delete</button>
                        </div>
                    </div>
                    )}
                    
                </div>
            </>
        )
    }
}