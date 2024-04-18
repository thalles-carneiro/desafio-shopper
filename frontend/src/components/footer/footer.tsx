import shopperLogo from '../../assets/logo-shopper.svg';
import FooterContainer from './styles';

function Footer() {
  return (
    <FooterContainer>
      <img
        className="logo"
        src={ shopperLogo }
        alt="Logo da Shopper"
      />
      <p>
        <span>Desafio técnico feito por </span>
        <a href='https://www.linkedin.com/in/thallescarneiro/' target="_blank">Thalles Carneiro</a>
      </p>
    </FooterContainer>
  );
}

export default Footer;
