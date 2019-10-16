import React,{Component} from 'react';
import backendURL from '../../urlconfig';

class Order extends Component {
     constructor(props){
        super(props);

        this.state = {
            menuItems: []
        }
    }

    componentDidMount(){
        fetch(`${backendURL}/restaurant/orderedItems/${this.props.order.orderId}`,{
                credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                menuItems: data.menuItems
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        let itemDetails = this.state.menuItems.map(item => {
            return(
                <div style = {{display:'flex'}}>
                    <label>Menu Item:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.name}</h7>
                    <label style = {{paddingLeft:'25px'}}>Quanity:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{item.quantity}</h7>
                    <label style = {{paddingLeft:'25px'}}>Price:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{`$${item.price}`}</h7>
                </div>
            );
        });
        return(
            <div>
                <hr/>
                <label style = {{fontSize:'17px'}}>Order# {this.props.order.orderId}</label>
                <h5 style = {{textDecoration:'underline'}}>Order Details</h5>
                {itemDetails}
                <div style = {{display:'flex'}}>
                    <label>Total Price:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{`$${this.props.order.orderPrice}`}</h7>
                </div>
                <div style = {{display:'flex'}}>
                    <label>Order Status:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.orderStatus}</h7>
                </div>
                <div style = {{display:'flex'}}>
                    <label>Deliver To Address:</label>
                    <h7 style = {{paddingLeft:'5px'}}>{this.props.order.buyerAddress}</h7>
                </div>          
            </div>
        )
    }
}

export default Order;