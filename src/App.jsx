// import './App.css'
// import Client from "./Clients/Client"
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Login/Login";
// import Dashboard from './Login/Dashboard';
// import Footer from "./Footer/Footer"
// import General from './General/General';
// import Pathhade from "./Pathology/Path_Root/Pathhade";
// import Test from './Pathology/Path_Root/Diagonsis_Root/Test/Test';
// import Diagonsis from "./Pathology/Path_Root/Diagonsis_Root/Diagonsis";
// import Setting from './SubNab/Setting/Setting';
// import Diagnosis from './Pathology/Path_Root/Diagonsis_Root/Diagonsis';
// // import GeneralSettings from './SubNab/Setting/GeneralSettings';
// function App() {
//   return (
    
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/setting" element={<Setting/>}/>
//         <Route path="/pathhade" element={<Pathhade/>}/>
//         <Route path="/diagnosis" element={<Diagnosis/>}/>
//         <Route path="/pathhade/diagnosis/test" element={<Test/>}/>
//       </Routes>
//     </BrowserRouter>
    
    
//   );
// }

//  export default App
import './App.css'
import Client from "./Clients/Client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from './Login/Dashboard';
import Footer from "./Footer/Footer"
import General from './General/General';
import Pathhade from "./Pathology/Path_Root/Pathhade";
import Test from './Pathology/Path_Root/Diagonsis_Root/Test/Test';
import Diagonsis from "./Pathology/Path_Root/Diagonsis_Root/Diagonsis";
import Setting from './SubNab/Setting/Setting';
import Diagnosis from './Pathology/Path_Root/Diagonsis_Root/Diagonsis';
// import GeneralSettings from './SubNab/Setting/GeneralSettings';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/setting" element={<Setting/>}/>
        <Route path="/pathhade" element={<Pathhade/>}/>
        <Route path="/diagnosis" element={<Diagnosis/>}/>
        <Route path="/pathhade/diagnosis/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
    
    
  );
}

 export default App
