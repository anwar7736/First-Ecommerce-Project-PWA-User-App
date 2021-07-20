import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Button, Form, Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../../SessionHelper/SessionHelper';

class CartList extends React.Component{
    constructor(){
        super();
        this.state = {
            CartList : [],
            redirectStatus : false,
            refreshStatus : false,
            delivery_charge : 0,
            customer_city : '',
            payment_method : '',
            customer_name : '',
            customer_mobile : '',
            current_address : '',
        }
    }
    componentDidMount(){
        let user_id = SessionHelper.getIdSession();

        Axios.get(ApiURL.CartItemList(user_id))
        .then(response=>{
            if(response.status===200)
            {
                this.setState({CartList : response.data});
            }
        })
        .catch(error=>{

        })
       
    }

    cityOnchange=(e)=>
    {
        let city = e.target.value;
        this.setState({customer_city:city});
        if(city==='')
        {
            this.setState({delivery_charge:0});
        }
        else if(city==='Dhaka')
        {
            this.setState({delivery_charge:50});
        }
        else if(city==='Barisal')
        {
            this.setState({delivery_charge:250});
        }
        else if(city==='Khulna')
        {
            this.setState({delivery_charge:150});
        }
        else if(city==='Jessore')
        {
            this.setState({delivery_charge:100});
        }
        else if(city==='Chittagong')
        {
            this.setState({delivery_charge:200});
        }
        else if(city==='Mymensingh')
        {
            this.setState({delivery_charge:150});
        }
       
        
    }

    onConfirmOrder=()=>
    {
        let customer_city  = this.state.customer_city;
        let payment_method  = this.state.payment_method;
        let customer_name  = this.state.customer_name;
        let customer_mobile  = this.state.customer_mobile;
        let current_address  = this.state.current_address;
        let delivery_charge  = this.state.delivery_charge;

        if(customer_city.length===0)
        {
            cogoToast.error('Choose Your City');
        }
        else if(payment_method.length===0)
        {
             cogoToast.error('Choose Payment Method');
        }
        else if(customer_name.length===0)
        {
             cogoToast.error('Enter Your Fullname');
        }
        else if(customer_mobile.length===0)
        {
             cogoToast.error('Enter Your Current Mobile No.');
        }
        else if(current_address.length===0)
        {
             cogoToast.error('Enter Your Current Address');
        }
        else if(payment_method.length===0)
        {
             cogoToast.error('Choose Payment Method');
        }
        else
        {
            let MyForm = new FormData();
            MyForm.append('user_id', SessionHelper.getIdSession());
            MyForm.append('customer_city', customer_city);
            MyForm.append('payment_method', payment_method);
            MyForm.append('delivery_charge', delivery_charge);
            MyForm.append('customer_name', customer_name);
            MyForm.append('customer_mobile', customer_mobile);
            MyForm.append('customer_address', current_address);

            Axios.post(ApiURL.PlaceUserOrder, MyForm)
            .then(response=>{
                if(response.status===200 && response.data===1)
                {   
                    this.setState({redirectStatus:true});
                    cogoToast.success('Your order has been received');
                }
                else
                {
                     cogoToast.error('Something Went Wrong!');
                }
            })
            .catch(error=>{

            })
        }
    }

    ItemQtyIncrease=(item_id, price, quantity)=>
    {   
        let MyForm = new FormData();
        MyForm.append('id', item_id);
        MyForm.append('product_quantity', quantity);
        MyForm.append('unit_price', price);

         Axios.post(ApiURL.ItemQtyIncrease, MyForm)
        .then(response=>{
            if(response.status===200 && response.data===1)
            {
                 cogoToast.success('Product Quantity Increased', {position : 'bottom-center'});
                 this.setState({refreshStatus: true});
            }
            else
            {
                 cogoToast.error('Something Went Wrong!', {position : 'bottom-center'});
            }
        })
        .catch(error=>{

        })
    } 

    ItemQtyDecrease=(item_id, price, quantity)=>
    {
        let MyForm = new FormData();
        MyForm.append('id', item_id);
        MyForm.append('product_quantity', quantity);
        MyForm.append('unit_price', price);

         Axios.post(ApiURL.ItemQtyDecrease, MyForm)
        .then(response=>{
            if(response.status===200 && response.data===1)
            {
                 cogoToast.success('Product Quantity Decreased', {position : 'bottom-center'});
                 this.setState({refreshStatus: true});
            }
            else
            {
                 cogoToast.error('Quantity must not be less than 1!', {position : 'bottom-center'});
            }
        })
        .catch(error=>{

        })
    }

    RemoveCartItem=(item_id)=>
    {

      Axios.get(ApiURL.RemoveCartItem(item_id))
        .then(response=>{
            if(response.status===200 && response.data===1)
            {
                 cogoToast.success('Product Removed', {position : 'bottom-center'});
                 this.setState({refreshStatus: true});
            }
            else
            {
                 cogoToast.error('Something Went Wrong!', {position : 'bottom-center'});
            }
        })
        .catch(error=>{

        })
    }

    PageRefresh=()=>{
        if(this.state.refreshStatus===true)
        {
            let URL = window.location;
            return (
                    <Redirect to={URL} />
                    );
        }
    }
    RedirectToOrderDetails=()=>{
        if(this.state.redirectStatus===true)
        {
            return(
                    <Redirect to="/order_details" />
                )
        }
    }
    render(){
        let MyList = this.state.CartList;
        let totalPrice = 0;
        let MyView = MyList.map((List, i)=>{
            totalPrice+=parseInt(List.total_price) ;
                    return (
                            <>
                                 <div className="row">

                                    <div className="col-md-3 text-center col-lg-3 col-sm-4 col-6">
                                        <img className="w-100" src={List.product_image} alt=""/>
                                        <button onClick={()=> this.ItemQtyIncrease(List.id, List.unit_price, List.product_quantity)} className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-plus"/></button>
                                        <button onClick={()=> this.ItemQtyDecrease(List.id, List.unit_price, List.product_quantity)} className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-minus"/></button>
                                        <button onClick={()=> this.RemoveCartItem(List.id)} className="btn mt-2 btn-sm site-btn"><i className="fa fa-trash-alt"/></button>
                                    </div>
                                    <div className="col-md-7 col-lg-7 col-sm-8 col-6">
                                        <h5 className="product-name-on-card">{(List.product_name).substring(0,50) }</h5>
                                        <h5 className="product-price-on-card">Total Price : {List.total_price}TK</h5>
                                        <h5 className="product-price-on-card text-success">Quantity : { List.product_quantity}</h5>
                                    </div>
                                </div>
                                <hr/>
                            </>

                            );
        })

        return (
            <Fragment>
                <Container className="TopSection animated slideInDown">
                    <Row>
                        <Breadcrumb className="shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/cart">CartList</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="mt-3">
                        <Col md={7} lg={7} sm={12} xs={12}>
                            {MyView}
                        </Col>
                         <Col md={5} lg={5} sm={12} xs={12}>
                            <div className="card p-2">
                                        <div className="card-body">
                                            <div className="container-fluid ">
                                                <div className="row">
                                                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                        <h5 className="Product-Name text-success">Due : {totalPrice} TK</h5>
                                                        <h6 className="Product-subtitle text-danger">Delivery Charge : {this.state.delivery_charge} TK</h6>
                                                        <h5 className="Product-Name text-info">Total Due with Delivery : {totalPrice+this.state.delivery_charge} TK</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Choose Your City</label>
                                                        <select onChange={this.cityOnchange} className="form-control">
                                                            <option value="">Choose</option>
                                                            <option value="Dhaka">Dhaka</option>
                                                            <option value="Khulna">Khulna</option>
                                                            <option value="Barisal">Barisal</option>
                                                            <option value="Jessore">Jessore</option>
                                                            <option value="Mymensingh">Mymensingh</option>
                                                            <option value="Chittagong">Chittagong</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Choose Payment Method</label>
                                                        <select onChange={(e)=>this.setState({payment_method:e.target.value})} className="form-control">
                                                           
                                                            <option value="">Choose</option>
                                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Full Name</label>
                                                        <input onChange={(e)=>this.setState({customer_name:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Current Mobile Number</label>
                                                        <input onChange={(e)=>this.setState({customer_mobile:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div>

                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Current Address</label>
                                                        <textarea onChange={(e)=>this.setState({current_address:e.target.value})} rows={2}  className="form-control" type="text" placeholder=""/>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <button onClick={this.onConfirmOrder} className="btn btn-block btn-success">Confirm Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </Col>

                    </Row>
                </Container>
                {this.PageRefresh()}
                {this.RedirectToOrderDetails()}
            </Fragment>
        )
    }
}
export default CartList;