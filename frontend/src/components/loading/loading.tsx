import appleIcon from '../../assets/apple-icon.png';
import LoadingContainer from './styles';

function Loading() {
  return (
    <LoadingContainer>
      <img className='_splash-screen-logo' src={ appleIcon } alt="Apple icon" />
      <div className='_splash-screen-loader'>
        <div className='_splash-screen-loader-bar'></div>
      </div>
    </LoadingContainer>
  );
}

export default Loading;
