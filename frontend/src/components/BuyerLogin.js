import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {loginBuyer} from '../redux/actions/authAction';

//create the Navbar Component
class BuyerLogin extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : ""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.loginBuyer(data);
    }
    
    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        if(localStorage.getItem('token')){
            redirectVar = <Redirect to= {{ pathname: "/buyer/home", fname: this.props.fname}}/>
        }
        return(
            <div>
                {redirectVar}

                <Navbar/>
                
                <div className="container">
                    <form onSubmit = {this.submitLogin}>
                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2 style= {{color:"red"}}>{this.props.responseMessage}</h2>
                                <h2>Buyer Login</h2>
                                <p>Sign in with your Grubhub Account</p>
                            </div>
                            
                            <div className="form-group">
                                <input required onChange = {this.emailChangeHandler} type="email" className="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input required onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <p><Link to="/buyer/signup">Create Account</Link></p>            
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginBuyer: data => {dispatch(loginBuyer(data))}
    }
}

const mapStateToProps = state => {
    return {
        responseMessage: state.auth.responseMessage,
        fname: state.auth.fname
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerLogin);