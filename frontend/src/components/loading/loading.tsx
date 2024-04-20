import appleIcon from '../../assets/apple-icon.png';
import LoadingContainer from './styles';

function Loading() {
  return (
    <LoadingContainer>
      <img className="splash-screen-logo" src={ appleIcon } alt="Apple icon" />
      <div className="splash-screen-loader">
        <div className="splash-screen-loader-bar" />
      </div>
    </LoadingContainer>
  );
}

export default Loading;
