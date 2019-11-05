import React,{Component} from 'react';
import Section from './Section';

class SectionsList extends Component {
    render(){
        return(
            <div>
                <div className="container">
                    <div className="sections-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Sections</h4>
                                {
                                    this.props.sections ? 
                                        this.props.sections.map(section => {
                                            return <Section section = {section}/>
                                        })
                                    :
                                    <span/>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default SectionsList;