import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { useState } from "react";

import ChoiceMonth from "./components/ChoiceMonth";
import GetList from "./components/GetList";

import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import ways from "../select-variables/ways";

const Kotei = () => {
  const [open, setOpen] = useState(false);
  const [way, setWay] = useState();
  var today = new Date();
  const [date, setDate] = useState(today.getTime());

  var today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);

  const handleSubmit = (event) => {
    console.log("clicked");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addDoc(collection(db, "kotei"), {
      title: data.get("title"),
      cost: data.get("cost"),
      way: way,
      month: Timestamp.fromDate(new Date(date)),
    });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            固定費の追加
          </Button>
        </Grid>
        <Grid item xs={4}>
          <ChoiceMonth month={month} setMonth={setMonth} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <GetList collectionName="kotei" month={month} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              id="name"
              label="What?"
              fullWidth
              variant="standard"
              name="title"
            />
            <TextField
              id="cost"
              label="How much?"
              fullWidth
              variant="standard"
              name="cost"
            />
            <TextField
              select
              onChange={(e) => setWay(e.target.value)}
              value={way}
              id="way"
              label="How?"
              fullWidth
              variant="standard"
              name="way"
            >
              {ways.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Kotei;
