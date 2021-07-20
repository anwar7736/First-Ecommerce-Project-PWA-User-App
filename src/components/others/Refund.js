import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Card, Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ApiURL from '../../api/ApiURL';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import SessionHelper from '../../SessionHelper/SessionHelper';

class Refund extends React.Component{
        constructor(){
        super();
        this.state = {
            refund : '',
            loaderDiv : '',
            mainDiv : 'd-none',
        }
    }
    componentDidMount(){
        let getSession = SessionHelper.getRefundSession();

        if(getSession==null)
        {
            Axios.get(ApiURL.GetSiteInfo)
            .then(response=>{
                if(response.status==200)
                {
                    let Refund = response.data[0]['refund'];
                    SessionHelper.setRefundSession(Refund);
                    this.setState({refund: SessionHelper.getRefundSession(), loaderDiv: 'd-none', mainDiv: ''});

                }
            })
            .catch(error=>{
                cogoToast.error('Something Went Wrong!');
            })
        }
        else{
            this.setState({refund: getSession, loaderDiv: 'd-none', mainDiv: ''});
        }
    }
    render(){
        return (
            <Fragment>
                  <Container className="TopSection animated slideInDown">
                    <Row>
                        <Breadcrumb className=" shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/refund">Refund</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row>
                        <Col className="mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Card className={this.state.mainDiv}>
                                <Card.Body>
                                   {ReactHtmlParser(this.state.refund)}
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
export default Refund;