import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: "#07d38a",
    fontWeight: "700",
    padding: "1rem",
    letterSpacing: "10px",
  },
  formPaper: {
    maxWidth: "400px",
    padding: "1rem",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    margin: "0 auto",
  },
  formLabel: {
    textAlign: "left",
    fontStyle: "italic",
  },
  titleInput: {
    marginBottom: ".3rem",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid lightblue",
    outlineColor: "blue",
    // width: "100%"
  },
  descriptionInput: {
    marginBottom: ".3rem",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid lightblue",
    outlineColor: "blue",
  },
  ratingInput: {
    display: "flex",
    justifyContent: "flex-start",
    fontStyle: "italic",
    fontSize: "15px",
    marginTop: "1rem",
    color: "black",
  },
  categoryInput:{
    marginBottom: ".3rem",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid lightblue",
    outlineColor: "blue",
  },
  modal:{
    maxWidth: "500px",
    outlineColor:"blue",
    display: "flex",
    justifyContent: "center",
    margin: "3rem auto",
    flexDirection:"column",
    padding:"1rem"
  },
  modalInput:{
    marginBottom: ".3rem",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid lightblue",
    outlineColor: "blue"
  },
  expectationInput:{
    marginBottom: ".3rem",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid lightblue",
    outlineColor: "blue",
  }
}));
