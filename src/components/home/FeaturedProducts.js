import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import FeaturedProductLoader from '../placeholder/FeaturedProductLoader'

class FeaturedProducts extends React.Component{
    constructor(){
        super();
        this.state = {
            ProductData : [],
            isLoading : '',
            mainDiv : 'd-none',
        }
    }
    componentDidMount(){
        Axios.get(ApiURL.ProductListByRemark("TOP"))
        .then(response=>{
            this.setState({ProductData : response.data, isLoading:'d-none', mainDiv:''});
        })
        .catch(error=>{

        })
    }
 render() {
    let MyList = this.state.ProductData;
    let MyView = MyList.map((ProductList, i)=>{
        if(ProductList.special_price=="NA")
        {
            return <Fragment>
                    <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                   <Link className="link" to={"/product_details/"+ProductList.code}>
                         <Card className="card w-100 image-box h-100">
                        <img src={ProductList.image} />
                        <Card.Body>
                            <h5 className="product-name-on-card">{ProductList.name}</h5>
                            <p className="product-price-on-card">Price: {ProductList.price}TK</p>
                        </Card.Body>
                    </Card>
                   </Link>
                </Col>
              </Fragment>
        }
        else{
            return <Fragment>
                    <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                   <Link className="link" to={"/product_details/"+ProductList.code}>
                         <Card className="card w-100 image-box h-100">
                        <img src={ProductList.image} />
                        <Card.Body>
                            <h5 className="product-name-on-card">{ProductList.name}</h5>
                            <p className="product-price-on-card">Price: <strike className="text-muted">{ProductList.price}</strike> {ProductList.special_price}TK</p>
                        </Card.Body>
                    </Card>
                   </Link>
                </Col>
              </Fragment>
        }
    })
    return (
        <Fragment>
            <div className={this.state.isLoading}>
                <FeaturedProductLoader/>
            </div>
           <div className={this.state.mainDiv}>
                <Container className="text-center BetweenTwoSection" fluid={true}>
                  <h4 className="section-title">FEATURED PRODUCTS</h4>
                  <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                  <Row>
                    {MyView}
                  </Row>
               </Container>
           </div>
        </Fragment>
    );
  }
}

export default FeaturedProducts;
