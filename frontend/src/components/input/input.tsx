import InputContainer from './styles';

type InputProps = {
  onHandleUpload: (value: string) => void,
  fileName: string,
  onSetFileName: (fileName: string) => void,
};

function Input({ onHandleUpload, fileName, onSetFileName }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const [file] = e.target.files as FileList;
      onSetFileName(file.name);
      const reader = new FileReader();
      reader.onload = (r) => {
        const result = r.target?.result as string;
        onHandleUpload(result);
      };
      reader.readAsText(file);
    } catch (_) {
      // Caso após clicar para adicionar um arquivo nenhuma seja selecionado, um erro é disparado
      // Nada é feito aqui, para manter o usuário com tudo carregado, mas ao descomentar as linhas abaixo é possível zerar o que já carregou
      // onSetFileName('');
      // onHandleUpload('');
    }
  };

  return (
    <InputContainer>
      <label className="browse-file">
        Escolha o arquivo
        <input
          type="file"
          accept=".csv, text/csv"
          onChange={ handleChange }
        />
      </label>
      <p className="accepted-file">{ fileName }</p>
    </InputContainer>
  );
}

export default Input;
