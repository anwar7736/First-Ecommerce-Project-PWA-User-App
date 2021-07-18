class validation{
	static NameRegx=/^[A-Za-z\'\s\.\:\-]+$/;
	static UserNameRegx=/^[A-Za-z0-9\'\s\.\:\-]+$/;
    static MobileRegx=/^(?:\+?88|0088)?01[15-9]\d{8}$/;
    static EmailRegx= /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;

}
export default validation;