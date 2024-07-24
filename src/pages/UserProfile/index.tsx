/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from 'react-router-dom';
import HeaderComponent from '../../components/common/header/header';
import styled from './userProfile.module.css'
import { useState, useEffect } from 'react';
import { getFreelancerById, getUserGithubProfile, getUserGithubRepos } from '../../api/user';
import { IFreelancer } from '../../types';
import GithubRepoCardComponent from '../../components/userProfile/githubCard';
import BackIcon from '../../components/common/icons/backIcon';

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null as IFreelancer | null);
  const [githubProfile, setGithubProfile] = useState(null as any);
  const [githubRepos, setGithubRepos] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const user = await getFreelancerById(id);
      const githubUsername = user.githubUsername;
      if (githubUsername) {
        const githubProfile = await getUserGithubProfile(githubUsername);
        const githubRepos = await getUserGithubRepos(githubUsername);
        setGithubProfile(githubProfile);
        setGithubRepos(githubRepos);
      }
      setUser(user);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const avatar = githubProfile?.avatar_url || 'https://via.placeholder.com/150';

  return (
    <>
      <HeaderComponent />
      <div className={styled.userDetail} >
        {loading ? <div className="loading" >Loading...</div> : (
          <div>
            <div className='v-center' onClick={() => {
              window.history.back();
            }} ><BackIcon className='mr-2' /> Back</div>
            <div className={styled.userCard}>
              <img src={avatar} alt="avatar" />
              <div>
                <h2>{user?.fullName}</h2>
                <p><b className='mr-1' >Email:</b>{user?.email}</p>
                <p><b className='mr-1' >Contect:</b>{user?.contactNumber}</p>
              </div>
            </div>
            <div className={styled.divider} ></div>
            <div className={styled.userDetailSection} >
              <h3>Bio:</h3>
              <p>
                {githubProfile?.bio || 'No bio available'}
              </p>
            </div>
            <div className={styled.divider} ></div>
            {/* repos */}
            <div className={styled.userDetailSection} style={{
              flexDirection: 'column'
            }} >
              <h3>Repositories:</h3>
              <div className={styled.repos} >
                {githubRepos.map((repo, index) => (
                  <GithubRepoCardComponent key={index} repo={repo} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfilePage;