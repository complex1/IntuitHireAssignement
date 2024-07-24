const JSON_SERVER_URL = 'http://localhost:5001';

export const addNewJob = async (job: unknown) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job)
    })
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getJobs = async () => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/jobs`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getJobByCompany = async (companyId: string) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/jobs?companyId=${companyId}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getJobById = async (id: string) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/jobs/${id}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const applyJob = async (jobId: string, applicant: unknown) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/appliedJobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobId: jobId,
        applicant: applicant,
        date: new Date().toDateString()
      })
    })
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getApplicentsByJobId = async (jobId: string) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/appliedJobs?jobId=${jobId}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}