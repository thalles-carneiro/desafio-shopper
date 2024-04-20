import { Product } from '../../types';
import ActionButton from './styles';

type ButtonProps = {
  update?: boolean,
  values: Product[],
};

function Button({ update = false, values }: ButtonProps) {
  const isDisabled = update
    ? values.some(({ errors }) => errors?.length)
    : false;

  return (
    <ActionButton
      type="submit"
      disabled={ isDisabled }
      $secondary={ update }
    >
      { update ? 'Atualizar' : 'Validar' }
    </ActionButton>
  );
}

export default Button;
