class ApiURL{
	static baseURL = "https://admin.coderanwar.com/api/";
	static VisitorDetails = this.baseURL + "GetVisitorDetails";
	static SendContactDetails = this.baseURL + "SendContactDetails";
	static GetSiteInfo = this.baseURL + "GetSiteInfo";
	static GetCategoryDetails = this.baseURL + "GetCategoryInfo";
	static GetSliderInfo = this.baseURL + "GetSliderInfo";
	static UserRegistration = this.baseURL + "UserRegistration";
	static EmailVerification = this.baseURL + "EmailVerification";
	static OTPVerification = this.baseURL + "OTPVerification";
	static GetOTPExpiration = this.baseURL + "GetOTPExpiration";
	static ForgetPassword = this.baseURL + "ForgetPassword";
	static ChangePassword = this.baseURL + "ChangePassword";
	static UserLogin = this.baseURL + "UserLogin";
	static LoginWithGoogle = this.baseURL + "LoginWithGoogle";
	static AddToFavourite = this.baseURL + "AddToFavourite";
	static AddToCart = this.baseURL + "AddToCart";
	static ItemQtyIncrease = this.baseURL + "ItemQtyIncrease";
	static ItemQtyDecrease = this.baseURL + "ItemQtyDecrease";
	static PlaceUserOrder = this.baseURL + "PlaceUserOrder";
	static PostUserReview = this.baseURL + "PostUserReview";
	static UpdateProfile = this.baseURL + "UpdateProfile";

	static ProductListByRemark(remark){
		return this.baseURL+"ProductListByRemark/"+remark;
	}

	static ProductListByCategory(category){
		return this.baseURL+"ProductListByCategory/"+category;
	}

	static ProductListBySubcategory(category, subcategory){
		return this.baseURL+"ProductListBySubcategory/"+category+"/"+subcategory;
	}
	
	static GetProductDetails(product_code){
		return this.baseURL+"GetProductDetails/"+product_code;
	}

	static GetReviewList(product_code){
		return this.baseURL+"GetReviewList/"+product_code;
	}

	static GetSimilarProducts(subcategory){
		return this.baseURL+"GetSimilarProducts/"+subcategory;
	}
	
	static ProductListBySearch(search_query){
		return this.baseURL+"ProductListBySearch/"+search_query;
	}

	static CartCount(user_id){
		return this.baseURL+"CartCount/"+user_id;
	}

	static FavItemCount(user_id){
		return this.baseURL+"FavItemCount/"+user_id;
	}

	static NotificationCount(user_id){
		return this.baseURL+"CountUnreadNotification/"+user_id;
	}

	static GetNotificationList(user_id){
		return this.baseURL+"GetNotificationList/"+user_id;
	}

	static UpdateNotificationStatus(id){
		return this.baseURL+"UpdateNotificationStatus/"+id;
	}

	static FavItemList(user_id){
		return this.baseURL+"FavItemList/"+user_id;
	}

	static RemoveFavItem(item_id){
		return this.baseURL+"RemoveFavItem/"+item_id;
	}

	static CartItemList(user_id){
		return this.baseURL+"CartItemList/"+user_id;
	}

	static RemoveCartItem(item_id){
		return this.baseURL+"RemoveCartItem/"+item_id;
	}

	static GetOrderDetails(user_id){
		return this.baseURL+"GetOrderDetails/"+user_id;
	}
	
	static GetUserProfile(user_id){
		return this.baseURL+"GetUserProfile/"+user_id;
	}

	
}
export default ApiURL;