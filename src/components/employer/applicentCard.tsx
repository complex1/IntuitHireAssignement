import { useState, useEffect } from "react";
import { getFreelancerById } from "../../api/user";
import { IFreelancer } from "../../types";
import CardComponent from "../common/card/card";
import styled from './postedJobDetails.module.css';

const AppliceantCardComponent = ({ application }: {
  application: {
    jobId: string;
    applicant: string;
    date: string;
  }
}) => {

  const [userDetails, setUserDetails] = useState(null as IFreelancer | null);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const userDetails = await getFreelancerById(application.applicant);
      setUserDetails(userDetails);
    } catch (error) {
      console.error(error);
    }
  }

  const onApplicantClick = () => {
    window.location.href = `/freelancer/${userDetails?.id}`;
  }

  return (
    <div onClick={onApplicantClick} >
      <CardComponent >
        <>
          <div className='flex space-between'>
            <h4 className={styled.applicantName} >
              {userDetails?.fullName}
            </h4>
            <p className={styled.applicantApplied}><b>Applied on:</b> {application.date}</p>
          </div>
          <div className='v-center space-between mt-2' >
            <div className="v-center">
              <p className={`${styled.skillLabel} mr-2`}>Contact: </p>
              <small>{userDetails?.contactNumber}</small>
            </div>
            <div className="v-center">
              <p className={`${styled.skillLabel} mr-2`}>Email: </p>
              <small>{userDetails?.email}</small>
            </div>
          </div>
        </>
      </CardComponent>
    </div>
  );
}

export default AppliceantCardComponent;
