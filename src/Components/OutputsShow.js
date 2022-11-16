import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const OutputsShow = () => {
  const { state } = useLocation();
  console.log(state);
  const selectedComponents = state.components.selectedComponents;
  console.log(selectedComponents);
  const selectedProjects = state.selectedProjects.selectedProjects;
  console.log(selectedProjects);
  const allProjects = state.allProjects.allProjects;
  console.log(allProjects);

  const PresentDeployIds = (repo) => {
    console.log(repo);
    let projectsSelected = selectedProjects[repo];
    console.log(projectsSelected);
    let projectsFromRepo = allProjects.filter((x) => x.repository === repo);
    console.log(projectsFromRepo);
    let projectsToDisplay = [];
    for (const projSel of projectsSelected) {
        for(const repoProj of projectsFromRepo){
            if(repoProj.configuration_path === projSel.configuration_path){
                projectsToDisplay.push(repoProj);
            }
        }
    }
    console.log(projectsToDisplay);
    for(const x of projectsToDisplay){
        if(x.configuration_path === x.deploy_target){
            x.configuration_path = '';
        }
    }
    console.log(projectsToDisplay);
    return (
      <div>
        <h3>{repo}</h3>
        <table>
          <thead>
            <tr>
              <th>Configuration Path</th>
              <th>Deploy Target</th>
              <th>Deploy id</th>
            </tr>
          </thead>
          <tbody>
            {projectsToDisplay.map((item) => {
              return (
                <tr key={item.configuration_path}>
                  <td>{item.configuration_path}</td>
                  <td>{item.deploy_target}</td>
                  <td>{item.deploy_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <div>
        <h1>Components</h1>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Deploy id</th>
            </tr>
          </thead>
          <tbody>
            {selectedComponents.map((item) => {
              return (
                <tr key={item.component}>
                  <td>{item.component}</td>
                  <td>{item.deploy_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>*************************************************************</h3>
      </div>
      <div>
        <h1>Projects</h1>
        {Object.keys(selectedProjects).map((item) => {
          return PresentDeployIds(item);
        })}
      </div>
    </div>
  );
};
