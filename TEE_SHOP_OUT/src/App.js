import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { BlockUI } from 'primereact/blockui';
import "./App.scss";
import "primeicons/primeicons.css";
import HeaderComponent from "./shared/components/HeaderComponent";
import FooterComponent from "./shared/components/FooterComponent";
import ResetPassword from "./pages/User/Components/ResetPassword";
import Thankyou from "./pages/thankyoupage/thankyoupage";
import './i18n';
import useRTL, { RTLContext } from './useRtl';
const Home = lazy(() =>
  import("./pages/HomePage/components/HomePageComponent")
);
const Shop = lazy(() => import("./pages/Shop/components/ShopHomeComponent"));
const ShopProductDetail = lazy(() =>
  import("./pages/Shop/components/Details/ProductDetailComponent")
);
const productList = lazy(() =>
  import("./pages/Shop/components/List/ListComponent")
);

const wishList = lazy(() =>
  import("./pages/Wishlist/WishListComponent")
);

const Design = lazy(() =>
  import("./pages/DesignPage/components/DesignPageComponent")
);
const Profile = lazy(() => import("./pages/User/ProfileComponent"));
const MyOrder = lazy(() => import("./pages/User/ProfileMyOrders"));

const HeaderWithRouter = withRouter(HeaderComponent);

const mapState = (state) => ({
  loader: state.app.loading,
});

function App() {
  const { loader } = useSelector(mapState);
  const [isRTL, setIsRTL] = useRTL();
  return (
    <>
      {loader && <ProgressSpinner className="loader" />}
      <div className="App thin-scroll">
        {/* //   <BlockUI blocked={loader} fullScreen /> */}

        <Router>
        <RTLContext.Provider value={{ value: isRTL, setValue: setIsRTL }}>
          <HeaderWithRouter />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/design" component={Design} />
              <Route exact path="/shop">
                <Shop />
              </Route>
              <Route
                path="/shop/product/:id"
                exact
                component={ShopProductDetail}
              />
              <Route
                path="/shop/product"
                component={productList}
                exact
              />

              <Route
                path="/wishlist"
                component={wishList}
                exact
              />

              <Route
                path="/myorder"
                component={MyOrder}
                exact
              />
<Route
                path="/thankyou"
                component={Thankyou}
                exact
              />


              <Route path="/profile" component={Profile} />
              <Route path="/reset-password-finish" component={ResetPassword} />
              
            </Switch>
          </Suspense>
          </RTLContext.Provider>
          <FooterComponent />
        </Router>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
