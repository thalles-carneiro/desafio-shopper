import { useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import Swal from 'sweetalert2';
import Button from '../button/button';
import FormContainer from './styles';
import { getProductsValidation, updateProductPrice } from '../../services/api';
import { Product } from '../../types';
import Input from '../input/input';

type FormProps = {
  values: Product[],
  onSetValues: (values: Product[]) => void,
  onSetIsLoading: (loading: boolean) => void,
  isUpdating: boolean,
  onSetIsUpdating: (updating: boolean) => void,
};

function Form(props: FormProps) {
  const {
    values,
    onSetValues,
    onSetIsLoading,
    isUpdating,
    onSetIsUpdating,
  } = props;
  const [results, setResults] = useState<Product[] | undefined>();
  const [fileName, setFileName] = useState('');

  const { readString } = usePapaParse();

  const resetFormState = () => {
    onSetValues([]);
    onSetIsUpdating(false);
  };

  const handleUpload = (value: string) => {
    readString(value, {
      worker: true,
      complete: ({ data }) => {
        const onlyValues = data.filter((_, i) => i !== 0);
        const tableCells = onlyValues.map((entry) => {
          const [productCode, newPrice] = entry as string[];
          const csvEntry = { code: Number(productCode), new_price: Number(newPrice) };
          return csvEntry;
        });
        setResults(tableCells);
      },
    });

    resetFormState();
  };

  const handleOnSubmitValidate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results) {
      onSetIsLoading(true);
      const products = await getProductsValidation(results);
      const valuesMapped = products.map((product: Product, index: number) => (
        { ...product, new_price: results[index].new_price }
      ));
      onSetValues(valuesMapped);
      onSetIsLoading(false);
      onSetIsUpdating(true);
    }
  };

  const handleOnSubmitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSetIsLoading(true);
    if (results) {
      await updateProductPrice(results);
      setFileName('');
      resetFormState();
      setResults(undefined);
      Swal.fire({
        icon: 'success',
        title: 'Banco de dados atualizado!',
        text: 'Os novos preços dos produtos já estão em vigor.',
      });
    }
    onSetIsLoading(false);
  };

  return (
    <FormContainer
      onSubmit={
        isUpdating
          ? handleOnSubmitUpdate
          : handleOnSubmitValidate
      }
    >
      <Input
        onHandleUpload={ handleUpload }
        fileName={ fileName }
        onSetFileName={ setFileName }
      />
      <Button update={ isUpdating } values={ values } />
    </FormContainer>
  );
}

export default Form;
