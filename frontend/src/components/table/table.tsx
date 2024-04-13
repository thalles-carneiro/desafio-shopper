import formatPrice from "../../utils/formatPrice";
import TableContent from "./styles";

type TableProps = {
  values: string[][],
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
        {values.map(([id, newPrice]: string[]) => (
          <tr key={ id }>
            <td>{ id }</td>
            <td>{ 'Nome do produto' }</td>
            <td>{ formatPrice('xx.xx') }</td>
            <td>{ formatPrice(newPrice) }</td>
            <td>{ 'Tudo certo! ✅' }</td>
          </tr>
        ))}
      </tbody>
    </TableContent>
  );
}

export default Table;
