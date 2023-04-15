import React, {Component,Fragment} from 'react';
import {Container, Row, Col, Card, Breadcrumb, Modal} from 'react-bootstrap'
import {NavLink, Link} from 'react-router-dom'

class OrderPayment extends Component {
        constructor() {
        super();
        this.state={
            
        }
    }
    render() {
        let MyList = this.props.data;
        let totalPrice = 0;
        let MyView = MyList.map((List, i)=>{
            totalPrice+=parseInt(List.amount);
            return (
                <>
                    <tr>
                        <td>{i+1}</td>
                        <td>{List.transaction_date}</td>
                        <td>{List.order.invoice_no}</td>
                        <td>{List.amount}</td>
                        <td>{List.order.payment_method}</td>
                        <td>{List.transaction_id}</td>
                        <td>{List.payment_id}</td>
                        
                        <td>{List.status}</td>
                    </tr>
                </>
            );
        });
    
        return (
                <Fragment>
                   <Container className="TopSection animated slideInDown fluid">
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10}  sm={12} xs={12}>
                            <Breadcrumb className="shadow-sm mt-2 bg-white">
                                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/payment_list">All Payment History</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <Container className="container-fluid">
                            <h3 className="mt-3 text-danger">Total Paid Amount : {totalPrice}</h3>
                                <Row className="shadow-sm animated slideInDown bg-white p-4">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sl</th>
                                                <th>Date</th>
                                                <th>Invoice</th>
                                                <th>Amount</th>                                                 
                                                <th>Pay Via</th>                           
                                                <th>TRX ID</th>
                                                <th>Payment ID</th>

                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MyView}
                                        </tbody>
                                    </table>
                                </div>
                                   
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default OrderPayment;