import React,{Component} from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import OldOrdersList from './ownerOrders/OldOrdersList';
import NewOrdersList from './ownerOrders/NewOrdersList';
import {connect} from 'react-redux';
import {getOwnerOrders} from '../redux/actions/ownerOrdersAction';

class OwnerHome extends Component {
    //get the first name of owner from backend  
    componentDidMount(){
        this.props.getOrders();
    }
    
    render(){
        const oldOrders = [];
        const newOrders =[];
        if (this.props.orders) {
            this.props.orders.forEach(order => (order.status === 'Delivered' || order.status === 'Cancelled' ? oldOrders : newOrders).push(order));
        }
        let redirectVar = null;
        let fname = this.props.location.fname;
        if(!fname){
            fname = localStorage.getItem('fname');
        }
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {fname} />
                <NewOrdersList orders = {newOrders}/>
                <OldOrdersList orders = {oldOrders}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => {dispatch(getOwnerOrders())}
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ownerOrders.orders
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerHome);