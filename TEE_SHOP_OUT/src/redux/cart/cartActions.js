/* eslint-disable array-callback-return */

import callApi from "../../services/connection.services";
import appActionTypes from "../app/actionTypes";
import actionTypes from "./actionTypes";
export const getProductsRequest = (payload) => {
  let url = "/products";
  if (payload && payload.length > 0) {
    url = url + '?filter={"where":{"and":[' + payload.join(",") + ']},"order":"name%20DESC"}';
  }
  return (dispatch) => {
    return callApi(url, "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getTrendingProductsRequest = (payload) => {
  let url = '/products?filter={"where":{"trending":"true"}}[limit]=3';
  return (dispatch) => {
    return callApi(url, "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getProductCategoryRequest = () => {
  return (dispatch) => {
    return callApi("/product-categories", "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getProductDetailsRequest = (productId) => {
  return (dispatch) => {
    return callApi("/products/" + productId, "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getBrandsRequest = () => {
  return (dispatch) => {
    return callApi("/brands", "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const AddToCart = (item) => ({
  type: actionTypes.ADD_TO_CART,
  payload: item,
});


export const Payment = (data) => {
  let url = "/payment";

  return (dispatch,getState) => {
    return callApi(url, "POST", data, true)
      .then(async(res) => {
       const state=getState()
      
const finalproduct=[]

       const products=state.cartData.cartItems
      
     //  const data2= await callApi('/address', "get",null, true)
     
       products.map((item)=>{
          const p={
            "productId": item.id,
      
            "quantity": Object.values(item.qty)[0],
            "price": item.price
          }
          finalproduct.push(p)
       })
        const { data } = res;
     
        if(data.data.status ==="Success")
        {
         
         
            let orderdata={
              
              "date": new Date(),
              "userId": state.user.loggedInUser.id,
              "fullName": `${state.user.shippingInfo.firstName} ${state.user.shippingInfo.firstName}`,
              "total": state.cartData.grandTotal ,
              "billingAddress":{
              "userId": state.user.loggedInUser.id,
    "firstName": state.user.shippingInfo.firstName,
    "lastName": state.user.shippingInfo.lastName,
    "email": state.user.shippingInfo.email,
    "phone": state.user.shippingInfo.phone,
    "houseNo": state.user.shippingInfo.address,
    "street": state.user.shippingInfo.street,
    "city": state.user.shippingInfo.city,
    "state": state.user.shippingInfo.region,
    "country": state.user.shippingInfo.country,
    "zipcode":state.user.shippingInfo.pinCode,
    "primary":state.user.shippingInfo.save
              } ,
              "shippingAddress": {
                "userId": state.user.loggedInUser.id,
      "firstName": state.user.shippingInfo.firstName,
      "lastName": state.user.shippingInfo.lastName,
      "email": state.user.shippingInfo.email,
      "phone": state.user.shippingInfo.phone,
      "houseNo": state.user.shippingInfo.address,
      "street": state.user.shippingInfo.street,
      "city": state.user.shippingInfo.city,
      "state": state.user.shippingInfo.region,
      "country": state.user.shippingInfo.country,
      "zipcode":state.user.shippingInfo.pinCode,
      "primary":state.user.shippingInfo.save
                },
              "products":finalproduct ,
              "paymentInfo": data.data
            }

          await callApi(`/users/${state.user.loggedInUser.id}/orders`, "POST", orderdata, true).then((res)=>{
            console.log(res)
            debugger
            dispatch({ type: actionTypes.ORDERCREATED,payload:res.data })
            
          })
        }
      
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};


export const clearlastorder=()=>{
  return (dispatch)=>{
    dispatch({ type: actionTypes.ORDERCREATED,payload:null })
  }
}
