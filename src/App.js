import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import { FileUploader } from './Components/FileUploader';
import {ServicesChooser} from './Components/ServicesChooser';
import {OutputsShow} from './Components/OutputsShow';


function App() {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<Navigate to="/fileUploader" replace />}
      ></Route>
      <Route path="/servicesChooser" exact element={<ServicesChooser />}></Route>
      <Route path="/outputsShow" element={<OutputsShow />}></Route>
      <Route path="/fileUploader" element={<FileUploader />}></Route>
    </Routes>
      );
}

export default App;
