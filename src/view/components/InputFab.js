import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import categories from "../../select-variables/categories";
import ways from "../../select-variables/ways";

const InputFab = () => {
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [category, setCategory] = useState(categories[0].value);
  var today = new Date();
  const [date, setDate] = useState(today.getTime());
  const [way, setWay] = useState(ways[0].value);

  // Modalの状態
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Formの状態
  const formOnChange = (e) => {
    switch (e.target.id) {
      case "name":
        setTitle(e.target.value);
        break;
      case "cost":
        setCost(e.target.value);
        break;
    }
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeWay = (event) => {
    setWay(event.target.value);
  };

  // 送信ボタン
  const handleSubmit = () => {
    addDoc(collection(db, "daily"), {
      title: title,
      cost: cost,
      category: category,
      way: way,
      month: Timestamp.fromDate(new Date(date)),
    });
    setTitle("");
    setCost(0);
    setOpen(false);
    // console.log(new Date(date).toString());
  };

  return (
    <>
      <Fab
        color="secondary"
        onClick={handleToggle}
        size="medium"
        variant="circular"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "4px",
          bottom: "5%",
          position: "fixed",
          right: 10,
          zIndex: theme.zIndex.speedDial,
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => formOnChange(e)}
            id="name"
            label="What?"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => formOnChange(e)}
            id="cost"
            label="How much?"
            fullWidth
            variant="standard"
          />
          <TextField
            select
            onChange={handleChangeCategory}
            value={category}
            id="category"
            label="For What?"
            fullWidth
            variant="standard"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            onChange={handleChangeWay}
            value={way}
            id="way"
            label="How?"
            fullWidth
            variant="standard"
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputFab;
