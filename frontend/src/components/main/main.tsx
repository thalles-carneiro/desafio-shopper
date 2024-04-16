import { useState } from "react";
import Form from "../form/form";
import Table from "../table/table";
import MainContainer from "./styles";
import Loading from "../loading/loading";
import { Product } from "../../types";

function Main() {
  const [values, setValues] = useState<Product[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainContainer>
      <Form
        values={ values }
        onSetValues={ setValues }
        onSetIsLoading={ setIsLoading }
        isUpdating={ isUpdating }
        onSetIsUpdating={ setIsUpdating }
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
