import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const UniqueReposFilter = (x, repos) => {
  repos.add(x.repository);
};

const CreateReposArr = (repos) => {
  let res = [];
  let i = 0;
  let keys = repos.keys();
  for (const key of keys) {
    res.push({
      repo: key,
      id: i,
    });
    i++;
  }
  return res;
};

export const MultipleProjectsSelector = (props) => {
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [reposChooseList, setReposChooseList] = useState([]);
  const [selectedprojects, setSelectedProjects] = useState([]);
  const [reposCounter, setReposCounter] = useState(0);
  let allProjects = props.data;
  const repos = new Set();
  allProjects.forEach((element) => {
    UniqueReposFilter(element, repos);
  });
  let reposArr = CreateReposArr(repos);

  const MultiSelectProjects = (repo) => {
    console.log(repo);
    let projects = allProjects.filter((x) => x.repository === repo);
    console.log(projects);
    return (
      <div>
        <Multiselect
          options={projects}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue="configuration_path"
          showCheckbox
          placeholder={"select projects"}
        />
      </div>
    );
  };

  const RepoChooser = () => {
    return (
      <div>
        <Multiselect
          options={reposArr}
          onSelect={onSelectRepo}
          displayValue="repo"
          selectionLimit={1}
          placeholder={"select a repo"}
        />
        <MultiSelectProjects data={selectedRepos[reposCounter]}/>
        <h4>*************************************************************</h4>
      </div>
    );
  };
  const onSelectRepo = (selectedList, selectedItem) => {
    console.log(selectedItem);
    setSelectedRepos([...selectedRepos, selectedItem.repo]);
    console.log(selectedRepos);
    setReposCounter(reposCounter +1);
    console.log(reposCounter);
  };
  const onAddBtnClick = (event) => {
    setReposChooseList(reposChooseList.concat(<RepoChooser />));
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedProjects(selectedprojects[selectedItem.repository] = selectedList);
    console.log(selectedprojects);
};

const onRemove=(selectedList, removedItem) => {
    setSelectedProjects(selectedprojects[removedItem.repository] = removedItem);
    console.log(selectedprojects);
};

  return (
    <div>
      <button onClick={onAddBtnClick}>Add repo to choose from</button>
      {reposChooseList}
    </div>
  )
};
