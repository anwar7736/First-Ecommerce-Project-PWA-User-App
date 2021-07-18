import React, {Component,Fragment} from 'react';
import {Container, Row, Col, Card, Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class ListByCategory extends Component {
    render() {
        let MyList = this.props.ProductData;
        let MyView = MyList.map((ProductList,i)=>{
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
        });
        {
            if(MyView.length==0)
            {
                return (
                        <Fragment><br/>
                        <Row className="p-2">
                            <Breadcrumb className="shadow-sm w-100 bg-white mt-5">
                              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                              <Breadcrumb.Item><Link to={"/ProductListByCategory/"+this.props.category}>ListByCategory</Link></Breadcrumb.Item>
                            </Breadcrumb>
                        </Row>
                            <Container className="text-center TopSection" fluid={true}>
                                <h4 className="section-title text-success"><span className="text-danger">CATEGORY</span> <span className="text-success">WISE</span> <span className="text-primary">PRODUCTS</span></h4>
                                <h4 className="section-title text-muted">CATEGORY : <span className="text-danger">{this.props.category}</span> </h4>
                                  <Row>
                                      <Col className="text-center text-danger">
                                            <h3>No Data Found</h3>
                                      </Col>
                                  </Row>
                           </Container>
                        </Fragment>
                        );
            }
            else{
                return (
                        <Fragment><br/>
                          <Row className="p-2">
                            <Breadcrumb className="shadow-sm w-100 bg-white mt-5">
                              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                              <Breadcrumb.Item><Link to={"/ProductListByCategory/"+this.props.category}>ListByCategory</Link></Breadcrumb.Item>
                            </Breadcrumb>
                         </Row>
                            <Container className="text-center TopSection" fluid={true}>
                                <h4 className="section-title text-success"><span className="text-danger">CATEGORY</span> <span className="text-success">WISE</span> <span className="text-primary">PRODUCTS</span></h4>
                                <h4 className="section-title text-muted">CATEGORY : <span className="text-danger">{this.props.category}</span></h4><br/>
                                  <Row>
                                    {MyView}

                                  </Row>
                           </Container>
                        </Fragment>
                    );
            }
        }
    }
}

export default ListByCategory;