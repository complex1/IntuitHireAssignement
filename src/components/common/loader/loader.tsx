import styled from './loader.module.css';
const LoaderComponent = () => {
  return (
    <div className={styled.loader}>
      <div className="loader__dot-1"></div>
      <div className="loader__dot-2"></div>
      <div className="loader__dot-3"></div>
    </div>
  );
}

export default LoaderComponent;