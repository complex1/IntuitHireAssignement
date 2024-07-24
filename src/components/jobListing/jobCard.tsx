import { IJob } from '../../types';
import CardComponent from '../common/card/card';
import styled from './jobCard.module.css';

interface JobCardProps {
  job: IJob;
  onClick: (job: IJob) => void;
}

const JobCardComponent = (props: JobCardProps) => {
  const { job, onClick } = props;

  return (
    <div className={styled.jobCard} onClick={() => onClick(job)} >
      <CardComponent width="100%" >
        <div className="v-center space-between">
          <h3>{job.title}</h3>
          <div>
            <b>Posted On:</b> <span>{job.postedDate}</span>
          </div>
        </div>
        <p>{job.description}</p>
        <div className="flex space-between">
          <div><b>Company:</b> {job.companyName}</div>
          <div className='v-center' >
            <b className='mx-2' >Tags:</b>
            <div>
              {job.tags.map((tag) => (
                <span key={tag} className={styled.chip} >{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  );
};

export default JobCardComponent;