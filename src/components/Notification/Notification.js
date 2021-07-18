import React, {Component,Fragment} from 'react';
import {Card,Modal,Button,Container,Row,Col,Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';

class Notification extends Component {


    constructor() {
        super();
        this.state={
            NotificationStatus:false,
            id : '',
            title : '',
            message : '',
            date : '',
        }
    }

    handleClose = () => {
        this.setState({ NotificationStatus:false});
    };
    handleShow = (event) => {
         Axios.get(ApiURL.UpdateNotificationStatus(event.target.getAttribute('data-id')))
        .then(response=>{
            
        })
        .catch(error=>{

        });

        this.setState({ 
            NotificationStatus:true, 
            id : event.target.getAttribute('data-id'),
            title : event.target.getAttribute('data-title'),
            message : event.target.getAttribute('data-message'),
            date : event.target.getAttribute('data-date'),

        });
        
    };

    render() {
        let MyList = this.props.NotificationList;
        let MyView;
        if(MyList.length > 0){
             MyView = MyList.map((List, i)=>{
             return <>
                    <Col className=" d-flex justify-content-around mt-5 p-1" md={12} lg={12} sm={12} xs={12}>
                        <div className="float-left w-75">
                            <h6 className="notification-title"> {List.title}</h6>
                            <p className="py-1  px-0 notification-date m-0"><i className="fa  fa-bell"/>  {List.date}</p>
                            <p className="py-1  px-0 notification-date m-0"><i className="fa  fa-book"/>  Status : {List.status}</p>
                        </div>
                        <div className="float-right px-2 w-25">
                            <button data-id={List.id} data-title={List.title} data-message={List.message} data-date={List.date} onClick={this.handleShow} className="btn btn-sm site-btn">Details</button>
                        </div>
                    </Col>
                    <hr className="bg-light w-100"/>
                    </>
        })
        }
        else{
            MyView = <Col className="text-center mt-3 text-danger">
                        <h3>No Data Found</h3>
                     </Col>
        }

        return (
                <Fragment>
                    <Container className="TopSection">
                        <Row>
                            <Breadcrumb className=" shadow-sm w-100 bg-white mt-3">
                              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                              <Breadcrumb.Item><Link to="/notification">Notification</Link></Breadcrumb.Item>
                            </Breadcrumb>
                        </Row>
                        <Row>
                           {MyView}
                        </Row>
                    </Container>


                    <Modal show={this.state.NotificationStatus} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <h6><i className="fa  fa-bell"></i>{this.state.date}</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <h6><b>{this.state.title}</b></h6>
                            <hr/>
                            <p>{this.state.message}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </Fragment>
        );
    }
}

export default Notification;