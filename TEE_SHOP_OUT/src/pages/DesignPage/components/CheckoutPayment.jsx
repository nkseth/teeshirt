import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Elements,
  CardElement,
  CardNumberElement, CardExpiryElement, CardCvcElement,
  useStripe,
  useElements,
  stripePayment
} from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "primereact/radiobutton";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { setShippimgMethod } from "../../../redux/user/userActions";
import { goToPayment } from "../../../redux/design/designActions";
import { Payment } from "../../../redux/cart/cartActions";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const mapState = (state) => ({
  shippingInfo: state.user.shippingInfo,
});




 const CheckoutPayment=(props)=> {
  
  // Variable declaration part
  const { shippingInfo } = useSelector(mapState);
  const dispatch=useDispatch()
const {lastorder}=useSelector((state)=>state.cartData)
  const processcheckout = (token) => {
    dispatch(Payment(
      {
        "stripeToken": token.id,
        "amount": props.amount
      }
    ));


    
  };

  useEffect(()=>{
    if(lastorder){
      props.history.push('/thankyou')
    }
  },[lastorder])
const {t}=useTranslation()
  return (
    <>
      <Row className="info-head">
        <Col xs={6} className="info-category-head">
          {t("Payment Information")}
        </Col>
      </Row>

      <Row style={{ padding: "1em" }}>
        <Col xs={12} className="ship-box">
          <Row className="info-row justify-content-between">
            <Col xs={12} sm={2} className="label">
            {t("Contact")}
            </Col>
            <Col sm={8}>{shippingInfo.email}</Col>
            <Col sm={2} className="change-label">
             {t("Change")}
            </Col>
          </Row>
          <Row className="info-row justify-content-between">
            <Col xs={12} sm={2} className="label">
              {t("Ship to")}
            </Col>
            <Col sm={8}>
              {shippingInfo.firstName} {shippingInfo.lastName} <br />
              {shippingInfo.address} {shippingInfo.street}, {shippingInfo.city},
              {shippingInfo.region}, {shippingInfo.country},{" "}
              {shippingInfo.pinCode} <br />
             {t("mobile")}: {shippingInfo.phone}
            </Col>
            <Col sm={2} className="change-label">
              {t("Change")}
            </Col>
          </Row>
        </Col>
      </Row>

      {/*************Payment Options********* */}
      <Row style={{ padding: "1em" }}>
        <Col xs={12} className="ship-box">
        <StripeCheckout
              stripeKey="pk_test_51JxTaBHneeV50Qz279YeijjaIAMx5QaKg1vPxdFtVqZuY6lfr9HJXLrGWvkkA8xDrP6IXVO0ZkeJC2fdxXsEOPsh00rBgZxSZm"
              token={processcheckout}
              name={"Tee Shop"}
              currencies={["aed"]}
              amount={props.amount *100}
              alipay
              bitcoin
            >
              <Button style={{ marginTop: 50 }}>{t("Proceeed With Payment")}</Button>
            </StripeCheckout>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(CheckoutPayment)