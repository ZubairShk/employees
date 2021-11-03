import { makeStyles } from "@material-ui/core/styles";

export const kycCardStyles = makeStyles((theme) => ({
  authSectionMain: {
    height: "100%",
    overflow: "auto",
    // boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
  },
  containerRoot: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    maxWidth: 619,
    /* [theme.breakpoints.only("lg")]: {
      width: 550,
    }, */
    /* [theme.breakpoints.only("md")]: {
      width: 660,
    }, */
    /* [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9),
    }, */
  },
  input: {
    display: "none",
  },
  kycUploadBtn: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  dragNdDropText: {
    color: "#0F2940",
    fontWeight: "bold",
    border: "1px dashed grey",
    borderRadius: "10px",
  },
}));
