import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardActions: {
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
}));
