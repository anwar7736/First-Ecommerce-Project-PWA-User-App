import React, {Component,Fragment} from 'react';
import {Container, Row, Col, Card, Breadcrumb, Modal} from 'react-bootstrap'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import ApiURL from '../../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../../SessionHelper/SessionHelper';

class OrderDetails extends Component {
        constructor() {
        super();
        this.state={
            PageRefreshStatus:false,
            ReviewModal:false,
            code:"",
            name:"",
            rating:"",
            comments:"",
        }
    }

    ReviewModalOpen=(code,product_name)=>{
        this.setState({  ReviewModal:true,code:code})
    }

    ReviewModalClose=()=>{
        this.setState({  ReviewModal:false})
    }

    PostReview=()=>
    {
       let product_code      = this.state.code;
       let reviewer_id       = SessionHelper.getIdSession();   
       let reviewer_photo    = SessionHelper.getPhotoSession();   
       let reviewer_name     = this.state.name;
       let reviewer_rating   = this.state.rating;
       let reviewer_comments = this.state.comments;

        if(reviewer_name.length===0)
        {
            cogoToast.error('Enter Your Name');
        }
        else if(reviewer_rating.length===0)
        {
            cogoToast.error('Enter Your Review Rating');
        }
        else if(reviewer_comments.length===0)
        {
            cogoToast.error('Enter Your Review');
        }
        else
        {
            let MyForm = new FormData();
            MyForm.append('reviewer_id', reviewer_id);
            MyForm.append('product_code', product_code);
            MyForm.append('reviewer_photo', reviewer_photo);
            MyForm.append('reviewer_name', reviewer_name);
            MyForm.append('reviewer_rating', reviewer_rating);
            MyForm.append('reviewer_comments', reviewer_comments);

            Axios.post(ApiURL.PostUserReview, MyForm)
            .then(response=>{
                if(response.status===200 && response.data===1)
                {
                    this.setState({PageRefreshStatus:true, ReviewModal:false})
                    cogoToast.success('Your review has been received..');
                }
                else
                {
                    cogoToast.success('Something Went Wrong!');
                }
            })
            .catch(error=>{

            })

        }
    }

    PageRefresh=()=>{
        if(this.state.PageRefreshStatus===true)
        {
            let path = window.location.pathname;
            return(
                    <Redirect to={path} />
                 );
        }
    }
    render() {
        let MyList = this.props.ProductData;
        let totalPrice = 0;
        let MyView = MyList.map((List, i)=>{
            totalPrice+=parseInt(List.total_price);
            return (
                <>
                <Col className=" d-flex justify-content-around p-1" md={12} lg={12} sm={12} xs={12}>
                        <div className="float-left w-75">
                            <h6 className="product-name-on-card"> {List.product_name}</h6>
                            <h6 className="product-price-on-card"> Total Price: {List.total_price }</h6>
                            <h6 className="product-name-on-card text-primary"> Quantity: {List.product_quantity}</h6>
                            <h6 className="product-name-on-card text-dark"> Size: {List.product_size}</h6>
                            <h6 className="product-name-on-card text-success"> Color: {List.product_color}</h6>
                            <h6 className="product-price-on-card"> Status: {List.order_status}</h6>
                        </div>
                        <div className="float-right px-2 w-25">
                            <button  onClick={this.ReviewModalOpen.bind(this,List.product_code)} className="btn btn-sm site-btn">Review</button>
                        </div>
                    </Col>
                    <hr className="bg-light w-100"/>

                </>
            );
        })
    
        return (
                <Fragment>
                   <Container className={this.state.MainDiv+" TopSection animated slideInDown"}>
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10}  sm={12} xs={12}>
                            <Breadcrumb className="shadow-sm mt-2 bg-white">
                                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/order_details">Order Details</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <Container className="mt-1">
                            <h3 className="mt-3 text-danger">Total Amount : {totalPrice}</h3>
                                <Row className="shadow-sm animated slideInDown bg-white p-4">
                                   {MyView}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>


                <Modal show={this.state.ReviewModal} onHide={this.ReviewModalClose}>
                    <Modal.Header closeButton>
                        <h6> Write Review</h6>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Name</label>
                            <input onChange={(e)=>this.setState({name:e.target.value})} className="form-control" type="text" placeholder=""/>
                        </div>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Rating</label>
                            <select onChange={(e)=>this.setState({rating:e.target.value})} className="form-control">
                                <option value="">Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Comments</label>
                            <textarea onChange={(e)=>this.setState({comments:e.target.value})}  rows={2}  className="form-control" type="text" placeholder=""/>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn site-btn" onClick={this.ReviewModalClose}>Cancel</button>
                        <button className="btn site-btn" onClick={this.PostReview}>Post</button>
                    </Modal.Footer>
                </Modal>
                {this.PageRefresh()}
                </Fragment>
        );
    }
}

export default OrderDetails;