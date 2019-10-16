import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import backendURL from '../../urlconfig';
import Order from './Order';

class UpcomingOrders extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            orders: []
        }
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(cookie.load('cookie')){
            fetch(`${backendURL}/buyer/upcomingOrders`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {                
                this.setState({
                    orders: data.orders
                })
            })
            .catch(err => console.log(err));
        }
    }
    
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
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
                                    this.state.orders ? 
                                    this.state.orders.map(order => {
                                        return <Order order = {order}/>
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

export default UpcomingOrders;