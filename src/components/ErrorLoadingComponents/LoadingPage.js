import React, { useEffect,Fragment } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import "./index.css";
import useFade from "../../Hooks/useFade";

const LoadingPage = () => {

  const [showSupply, setShowSupply, fadeOutProps] = useFade(false, 700);

  useEffect(() => {
    setShowSupply(true);
  }, []);

  return (
    <Fragment>
      {showSupply && (
        <Container {...fadeOutProps} fluid>
          <Row>
            <Col>
              <Card className="mt-2">
                <CardHeader>
                  <h3 class="card__header header__title" id="card-title">
                    <div class="skeleton skeleton-text skeleton-text__body"></div>
                  </h3>
                </CardHeader>
                <CardBody>
                  <div class="card__body body__text" id="card-details">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                  </div>
                </CardBody>
                <CardFooter>
                  <div class="skeleton skeleton-text skeleton-footer"></div>
                </CardFooter>
              </Card>
              <Card className="mt-2">
                <CardHeader>
                  <h3 class="card__header header__title" id="card-title">
                    <div class="skeleton skeleton-text skeleton-text__body"></div>
                  </h3>
                </CardHeader>
                <CardBody>
                  <div class="card__body body__text" id="card-details">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default LoadingPage;
