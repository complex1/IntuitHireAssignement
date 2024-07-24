import { useEffect, useState } from 'react';
import ButtonComponent from '../../components/common/button/button';
import HeaderComponent from '../../components/common/header/header';
import PostedJobDetailsComponent from '../../components/employer/postedJobDetails';
import PostedJobCard from '../../components/employer/postedJobsCard';
import styled from './Employer.module.css';
import PostNewJobComponent from '../../components/employer/postNewJob';
import { getJobByCompany } from '../../api/jobs';
import { IEmployer, IJob } from '../../types';
const EmployerPage = () => {
  const [postedJobs, setPostedJobs] = useState([] as IJob[]);
  const [selectedJob, setSelectedJob] = useState(null as IJob | null);
  const [addJob, setAddJob] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null as IEmployer | null);

  useEffect(() => {
    const employerData = localStorage.getItem('employer');
    if (!employerData) {
      window.location.href = '/login';
    }
    const data = JSON.parse(employerData || '{}') as IEmployer;
    setCompany(data);
    loadJobs(data.id);
  }, []);

  const addNewJob = () => {
    setAddJob(true);
    setSelectedJob(null);
  }

  const onClickCard = (job: IJob) => {
    setAddJob(false);
    setSelectedJob(job);
  }

  const onJobPosted = () => {
    setAddJob(false);
    setSelectedJob(null);
    loadJobs(company?.id || '');
  }

  const loadJobs = async (companyId: string) => {
    if (!companyId) {
      return;
    }
    try {
      setLoading(true);
      const jobs = await getJobByCompany(companyId) as IJob[];
      setPostedJobs(jobs);
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  }

  return <>
    <HeaderComponent />
    <div className={styled.employer} >
      <div className={styled.employerLeft} >
        <div className={styled.postedJobTitle}>
          <h2>Posted Jobs</h2>
          <ButtonComponent onClick={addNewJob} >
            Post a Job
          </ButtonComponent>
        </div>
        {
          loading ?
            <div className={styled.noJobSelected} >
              <h2>Loading</h2>
            </div> : postedJobs.length === 0 ? <div className={styled.noJobSelected} >
              <h2>No Jobs Posted</h2>
            </div> :
              postedJobs.map((item) => (
                <div key={item.id} className={'my-2'}>
                  <PostedJobCard data={item} onClick={() => onClickCard(item)} />
                </div>
              ))
        }

      </div>
      <div className={styled.employerRight} >
        {
          selectedJob ? <PostedJobDetailsComponent data={selectedJob} showApplicents />
            : addJob && company ? <PostNewJobComponent onJobPosted={onJobPosted} company={company} />
              : <div className={styled.noJobSelected} >
                <h2>No Job Selected</h2>
              </div>
        }
      </div>
    </div>
  </>;
}

export default EmployerPage;