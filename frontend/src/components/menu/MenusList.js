import React,{Component} from 'react';
import Menu from './Menu';

class MenusList extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        }
        
    handleDelete(menuId){
        this.props.onDelete(menuId);
    }

    handleEditChange(menuId, name, value){
        this.props.onEditChange(menuId, name, value);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="menus-list">
                        <div className="main-div">
                            <div className="panel">
                                {
                                    this.props.sections.map(section => {
                                        return(
                                            <div>
                                                <h4 style = {{textDecoration: 'underline'}}>{section.name}</h4>
                                                {
                                                this.props.menus ?
                                                    this.props.menus.filter(menu => menu.section_id === section.id)
                                                    .map(menu => {
                                                        return <Menu menu = {menu} sections = {this.props.sections}
                                                        onDelete = {this.handleDelete}
                                                        onEditChange = {this.handleEditChange}/>
                                                    })
                                                :
                                                <span/>
                                                }
                                            </div>
                                        )
                                    })    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default MenusList;