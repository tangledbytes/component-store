import propTypes from "prop-types";
import React from "react";
import { Title } from "./components/Title";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const App = ({ name }) => {
  return (
    <div>
      <Title>Hello {name}!</Title>
      <Editor />
    </div>
  );
};

App.propTypes = {
  name: propTypes.string
};

App.defaultProps = {
  name: "World"
};
