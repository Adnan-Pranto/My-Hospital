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
import GeneralSettings from './SubNab/Setting/GeneralSettings';
import Doctor from './SubNab/Setting/Doctors/Doctor';
import Admin from './SubNab/Admin_Pannel/Admin';
import Doc_Appoinment from './SubNab/Setting/Doctors/D-Appoinment/Doc_Appoinment';
import MySms from './SubNab/Setting/About-SMS/MySms';
import Pathology_Report from './Pathology/PathReport/Pathology_Report-Format';
import Report_Part from './Pathology/All-Report/Report_Part';
import Reagent from './Pathology/Reagents/Reagent';
import InCustom from './ErrorFound';
import ErrorFound from './ErrorFound';
import DoctorsInfo from './SubNab/Setting/Doctors/DoctorsInfo';
import DisplayImg from './General/DisplayImg';
import MarketingInfo from './SubNab/Setting/Doctors/MarketingInfo';
import DiscountPercentPopup from './SubNab/Admin_Pannel/Permission_And_Others/DiscountPercentPopup';
import UserAccountCreate from './SubNab/Admin_Pannel/Permission_And_Others/UserAccountCreate';
import Active_Deactive from './SubNab/Admin_Pannel/Permission_And_Others/Active_Deactive';
import PermissionPages from './SubNab/Admin_Pannel/Permission_And_Others/PermissionPages';
import ReferrerInfo from "./SubNab/Setting/Doctors/ReferrerInfo"
import TestNameDetails from './Pathology/Path_Root/Diagonsis_Root/General-Settings-Pathology/TestNameDetails';
import PaymentGateway from './SubNab/Payment_Method/PaymentGateway';
import TestParameterDetails from './Pathology/PathReport/TestParameterDetails';
import Testingper from './Pathology/PathReport/TestingPer';
import TestinMethod from './Pathology/PathReport/TestingPer';
import PayBookDropdow from './SubNab/Account_Expencess-Summery/PayBookDropdow';
import ReceivePaymentIndoor from './SubNab/Account_Expencess-Summery/ReceivePaymentIndoor';
import TestAccount from './SubNab/Account_Expencess-Summery/TestAccount';
import SearchofTest from './Pathology/Path_Root/Diagonsis_Root/Test/SearchofTest';
import DueCollection from './Pathology/Path_Root/Diagonsis_Root/Test/DueCollection';
import ReportForTwo from './Pathology/PathReport/ReportForTwo';
import AccountAndExpenseNab from './SubNab/Account_Expencess-Summery/AccountAndExpenseNab';
import ExpanceDropDown from './SubNab/Account_Expencess-Summery/Expence-Table/ExpanceDropDown';
import ExHeadAdd from './SubNab/Account_Expencess-Summery/Expence-Table/ExHeadAdd';
import ExPaid from './SubNab/Account_Expencess-Summery/Expence-Table/ExPaid';
import DayWisePaid from './SubNab/Account_Expencess-Summery/Expence-Table/DayWisePaid';
import TotalDateWise from './SubNab/Account_Expencess-Summery/Expence-Table/TotalDateWise';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/pathhade" element={<Pathhade />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/pathhade/diagnosis/test" element={<Test />} />
        <Route path="/test" element={<Test />} />
        <Route path='/GeneralSettings' element={<GeneralSettings />} />
        <Route path='/Doctor' element={<Doctor />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Doc_Appoinment' element={<Doc_Appoinment />} />
        <Route path='/MySms' element={<MySms />} />
        <Route path='/Pathology_Report' element={<Pathology_Report />} />
        <Route path='/Report_Part' element={<Report_Part />} />
        <Route path='/Reagppood' element={<Reagent />} />
        <Route path='/ErrorText' element={<ErrorFound />} />
        <Route path='/*' element={<ErrorFound />} />
        <Route path='/Doctors-Details' element={<DoctorsInfo />} />
        <Route path='/Background-image' element={<DisplayImg />} />
        <Route path='/Reffer_name' element={<MarketingInfo />} />
        <Route path='/refererinfo' element={<ReferrerInfo />} />
        <Route path='/Discount-page' element={<DiscountPercentPopup />} />
        <Route path='/New_Account_Creat' element={<UserAccountCreate />} />
        <Route path='/Account_Active/Deactive' element={<Active_Deactive />} />
        <Route path='/Users_permission' element={<PermissionPages />} />
        <Route path='/testName-Cost' element={<TestNameDetails />} />
        <Route path='/Payment-Method' element={<PaymentGateway />} />
        <Route path='/Test-ParameterDetails' element={<TestParameterDetails />} />
        <Route path='/testing' element={<Testingper/>} />
        <Route path='/Daily_paymet/Book' element={<PayBookDropdow/>}/>
        <Route path='/Indoor-Summary' element={<ReceivePaymentIndoor/>}/>
        <Route path='/Testing-data' element={<TestAccount/>}/>
        <Route path='/SearchAndEdit/Test' element={<SearchofTest/>}/>
        <Route path='/Due-Collection' element={<DueCollection/>}/>
        <Route path='/Report-Formate' element={<ReportForTwo/>}/>
        <Route path='/Exp/Acc' element={<AccountAndExpenseNab/>}/>
        <Route path='/change/it' element={<ExpanceDropDown/>}/>
        <Route path='/Details/Head' element={<ExHeadAdd/>}/>
        <Route path='/Paid-Details' element={<ExPaid/>}/>
        <Route path='/DayWise/Expanse' element={<DayWisePaid/>}/>
        <Route path='/total/days' element={<TotalDateWise/>}/>
        
    </Routes>
    </BrowserRouter >


  );
}

export default App
