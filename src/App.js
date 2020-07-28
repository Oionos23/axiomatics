import React from "react";
import "./App.css";
import UploadFile from "./components/uploadFile";

const App = () => {
    return (
        <div className="App App-header">
            <h1>WELCOME TO AXIOMATICS</h1>
            <p>Upload your xml file</p>
            <UploadFile />
        </div>
    );
};

export default App;
