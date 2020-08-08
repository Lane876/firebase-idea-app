import React from "react";
import { Paper, Typography, Divider, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const NewIdea = ({ ideaObj, setIdeaId, handleDelete }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.keys(ideaObj).map((id, index) => {
        return (
          <Paper
            key={id}
            style={{ width: "400px", margin: "2rem auto", padding: "1rem" }}
          >
            <Typography style={{ display: "flex", marginBottom: "1rem" }}>
              {index + 1}.
            </Typography>
            <Typography style={{ display: "flex", wordWrap: "break-word" }}>
              Title: {ideaObj[id].title}
            </Typography>
            <Divider />
            <Typography style={{ wordWrap: "break-word", display: "flex" }}>
              Description: {ideaObj[id].longTitle}
            </Typography>
            <Divider />
            <Typography style={{ display: "flex" }}>
              Rating: {ideaObj[id].rating}
            </Typography>
            <Divider />
            <Typography style={{ display: "flex", wordWrap: "break-word" }}>
              Category: {ideaObj[id].category}
            </Typography>
            <Divider />
            <Typography style={{ display: "flex", wordWrap: "break-word" }}>
              Expectation: {ideaObj[id].expectation}
            </Typography>
            <Divider />
            <Typography style={{ display: "flex", wordWrap: "break-word" }}>
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
  );
};

export default NewIdea;
