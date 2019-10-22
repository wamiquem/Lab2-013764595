import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import OldOrdersList from './ownerOrders/OldOrdersList';
import NewOrdersList from './ownerOrders/NewOrdersList';
import backendURL from '../urlconfig';

class OwnerHome extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            orders: []
        }
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(localStorage.getItem('token')){
            fetch(`${backendURL}/restaurant/allOrders`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {                
                this.setState({
                    firstName: data.firstName,
                    orders: data.orders
                })
            })
            .catch(err => console.log(err));
        }
    }
    
    render(){
        const oldOrders = [];
        const newOrders =[];
        if (this.state.orders) {
            this.state.orders.forEach(order => (order.orderStatus === 'Delivered' || order.orderStatus === 'Cancel' ? oldOrders : newOrders).push(order));
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

export default OwnerHome;