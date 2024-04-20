import Swal from 'sweetalert2';
import { Product } from '../../types';
import formatPrice from '../../utils/formatPrice';
import TableContent from './styles';

type TableProps = {
  values: Product[],
};

const columns = ['Código', 'Nome', 'Preço Atual', 'Novo Preço', 'Validação'];

function Table({ values }: TableProps) {
  const handleClick = (errors: string[]) => {
    Swal.fire({
      icon: 'error',
      title: 'Regras de negócio falhando:',
      html: errors.reduce((acc, error, index) => acc.concat(
        `<p class='error-messages'>${index + 1} - ${error}</p>`,
      ), ''),
    });
  };

  return (
    <TableContent>
      <thead>
        <tr>
          {
            values.length > 0 && columns
              .map((col: string, index: number) => (
                <th key={ index }>{ col }</th>
              ))
          }
        </tr>
      </thead>
      <tbody>
        {
          values
            .map((value) => {
              const { code, name, sales_price: salesPrice,
                new_price: newPrice, errors } = value;
              return (
                <tr key={ code }>
                  <td>{ code }</td>
                  <td>{ !name ? '-' : name }</td>
                  <td>{ salesPrice ? formatPrice(+salesPrice) : '-' }</td>
                  <td>{ newPrice ? formatPrice(+newPrice) : '-' }</td>
                  {
                    errors?.length === 0
                      ? <td>✅</td>
                      : (
                        <td
                          className="entry-error"
                          onClick={ () => handleClick(errors || []) }
                        >
                          { `Erros [${errors?.length}]` }
                        </td>
                      )
                  }
                </tr>
              );
            })
        }
      </tbody>
    </TableContent>
  );
}

export default Table;
