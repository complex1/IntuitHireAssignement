
import cardStyled from './postedJobsCard.module.css';
import styled from './postedJobDetails.module.css';
import AppliceantCardComponent from './applicentCard';
import { IFreelancer, IJob } from '../../types';
import ButtonComponent from '../common/button/button';
import { applyJob, getApplicentsByJobId } from '../../api/jobs';
import { useEffect, useState } from 'react';
import Notification from '../../plugins/notification/notification';



const PostedJobDetailsComponent = ({ data, showApplicents }: { data: IJob, showApplicents: boolean }) => {

  const [applications, setApplications] = useState<{
    jobId: string;
    applicant: string;
    date: string;
  }[]>([]);
  

  useEffect(() => {
    loadApplicents();
  }, [data.id]);

  const loadApplicents = async () => {
    try {
      const applications = await getApplicentsByJobId(data.id);
      setApplications(applications);
    } catch (error) {
      console.error(error);
    }
  }

  const onApply = async () => {
    try {
      const freelancerData = localStorage.getItem('freelancer');
      if (!freelancerData) {
        window.location.href = '/login';
      }
      const freelancer = JSON.parse(freelancerData || '{}') as IFreelancer;
      await applyJob(data.id, freelancer.id)
      Notification.success('Applied successfully');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  return <div className='p-5' >
    <div className={cardStyled.titleBar}>
      <h3 className={cardStyled.title} >{data.title}</h3>
      <div className={cardStyled.applicants}>
        {applications.length} Applicants
      </div>
    </div>
    <div className="flex space-between mt-2">
      <p className={cardStyled.date} ><b>Posted on:</b> {data.postedDate}</p>
      <p className={cardStyled.date}><b>Deadline:</b> {data.deadline}</p>
    </div>
    <div className='mb-2' >
      <p className={cardStyled.date} ><b>Salary:</b> {data.salary}LPA</p>
    </div>
    <div>
      {data.tags.map((tag, index) => (
        <span key={index} className={cardStyled.chipLight} >{tag}</span>
      ))}
    </div>
    <div className={styled.description}>
      <h4>Description</h4>
      <p>{data.description}</p>
    </div>
    <div className={styled.description}>
      <h4>Requirements</h4>
      <p>{data.description}</p>
    </div>
    <div className={styled.divider} ></div>
    {showApplicents ? <>
      <div className={styled.applicants}>
        <h4>Applicants</h4>
        {applications.length ? applications.map((application, index) => (
          <div className='mb-2' key={index} >
            <AppliceantCardComponent application={application} />
          </div>
        )) : <div className='my-2' >
          <h4 className={styled.noApplicants} >No Applicants</h4>
        </div>}
      </div></> : <div className='flex justify-end' >
      <div className='mx-2' >
        <ButtonComponent variant='danger' onClick={() => {
          window.location.href = '/';
        }} > Close </ButtonComponent>
      </div>
      <ButtonComponent variant='success' onClick={onApply} > Apply </ButtonComponent>
    </div>}
  </div>
}

export default PostedJobDetailsComponent;