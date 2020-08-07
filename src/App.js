import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";
import {
  FormControl,
  Input,
  Button,
  Paper,
  Typography,
  Slider,
  Divider,
  TextareaAutosize,
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
            height:"auto",
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <input
            value={values.title}
            name="title"
            onChange={handleInput}
            placeholder="idea name"
            style={{marginBottom:".3rem", padding:"1rem", borderRadius:'5px', border:"1px solid lightblue", outlineColor:"blue"}}
          />
          <TextareaAutosize
          rowsMax={10}
            name="longTitle"
            value={values.longTitle}
            onChange={handleInput}
            placeholder="idea description"
            style={{marginBottom:".3rem", padding:"1rem", borderRadius:'5px', border:"1px solid lightblue", outlineColor:"blue"}}
          />
          <input
            name="expectation"
            value={values.expectation}
            onChange={handleInput}
            placeholder="idea expectations"
            style={{marginBottom:".3rem", padding:"1rem", borderRadius:'5px', border:"1px solid lightblue", outlineColor:"blue"}}
          />

          <Typography
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontStyle: "italic",
              fontSize: "12px",
              marginTop: "1rem",
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
          <div
            value={values.category}
            name="category"
            onChange={handleInput}
            style={{marginBottom:".3rem", padding:"1rem", borderRadius:'5px', border:"1px solid lightblue", outlineColor:"blue"}}
            
          >
            <button>Personal life</button>
            <button>Fun</button>
            <button>Work</button>
            <button>Travel</button>
            <button>Other</button>
          </div>
          <Button type="submit" variant='contained' color='primary'>{ideaId === "" ? "SAVE" : "Update"}</Button>
        </form>
      </Paper>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(ideaObj).map((id, index) => {
          return (
            <Paper key={id} style={{ width: "400px", margin: "2rem auto" }}>
              <p>{index + 1}</p>
              <Divider/>
              <p>{ideaObj[id].title}</p>
              <Divider/>
              <p style={{wordWrap: 'break-word', padding:'1rem'}}>{ideaObj[id].longTitle}</p>
              <Divider/>
              <p>rating: {ideaObj[id].rating}</p>
              <Divider/>
              <p>{ideaObj[id].category}</p>
              <Divider/>
              <p>Created at: {ideaObj[id].timestamp}</p>
              <Divider/>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button onClick={() => setIdeaId(id)}>
                  <a href="#" style={{ textDecoration: "none",}}>
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
