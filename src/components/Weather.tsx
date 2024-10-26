/* tslint:disable */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { fetchRequest } from "./utils/common";

interface IProps {
  lat: number;
  long: number;

  variables: string[];
}

const Weather: React.FC<IProps> = (props) => {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { variables } = props;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      const data = await fetchRequest(props);
      data ? setWeather(data) : setError(true);
      setLoading(false);
    };

    fetchData();
  }, [props.variables]);

  //статус загрузки
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  //статус ошибки
  if (error || weather == "error") {
    return <div>Error loading data.</div>;
  }
  
  //статус наличия данных
  if (!weather) {
    return <div>No data available.</div>;
  }

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <td>date</td>
          {variables.map((variable, index) => (
            <td key={index}>{variable}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {weather.daily.time.map((time, index) => (
          <tr key={index}>
            <td>{time}</td>
            {variables.map((variable, varIndex) => {
              const ownProperty = weather.daily.hasOwnProperty(variable);
              if (ownProperty) {
                return <td key={varIndex}>{weather.daily[variable][index]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Weather;
