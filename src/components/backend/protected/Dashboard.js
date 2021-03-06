import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
import { Row, Col } from "antd";
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = (props) => {
  //const { register, handleSubmit, errors } = useForm();
  //const notifications = useSelector((state) => state.notifications);
  //const dispatch = useDispatch();
  //const onSubmit = (data) => dispatch(userLogin(data));
  // var startDate = moment().subtract(1, 'months').format('MM-DD');
  // var endDate = moment().format('MM-DD');

  return (
    <div className="dashboard">
      <div className="header-wrapper">
        <Col span={17} offset={3}>
          <Header />
        </Col>
      </div>
      <Row>
        <Col span={17} offset={3}>
          <Row class="dashboard">
            <h3 className="page-title">Dashboard</h3>
          </Row>
          <Footer />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
