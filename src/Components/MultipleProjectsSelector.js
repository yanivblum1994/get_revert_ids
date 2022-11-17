import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './multiSelect.css';

const UniqueKeysFilter = (x, repos) => {
  repos.add(x.repository);
};

const CreateOptionsArr = (arr) => {
  let res = [];
  let i = 0;
  let keys = arr.keys();
  for (const key of keys) {
    res.push({
      key: key,
      id: i,
    });
    i++;
  }
  return res;
};

const CreateProjectsOptionsArr = (projects) => {
    let names = new Set();
    for (const proj of projects){
        if (names.has(proj.configuration_path)){
            proj['seen'] = true;
        }
        else{
            names.add(proj.configuration_path);
            proj['seen'] = false;
        }
    }
    return projects.filter(elem => elem.seen === false);
}

export const MultipleProjectsSelector = (props) => {
    let navigate = useNavigate();
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [reposChooseList, setReposChooseList] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState();
  const [reposCounter, setReposCounter] = useState(0);
  let allProjects = props.data;
  let selectedComponents = props.selectedComponents;
  const repos = new Set();
  allProjects.forEach((element) => {
    UniqueKeysFilter(element, repos);
  });
  let reposArr = CreateOptionsArr(repos);

  useEffect(() =>{
    if(selectedRepos.length != 0){
        setReposCounter(reposCounter +1);
        setReposChooseList(reposChooseList.concat(<MultiSelectProjects  data={reposCounter}/>));
    }
  }, [selectedRepos]);

  useEffect(()=>{
    console.log(selectedProjects);
  },[selectedProjects]);
 

  const MultiSelectProjects = (counter) => {
    console.log(counter);
    let repo = selectedRepos[counter.data];
    console.log(repo);
    let projects = allProjects.filter((x) => x.repository === repo);
    console.log(projects);
    let projectsArr = CreateProjectsOptionsArr(projects);
    console.log(projectsArr);
    return (
      <div>
        <Multiselect
        className="multi-select-dsg"
          options={projectsArr}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue="configuration_path"
          showCheckbox
          placeholder={"select projects"}
        />
        <h4>**************************************************************************************</h4>
      </div>
    );
  };

  const RepoChooser = () => {
    return (
      <div>
        <Multiselect
        className="multi-select-dsg"
          options={reposArr}
          onSelect={onSelectRepo}
          displayValue="key"
          selectionLimit={1}
          placeholder={"select a repo"}
        />
      </div>
    );
  };
  const onSelectRepo = (selectedList, selectedItem) => {
    setSelectedRepos([...selectedRepos, selectedItem.key]);
  };
  const onAddBtnClick = (event) => {
    setReposChooseList(reposChooseList.concat(<RepoChooser />));
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedProjects({...selectedProjects,
        [selectedItem.repository]:  selectedList}
        );
};

const onRemove=(selectedList, removedItem) => {
    setSelectedProjects({...selectedProjects,
        [removedItem.repository]:  selectedList}
        );
};

const proceedButton = () =>{
    return(
        <button
        className="button-design"
    type="button"
    onClick={(e) =>{
        navigate('/outputsShow',
        {
            state:
            {
                components: {selectedComponents},
                selectedProjects : {selectedProjects},
                allProjects : {allProjects}
            }
        })
    }
    }>Click to proceed</button>
    );
};

  return (
    <div>
        <div>
      <button 
      className="button-design"
      onClick={onAddBtnClick}>Add repo to choose from</button>
      </div>
      {reposChooseList}
      {proceedButton()}
    </div>
  )
};
