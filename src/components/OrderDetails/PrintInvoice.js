import React, {Component,Fragment} from 'react';
import {Container, Row, Col, Card, Breadcrumb, Modal} from 'react-bootstrap'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import ApiURL from '../../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../../SessionHelper/SessionHelper';

class PrintInvoice extends Component {
    constructor(){
        super();
            this.state  = {
                data : [],
                lines: [],
            }
        
    }
    componentDidMount() {
         Axios.get(ApiURL.GetOrderDetails(this.props.id))
        .then(response=>{ 
            // console.log(response.data.lines);
            this.setState({data : response.data, lines: response.data.lines});
        })
        .catch(error=>{

        })
    }
    render() {
        let MyList = this.state.data;
        let MyLines = this.state.lines;
        let MyView = [];
        MyView = MyLines.map((List, i)=>{
            return(<>
                    <tr>
                        <td>{i+1}</td>
                        <td>{List.product.name}</td>
                        <td>{List.price}</td>
                        <td>{List.quantity}</td>
                        <td>{List.price * List.quantity}</td>
                    </tr>
                    </>
                );
        });
        return (
                <Fragment onSelf={()=>window.print()}>
                <Container className="TopSection animated slideInDown fluid">
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10}  sm={12} xs={12}>
                            <Breadcrumb className="shadow-sm mt-2 bg-white no-print">
                                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/order_details">Order Details</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <Container className="container-fluid">
                                <Row className="shadow-sm animated slideInDown bg-white p-4">
                                <div>
                                    <button class="btn btn-secondary btn-sm no-print" onClick={()=>window.print()}>Print Invoice</button>
                                </div>


                                <div class="table-responsive">                                 
                                    <div class="">
                                        <h2 class="text-center">INVOICE</h2>
                                        <hr/>
                                    </div>                       
                                <div class="row">
                                    <div class="col-md-6">
                                        <p><strong>Invoice No :</strong> {MyList.invoice_no}</p>
                                        <p><strong>Invoice Date :</strong> {MyList.transaction_date}</p>     
                                        <p><strong>Payment Method :</strong> {MyList.payment_method}</p>
                                        <p><strong>Payment Status :</strong> {MyList.payment_status}</p>
                                    </div>                     
                                    <div class="col-md-6">
                                        <p><strong>Delivery Charge :</strong> {MyList.delivery_charge}</p>
                                        <p><strong>Total Discount :</strong> {MyList.total_discount}</p>   
                                        <p><strong>Final Amount :</strong> {MyList.final_amount}</p>
                                        <p><strong>Order Status :</strong> {MyList.status}</p>
                                    </div>
                                </div>   
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sl</th>
                                                <th>Product</th>
                                                <th>Price</th>                            
                                                <th>Quantity</th>
                                                <th>Total</th>
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


export default PrintInvoice;