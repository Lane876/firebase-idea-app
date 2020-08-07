import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";
import {
  Button,
  Paper,
  Typography,
  Slider,
  Divider,
  TextareaAutosize,
  Modal,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
  }

  function handleAddCategory() {
    options.push(category)
    setOpen(false)
  }



  function handleRemoveCategory(string){
    options.splice(string, 1)
    setOpen(false)
  }

  function handleCategoryInput(e){
    setCategory(e.target.value)
  }

  return (
    <div className="App">
      <Typography
        variant="h2"
        style={{ color: "#ffff", fontWeight: "700", padding: "1rem" }}
      >
        IDEA SAVER
      </Typography>
      <Paper
        style={{
          width: "400px",
          padding: "1rem",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            height: "auto",
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <label style={{ textAlign: "left", fontStyle: "italic" }}>
            Title
          </label>
          <input
            value={values.title}
            name="title"
            onChange={handleInput}
            style={{
              marginBottom: ".3rem",
              padding: "1rem",
              borderRadius: "5px",
              border: "1px solid lightblue",
              outlineColor: "blue",
            }}
          />
          <label style={{ textAlign: "left", fontStyle: "italic" }}>
            Description
          </label>
          <TextareaAutosize
            rowsMax={10}
            name="longTitle"
            value={values.longTitle}
            onChange={handleInput}
            style={{
              marginBottom: ".3rem",
              padding: "1rem",
              borderRadius: "5px",
              border: "1px solid lightblue",
              outlineColor: "blue",
            }}
          />

          <Typography
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontStyle: "italic",
              fontSize: "15px",
              marginTop: "1rem",
              color:"black"
            }}
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
          <label style={{ textAlign: "left", fontStyle: "italic" }}>
            Category
          </label>
          <select
            value={values.category}
            name="category"
            onChange={handleInput}
            style={{
              marginBottom: ".3rem",
              padding: "1rem",
              borderRadius: "5px",
              border: "1px solid lightblue",
              outlineColor: "blue",
            }}
          >
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>

          <Modal open={open} onClose={(e) => setOpen(false)}>
            <Paper
              style={{
                width: "500px",
                outlineColor:"blue",
                display: "flex",
                justifyContent: "center",
                margin: "3rem auto",
                flexDirection:"column",
                padding:"1rem"
              }}
            >
              {options.map((option, index)=>(
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <Typography key={index}>{option}</Typography>
                <Button onClick={()=>handleRemoveCategory(index)}><DeleteIcon color='secondary'/></Button>

                </div>
              ))}
              <input placeholder='add category' onChange={handleCategoryInput} style={{marginBottom: ".3rem",
              padding: "1rem",
              borderRadius: "5px",
              border: "1px solid lightblue",
              outlineColor: "blue"}} />
              <Button variant="contained" color="primary" onClick={handleAddCategory}>add category</Button>
            </Paper>
          </Modal>

          <Button onClick={handleEditCategory}>edit categories</Button>

          <label style={{ textAlign: "left", fontStyle: "italic" }}>
            Expectation
          </label>
          <input
            name="expectation"
            value={values.expectation}
            onChange={handleInput}
            style={{
              marginBottom: ".3rem",
              padding: "1rem",
              borderRadius: "5px",
              border: "1px solid lightblue",
              outlineColor: "blue",
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            {ideaId === "" ? "SAVE" : "Update"}
          </Button>
        </form>
      </Paper>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(ideaObj).map((id, index) => {
          return (
            <Paper
              key={id}
              style={{ width: "400px", margin: "2rem auto", padding: "1rem" }}
            >
              <Typography style={{ display: "flex" , marginBottom:"1rem"}}>{index + 1}.</Typography>
              <Typography style={{ display: "flex",wordWrap: "break-word" }}>Title: {ideaObj[id].title}</Typography>
              <Divider />
              <Typography style={{ wordWrap: "break-word", display: "flex" }}>
                Description: {ideaObj[id].longTitle}
              </Typography>
              <Divider />
              <Typography style={{ display: "flex" }}>Rating: {ideaObj[id].rating}</Typography>
              <Divider />
              <Typography style={{ display: "flex", wordWrap: "break-word" }}>
                Category: {ideaObj[id].category}
              </Typography>
              <Divider />
              <Typography style={{ display: "flex", fontStyle: "italic",wordWrap: "break-word" }}>
                Created at: {ideaObj[id].timestamp}
              </Typography>
              <Divider />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <Button onClick={() => setIdeaId(id)}>
                  <a href="#" style={{ textDecoration: "none" }}>
                    <EditIcon color="primary" />
                  </a>
                </Button>
                <Button onClick={() => handleDelete(id)}>
                  <DeleteIcon color="secondary" />
                </Button>
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}

export default App;
