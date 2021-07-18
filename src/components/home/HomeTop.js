import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import MegaMenu from './MegaMenu';
import SliderHome from './SliderHome';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import SliderLoader from '../placeholder/SliderLoader'

class HomeTop extends React.Component{

    constructor(){
        super();
        this.state = {
            menuData : [],
            SliderData : [],
            isLoading : '',
            mainDiv : 'd-none',
        }
    }
    componentDidMount(){
        Axios.get(ApiURL.GetCategoryDetails)
        .then(response=>{
            this.setState({menuData : response.data});
        })
        .catch(error=>{

        })

        Axios.get(ApiURL.GetSliderInfo)
        .then(response=>{
            this.setState({SliderData : response.data, isLoading : 'd-none', mainDiv: ''});
        })
        .catch(error=>{

        })
    }
 render() {
    return (
        <Fragment>
            <div className={this.state.isLoading}>
                <SliderLoader/>
            </div>
            <div className={this.state.mainDiv}>
                <Container lclassName="p-0 TopSection  overflow-hidden" fluid={true}>
                <Row className="p-0 m-0 overflow-hidden">
                    <Col className="p-0 m-0 overflow-hidden" lg={3} md={3} sm={12} xs={12}>
                            <MegaMenu data={this.state.menuData}/>
                    </Col>
                    <Col className="p-0 m-0 overflow-hidden" lg={9} md={9} sm={12} xs={12}>
                            <SliderHome data={this.state.SliderData}/>
                    </Col>
                </Row>
            </Container>
            </div>
        </Fragment>
    );
  }
}

export default HomeTop;
