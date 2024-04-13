import { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import Button from "../button/button";
import FormContainer from './styles';

type FormProps = {
  onSetValues: (values: string[][]) => void,
  onSetIsLoading: (loading: boolean) => void,
  isUpdating: boolean,
  onSetIsUpdating: (updating: boolean) => void,
};

function Form(props: FormProps) {
  const {
    onSetValues,
    onSetIsLoading,
    isUpdating,
    onSetIsUpdating,
  } = props;
  const [results, setResults] = useState<string[][] | undefined>();
  const { CSVReader } = useCSVReader();

  const handleOnUploadAccepted = ({ data }: { data: string[][] }) => {
    const tableCells = data.filter((_, i) => i !== 0);
    setResults(tableCells);
  };

  const handleOnSubmitValidate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results) {
      onSetIsLoading(true);
      onSetValues(results);
      setTimeout(() => {
        onSetIsLoading(false);
        onSetIsUpdating(true);
      }, 2000);
    }
  };

  const handleOnSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSetIsLoading(true);
    onSetValues([]);
    setResults(undefined);

    setTimeout(() => {
      onSetIsLoading(false);
      onSetIsUpdating(false);
      const acceptedFile = document.querySelector('.acceptedFile') as HTMLElement;
      acceptedFile.textContent = '';
    }, 2000);
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
      >
        { isUpdating ? 'Atualizar' : 'Validar' }
      </Button>
    </FormContainer>
  );
}

export default Form;
