const JSON_SERVER_URL = 'http://localhost:5001';

export const addCompany = async (company: unknown) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company)
    })
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const addFreelancer = async (freelancer: unknown) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/freelancer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(freelancer)
    })
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getCompany = async (id: string) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/company/${id}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getFreelancer = async (id: string) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/freelancer/${id}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getCompanies = async () => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/company`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getFreelancers = async () => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/freelancer`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getFreelancerById = async (id: string) => {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/freelancer/${id}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getUserGithubProfile = async (username: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const getUserGithubRepos = async (username: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}