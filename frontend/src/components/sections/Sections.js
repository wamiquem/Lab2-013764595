import React,{Component} from 'react';
import SectionAddForm from './SectionAddForm';
import SectionsList from './SectionsList';
import {connect} from 'react-redux';
import {getSections} from '../../redux/actions/sectionsAction';

//create the Owner Profile Component
class Sections extends Component {
    componentDidMount(){
        this.props.getSections();
    }

    render(){
        return(
            <div>
                <SectionAddForm/>
                <SectionsList sections = {this.props.sections}/>
            </div>
            
        
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSections: () => {dispatch(getSections())}
    }
}

const mapStateToProps = state => {
    return {
        sections: state.sections.sections
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sections);