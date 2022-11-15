import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const OutputsShow = () => {
  const { state } = useLocation();
  const input = state.components.selectedComponents;
  console.log(input);
  return (
    <div>
      <h1>components</h1>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Deploy id</th>
          </tr>
        </thead>
        <tbody>
          {input.map((item) => {
            return (
              <tr key={item.component}>
                <td>{item.component}</td>
                <td>{item.deploy_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
