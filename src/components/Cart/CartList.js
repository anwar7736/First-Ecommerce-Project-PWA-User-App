import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Button, Form, Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../../SessionHelper/SessionHelper';
import swal from 'sweetalert';

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
            total_item : 0,
        }
    }
    componentDidMount(){
        let user_id = SessionHelper.getIdSession();
        let cart = JSON.parse(sessionStorage.getItem('cart')) ?? [];
        this.setState({CartList : cart, total_item: cart == null ? '0' : cart.length});
        // Axios.get(ApiURL.CartItemList(user_id))
        // .then(response=>{
        //     if(response.status===200)
        //     {
        //         this.setState({CartList : response.data});
        //     }
        // })
        // .catch(error=>{

        // })    
        
        // var phone = localStorage.getItem('phone')
        // if(phone!==null)
        // {
        //     this.setState({customer_mobile : phone});
        // } 
       
    }



    cityOnchange=(e)=>
    {
        let option = e.target.value;
        if(option == 'inside')
        {
            this.setState({delivery_charge:80});
        }

        else if(option == 'outside')
        {
            this.setState({delivery_charge:150});
        }  

        else
        {
            this.setState({delivery_charge:0});
        }
        // this.setState({customer_city:city});
        // if(city==='')
        // {
        //     this.setState({delivery_charge:0});
        // }
        // else if(city==='Dhaka')
        // {
        //     this.setState({delivery_charge:50});
        // }
        // else if(city==='Barisal')
        // {
        //     this.setState({delivery_charge:250});
        // }
        // else if(city==='Khulna')
        // {
        //     this.setState({delivery_charge:150});
        // }
        // else if(city==='Jessore')
        // {
        //     this.setState({delivery_charge:100});
        // }
        // else if(city==='Chittagong')
        // {
        //     this.setState({delivery_charge:200});
        // }
        // else if(city==='Mymensingh')
        // {
        //     this.setState({delivery_charge:150});
        // }
       
        
    }

    onConfirmOrder=()=>
    {
        let cart  = JSON.stringify(this.state.CartList);
        let customer_city  = this.state.customer_city;
        let payment_method  = this.state.payment_method;
        let customer_name  = this.state.customer_name;
        let customer_mobile  = this.state.customer_mobile;
        let current_address  = this.state.current_address;
        let delivery_charge  = this.state.delivery_charge;

        if(SessionHelper.getIdSession()===null)
        {
            this.setState({loginRedirect:true})
            SessionHelper.setRedirectPathSession('/cart');
        }

        // if(customer_city.length===0)
        // {
        //     cogoToast.error('Choose Your City');
        // }        
        
        if(payment_method.length===0)
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

        else if(payment_method== 'cash' && delivery_charge == 0)
        {
            cogoToast.error('Choose Delivery Area');
        }

        else{

            let MyForm = new FormData();
            MyForm.append('user_id', SessionHelper.getIdSession());
            // MyForm.append('customer_city', customer_city);
            MyForm.append('method', payment_method);
            MyForm.append('charge', delivery_charge);
            MyForm.append('name', customer_name);
            MyForm.append('phone', customer_mobile);
            MyForm.append('address', current_address);
            MyForm.append('cart', cart);

            Axios.post(ApiURL.PlaceUserOrder, MyForm)
            .then(response=>{
                if(response.status===200)
                {   
                    if(payment_method == 'bkash')
                    {
                        window.location.href = ApiURL.BkashPayment(response.data);
                    }

                    this.setState({redirectStatus:true});
                    cogoToast.success('Your order has been received');
                    sessionStorage.removeItem('cart');
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

    ItemQtyIncrease=(id)=>
    {   
            let cart = JSON.parse(sessionStorage.getItem('cart')) ?? [];
            let index = cart.findIndex(data=> data.id == id);
            if(index != -1 && cart[index]['quantity'] < 10)
            {
                cart[index]['quantity'] += 1;
                cart[index]['total_price'] = cart[index]['quantity'] * cart[index]['price'];
                sessionStorage.setItem('cart', JSON.stringify(cart));
                cogoToast.success('Item Quantity Increased', {position : 'bottom-center'});
                this.setState({refreshStatus: true});
            }



        // let MyForm = new FormData();
        // MyForm.append('id', item_id);
        // MyForm.append('product_quantity', quantity);
        // MyForm.append('unit_price', price);

        //  Axios.post(ApiURL.ItemQtyIncrease, MyForm)
        // .then(response=>{
        //     if(response.status===200 && response.data===1)
        //     {
        //          cogoToast.success('Product Quantity Increased', {position : 'bottom-center'});
        //          this.setState({refreshStatus: true});
        //     }
        //     else
        //     {
        //          cogoToast.error('Something Went Wrong!', {position : 'bottom-center'});
        //     }
        // })
        // .catch(error=>{

        // })
    } 

    ItemQtyDecrease=(id)=>
    {
        let cart = JSON.parse(sessionStorage.getItem('cart')) ?? [];
        let index = cart.findIndex(data=> data.id == id);
        if(index != -1 && cart[index]['quantity'] > 1)
        {
            cart[index]['quantity'] -= 1;
            cart[index]['total_price'] = cart[index]['quantity'] * cart[index]['price'];        
            sessionStorage.setItem('cart', JSON.stringify(cart));
            cogoToast.success('Item Quantity Decreased', {position : 'bottom-center'});
            this.setState({refreshStatus: true});
        }



        // let MyForm = new FormData();
        // MyForm.append('id', item_id);
        // MyForm.append('product_quantity', quantity);
        // MyForm.append('unit_price', price);

        //  Axios.post(ApiURL.ItemQtyDecrease, MyForm)
        // .then(response=>{
        //     if(response.status===200 && response.data===1)
        //     {
        //          cogoToast.success('Product Quantity Decreased', {position : 'bottom-center'});
        //          this.setState({refreshStatus: true});
        //     }
        //     else
        //     {
        //          cogoToast.error('Quantity must not be less than 1!', {position : 'bottom-center'});
        //     }
        // })
        // .catch(error=>{

        // })
    }

    RemoveCartItem=(id)=>
    {
         swal({
              title: "Are you sure?",
              text: "You want to delete this item?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                let cart = JSON.parse(sessionStorage.getItem('cart')) ?? [];
                let index = cart.findIndex(data=> data.id == id);
                if(index != -1)
                {
                    cart.splice(index, 1);   
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    // cogoToast.success('Item Removed', {position : 'bottom-center'});
                    this.setState({refreshStatus: true});
                    swal({
                      title: "Done!",
                      text: "Item is deleted",
                      icon: "success",
                      timer: 1000,
                      button: false
                    });
                }
                    
              }
            });

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

    RedirectToLogin=()=>{
         if(this.state.loginRedirect == true)
        {
            return (
                    <Redirect to="/user_login" />
                    );
        }
    }
    render(){
        let total_item = this.state.total_item;
        let MyList = this.state.CartList;
        let totalPrice = 0;
        let MyView = MyList.map((List, i)=>{
        totalPrice+=parseInt(List.total_price) ;
            return (
                    <>
                        {/* <div className="row">

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
                        </div> */}
                        <div className="row">
                            <div className="col-md-3 text-center col-lg-3 col-sm-4 col-6">
                                <img className="w-100" src={List.image} alt=""/>
                                <button onClick={()=> this.ItemQtyDecrease(List.id)} className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-minus"/></button>
                                <button onClick={()=> this.ItemQtyIncrease(List.id)} className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-plus"/></button>
                                <button onClick={()=> this.RemoveCartItem(List.id)} className="btn mt-2 btn-sm site-btn"><i className="fa fa-trash-alt"/></button>
                            </div>
                            <div className="col-md-7 col-lg-7 col-sm-8 col-6">
                                <h5 className="product-price-on-card text-dark">{(List.name).substring(0,50) } ({(List.code)})</h5>
                                <h5 className="product-price-on-card text-success">Code : {(List.code)}</h5>
                                {
                                    List.size ? <h5 className="product-name-on-card text-primary">Size : {(List.size)}</h5> : ''
                                }
                                                                {
                                    List.color ? <h5 className="product-name-on-card text-danger">Color : {(List.color)}</h5> : ''
                                }
                                
                                <h5 className="product-price-on-card text-info">Unit Price : {List.price}TK</h5>
                                <h5 className="product-price-on-card text-success">Quantity : { List.quantity}</h5>
                                <h5 className="product-price-on-card">Total Price : {List.total_price}TK</h5>
                            </div>
                            </div>
                    <hr/>
                    </>

                    );
        })

        if(total_item == 0)
        {
            return (
                <Fragment>
                    <Container className="TopSection animated slideInDown">
                        <Row>
                            <Breadcrumb className="shadow-sm w-100 bg-white mt-3">
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/cart">CartList</Link></Breadcrumb.Item>
                            </Breadcrumb>
                        </Row>
                        <Row className="p-2">  
                            <Col className="text-center mt-5 text-danger">
                                <h3>Your cart is now empty!</h3>
                            </Col>
                        </Row>
                    </Container>
               </Fragment>
               );
        }
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
                                                {/* <select onChange={this.cityOnchange} className="form-control">
                                                    <option value="">Choose</option>
                                                    <option value="Dhaka">Dhaka</option>
                                                    <option value="Khulna">Khulna</option>
                                                    <option value="Barisal">Barisal</option>
                                                    <option value="Jessore">Jessore</option>
                                                    <option value="Mymensingh">Mymensingh</option>
                                                    <option value="Chittagong">Chittagong</option>
                                                </select>                                                 */}
                                                <select onChange={this.cityOnchange} className="form-control">
                                                    <option value="">Choose Any Option</option>
                                                    <option value="inside">Inside Dhaka City</option>
                                                    <option value="outside">Outside Dhaka City</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Choose Payment Method</label>
                                                <select onChange={(e)=>this.setState({payment_method:e.target.value})} className="form-control">
                                                    
                                                    <option value="">Choose Any Option</option>
                                                    <option value="cash">Cash On Delivery</option>
                                                    <option value="bkash">Bkash</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Your Full Name</label>
                                                <input onChange={(e)=>this.setState({customer_name:e.target.value})} className="form-control" type="text" placeholder="Enter your full name..."/>
                                            </div> 
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Your Current Mobile Number</label>
                                                <input maxlength="11" value={this.state.customer_mobile} onChange={(e)=>this.setState({customer_mobile:e.target.value})} className="form-control" type="text" placeholder="Enter your current mobile number..."/>
                                            </div>

                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Your Current Address</label>
                                                <textarea onChange={(e)=>this.setState({current_address:e.target.value})} rows={2}  className="form-control" type="text" placeholder="Enter your current address..."/>
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
                {this.RedirectToLogin()}

            </Fragment>
        )
    }
}
export default CartList;