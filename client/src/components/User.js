import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getData, getGoal } from "../Api";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const goalPath = "/add";
const reached = "Goal Reached";
const notReached = "Goal Not Reached";

const useStyles = makeStyles({
  main: {
    width: "50%",
    margin: "5% 0 0 35%",
    fontSize: 20,
    "& > *": {
      marginTop: 20,
    },
    backgroundColor: "#000",
    alignItems: "",
  },
  root: {
    maxWidth: 545,
    fontSize: 20,
    "& > *": {
      marginTop: 20,
    },
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  const [user, setUser] = useState([]);
  const [goal, setGoal] = useState([]);
  useEffect(() => {
    usersData();
    userGoalData();
  }, []);
  const search = useLocation().search;
  const id = search.slice(1);
  const usersData = async () => {
    const result = await getData(id);
    setUser(result?.data);
  };

  const userGoalData = async () => {
    const result = await getGoal(id);
    setGoal(result?.data);
  };

  return (
    <div className={classes.main}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2" style={{}}>
              Your Steps
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
              {user.Step}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2" style={{}}>
              Target
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
              {goal.number}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2" style={{}}>
              Percentage
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
              {(user.Step * 100) / goal.number}%
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2" style={{}}>
              Status
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
              {user.Step >= goal.number ? reached : notReached}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" color="#fff">
            <Link to={`${goalPath}?${id}`}>Set Goal</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
