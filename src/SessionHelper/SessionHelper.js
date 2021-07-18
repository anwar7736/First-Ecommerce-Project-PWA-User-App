class SessionHelper{

	static setIdSession(id){
		localStorage.setItem('id', id);
	}

	static getIdSession(){
		return localStorage.getItem('id');
	}

	static setNameSession(name){
		localStorage.setItem('name', name);
	}

	static getNameSession(){
		return localStorage.getItem('name');
	}

	static setEmailSession(email){
		localStorage.setItem('email', email);
	}

	static getEmailSession(){
		return localStorage.getItem('email');
	}

	static setPhoneSession(phone){
		localStorage.setItem('phone', phone);
	}

	static getPhoneSession(){
		return localStorage.getItem('phone');
	}

	static setPhotoSession(photo){
		localStorage.setItem('photo', photo);
	}

	static getPhotoSession(){
		return localStorage.getItem('photo');
	}
	static setRedirectPathSession(redirect_path){
		localStorage.setItem('redirect_path', redirect_path);
	}

	static getRedirectPathSession(){
		return localStorage.getItem('redirect_path');
	}

	static setAboutSession(about){
		localStorage.setItem('about', about);
	}

	static getAboutSession(){
		return localStorage.getItem('about');
	}

	static setRefundSession(refund){
		localStorage.setItem('refund', refund);
	}

	static getRefundSession(){
		return localStorage.getItem('refund');
	}

	static setPolicySession(policy){
		localStorage.setItem('policy', policy);
	}

	static getPolicySession(){
		return localStorage.getItem('policy');
	}

	static setPurchaseSession(purchase){
		localStorage.setItem('purchase', purchase);
	}

	static getPurchaseSession(){
		return localStorage.getItem('purchase');
	}


}
export default SessionHelper;