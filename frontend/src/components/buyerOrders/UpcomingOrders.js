import React,{Component} from 'react';
import {Redirect} from 'react-router';
import Order from './Order';
import {connect} from 'react-redux';
import {getBuyerUpcomingOrders} from '../../redux/actions/buyerOrdersAction';

class UpcomingOrders extends Component {
    //get the first name of owner from backend  
    componentDidMount(){
        this.props.getOrders();
    }
    
    render(){
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
                    <div className="buyer-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <div style = {{display:'flex'}}>
                                    <h4>Upcoming Orders</h4>
                                    <button style = {{marginLeft:'20px'}} onClick = {()=> {window.location.reload()}}
                                    className="btn btn-primary btn-status-change">Refresh</button>
                                </div>
                                {
                                    this.props.orders ? 
                                    this.props.orders.map(order => {
                                        return <Order order = {order} orderType="buyerUpcoming"/>
                                    })
                                    :
                                    <span/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => {dispatch(getBuyerUpcomingOrders())}
    }
}

const mapStateToProps = state => {
    return {
        orders: state.buyerOrders.upcomingOrders
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingOrders);