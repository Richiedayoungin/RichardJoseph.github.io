import React from 'react';

import {
  Col,
} from "react-bootstrap";

const ExperienceCard = ({ data }) => {
  return (
    <Col lg="6" className="d-flex justify-content-center">
      <div className="pb-5 text-center experience-card`">
        <img className="company-logo bg-white mb-3" src={data.companylogo} alt="" />
        <p className="lead">
          {data.role}
          <br />
          {data.date}
        </p>

      </div>
    </Col>
  );
}

export default ExperienceCard;