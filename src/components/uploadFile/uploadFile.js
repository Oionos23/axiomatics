import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "./uploadFile.scss";

const XMLParser = require("react-xml-parser");

const UploadFile = () => {
    const [upload, setUpload] = useState(false);
    const [display, setDisplay] = useState(false);
    const [files, setFiles] = useState([]);

    const treeStyle = {
        shape: "rect",
        shapeProps: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
        },
    };

    useEffect(() => {
        if (files.length === 0) {
            setUpload(false);
        } else {
            setUpload(true);
        }
    }, [files]);

    const onFileUpload = (e) => {
        let readXml;
        e.preventDefault();
        let selectedFile = document.getElementById("Xml").files[0];

        let reader = new FileReader();

        reader.onload = (e) => {
            readXml = e.target.result;
            let parser = new XMLParser();
            let doc = parser.parseFromString(readXml, "application/xml");
            setFiles([doc]);
        };
        reader.readAsText(selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplay(true);
    };

    return (
        <div>
            <form id="xmlForm" name="xmlForm">
                <input
                    id="Xml"
                    type="file"
                    accept=".xml"
                    onChange={onFileUpload}
                />
                <input
                    type="button"
                    value="SHOW XML"
                    onClick={(e) => handleSubmit(e)}
                    disabled={!upload ? true : false}
                />
            </form>
            {display && (
                <div className="uploadFile__tree__container ">
                    <Tree
                        data={files}
                        nodeSvgShape={treeStyle}
                        separation={{ siblings: 5, nonSiblings: 5 }}
                        translate={{ x: 500, y: 0 }}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadFile;
