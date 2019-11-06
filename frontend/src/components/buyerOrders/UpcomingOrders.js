import React,{Component} from 'react';
import {Redirect} from 'react-router';
import Order from './Order';
import {connect} from 'react-redux';
import {getBuyerUpcomingOrders, setUpcomingOrdersOnDrag} from '../../redux/actions/buyerOrdersAction';
// import Draggable from "react-draggable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid
  });

class UpcomingOrders extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   items: getItems(10)
        // };
        this.onDragEnd = this.onDragEnd.bind(this);
      }
    //get the first name of owner from backend  
    componentDidMount(){
        this.props.getOrders();
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.props.orders,
          result.source.index,
          result.destination.index
        );
    
        this.props.setOrdersOnDrag(items);
        // this.setState({
        //   items
        // });
      }
    
    render(){
        console.log("props9999999===", this.props);
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
                                    (
                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                        <Droppable droppableId="droppable">
                                            {(provided, snapshot) => (
                                                <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                                >
                                        {this.props.orders.map( (order,index) => (
                                            <Draggable key={`${order.id}`} draggableId={`${order.id}`} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                    >
                                                    <div>
                                                    <Order order = {order} orderType="buyerUpcoming"/>
                                                    </div></div>
                                                )}
                                                
                                            </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                                        </Droppable>
                                        </DragDropContext>)
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
        getOrders: () => {dispatch(getBuyerUpcomingOrders())},
        setOrdersOnDrag: orders => {dispatch(setUpcomingOrdersOnDrag(orders))},
    }
}

const mapStateToProps = state => {
    return {
        orders: state.buyerOrders.upcomingOrders
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingOrders);