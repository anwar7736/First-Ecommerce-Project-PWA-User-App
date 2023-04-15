import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../../SessionHelper/SessionHelper';
import swal from 'sweetalert';

class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            refreshStatus : false,
        }
    }

    RemoveFavItem=(item_id)=>{
        swal({
              title: "Are you sure?",
              text: "You want to delete this item?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                 Axios.get(ApiURL.RemoveFavItem(item_id))
                .then(response=>{
                    if(response.status===200 && response.data===1)
                    {
                         swal({
                              title: "Done!",
                              text: "Item is deleted",
                              icon: "success",
                              timer: 1000,
                              button: false
                            });
                         this.setState({refreshStatus: true});
                    }
                    else
                    {
                         swal({
                              title: "Error!",
                              text: "Something Went Wrong!",
                              icon: "warning",
                              timer: 1000,
                              button: false
                            });
                    }
                })
                .catch(error=>{
                     swal({
                          title: "Error!",
                          text: "Something Went Wrong!",
                          icon: "warning",
                          timer: 1000,
                          button: false
                        });
                });
                    
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
    render() {
       let MyList = this.props.FavList;

       let MyView = MyList.map((List,i)=>{
            return (
                    <>
                        
                            <Col className="p-1" xl={2} lg={2} md={2} sm={6} xs={6} >
                               
                                    <Card className="card text-center w-100  image-box ">
                                         <Link className="link" to={"/product_details/"+List.product_code}>
                                            <img src={List.product_image}/>    
                                         </Link>
                                        <Card.Body>
                                            <h5 className="product-name-on-card">{List.product_name}</h5>
                                            <p className="product-price-on-card">Price: {List.product_price}TK</p>
                                              <Button onClick={()=>this.RemoveFavItem(List.id)} className="btn btn-sm site-btn"><i className="fa fa-trash-alt"></i> Remove </Button>
                                        </Card.Body>
                                    </Card>
                            </Col>
                            
                    </>
                );
        })
        return (
            <Fragment>
                <Container  className="text-center bg-white card-body shadow-sm py-5 BetweenTwoSection animated slideInDown" fluid={true}>
                    <Row>
                        <Breadcrumb className="shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/favourite">Favourite</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <h4 className="section-title ">My Favourite Items</h4>
                    <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                    <Row >
                        {MyView}
                    </Row>
                </Container>
                 {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default Favourite;