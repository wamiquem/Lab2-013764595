import React,{Component} from 'react';
import Menu from './Menu';

class MenusList extends Component {
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
                                                        return <Menu menu = {menu} sections = {this.props.sections}/>
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