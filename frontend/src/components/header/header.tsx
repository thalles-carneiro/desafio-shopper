import shopperLogo from '../../assets/shopper.svg';
import HeaderLogo from './styles';

function Header() {
  return (
    <HeaderLogo>
      <img
        id="logo"
        src={ shopperLogo }
        alt="Logo da Shopper"
      />
    </HeaderLogo>
  );
}

export default Header;
