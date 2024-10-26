interface IFetchRequestProps {
  lat: number;
  long: number;
  variables: string[];
}

//функция для отправки запроса
export const fetchRequest = async (props: IFetchRequestProps) => {
  const resp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=${
      props.long
    }&daily=${props.variables.join(",")}&timezone=Europe/Moscow&past_days=0`,
    { method: "GET" }
  );
  const data = await resp.json();
  if (data.error) {
    return "error";
  }
  return data;
};

//Функция для разбивки данных из поля ввода в массив
export const splitStringToArray = (inputVal: string) => {
  return inputVal.split(",").map((param) => param.trim());
};
