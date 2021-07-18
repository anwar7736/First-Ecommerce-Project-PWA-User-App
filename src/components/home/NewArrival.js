import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import NewArrivalPlaceholder from '../placeholder/NewArrivalPlaceholder'

class NewArrival extends React.Component{
    constructor(){
        super();
        this.state = {
            ProductData : [],
            isLoading : '',
            mainDiv : 'd-none',
        }
    }

    componentDidMount(){
        Axios.get(ApiURL.ProductListByRemark("NEW"))
        .then(response=>{
            this.setState({ProductData : response.data, isLoading:'d-none', mainDiv:''});
        })
        .catch(error=>{

        })
    }

    next=()=>{
        this.slider.slickNext();
    }
    previous=()=>{
        this.slider.slickPrev();
    }
 render() {
    let MyList = this.state.ProductData;
    let MyView = MyList.map((ProductList, i)=>{
        if(ProductList.special_price=="NA")
        {
            return <Fragment>
                    <Col className="p-1" key={1}>
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
                    <Col className="p-1" key={1}>
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
    const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplaySpeed:3000,
            autoplay:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        };
    return (
        <Fragment>
            <div className={this.state.isLoading}>
                <NewArrivalPlaceholder/>
            </div>
            <div className={this.state.mainDiv}>
                 <Container className="text-center BetweenTwoSection" fluid={true}>
                    <h4 className="section-title px-0 mx-0 ">NEW ARRIVAL
                        <a className="btn btn-sm ml-2 site-btn" onClick={this.previous} >
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="btn btn-sm ml-2 site-btn" onClick={this.next}>
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </h4>
                    <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Slider  ref={c=>(this.slider=c)}   {...settings}>
                            {MyView}
                        </Slider>


                </Container>
            </div>
        </Fragment>
    );
  }
}

export default NewArrival;
