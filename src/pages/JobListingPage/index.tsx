import { useEffect, useMemo, useState } from 'react';
import HeaderComponent from '../../components/common/header/header';
import { IFilter, IJob } from '../../types';
import styled from './jobListingPage.module.css'
import { getJobs } from '../../api/jobs';
import FilterPanelComponent from '../../components/jobListing/filterPanel';
import JobCardComponent from '../../components/jobListing/jobCard';
const JobListingPage = () => {
  const [jobs, setJobs] = useState([] as IJob[]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
    tags: [] as string[],
    tagOptions: [] as string[],
    sortBy: 'postedDate',
    companys: [] as string[],
    companysOptions: [] as string[],
    experience: 0,
    experienceOptions: [] as number[],
    salaryMin: 0,
    salaryMax: 6,
  } as IFilter);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobs = await getJobs() as IJob[];
      setJobs(jobs);
      const tags = jobs.reduce((acc, job) => {
        job.tags.forEach((tag) => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
        return acc;
      }, [] as string[]);
      const companys = jobs.reduce((acc, job) => {
        if (!acc.includes(job.companyId) && job.companyName) {
          acc.push(job.companyName);
        }
        return acc;
      }, [] as string[]);

      setFilter({
        ...filter,
        tagOptions: tags,
        companysOptions: companys,
      });
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  }

  const filterJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search = filter.search.toLowerCase();
      if (search && !job.title.toLowerCase().includes(search)) {
        return false;
      }
      if (filter.tags.length > 0 && !filter.tags.some((tag) => job.tags.includes(tag))) {
        return false;
      }
      if (filter.companys.length > 0 && !filter.companys.includes(job.companyName)) {
        return false;
      }
      if (job.salary > filter.salaryMin && job.salary > filter.salaryMax) {
        return false;
      }
      return true;
    }
    ).sort((a, b) => {
      if (filter.sortBy === 'postedDate') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      } else if (filter.sortBy === 'applicants') {
        return a.applicants - b.applicants;
      }
      return b.applicants - a.applicants;
    });
  }, [jobs, filter]);
  return (
    <>
      <HeaderComponent />
      <div className={`${styled.jobListing} p-5`} >
        <div className={styled.filterSection}>
          <FilterPanelComponent filter={filter} setFilter={setFilter} />
        </div>
        <div className={styled.jobList}>
          {
            loading ?
              <div className={styled.noJobSelected} >
                <h2>Loading</h2>
              </div> : filterJobs.length === 0 ? <div className={styled.noJobSelected} >
                <h2>No Jobs Found</h2>
              </div> :
                filterJobs.map((item) => (
                  <div key={item.id} className={'my-2'}>
                    <JobCardComponent job={item} onClick={(job) => {
                      window.location.href = `/job/${job.id}`;
                    }} />
                  </div>
                ))
          }
        </div>
      </div>
    </>
  );
}

export default JobListingPage;