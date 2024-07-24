import { IJob } from "../../types";
import CardComponent from "../common/card/card";
import styled from './postedJobsCard.module.css';

interface PostedJobCardProps {
  data: IJob;
  onClick: () => void;
}

const PostedJobCard = (props: PostedJobCardProps) => {
  const { data, onClick } = props;
  return (
    <CardComponent>
      <div onClick={onClick} >
        <div className={styled.titleBar}>
          <h3 className={styled.title} >{data.title}</h3>
          <div className={styled.applicants}>
            {data.applicants} Applicants
          </div>
        </div>
        <div className="flex space-between my-2">
          <p className={styled.date} >Posted on: {data.postedDate}</p>
          <p className={styled.date}>Deadline: {data.deadline}</p>
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
