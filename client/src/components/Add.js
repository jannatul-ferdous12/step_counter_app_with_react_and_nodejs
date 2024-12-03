import React, { useState } from "react";
import {
  Typography,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
} from "@material-ui/core";
import { postData } from "../Api";
import { useHistory, useLocation, Link } from "react-router-dom";

const useStyles = makeStyles({
  forms: {
    width: "50%",
    margin: "5% 0 0 25%",
    fontSize: 20,
    "& > *": {
      marginTop: 20,
    },
  },
});

const formVal = {
  number: "",
};
const Add = () => {
  const [data, setData] = useState(formVal);
  const { number } = data;
  const classes = useStyles();
  const history = useHistory();
  // const navigate = useNavigate();
  const search = useLocation().search;
  const userId = search.slice(1);

  const valueChange = (e) => {
    setData({ [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    await postData({ uid: userId, number: data.number }).then(
      history.push("/dashboard?" + userId)
    );
  };

  return (
    <FormGroup className={classes.forms}>
      <Typography variant="h4">Add your goal for steps</Typography>
      <FormControl>
        <InputLabel>Total Step Goal</InputLabel>
        <Input onChange={(e) => valueChange(e)} name="number" value={number} />
      </FormControl>
      <Button variant="contained" color="primary" onClick={() => addUser()}>
        Set Goal
      </Button>
    </FormGroup>
  );
};

export default Add;
