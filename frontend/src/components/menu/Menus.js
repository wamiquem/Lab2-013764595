import React,{Component} from 'react';
import MenuAddForm from './MenuAddForm';
import MenusList from './MenusList';
import {connect} from 'react-redux';
import {getMenus} from '../../redux/actions/menusAction';

class Menus extends Component {
    componentDidMount(){
        this.props.getMenus();
    }    

    render(){
        return(
            <div>
                <MenuAddForm sections = {this.props.sections}/>
                <MenusList menus = {this.props.menus} sections = {this.props.sections}/>
            </div>
            
        
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMenus: () => {dispatch(getMenus())}
    }
}

const mapStateToProps = state => {
    return {
        sections: state.menus.sections,
        menus: state.menus.menus

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus);