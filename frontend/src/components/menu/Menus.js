import React,{Component} from 'react';
import cookie from 'react-cookies';
import MenuAddForm from './MenuAddForm';
import MenusList from './MenusList';
import backendURL from '../../urlconfig';

class Menus extends Component {
    constructor(props){
        super(props);
        this.getSectionsFromMenuFormComponent = this.getSectionsFromMenuFormComponent.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            menus: [],
            sections: []
        }
    }

    handleDelete = menuId => {
        this.setState( state => {
            const menus = state.menus.filter(menu => menu.id != menuId);
            return {
                menus
            };
        });
    };

    handleAdd = menu =>{
        this.setState(state => ({
            menus: [...state.menus, menu]
          }))
    }

    handleEditChange(id, name, value) {
        this.setState(state => {
            const menus = state.menus.map(menu => {
                // Find a menu with the matching id
                if(menu.id == id){
                    //Return a new object
                    return{
                        ...menu, //copy the existing menu
                        [name]: value //replace the name with new name
                    }
                }
                // Leave every other menu unchanged
                return menu;
            });
            return {
                menus
            };
        });
    }

    getSectionsFromMenuFormComponent = sections => {
        this.setState({
            sections : this.state.sections.concat(sections)
        });
    }
    
    componentDidMount(){
        // if(cookie.load('cookie')){
            fetch(`${backendURL}/restaurant/menus`,{
                credentials: 'include'
             })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    menus : this.state.menus.concat(data.menus)
                });
            })
            .catch(err => console.log(err));
    }    

    render(){
        return(
            <div>
                <MenuAddForm onAdd = {this.handleAdd} onSectionsLoad = {this.getSectionsFromMenuFormComponent}/>
                <MenusList menus = {this.state.menus} sections = {this.state.sections}
                onDelete = {this.handleDelete}
                onEditChange = {this.handleEditChange}/>
            </div>
            
        
        )
    }
}

export default Menus;