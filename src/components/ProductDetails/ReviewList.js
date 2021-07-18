import React, {Component, Fragment} from 'react';
import {Container,Row,Col,Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';

class ReviewList extends Component {
    constructor({match}){
        super();
        this.state = {
            ReviewData : [],
            isLoading : '', 
            mainDiv : 'd-none',
        }
    }
    componentDidMount() {
         Axios.get(ApiURL.GetReviewList(this.props.code))
        .then(response=>{
            this.setState({ReviewData : response.data, isLoading:'d-none', mainDiv:''});
        })
        .catch(error=>{

        })
    }
    render() {
        let MyList = this.state.ReviewData;
        if(MyList.length>0)
        {
            let MyView = MyList.map((List, i)=>{
                if(List.reviewer_rating==="1")
                {
                    return <>
                                <p className=" p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>  </p>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                </span> 
                                <p>{List.reviewer_comments}</p>
                        </>
                } 
                else if(List.reviewer_rating==="2")
                {
                    return <>
                                <p className=" p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>  </p>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span> 
                                <p>{List.reviewer_comments}</p>
                        </>
                } 
                else if(List.reviewer_rating==="3")
                {
                    return <>
                                <p className=" p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>  </p>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span> 
                                <p>{List.reviewer_comments}</p>
                        </>
                } 
                else if(List.reviewer_rating==="4")
                {
                    return <>
                                <p className=" p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>  </p>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span> 
                                <p>{List.reviewer_comments}</p>
                        </>
                } 
                else if(List.reviewer_rating==="5")
                {
                    return <>
                                <p className=" p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>  </p>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span> 
                                <p>{List.reviewer_comments}</p>
                        </>
                } 

         })
            return(
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    {MyView}
                </div>
                );
        }
        else {
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    <p>................</p>
                </div>
            );
        }
    }
}

export default ReviewList;