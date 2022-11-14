import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {read, utils} from "xlsx";

export const FileUploader = () => {
    let navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [workbook, setWorkbook] = useState(null);

    const handleFileUpload = async (e) =>{
        const file = e.target.files[0];
        setSelectedFile(file);
        console.log(file);
        const data = await file.arrayBuffer();
        let temp = read(data);
        setWorkbook(temp);
    };

    const fileData = () =>{
        if(selectedFile){
            return(
                <div>
            <h2>File Details:</h2>
            <p>File Name: {selectedFile.name}</p>
  
            <p>File Type: {selectedFile.type}</p>
  
            <p>
              Last Modified:{" "}
              {selectedFile.lastModifiedDate.toDateString()}
            </p>
  
          </div>
            );
        }
        else{
            return (
                <div></div>
              );
        }
    }

    const proceedButton = () =>{
        console.log(workbook);
        if(workbook){
            return(
                <button
            type="button"
            onClick={(e) =>{
                navigate('/servicesChooser',
                {
                    state:
                    {
                        props: {workbook}
                    }
                })
            }
            }>Click to proceed</button>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    return (
        <div>
            <h1>Upload the revert id's file</h1>
            <p><a href="https://d9builder.falconetix.com/job/Get_Revert_IDs" target="_blank" rel="noopener noreferrer">Click here to go to Jenkins</a></p>
            <input type="file" onChange={handleFileUpload}/>
            {fileData()}
            {proceedButton()}
        </div>
    );
};