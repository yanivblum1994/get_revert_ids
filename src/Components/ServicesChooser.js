import React, { useState } from "react";
import { useLocation } from "react-router-dom";




export const ServicesChooser = () =>{
    const { state } = useLocation();
    const input = state.props.workbook;
    console.log(input)
    
    return(
        <h1>Choose you inputs</h1>
    )
};