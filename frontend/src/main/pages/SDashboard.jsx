import { Component } from "react";
import './Dashboard.css'
import {withRouter} from '../service/util/Util'
import RetailService from "../service/Retail/RetailService";
import { AddRetailItemModal, ErrorModal } from "./Modals";
class SDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            retail:[],
            items: [],
            stocks:[],
            overstocked:[],
            outstocked:[],
            id: null
        }
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount(){
            this.getContent();
        }

        getContent(){
            RetailService.getRetailStore(localStorage.getItem('authenticatedUser'))
            .then((response) => {
                console.log(response.data)
                this.setState({
                    retail: response.data,
                    id: response.data.retail_id
                });

                console.log(this.state);

                RetailService.getRetailStoreDashboard(this.state.id)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        items: response.data
                    });
                this.stocksFilter();
                this.getOverStocks();
                })

            })
        }

    stocksFilter=()=>{
        let stocks = [];
        for (let i = 0; i < this.state.items.length; i++) {
            let item = this.state.items[i];
            for (let  j = 0; j < item.itemRetail.length;  j++) {
                let itemRetail = item.itemRetail[j];
                if (itemRetail.id.retailId === this.state.id) stocks.push(itemRetail) ;
            }
            
        }
        this.setState({
            stocks : stocks
        })
    }
    getOverStocks=()=>{
        let ostocks = [];
        let mstocks = [];
        for (let i = 0; i < this.state.stocks.length; i++) {
            let stock = this.state.stocks[i];
            if (stock.stocks > stock.maxStocks) ostocks.push(stock);
            else if (stock.stocks < stock.minStocks) mstocks.push(stock)
        }
        this.setState({
            overstocked:ostocks,
            outstocked:mstocks
        })
        console.log(this.state)
    }
    changeWarehouse=(id)=>{
        window.location.href= `/dashboard/retail/${id}`;
    }
    
    render (){
        return(
            <div>
                <div className="ware-select-con">
                    {/* <select className="form-select ware-select" >
                    <option value="" selected disabled hidden>Retail Store {this.state.id}</option>
                    {this.state.retails.map(retail => 
                        <option value="main" onClick={ () => this.changeWarehouse(retail.retail_id) }>
                            Retail Store {retail.retail_id}
                        </option>
                    )}
                    </select> */}
                </div>
                <div className="board-con text-center">
                    <div className="board">
                        <div className="total-board">
                            <p className="board-text">Total Products</p>
                            <p className="board-number">{this.state.items.length}</p>
                        </div>
                    </div>
                    <div className="board">
                        <div className="over-board">
                            <p className="board-text">Product Overstocked</p>
                            <p className="board-number">{this.state.overstocked.length}</p>
                        </div>
                    </div>
                    <div className="board">
                        <div className="out-board">
                            <p className="board-text">Product Out of Stock </p>
                            <p className="board-number">{this.state.outstocked.length}</p>
                        </div>
                    </div>
                </div>
                <div className="inv-head-con">
                    <p className="inv-head-text">Inventory List</p>
                    <AddRetailItemModal id = {this.state.id} handler = {this.getContent}/>
                </div>
                <div className="inv-container">
                    <div className="table-header">
                        <div className="col-1 t-header">Id</div>
                        <div className="col-2 t-header">Item</div>
                        <div className="col-3 t-header">Description</div>
                        <div className="col-2 t-header">Supplier</div>
                        <div className="col-1 t-header">Price</div>
                        <div className="col-1 t-header">Stocks</div>
                    </div>
                    {this.state.items.map(item => 
                    <div className="table-row ">
                        <div className="col-1 t-row">{item.item_id}</div>
                        <div className="col-2 t-row">{item.name}</div>
                        <div className="col-3 t-row">{item.des}</div>
                        <div className="col-2 t-row">{item.supplier.name}</div>
                        <div className="col-1 t-row">{item.price}$</div>
                        
                        {item.itemRetail.map( ir =>
                            ir.id.retailId === this.state.id && 
                            <>
                                <div className="col-1 t-row">{ir.stocks}</div>
                                <div className="col-2 t-row">
                                    <ErrorModal message="The stocks must be empty to delete this item" handler = {this.getContent} ir = {ir}/>
                                </div>
                            </>
                        )}
                        
                        
                     </div>   
                    )}
                </div>
            </div>
        )
        }
}

export default withRouter(SDashboard);