import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";
import {
  Button,
  Paper,
  Typography,
  Slider,
  TextareaAutosize,
  Modal,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles";
import NewIdea from "./components/NewIdea";


function App() {
  const initialState = {
    title: "",
    longTitle: "",
    rating: "",
    timestamp: "",
    category: "",
    expectation: "",
  };

  const [values, setValues] = useState(initialState);
  const [ideaObj, setIdeasObj] = useState({});
  const [ideaId, setIdeaId] = useState("");
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([
    "Personal life",
    "Work",
    "Fun",
    "Travel",
    "Education",
    "Other",
  ]);
  const [category, setCategory] = useState([])
  const [update, setUpdate] = useState(false)
  const classes = useStyles()

  const newtime = new Date().toLocaleString();
  // const time = firebase.database.ServerValue.TIMESTAMP

  useEffect(() => {
    db.child("ideas").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setIdeasObj({
          ...snapshot.val(),
        });
      } else {
        setIdeasObj({});
      }
    });
  }, []);

  useEffect(() => {
    if (ideaId === "") {
      setValues({
        ...initialState,
      });
    } else {
      setValues({
        ...ideaObj[ideaId],
      });
    }
  }, [ideaId, ideaObj]);

  function handleInput(e) {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editOrDelete(values);
    setRating(3);
  };

  const editOrDelete = (obj) => {
    if (ideaId === "") {
      db.child("ideas").push(
        {
          ...obj,
          timestamp: newtime,
          rating: rating,
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            setIdeaId("");
          }
        }
      );
    } else {
      db.child(`ideas/${ideaId}`).set({ ...obj, rating: rating }, (err) => {
        if (err) {
          console.log(err);
        } else {
          setIdeaId("");
        }
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      db.child(`ideas/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setIdeaId("");
        }
      });
    }
  };

  function handleSlider(e, newValue) {
    setRating(newValue);
  }

  function handleEditCategory() {
    setOpen(true);
    setCategory('')
  }

  function handleAddCategory() {
      options.push(category)
      setOpen(false)
      setUpdate(false)
  }

  function handleRemoveCategory(string){
    options.splice(string, 1)
    setOpen(false)
    setUpdate(false)

  }

  function handleCategoryInput(e){
    setCategory(e.target.value)
  }
  
  function handleEditOneCategory(index){
    setUpdate(true)
    setCategory(options[index])
    options.splice(index, 1)
  }

  return (
    <div className="App">
      <Typography
        variant="h2"
        className={classes.title}
      >
        IDEA SAVER
      </Typography>
      <Paper
        className={classes.formPaper}
      >
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <label className={classes.formLabel}>
            Title
          </label>
          <input
            value={values.title}
            name="title"
            onChange={handleInput}
            className={classes.titleInput}
          />
          <label className={classes.formLabel}>
            Description
          </label>
          <TextareaAutosize
            rowsMax={10}
            name="longTitle"
            value={values.longTitle}
            onChange={handleInput}
            className={classes.descriptionInput}
          />

          <Typography
            className={classes.ratingInput}
          >
            Rating
          </Typography>
          <Slider
            defaultValue={rating}
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
            name="rating"
            onChange={handleSlider}
            value={rating}
          />
          <label className={classes.formLabel}>
            Category
          </label>
          <select
            value={values.category}
            name="category"
            onChange={handleInput}
            className={classes.categoryInput}
          >
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>

          <Modal open={open} onClose={(e) => setOpen(false)}>
            <Paper
              className={classes.modal}
            >
              {options.map((option, index)=>(
                <div style={{display:"flex", justifyContent:"space-between"}}  key={index}>
                  <Typography>{option}</Typography>
                  <div>
                <Button onClick={()=>handleEditOneCategory(index)}><EditIcon color='primary'/></Button>
                <Button onClick={()=>handleRemoveCategory(index)}><DeleteIcon color='secondary'/></Button>
                  </div>
                </div>
              ))}
              <input placeholder='add category' value={category} onChange={handleCategoryInput} className={classes.modalInput} />
              <Button variant="contained" color="primary" onClick={handleAddCategory}>{update ? "Update category" : "add category"}</Button>
            </Paper>
          </Modal>

          <Button onClick={handleEditCategory}>edit categories</Button>

          <label className={classes.formLabel}>
            Expectation
          </label>
          <input
            name="expectation"
            value={values.expectation}
            onChange={handleInput}
            className={classes.expectationInput}
          />
          <Button type="submit" variant="contained" color="primary">
            {ideaId === "" ? "SAVE" : "Update"}
          </Button>
        </form>
      </Paper>
      <NewIdea ideaObj={ideaObj} setIdeaId={setIdeaId} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
