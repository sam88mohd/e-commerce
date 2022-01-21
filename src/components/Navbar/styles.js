import { makeStyles } from "@material-ui/core";

const borderWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${borderWidth}px)`,
      marginLeft: borderWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  image: {
    marginRight: "10px",
  },
  grow: {
    flexGrow: 1,
  },
}));
