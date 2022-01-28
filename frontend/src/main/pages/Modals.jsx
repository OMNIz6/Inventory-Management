import { Component } from "react";
import { Modal } from "react-bootstrap";
import CategoryService from "../service/MainOffice/CategoryService";
import SupplierService from "../service/MainOffice/SupplierService";
import ItemService from "../service/MainOffice/ItemService";
import RetailStoreService from "../service/MainOffice/RetailStoreService";
import WarehouseService from "../service/MainOffice/WarehouseService";
import RetailService from "../service/Retail/RetailService";

export class RestockModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            isOpen : false,
            stocks :''
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const stocksRequest = Object.assign({},{id : this.state.id,stocks: this.state.stocks});
        console.log(stocksRequest)
        WarehouseService.restockWarehouse(stocksRequest)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
        console.log(this.state);
        
    }
    render (){
        return(
            <>
                <button className="btn-stocks-add" onClick={this.showModal}>Restock</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Fill the amount
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <input type='number' name='stocks' onChange={this.handleInputChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddWareItemModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            wid: this.props.id,
            itemid: 0,
            items: [],
            isOpen : false,
            maxStocks :'',
            minStocks :''
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        ItemService.getNotAddedItem(this.state.wid)
            .then((response) => {
                this.setState({
                    items : response.data
                })
            })
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const id = Object.assign({},{itemid : this.state.itemid,warehouseid: this.state.wid});
        const request = Object.assign({},{id : id,stocks: 0, maxStocks : this.state.maxStocks,minStocks :this.state.minStocks});
        console.log(request)
        WarehouseService.addItem(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
        console.log(this.state);
        
    }
    addItem=(id)=>{
        this.setState({
            itemid : id
        })
    }
    render (){
        return(
            <>
                <button className="btn-item-add" onClick={this.showModal} >Add Item</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Add Item to Inventory
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <input type='number' name='maxStocks' placeholder="Maximum Stocks" onChange={this.handleInputChange}/>
                        <input type='number' name='minStocks' placeholder="Minimum Stocks" onChange={this.handleInputChange}/>
                        <select className="form-select ware-select" >
                            <option value="" selected disabled hidden>Select Item</option>
                            {this.state.items.map(item => 
                                <option className="row" value="main" onClick={ () => this.addItem(item.item_id) }>
                                    {item.name}
                                    
                                </option>
                            )}
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddRetailItemModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            rid: this.props.id,
            itemid: 0,
            items: [],
            isOpen : false,
            maxStocks :'',
            minStocks :''
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.setState({
                rid: this.props.id
            })
        }
    }

    getItem(){
        RetailService.getNotAddedItem(this.state.rid)
        .then((response) => {
            this.setState({
                items : response.data
            })
        })
    }

    showModal=()=>{
        this.setState({
            isOpen :true
        })
        this.getItem();
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const id = Object.assign({},{itemId : this.state.itemid,retailId: this.state.rid});
        const request = Object.assign({},{id : id,stocks: 0, maxStocks : this.state.maxStocks,minStocks :this.state.minStocks});
        console.log(request)
        RetailService.addItem(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
        console.log(this.state);
        
    }
    addItem=(id)=>{
        this.setState({
            itemid : id
        })
    }
    render (){
        return(
            <>
                <button className="btn-item-add" key={this.props.id} onClick={this.showModal} >Add Item</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Fill the amount
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <input type='number' name='maxStocks' placeholder="Maximum Stocks" onChange={this.handleInputChange}/>
                        <input type='number' name='minStocks' placeholder="Minimum Stocks" onChange={this.handleInputChange}/>
                        <select className="form-select ware-select" >
                            <option value="" selected disabled hidden>Select Item</option>
                            {this.state.items.map(item => 
                                <option className="row" value="main" onClick={ () => this.addItem(item.item_id) }>
                                    {item.name}
                                    
                                </option>
                            )}
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class SendItemFromWareModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            wid: this.props.id,
            rid: 0,
            isOpen : false,
            rsupplies :[],
            wsupplies :[],
            stores:[],
            sitems: []
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        RetailStoreService.getRetailStoreList()
        .then((response) => {
            this.setState({
                stores: response.data
            });

        })
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=()=>{
        WarehouseService.sendStocks(this.state.wsupplies)
            .then((response) => {
                this.makeRsupplies(this.state.wsupplies);
                WarehouseService.addStocks(this.state.rsupplies)
                    .then((response) => {

                        this.closeModal();
                        this.props.handler();
                    });
            })
    }
    handleInputChange=( iwid, e)=>{

        const target = e.target;
        const inputValue = target.value;
        let iw = Object.assign({},{id :iwid , stocks: inputValue});
        let warray  = this.state.wsupplies;

        if(warray.find(e => e.id === iw.id)){    
            warray[warray.findIndex(e => e.id === iw.id)] = iw;
            this.setState({
                wsupplies: warray
            });
        }else{
            warray.push(iw);
            this.setState({
                wsupplies : warray
            })
        }
        
    }

    makeRsupplies(array){
        let rarray = array;
        let id;
        console.log(rarray);
        for (let i = 0; i < rarray.length; i++) {
            id = Object.assign({},{itemId: rarray[i].id.itemid, retailId: this.state.rid});
            rarray[i].id = id;
        }
        
        this.setState({
            rsupplies: rarray
        })

    }

    addStoreId=(id)=>{
        this.setState({
            rid: id
        })
        ItemService.getSuppliableItems(id, this.state.wid)
        .then((response) => {
            this.setState({
                sitems: response.data
            });
        })
    }
    render (){
        return(
            <>
                <button className="btn-item-send" onClick={this.showModal}>Send Item</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Send Supply
                        </Modal.Title>
                    </Modal.Header>
                    <form >
                    <Modal.Body>
                        <select className="form-select ware-select" >
                            <option value="" disabled hidden>Choose Store to send supplies</option>
                            {this.state.stores.map(store => 
                                <option value="main" onClick={ () => this.addStoreId(store.retail_id) }>
                                    Retail Store {store.retail_id}
                                    
                                </option>
                            )}
                        </select>
                        <div className="table-header">
                            <div className="col-1 t-header">Id</div>
                            <div className="col-4 t-header">Item</div>
                            <div className="col-2 t-header">Warehouse Stocks</div>
                        </div>
                        {this.state.sitems.map(item => 
                        <div className="table-row ">
                            <div className="col-1 t-row">{item.item_id}</div>
                            <div className="col-4 t-row">{item.name}</div>
                            {item.itemWare.map( iw => iw.id.warehouseid === this.state.wid && 
                                <>
                                    <div className="col-2 t-row">{iw.stocks}</div>
                                    <input type="hidden" name="id" value= {iw.id} />
                                    <input type='number' className="col-3 t-row" 
                                        onChange={(e)=> this.handleInputChange(iw.id , e)} name='stocks' />
                                </>
                                    
                                    
                            )}
                            
                        </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="button" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddRetailModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            des :'',
            location:''
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const request = Object.assign({},{ des: this.state.des, location: this.state.location});
        console.log(request)
        RetailStoreService.addRetailStore(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
        
    }
    render (){
        return(
            <>
                <button className="btn-item-add" onClick={this.showModal}>Add</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Fill the amount
                        </Modal.Title>
                    </Modal.Header>
                    <form >
                    <Modal.Body>
                        <input type='text' name='des' onChange={this.handleInputChange}/>
                        <input type='text' name='location' onChange={this.handleInputChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="button" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddWareModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            des :'',
            location:''
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const request = Object.assign({},{ des: this.state.des, location: this.state.location});
        console.log(request)
        WarehouseService.addWarehouse(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
        
    }
    render (){
        return(
            <>
                <button className="btn-item-add" onClick={this.showModal}>Add</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Fill the amount
                        </Modal.Title>
                    </Modal.Header>
                    <form >
                    <Modal.Body>
                        <input type='text' name='des' onChange={this.handleInputChange}/>
                        <input type='text' name='location' onChange={this.handleInputChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="button" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddItemFormModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            name:'',
            des :'',
            price:null,
            category:{},
            supplier:{},
            categories: [],
            suppliers: []
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        CategoryService.getCategoryList()
        .then((response) => {
            this.setState({
                categories: response.data
            })
        });
        SupplierService.getSupplierList()
        .then((response) => {
            this.setState({
                suppliers: response.data
            })
        });
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const request = Object.assign({},{
            name: this.state.name, 
            des: this.state.des, 
            price: this.state.price,
            category: this.state.category,
            supplier: this.state.supplier
        });
        ItemService.addItem(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })

    }
    handleSelectChange=(obj, e)=>{

        const inputName = e.target.getAttribute('name');
        this.setState({
            [inputName]: obj
        })
        console.log(this.state);
    }
    render (){
        return(
            <>
                <button className="btn-item-add" onClick={this.showModal}>Add Item</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Add Item Form
                        </Modal.Title>
                    </Modal.Header>
                    <form >
                    <Modal.Body>
                        <input type='text' name='name' placeholder="Name" onChange={this.handleInputChange}/>
                        <input type='number' name='price'  placeholder="Price" onChange={this.handleInputChange}/>
                        <input type='text' name='des'  placeholder="Description" onChange={this.handleInputChange}/>
                        
                        <select className="form-select ware-select"  >
                            <option  selected disabled hidden>Choose Store to send supplies</option>
                            {this.state.categories.map(cat => 
                                <option name="category" onClick={(e)=> this.handleSelectChange(cat , e)}>
                                    {cat.name}
                                </option>
                            )}
                        </select>
                        <select className="form-select ware-select" >
                            <option selected disabled hidden>Choose Store to send supplies</option>
                            {this.state.suppliers.map(sup => 
                                <option value={sup} name="supplier" onClick={(e)=> this.handleSelectChange(sup , e)}>
                                    {sup.name}
                                </option>
                            )}
                        </select>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="button" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddSupplierModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            name:'',
            phone :'',
            email:'',
            location:'',
            des:''
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const request = Object.assign({},{
            name: this.state.name, 
            phone: this.state.phone, 
            email: this.state.email,
            location: this.state.location,
            des: this.state.des
        });
        SupplierService.addSupplier(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
    }
    
    render (){
        return(
            <>
                <button className="btn-item-add" onClick={this.showModal}>Add Item</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Add Supplier Form
                        </Modal.Title>
                    </Modal.Header>
                    <form >
                    <Modal.Body>
                        <input type='text' placeholder="name" name='name' onChange={this.handleInputChange}/>
                        <input type='text' placeholder="phone" name='phone' onChange={this.handleInputChange}/>
                        <input type='text' placeholder="email" name='email' onChange={this.handleInputChange}/>
                        <input type='text' placeholder="location" name='location' onChange={this.handleInputChange}/>
                        <input type='text' placeholder="des" name='des' onChange={this.handleInputChange}/>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="button" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class AddRetailRequestModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            rid: this.props.id,
            isOpen : false,
            items: [],
            sitems: [],
            message :'',
            stocks :null,
            retail:{}
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.setState({
                rid: this.props.id
            })
        }
    }

    getItem(){
        RetailService.getRetailStoreById(this.state.rid)
        .then((response) => {
            this.setState({
                retail : response.data
            })
        })
        RetailService.getRetailStoreDashboard(this.state.rid)
        .then((response) => {
            this.setState({
                items : response.data
            })
        })
    }

    showModal=()=>{
        this.setState({
            isOpen :true
        })
        this.getItem();
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const request = Object.assign({},{
            message: this.state.message,
            stocks: this.state.stocks, 
            retail: this.state.retail,
            items: this.state.sitems
        });
        console.log(request)
        RetailService.addRetailRequest(request)
            .then((response) => {

                this.closeModal();
                this.props.handler();
            });
    }
    handleInputChange=(event)=>{

        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        })
        console.log(this.state);
        
    }
    handleCheckBox =(item)=>{
        let iarray = this.state.sitems;
        if(iarray.find((i)=>i===item)){
            console.log('remove')
            iarray.splice(iarray.findIndex((i)=>i===item), 1)
        }else{
            console.log('add')
            iarray.push(item);
        }

        this.setState({
            sitem: iarray
        })

    }
    addItem=(id)=>{
        this.setState({
            itemid : id
        })
    }
    render (){
        return(
            <>
                <button className="btn-item-add" key={this.props.id} onClick={this.showModal} >Add Item</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Retail Request Form
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <input type='text' name='message' placeholder="Message" onChange={this.handleInputChange}/>
                        <input type='number' name='stocks' placeholder="Stocks" onChange={this.handleInputChange}/>
                        <div className="table-header">
                            <div className="col-1 t-header">Id</div>
                            <div className="col-8 t-header">Item</div>
                        </div>
                        {this.state.items.map(item => 
                        <div className="table-row ">
                            <div className="col-1 t-row">{item.item_id}</div>
                            <div className="col-8 t-row">{item.name}</div>
                            <div><input type='checkbox' placeholder="Stocks" onClick={() => this.handleCheckBox(item)}/></div>
                        </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}

export class ErrorModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            message :this.props.message,
            entity :this.props.ir
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    showModal=()=>{
        this.setState({
            isOpen :true
        })
    }
    closeModal=()=>{
        this.setState({
            isOpen :false
        })
    }
    deleteItem(ir){
        console.log(ir.stocks === 0);
        if(ir.stocks === 0){
            RetailService.deleteRetailItem(ir);
            this.props.handler();
        }else{
            this.setState({
                isOpen: true
            })
        }
    }
    render (){
        return(
            <>
                <button className="btn-edit text-center" onClick={() => this.deleteItem(this.state.entity)}>Delete</button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>
                            Error
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        {this.state.message}
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.closeModal}>Close</button>
                    </Modal.Footer>
                    </form>
                </Modal>

            </>
    )}
}