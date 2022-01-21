import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    paddingBottom: 50,
  },
  title: {
    marginTop: "5%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
  link: {
    marginLeft: theme.spacing(1),
    textDecoration: "none",
  },
}));
