import { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import Swal from 'sweetalert2';
import Button from "../button/button";
import FormContainer from './styles';
import { getProductsValidation, updateProductPrice } from '../../services/api';
import { CSVFileEntry, Product } from '../../types';

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
  const [results, setResults] = useState<CSVFileEntry[] | undefined>();
  const { CSVReader } = useCSVReader();

  const resetFormState = () => {
    onSetValues([]);
    onSetIsUpdating(false);
  };

  const handleOnUploadAccepted = ({ data }: { data: string[][] }) => {
    const tableCells = data
      .filter((_, i) => i !== 0)
      .map(([product_code, new_price]) => ({
        code: Number(product_code),
        new_price: Number(new_price),
      }));
    setResults(tableCells);
    resetFormState();
  };

  const handleOnSubmitValidate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results) {
      onSetIsLoading(true);
      const products = await getProductsValidation(results);
      const values = products.map((product: Product, index: number) => (
        {...product, new_price: results[index].new_price }
      ));
      onSetValues(values);
      onSetIsLoading(false);
      onSetIsUpdating(true);
    }
  };

  const handleOnSubmitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSetIsLoading(true);
    if (results) {
      await updateProductPrice(results);
  
      resetFormState();
      setResults(undefined);
      const acceptedFile = document.querySelector('.acceptedFile') as HTMLElement;
      acceptedFile.textContent = '';
      Swal.fire({
        icon: "success",
        title: "Banco de dados atualizado!",
        text: "Os novos preços dos produtos já estão em vigor.",
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
      <CSVReader
        onUploadAccepted={ handleOnUploadAccepted }
        config={{ worker: true }}
        noDrag
      >
        {({
          getRootProps,
          acceptedFile,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }: any) => (
            <div className='csvReader'>
              <button
                className='browseFile'
                type='button'
                {...getRootProps()}
              >
                Escolha o arquivo
              </button>
              <p className='acceptedFile'>
                {acceptedFile && acceptedFile.name}
              </p>
            </div>
          )
        }
      </CSVReader>
      <Button
        update={ isUpdating }
        values={ values }
      >
        { isUpdating ? 'Atualizar' : 'Validar' }
      </Button>
    </FormContainer>
  );
}

export default Form;
