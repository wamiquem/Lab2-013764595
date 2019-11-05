import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getOwnerProfile, ownerProfileChangeHandler, updateOwnerImage, updateOwnerProfile} 
from '../redux/actions/ownerProfileAction';

//create the Owner Profile Component
class OwnerProfile extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
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
        formData.append('id', localStorage.getItem('id'));
        
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
                                <h2>Owner Profile</h2>
                                <p>View or Update Profile</p>
                            </div>
                            <div class = "profile-image">
                                <label>Image</label>
                                <img className="rounded float-left img-thumbnail" id="pic" 
                                src={this.props.profile.imgURL} alt="Responsive image"></img>
                            </div>
                            {imageEdit}
                            <div className="form-group form-inline">
                                <label >First Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="fname" placeholder="First Name"
                                value = {this.props.profile.fname}/>
                            
                            </div>
                            <div className="form-group form-inline">
                                <label >Last Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="lname" placeholder="Last Name"
                                value = {this.props.profile.lname}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"
                                value = {this.props.profile.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Restaurant Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="restName" placeholder="Restaurant Name"
                                value = {this.props.profile.restName}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Restaurant Zip</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="restZip" placeholder="Restaurant Zip"
                                value = {this.props.profile.restZip}/>
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
        getProfile: () => {dispatch(getOwnerProfile())},
        handleChange: e => {dispatch(ownerProfileChangeHandler(e))},
        updateImage: formData => {dispatch(updateOwnerImage(formData))},
        updateProfile: data => {dispatch(updateOwnerProfile(data))}
    }
}

const mapStateToProps = state => {
    return {
        profile: state.ownerProfile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProfile);