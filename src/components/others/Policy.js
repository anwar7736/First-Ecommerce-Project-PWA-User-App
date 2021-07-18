import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Card, Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ApiURL from '../../api/ApiURL';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import SessionHelper from '../../SessionHelper/SessionHelper';

class Policy extends React.Component{
     constructor(){
        super();
        this.state = {
            policy : '',
            loaderDiv : '',
            mainDiv : 'd-none',
        }
    }
  componentDidMount(){
        let getSession = SessionHelper.getPolicySession();

        if(getSession==null)
        {
            Axios.get(ApiURL.GetSiteInfo)
            .then(response=>{
                if(response.status==200)
                {
                    let Policy = response.data[0]['privacy'];
                   SessionHelper.setPolicySession(Policy);
                    this.setState({policy: SessionHelper.getPolicySession(), loaderDiv: 'd-none', mainDiv: ''});

                }
            })
            .catch(error=>{
                cogoToast.error('Something Went Wrong!');
            })
        }
        else{
            this.setState({policy: getSession, loaderDiv: 'd-none', mainDiv: ''});
        }
    }
    render(){
        return (
            <Fragment>
                 <Container className="TopSection">
                    <Row>
                        <Breadcrumb className=" shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/policy">Policy</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row>
                        <Col className="mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Card className={this.state.mainDiv}>
                                <Card.Body>
                                   {ReactHtmlParser(this.state.policy)}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Card>
                        <Card.Body className={this.state.loaderDiv}>
                             <div class="ph-item ">
                              <div class="ph-col-12">
                                <div class="ph-row">
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                    <div class="ph-col-12"></div>
                                </div>
                            </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Fragment>
        )
    }
}
export default Policy;