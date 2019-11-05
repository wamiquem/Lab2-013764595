import React,{Component} from 'react';
import backendURL from '../../urlconfig';
import {connect} from 'react-redux';
import {sectionChangeHandler, updateSection, deleteSection} from '../../redux/actions/sectionsAction';

class Section extends Component {
     constructor(props){
        super(props);

        this.state = {
            isEditable: false
        }
        //Bind the handlers to this class
        this.handleEditChange = this.handleEditChange.bind(this);
        this.editSection = this.editSection.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    handleEditChange = e => {
        this.props.handleEditChange(this.props.section._id, e);
    }

    editSection = () => {
        this.setState({
            isEditable: true
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditable: false
        });
    }

    handleIsEditableOnUpdate(data, cb){
        this.props.updateSection(data);
        cb();
    }

    //submit Login handler to send a request to the node backend
    updateSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownerId:localStorage.getItem('id'),
            id : this.props.section._id,
            name : this.props.section.name
        }

        this.handleIsEditableOnUpdate(data, () => {
            if(this.props.responseMessage === 'Section updated'){
                this.setState({
                    isEditable: false
                })
            }
        })
    }

    deleteSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownerId:localStorage.getItem('id'),
            id : this.props.section._id
        }

        this.props.deleteSection(data);
    }

    render(){
        let sectionEdit = null;
        let sectionUpdate = null;
        let editCancel = null; 

        if(this.state.isEditable){
            sectionUpdate = (
                <button onClick = {this.updateSection} className="btn btn-success">Update</button>
            );
            editCancel = (
                <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
            );
        }else{
            sectionEdit = (
                <button onClick = {this.editSection} className="btn btn-primary">Edit</button>
            );
        }

        return(
            <div>
                <hr/>
                
                {
                this.props.section._id === this.props.sectionToUpdate ? 
                <h2 style= {{color:"red"}}>{this.props.responseMessage}</h2> : 
                null
                }
                
                <div className = "section-bar">
                    <input  onChange = {this.handleEditChange} 
                    value = {this.props.section.name} disabled={!this.state.isEditable}
                    type="text" className="form-control" name="name" placeholder="Name"/>
                    {sectionEdit}
                    {sectionUpdate}
                    {editCancel}
                    <button onClick = {this.deleteSection} disabled={this.state.isEditable}
                    className="btn btn-primary">Delete</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEditChange: (id,e) => {dispatch(sectionChangeHandler(id,e))},
        updateSection: data => {dispatch(updateSection(data))},
        deleteSection: data => {dispatch(deleteSection(data))}
    }
}

const mapStateToProps = state => {
    return {
        responseMessage: state.sections.responseMessage,
        sectionToUpdate: state.sections.sectionToHandle
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);