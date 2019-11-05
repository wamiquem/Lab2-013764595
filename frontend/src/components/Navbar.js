import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/authAction';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        this.props.logout();
        // localStorage.clear();
    }

    render(){
        let navLogin = null;
        let navAccount = null;
        let navRestaurant = null;
        let navCart = null;
        if(localStorage.getItem('token')){
            if(localStorage.getItem('userType') === 'buyer'){
                navAccount = <li><Link to="/buyer/account/profile">Account</Link></li>;
                navCart = <li><Link to="/buyer/cart">Cart</Link></li>;
            }else{
                navAccount = <li><Link to="/owner/account/profile">Account</Link></li>;
                navRestaurant = <li><Link to="/owner/restaurant/profile">Restaurant</Link></li>;

            }
            console.log("Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right ">
                    {navCart}
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hi,{this.props.firstName}!!! <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            {navAccount}
                            {navRestaurant}
                            <li role="separator" className="divider"></li>
                            <li><Link to="/" onClick = {this.handleLogout}>Sign Out</Link></li>
                        </ul>
                    </li>
                </ul>
            );
        }
        
        return(
            <div>
            <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand" style={{fontFamily: "Impact",color:"red", fontSize:'25px'} }>GRUBHUB</Link>
                        </div>
                        {navLogin}
                    </div>
                    
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {dispatch(logout())}
    }
}

// export default Navbar;
export default connect(null, mapDispatchToProps)(Navbar);