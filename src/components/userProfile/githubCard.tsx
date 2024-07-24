/* eslint-disable @typescript-eslint/no-explicit-any */
import CardComponent from '../common/card/card';
import styled from './githubCard.module.css'

const GithubRepoCardComponent = ({ repo }: { repo: any }) => {
  const repoUrl = repo.html_url;
  return (
    <a href={repoUrl} target='_blank' className={styled.repoCard} >
      <CardComponent>
        <h4>{repo.name}</h4>
        <p>{repo.description}</p>
        <div className='v-center space-between mt-4' >
          <span className={styled.language} >{repo.language}</span>
          <span className={styled.stars} >{repo.stargazers_count} stars</span>
        </div>
      </CardComponent>
    </a>
  )
}

export default GithubRepoCardComponent;