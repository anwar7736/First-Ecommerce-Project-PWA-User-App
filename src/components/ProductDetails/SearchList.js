import React, {Component, Fragment} from 'react';
import {Container,Row,Col,Card, Breadcrumb} from "react-bootstrap";
import {Link} from "react-router-dom";
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import ProductListLoader from '../placeholder/ProductListLoader'

class SuggestedProducts extends Component {
    render(){
        let MyList = this.props.ProductList;
        let search_query = this.props.search_query;
        let MyView;
        if(MyList.length > 0)
        {
            MyView = MyList.map((ProductList, i)=>{
                 if(ProductList.special_price=="NA")
                 {
                    return <Fragment>
                            <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                           <Link className="link" to={"/product_details/"+ProductList.code}>
                                 <Card className="card w-100 image-box">
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
                                 <Card className="card w-100 image-box">
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
        }
        else{
             MyView = <>
                        <Col className="text-danger text-center">
                              <h1>No Data Found</h1>
                        </Col>
                    </>
        }
        return (
            <Fragment><br/>
                <Row className="p-2">
                    <Breadcrumb className="shadow-sm w-100 bg-white mt-5">
                      <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                      <Breadcrumb.Item><Link to={"/ProductListBySearch/"+search_query}>Search For : {search_query}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <Container className="text-center BetweenTwoSection">
                    <h3 className="section-title">Search Result for : {search_query}</h3>
                    <br/>
                    <Row>
                      
                        {MyView}
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default SuggestedProducts;