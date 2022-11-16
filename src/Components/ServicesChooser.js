import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {utils} from 'xlsx';
import Multiselect from 'multiselect-react-dropdown';
import { MultipleProjectsSelector } from "./MultipleProjectsSelector";


const GetUniqueOptions = (arr) => {
    return arr.filter(x => x.environment === 'central_prod' || x.environment === 'magellan_prod')
}

const FillEmptyConfigurationPath = (x) => {
        if(!x.configuration_path){
            x.configuration_path = x.deploy_target;
        }

}



export const ServicesChooser = () =>{
    let navigate = useNavigate();
    const [selectedComponents, setSelectedComponents] = useState([]);
    const { state } = useLocation();
    const input = state.props.workbook;
    const projects_sheet = input.Sheets['projects'];
    const projects_sheet_json = utils.sheet_to_json(projects_sheet);
    let allProjects = GetUniqueOptions(projects_sheet_json);
    allProjects.forEach(element => {
        FillEmptyConfigurationPath(element);
    });
    const components_sheet = input.Sheets['components'];
    const components_sheet_json = utils.sheet_to_json(components_sheet);
    let uniqueComponents = GetUniqueOptions(components_sheet_json);

    const proceedButton = () =>{
            return(
                <button
            type="button"
            onClick={(e) =>{
                navigate('/outputsShow',
                {
                    state:
                    {
                        components: {selectedComponents}
                    }
                })
            }
            }>Click to proceed</button>
            );
        };

    const onSelect = (selectedList, selectedItem) => {
        setSelectedComponents(selectedList);
    };
    
    const onRemove=(selectedList, removedItem) => {
        setSelectedComponents(selectedList);
    };
    return(
        <div>
            <div>
        <h1>Choose you inputs</h1>
        <h2>Choose components</h2>
        <Multiselect
        options={uniqueComponents}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="component"
        showCheckbox
        placeholder={"select components"}
        />
        </div>
        <div>
        <h2>Choose projects by repo</h2>
        <MultipleProjectsSelector data = {allProjects}
        selectedComponents = {selectedComponents}/>
        </div>
        </div>
    );
};