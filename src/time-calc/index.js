import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DateAdapter from "@mui/lab/AdapterLuxon";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { DateTime } from "luxon";

const Loc = ({ children } = {}) => {
  return (
    <LocalizationProvider locale="en-GB" dateAdapter={DateAdapter}>
      {children}
    </LocalizationProvider>
  );
};

const getCurrentTime = () => DateTime.now().toFormat("dd/LL/yyyy - HH:mm:ss");

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
  }, []);
  return <h3>{currentTime}</h3>;
};

export const FlightTime = () => {
  const [value, setValue] = useState(new Date());
  const [diffH, setDiffH] = useState(0);
  const [diffM, setDiffM] = useState(0);

  const calculateDiff = () => {
    var end = DateTime.fromJSDate(new Date(value));
    var start = DateTime.fromJSDate(new Date());

    var diffInMonths = end.diff(start, ["hours", "minutes"]);
    const dd = diffInMonths.toObject(); //=> { months: 1 }
    setDiffH(Math.round(dd.hours));
    setDiffM(Math.round(dd.minutes));
  };

  return (
    <Loc>
      <h2>Flight Time</h2>
      <CurrentTime />
      <DateTimePicker
        format="yyyy-dd-MM"
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <br />
      <br />
      <Button variant="outlined" onClick={calculateDiff}>
        Calculate
      </Button>
      <h3>
        Time needed: {diffH} hours, {diffM} minutes
      </h3>
    </Loc>
  );
};

export default FlightTime;
