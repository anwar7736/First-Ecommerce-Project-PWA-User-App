import React, {Component, Fragment} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';

class SliderHome extends React.Component{
 render() {
     const settings = {
            dots: true,
            infinite: true,
            autoplay:true,
            autoplaySpeed:3000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

    const MyList = this.props.data;
    const MyView = MyList.map((List, i)=>{
          return <div className="container-fluid m-0 p-0 overflow-hidden w-100 shadow-sm">
             <div style={{backgroundColor: List.bg_color}} className="m-0 p-0">
               <div className="row card-body">
                   <div className="col-md-6 slider-title-div animated slideInDown text-center">
                       <h1 style={{color: List.text_color}} className="slider-title">{List.title}</h1>
                       <h1 style={{color: List.text_color}} className="slider-sub-title">
                           {List.subtitle}
                       </h1>
                       <Link to={"/product_details/"+List.product_code} className="btn btn-success px-5">More</Link>
                   </div>
                   <div className="col-md-6 animated slideInDown text-center">
                       <img className="slider-img" src={List.image} alt="slider img"/>
                   </div>
               </div>
           </div>
           </div>
    })
    return (
        <Fragment>
             <Slider {...settings}>
                  {MyView}
            </Slider>
        </Fragment>
    );
  }
}

export default SliderHome;
