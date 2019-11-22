import React, {FC, MouseEvent, useState} from "react";
import {Row} from "./grid";
import Button from "./button";

type StepperProps = {
  name: string;
};

const Stepper: FC<StepperProps> = ({name}) => {
  const [value, setValue] = useState(0);
  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value === 0 ? 0 : value - 1);

  const preventDefaultThen = (callback: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    callback();
  };

  return (
    <Row>
      <Button onClick={preventDefaultThen(decrement)}>
        <label style={{fontSize: "30px"}}> - </label>
      </Button>
      <label style={{fontSize: "30px"}}> {value}</label>
      <input type="hidden" name={name} value={value}/>
      <Button onClick={preventDefaultThen(increment)}>
        <span style={{fontSize: "30px"}}> + </span>
      </Button>
    </Row>
  );
};

export default Stepper;
