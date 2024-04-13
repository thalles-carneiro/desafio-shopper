import { useState } from "react";
import Form from "../form/form";
import Table from "../table/table";
import MainContainer from "./styles";
import Loading from "../loading/loading";

function Main() {
  const [values, setValues] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainContainer>
      <Form
        onSetValues={ setValues }
        onSetIsLoading={ setIsLoading }
      />
      {
        isLoading
          ? <Loading />
          : <Table values={ values } />
      }
    </MainContainer>
  );
}

export default Main;
