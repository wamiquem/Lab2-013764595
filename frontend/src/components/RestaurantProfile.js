import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getRestaurantProfile, restaurantProfileChangeHandler, updateRestaurantImage, updateRestaurantProfile} 
from '../redux/actions/restaurantProfileAction';

//create the Restaurant Profile Component
class RestaurantProfile extends Component {
    constructor(props){
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);

        this.state = {
            isEditable:false,
            isNewImage: false
        }
    }

    componentDidMount(){
        this.props.getProfile();
    }
    
    //input change handler to update state variable with the text entered by the user
    handleChange(e) {
        this.props.handleChange(e);
    }

    editProfile = () => {
        this.setState({
            isEditable: true
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditable: false
        });
    }

    handleFileUpload = (e) => {
        const fileField = document.querySelector('input[type="file"]');
        var output = document.getElementById('pic');
        output.src = URL.createObjectURL(fileField.files[0]);
        this.setState({
            isNewImage: true
        })
    }

    handleFileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', document.querySelector('input[type="file"]').files[0]);
        formData.append('ownerId', localStorage.getItem('id'));
        
        this.props.updateImage(formData);
    }

    updateProfile = (e) => {
        e.preventDefault();
        const data = this.props.profile;
        this.props.updateProfile(data);
        this.setState({
            isEditable: false
        })
    }

    render(){        
        let imageEdit = null;
        let profileEdit = null;
        let profileUpdate = null;
        
        if(this.state.isEditable){
            imageEdit = (
            <div>
                <form>
                    <div class="form-group user-image">
                        <input className = "upload-image" type="file" id="upload" onChange= {this.handleFileUpload}/>
                        <button className = "btn btn-primary btn-sm" 
                        disabled={!this.state.isNewImage} type="submit" onClick={this.handleFileSubmit}>Change Pic
                        </button>
                    </div>
                </form>
            </div>
            );
            
            profileUpdate = (
                <div className = "btn-toolbar">
                    <button type = "submit" className="btn btn-success">Update</button>
                    <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
                </div>    
            );
        }else{
            profileEdit = (
                <div>
                    <button onClick = {this.editProfile} className="btn btn-primary">Edit</button>
                </div>
            );
        }
        
        return(
            <div>
                
                <div className="container">
                    <form onSubmit = {this.updateProfile}>
                    <div className="profile-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2 style= {{color:"red"}}>{this.props.profile.responseMessage}</h2>
                                <h2>Restaurant Profile</h2>
                                <p>View or Update Profile</p>
                            </div>
                            <div class = "profile-image">
                                <label>Image</label>
                                <img className="rounded float-left img-thumbnail" id="pic" 
                                src={this.props.profile.imgURL} alt="Responsive image"></img>
                            </div>
                            {imageEdit}
                            <div className="form-group form-inline">
                                <label >Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="name" placeholder="Name"
                                value = {this.props.profile.name}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"
                                value = {this.props.profile.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Street</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="street" placeholder="Street"
                                value = {this.props.profile.street}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >City</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="city" placeholder="City"
                                value = {this.props.profile.city}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >State</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="state" placeholder="State"
                                value = {this.props.profile.state}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Zip</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="zip" placeholder="Zip"
                                value = {this.props.profile.zip}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Cuisine</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="cuisine" placeholder="Cuisine"
                                value = {this.props.profile.cuisine}/>
                            </div>
                                {profileUpdate}   
                                {profileEdit}          
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
        getProfile: () => {dispatch(getRestaurantProfile())},
        handleChange: e => {dispatch(restaurantProfileChangeHandler(e))},
        updateImage: formData => {dispatch(updateRestaurantImage(formData))},
        updateProfile: data => {dispatch(updateRestaurantProfile(data))}
    }
}

const mapStateToProps = state => {
    return {
        profile: state.restaurantProfile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile);