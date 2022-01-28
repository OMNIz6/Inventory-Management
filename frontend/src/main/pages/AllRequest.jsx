import { Component } from "react";
import RequestService from "../service/MainOffice/RequestService";
import RetailService from "../service/Retail/RetailService";

export default class AllRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            requests:[]
        }
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount(){
        this.getContent();
    }
    getContent(){
        RequestService.getRequests()
            .then((response) => {
                    this.setState({
                        requests:response.data
                    })
                    console.log(this.state)
            })
    }
    
    deleteRequest(request){
        RetailService.deleteRetailRequest(request)
        .then(()=>{
            this.getContent();
        })
    }
    render (){
        return(
            <>
                <div className="table-head-con">
                    <p className="table-head-text">Requests</p>
                </div>
                <div className="table-container">
                    <div className="table-header">
                        <div className="col-1 t-header">Id</div>
                        <div className="col-2 t-header">Messsage</div>
                        <div className="col-2 t-header">Date</div>
                        <div className="col-2 t-header">Stocks</div>
                        <div className="col-3 t-header">Items</div>
                    </div>
                    {this.state.requests.map(request => 
                        
                    <div className="table-row ">
                        <div className="col-1 t-row">{request.requestId}</div>
                        <div className="col-2 t-row">{request.message}</div>
                        <div className="col-2 t-row">{request.date}</div>
                        <div className="col-2 t-row">{request.stocks}</div>
                        <div className="col-3 t-row">{request.items.map(item=> <div>{item.name},</div>)}</div>
                        <div className="col-2 t-row">
                        Retail Store {request.retail.retail_id}
                        </div>
                    </div>)} 
                    
                </div>
            </>
        )
    }
}