import { useEffect, useState } from "react";
import { IFreelancer, IJob } from "../../types";
import CardComponent from "../common/card/card";
import styled from './postedJobsCard.module.css';
import { getApplicentsByJobId } from "../../api/jobs";

interface PostedJobCardProps {
  data: IJob;
  onClick: () => void;
}

const PostedJobCard = (props: PostedJobCardProps) => {
  const { data, onClick } = props;
  const [applications, setApplications] = useState<IFreelancer[]>([]);

  useEffect(() => {
    loadApplicents();
  }, [data.id]);

  const loadApplicents = async () => {
    try {
      const applicationsTemp = await getApplicentsByJobId(data.id);
      setApplications(applicationsTemp);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <CardComponent>
      <div onClick={onClick} >
        <div className={styled.titleBar}>
          <h3 className={styled.title} >{data.title}</h3>
          <div className={styled.applicants}>
            {applications.length} Applicants
          </div>
        </div>
        <div className="flex space-between my-2">
          <p className={styled.date} ><b>Posted on:</b> {data.postedDate}</p>
          <p className={styled.date}><b>Deadline:</b> {data.deadline}</p>
        </div>
        <div>
          {data.tags.map((tag, index) => (
            <span key={index} className={styled.chip} >{tag}</span>
          ))}
        </div>
      </div>
    </CardComponent>
  );
}

export default PostedJobCard;
