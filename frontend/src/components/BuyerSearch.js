import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import backendURL from '../urlconfig';

//create the Navbar Component
class BuyerSearch extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            restaurants: null,
            menuItem: props.match.params.menuItem,
            dropdown: false,
            cuisines: null,
            cuisineName: "",
            filteredCuisine: "",
            initialrestaurants: null
        }
        this.searchRestaurants = this.searchRestaurants.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    //get the first name of buyer from backend  
    componentDidMount(){
            if(cookie.load('cookie')){
                this.state.menuItem = (this.state.menuItem) ? this.state.menuItem : "";
                this.searchRestaurants();
        }
    }

    searchRestaurants(){
        fetch(`${backendURL}/buyer/searchRestaurants/?menuItem=${this.state.menuItem}`,{
            credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    restaurants: data.row,
                    initialrestaurants: data.row
                })
            })
            .catch(err => console.log(err));
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleEditChange = e => {
        this.state.restaurants = this.state.initialrestaurants;
        const filteredRestaurants = this.state.restaurants.filter(function (restaurant) {
            return restaurant.cuisine === e.target.value;
          });
        if (e.target.value === 'Filter Cuisine') {
            this.setState({
                restaurants: this.state.initialrestaurants
            })
        } else {
            this.setState({
            restaurants: filteredRestaurants
        })
        }
        
    }

    render(){
        const isRestaurants = this.state.restaurants;
        const initialrestaurants = this.state.initialrestaurants;
        const result = [];
        const map = new Map();
        let redirectVar = null;
        let fname = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        } else {
            fname = localStorage.getItem('fname')
        }
        return(
            <div>
                {redirectVar}

                { initialrestaurants 
                    ?
                    this.state.initialrestaurants.map(restaurant => {
                        if(!map.has(restaurant.cuisine)){
                            map.set(restaurant.cuisine, true);    // set any value to Map
                                result.push({
                                    cuisine: restaurant.cuisine,
                                    id: restaurant.id,
                                    name: restaurant.name
                            });
                        } 
                    })
                    : <span/>
                }
                <Navbar firstName = {fname} />
                <div>
                <div className="container">
                    <div className="owner-order-list">
                        <div className="main-div">
                            <div className="panel">
                                <h1 className="display-1">Restaurants</h1>
                                <hr/>

                                <div class="row input-group">
                                    <input type="search" name = "menuItem" onChange = {this.changeHandler} placeholder="Pizza, Sushi, Biryani..." class="form-control"/>
                                    <span class="input-group-btn">
                                        <button onClick = {this.searchRestaurants} class="btn btn-primary" type="button">
                                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Find Restaurants!</button>
                                    </span>
                                    <select style = {{display:'inline', width:'auto'}} class="form-control" name="orderStatus"
                                        onChange = {this.handleEditChange}>
                                            <option selected>Filter Cuisine</option>
                                            { result
                                                ?
                                                result.map(cuisineData => {
                                                    return (
                                                        <option>{cuisineData.cuisine}</option>
                                                 )
                                                })
                                                :
                                                <span/>
                                            }
                                            </select>
                                        
                                </div>
                                <div>
                                {   
                                    isRestaurants 
                                            ?
                                            this.state.restaurants.map(restaurant => {
                                                return (
                                                    <div className="container buyerSearList">
                                                        <Link to={`/buyer/place-order/${restaurant.id}`}>
                                                        <div class="row  listrow"> 
                                                            <div class="col-md-4 buyer-menu-image">
                                                                <img className="rounded float-left img-thumbnail" src = {`${backendURL}/buyer/restaurantImage/${restaurant.id}`} alt="Responsive image"></img>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <h3>{restaurant.name}</h3>
                                                                <span>{restaurant.city} {restaurant.stree} {restaurant.state}</span>
                                                            </div>
                                                        </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                            : <span/>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default BuyerSearch;