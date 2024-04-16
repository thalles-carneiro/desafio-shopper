import { Product } from "../../types";
import formatPrice from "../../utils/formatPrice";
import TableContent from "./styles";

type TableProps = {
  values: Product[],
};

const columns = ['Código', 'Nome', 'Preço Atual', 'Novo Preço', 'Validação'];

function Table({ values }: TableProps) {
  return (
    <TableContent>
      <thead>
        <tr>
          {
            values.length > 0 &&
              columns.map((col: string, index: number) => (
                <th key={ index }>{ col }</th>
              ))
          }
        </tr>
      </thead>
      <tbody>
        {values.map(({ code, name, sales_price, new_price, errors }) => (
          <tr key={ code }>
            <td>{ code }</td>
            <td>{ name ? name : '-' }</td>
            <td>{ sales_price ? formatPrice(+sales_price): '-' }</td>
            <td>{ new_price ? formatPrice(+new_price) : '-' }</td>
            <td className={ errors?.length ? 'entry-error' : '' }>
              {
                errors?.length === 0
                  ? 'Tudo certo! ✅'
                  : errors?.join(' | ')
              }
            </td>
          </tr>
        ))}
      </tbody>
    </TableContent>
  );
}

export default Table;
