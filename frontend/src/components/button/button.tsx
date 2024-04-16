import { Product } from "../../types";
import ActionButton from "./styles";

type ButtonProps = {
  children: string,
  update?: boolean,
  values: Product[],
};

function Button({ children, update, values }: ButtonProps) {
  const isDisabled = update
    ? values.some(({ errors }) => errors?.length)
    : false;

  return (
    <ActionButton
      type="submit"
      disabled={ isDisabled }
      $secondary={ update }
    >
      { children }
    </ActionButton>
  );
}

export default Button;
