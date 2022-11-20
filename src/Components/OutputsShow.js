import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './tableCss.css';
import './containerDiv.css';

export const OutputsShow = () => {
  const { state } = useLocation();
  const selectedComponents = state.components.selectedComponents;
  const selectedProjects = state.selectedProjects.selectedProjects;
  const allProjects = state.allProjects.allProjects;

  const PresentDeployIds = (repo) => {
    let projectsSelected = selectedProjects[repo];
    let projectsFromRepo = allProjects.filter((x) => x.repository === repo);
    let projectsToDisplay = [];
    for (const projSel of projectsSelected) {
        for(const repoProj of projectsFromRepo){
            if(repoProj.configuration_path === projSel.configuration_path){
                projectsToDisplay.push(repoProj);
            }
        }
    }
    let keys = new Set();
    for (const x of projectsToDisplay){
        if(x.configuration_path === x.deploy_target){
            x.configuration_path = '';
        }
        x.key = x.configuration_path + '-' + x.deploy_target + '-' + x.deploy_id;
        keys.add(x.key);
    }
    let res = []
    for(const x of keys){
        for(const y of projectsToDisplay){
            if(y.key === x){
                res.push(y);
                break;
            }
        }
    }


    return (
      <div>
        <table>
        <caption>Repository:  {repo}</caption>
          <thead>
            <tr>
              <th>Configuration Path</th>
              <th>Deploy Target</th>
              <th>Deploy id</th>
              <th>Deploy date</th>
            </tr>
          </thead>
          <tbody>
            {res.map((item) => {
              return (
                <tr key={item.key}>
                  <td>{item.configuration_path}</td>
                  <td>{item.deploy_target}</td>
                  <td>{item.deploy_id}</td>
                  <td>{item.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>****************************************************************************************************************</h3>
      </div>
    );
  };
  return (
    <div className="container-div">
      <div>
        {selectedComponents.length>0 &&
        <div>
        <h1>Components</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Deploy id</th>
              <th>Deploy date</th>
            </tr>
          </thead>
          <tbody>
            {selectedComponents.map((item) => {
              return (
                <tr key={item.component}>
                  <td >{item.component}</td>
                  <td>{item.deploy_id}</td>
                  <td>{item.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>****************************************************************************************************************</h3>
        </div>
}
      </div>
      {selectedProjects != null &&
      <div>
        <h1>Projects</h1>
        {Object.keys(selectedProjects).map((item) => {
          return PresentDeployIds(item);
        })}
      </div>}
    </div>
  );
};
