import React, { useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import { validVariables } from "./components/utils/constants";
import { splitStringToArray } from "./components/utils/common";

function App() {
  const [variables, setVariables] = useState<string[]>([]);

  //Функция обработки ввода
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arrParams = splitStringToArray(event.target.value);
    const validParams = arrParams.filter((param: string) =>
      validVariables.includes(param)
    );
    setVariables(validParams);
  };

  return (
    <div className="main">
      <div>
        <label>
          <input type="text" onChange={(event) => inputHandler(event)} />
        </label>
      </div>
      <Weather lat={55.751244} long={37.618423} variables={variables} />
    </div>
  );
}

export default App;
