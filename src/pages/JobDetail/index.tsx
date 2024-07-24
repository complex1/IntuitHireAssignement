import { useParams } from "react-router-dom";
import HeaderComponent from "../../components/common/header/header";
import styled from './jobDetail.module.css';
import { IJob } from "../../types";
import { useEffect, useState } from "react";
import { getJobById } from "../../api/jobs";
import PostedJobDetailsComponent from "../../components/employer/postedJobDetails";

const JobDetailComponent = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null as IJob | null);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    if (!id) return
    const job = await getJobById(id);
    setJob(job);
  }

  return (
    <>
      <HeaderComponent />
      <div className={styled.jobDetail} >
        {job ? <PostedJobDetailsComponent data={job} showApplicents={false} /> : <div>Loading...</div>}
      </div>
    </>
  );
}

export default JobDetailComponent;