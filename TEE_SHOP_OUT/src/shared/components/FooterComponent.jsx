import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";

export default function FooterComponent() {
  const [value4, setValue4] = useState("");
  const {t}=useTranslation()
  return (
    <div className="footer-container">
      <Container fluid>
        <Row className="footer-info">
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <img src={logo} alt="" className="logo" />
          </Col>
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h6>{t("Main_Pages")}</h6>
            <div>
              <ul>
                <li>{t("About_Us")}</li>
                <li>{t("Contact_Us")}</li>
                <li>{t("Abouts")}</li>
              </ul>
            </div>
          </Col>
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            {" "}
            <h6>Policy</h6>
            <div>
              <ul>
                <li>{t("Terms_of_Usage")} </li>
                <li> {t("Privacy_Policy")}</li>
                <li>{t("Return Policy")}</li>
              </ul>
            </div>
          </Col>
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h6>{t("Categories")}</h6>
            <div>
              <ul>
                <li>{t("Mens apparel")}</li>
                <li>{t("Womens apparel")}</li>
                <li>{t("Kidss apparel")}</li>
                <li>{t("Dual_Color")} </li>
                <li>{t("Accessories")}</li>
              </ul>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} className="mb-4 mb-md-0">
            <h6>{t("Subscribe")}</h6>
            <div>
              <p>
               {t("subnewsletter")}
              </p>
              <span className="p-input-icon-right">
                <Button
                  label={t("Subscribe")}
                  className="p-button-rounded tee-btn-success"
                />
                <InputText
                  value={value4}
                  onChange={(e) => setValue4(e.target.value)}
                />
              </span>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row className="footer-reserve">
          <Col>© 2021. All rights reserved</Col>
          <Col className="txt-align-end">Visa</Col>
        </Row>
      </Container>
    </div>
  );
}
