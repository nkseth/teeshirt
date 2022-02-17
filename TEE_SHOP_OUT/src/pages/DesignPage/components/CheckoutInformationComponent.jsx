import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Col, Row,Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector,connect } from "react-redux";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import {
  setShippingInfo,
  getAddressRequest,
  getUserDetails,
  deleteAddressRequest,
  updateAddressRequest,
  addAddressRequest,
} from "../../../redux/user/userActions";
import { goToShipping } from "../../../redux/design/designActions";
import { useTranslation } from "react-i18next";

const countryDroDowmStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "10pt",
  color: "#495057",
  background: "#ffffff",
  padding: "0.5rem 0.5rem",
  border: "1px solid #ced4da",
  transition:
    "background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
  appearance: "none",
  borderRadius: "3px",
  width: "100%",
};

const mapState = (state) => ({
  shippingInfo: state.user.shippingInfo,
  isLoggedIn: state.user.isLoggedIn,
  loggedUser: state.user,
  loggedInUser: state.user.loggedInUser,
});

  

  //  UI Render Part 

 function CheckoutInformationComponent({getAddressRequest}) {

  // Initial declaration 
  const dispatch = useDispatch();
  const { isLoggedIn, loggedInUser, loggedUser } = useSelector(mapState);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [country, setCountry] = useState("");

  const [region, setRegion] = useState("");
  const { shippingInfo } = useSelector(mapState);

  const countryRef = useRef("");
  let defaultValues=  {
    firstName: "",
    email: "",
    lastName: "",
    address: "",
    city: "",
    street: "",
    country: country,
    region: region,
    pinCode: "",
    save: true,
  }
  /// Initial function calls

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm();


  
  
  useEffect(() => {
    console.log({ loggedUser: loggedUser });
    console.log({ loggedInUser: loggedInUser });

    

    async function getItems() {
      try {
        const response = await getAddressRequest();
        console.log(response);
        if (response.length >= 0) {
          setAddress(response);
          debugger
        } else {
          console.log("Nor correct reponse");
          //dispatch(loggedOut());
          //history.replace("./");
          //toast("Login expired! Please login again!");
          return;
        }
      } catch (error) {
        console.log("### ListsHoc :: error :: ", error);
      }
    }

    getItems(); 
  }, [
    getAddressRequest,
  ]);


  
  useEffect(() => {
    debugger
   if(address.length>0){
 debugger
   if(selectedAddress!==null){
     console.log(address,selectedAddress);
     debugger
   // setValue({...address[selectedAddress]})
   const values= {
     firstName: address[selectedAddress].firstName,
     email:address[selectedAddress].email,
     lastName:address[selectedAddress].lastName,
     address:address[selectedAddress].houseNo,
     city: address[selectedAddress].city,
     street: address[selectedAddress].street,
     country: address[selectedAddress].country,
     region:address[selectedAddress].state,
     pinCode: address[selectedAddress].zipcode,
     phone: address[0].phone
   }
   const field=Object.keys(values)
   const v=Object.values(values)
   for(let i=0;i<field.length;i++){
    setValue(field[i],v[i], { shouldValidate: true })
   }
  
   }
   else {
     debugger
     console.log(address,selectedAddress);
     setselectedAddress(0)
     setValue('firstName', address[0].firstName, { shouldValidate: true })
     const values= {
      firstName: address[0].firstName,
      email:address[0].email,
      lastName:address[0].lastName,
      address:address[0].houseNo,
      city: address[0].city,
      street: address[0].street,
      country: address[0].country,
      region:address[0].state,
      pinCode: address[0].zipcode,
      phone: address[0].phone
    }

    const field=Object.keys(values)
   const v=Object.values(values)
   for(let i=0;i<field.length;i++){
    setValue(field[i],v[i], { shouldValidate: true })
   }
    }
   
  }
  },[address])
   

 


  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(setShippingInfo(data));
    dispatch(goToShipping());
  };

  const {t}=useTranslation()
  return (
    <>
      <Container>
      <Row style={{ fontSize: 16, color: "#4B567B" }}>
          {

          address && address.length === 0 ?(
            <>{t("Empty")}</>
          ):address.map((item,i)=>{
            var selectedAddr = 0;
            return (
              <Col md={{span: 3,offset: 1,}} className={selectedAddress===i?"Checkout__Address__info1":"Checkout__Address__info2"} key={i}>
                 <div onClick={(e)=>{
                    setselectedAddress(i);
                 }}>
                 <p>{item.firstName.toUpperCase()+' '+item.lastName.toUpperCase()}</p>
                <p>{item.street.toUpperCase()}</p>
                <p>{item.city.toUpperCase()+' '+item.state}</p>
                <p>{item.country.toUpperCase()+' '+item.zipcode}</p>
                <p>{item.phone ? (
                    <p style={{ marginTop: 10 }}>
                      {" "}
                      {"Ph - " + item.phone}{" "}
                    </p>
                  ) : null}</p> 
                 </div>
              </Col>
            )
          })
          }
      </Row>
      </Container>
      <Row className="info-head">
        <Col xs={6} className="info-category-head">
          {t("Contact Information")}
        </Col>
        <Col xs={6} className="log-text">
          {t("Already_Have_An_Account?")} <span className="login-link">{t("Login")}</span>
        </Col>
      </Row>
      <Row className="info-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-fluid"
          autoComplete="off"
        >
          <Row>
            <Col>
              <div className="p-field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message:
                          "Invalid email address. E.g. example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({ "p-error": !!errors.email })}
                  >
                  {t("Email")}*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
            </Col>
          </Row>
          <Row className="form-head">
            {" "}
            <Col xs={6} className="info-category-head">
              {" "}
              {t("Shipping_Address")}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "first name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    {t("First Name")}*
                  </label>
                </span>
                {getFormErrorMessage("firstName")}
              </div>
            </Col>

            <Col xs={6}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "last name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="lastName"
                    className={classNames({ "p-error": errors.name })}
                  >
                  {t("Last Name")}*
                  </label>
                </span>
                {getFormErrorMessage("lastName")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: "address is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    {t("House no, Building name")}
                  </label>
                </span>
                {getFormErrorMessage("address")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="street"
                    control={control}
                    rules={{ required: "Street is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    {t("Street name, Area")}
                  </label>
                </span>
                {getFormErrorMessage("street")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="city"
                    className={classNames({ "p-error": errors.name })}
                  >
                   {t("City")}
                  </label>
                </span>
                {getFormErrorMessage("city")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="country"
                    defaultValue={false}
                    control={control}
                    rules={{ required: "Country is required." }}
                    render={({ field }) => (
                      <CountryDropdown
                        id={field.name}
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setCountry(e);
                        }}
                        style={countryDroDowmStyle}
                      />
                    )}
                  />
                  {/* <label htmlFor="country">Country</label> */}
                </span>
              </div>
            </Col>
            <Col xs={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: "Region is required." }}
                    render={({ field }) => (
                      <RegionDropdown
                        country={country}
                        id={field.name}
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        style={countryDroDowmStyle}
                      />
                    )}
                  />
                  {/* <label htmlFor="country">State</label> */}
                </span>
              </div>
            </Col>
            <Col xs={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="pinCode"
                    control={control}
                    rules={{ required: "Pincode is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="pinCode"
                    className={classNames({ "p-error": errors.name })}
                  >
                    {t("Pin code")}
                  </label>
                </span>
                {getFormErrorMessage("pinCode")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "phone is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                   {t("Phone Number")} 
                  </label>
                </span>
                {getFormErrorMessage("phone")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="p-field-checkbox">
                <Controller
                  name="save"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <Checkbox
                      inputId={field.name}
                      onChange={(e) => field.onChange(e.checked)}
                      checked={field.value}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="save"
                  style={{ margin: 0, marginLeft: ".5em", fontSize: "10pt" }}
                  className={classNames({ "p-error": errors.accept })}
                >
                  {t("Save this information for the next time")}
                </label>
              </div>
            </Col>
          </Row>
          <div>
            <Button
              label={t("Continue To Shipping")}
              className="p-button-rounded tee-btn-success"
            />
          </div>
        </form>
      </Row>
    </>
  );
}

// export default AddressComponent;
const mapDispatchToProps = {
  getAddressRequest,
  updateAddressRequest,
  addAddressRequest,
  getUserDetails,
  deleteAddressRequest,
};

export default connect(null, mapDispatchToProps)(CheckoutInformationComponent);

