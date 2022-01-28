import { Component } from "react";
import './Dashboard.css'
import {withRouter} from '../service/util/Util'
import WarehouseService from "../service/MainOffice/WarehouseService";
import {RestockModal,AddWareItemModal, SendItemFromWareModal} from "./Modals";
class WDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            warehouses:[],
            id: parseInt(this.props.params.id),
            items: [],
            stocks:[],
            overstocked:[],
            outstocked:[]
        }
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount(){
        this.getContent();
    }

    getContent(){
        WarehouseService.getWarehouseList()
            .then((response) => {
                this.setState({
                    warehouses: response.data
                });
            
        })

        WarehouseService.getWarehouseDashboard(this.state.id)
            .then((response) => {
                this.setState({
                    items: response.data
                });

            this.stocksFilter();
            this.getOverStocks();

        })
    }

    stocksFilter=()=>{
        let stocks = [];
        for (let i = 0; i < this.state.items.length; i++) {
            let item = this.state.items[i];
            for (let  j = 0; j < item.itemWare.length;  j++) {
                let itemWare = item.itemWare[j];
                if (itemWare.id.warehouseid === this.state.id) stocks.push(itemWare) ;
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
    }
    changeWarehouse=(id)=>{
        window.location.href= `/main/dashboard/warehouse/${id}`;
    }
    render (){
        return(
            <div>
                <div className="ware-select-con">
                    <select className="form-select ware-select" >
                    <option value="" selected disabled hidden>Warehouse {this.state.id}</option>
                    {this.state.warehouses.map(ware => 
                        <option value="main" onClick={ () => this.changeWarehouse(ware.warehouse_id) }>
                            Warehouse {ware.warehouse_id}
                        </option>
                    )}
                    </select>
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
                    <AddWareItemModal id = {this.state.id} handler = {this.getContent}/>
                    <SendItemFromWareModal handler = {this.getContent} id = {this.state.id} />
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
                        
                        {item.itemWare.map( iw =>
                            iw.id.warehouseid === this.state.id && 
                                <>
                                    <div className="col-1 t-row">{iw.stocks}</div>
                                    <div className="col-2 t-row">
                                        {/* <button className="btn-stocks-add" onClick={handleOpen}>Restock</button> */}
                                        <RestockModal handler = {this.getContent} id= {iw.id}/>
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

export default withRouter(WDashboard);