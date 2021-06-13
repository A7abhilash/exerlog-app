import React, { useState } from "react";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { globalColors } from "../../styles/globalStyles";

export default function ({ addNewLog }) {
  const [openCalender, setOpenCalender] = useState(false);
  const [logDate, setLogDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    setOpenCalender((prev) => !prev);
    setLogDate(date || logDate);
    // console.log(event);
    if (event.type === "set") {
      const selectedDate = new Date(date).toDateString();
      // console.log(selectedDate);
      addNewLog(selectedDate);
    }
  };

  return (
    <>
      <Button
        mode="contained"
        color={globalColors.Primary}
        onPress={() => setOpenCalender((prev) => !prev)}
      >
        Add New Log
      </Button>
      {openCalender && (
        <DateTimePicker
          value={logDate}
          onChange={handleDateChange}
          mode="date"
        />
      )}
    </>
  );
}
