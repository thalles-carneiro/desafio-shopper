import { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import Button from "../button/button";
import FormContainer from './styles';

type FormProps = {
  onSetValues: (values: string[][]) => void,
};

function Form({ onSetValues }: FormProps) {
  const [results, setResults] = useState<string[][] | undefined>();
  const { CSVReader } = useCSVReader();

  const handleOnUploadAccepted = ({ data }: { data: string[][] }) => {
    const tableCells = data.filter((_, i) => i !== 0);
    setResults(tableCells);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results) {
      onSetValues(results);
    }
  };

  return (
    <FormContainer onSubmit={ handleOnSubmit }>
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
      <Button>Validar</Button>
    </FormContainer>
  );
}

export default Form;
