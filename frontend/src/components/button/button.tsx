import ActionButton from "./styles";

type ButtonProps = {
  children: string,
  update?: boolean,
};

function Button({ children, update }: ButtonProps) {
  return (
    <ActionButton type="submit" $secondary={ update }>
      { children }
    </ActionButton>
  );
}

export default Button;
