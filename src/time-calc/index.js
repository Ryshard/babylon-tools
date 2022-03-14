import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DateAdapter from "@mui/lab/AdapterLuxon";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { DateTime } from "luxon";

const Loc = ({ children } = {}) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      {children}
    </LocalizationProvider>
  );
};

const getCurrentTime = () => DateTime.now().toFormat("yyyy LLLL dd - HH:mm:ss");

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(getCurrentTime);
    }, 1000);
  }, []);
  return <h3>{currentTime}</h3>;
};

export const FlightTime = () => {
  const [value, setValue] = useState(new Date());

  return (
    <Loc>
      <h2>Flight Time</h2>
      <CurrentTime />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <br />
      <br />
      <Button variant="outlined">Calculate</Button>
    </Loc>
  );
};

export default FlightTime;
