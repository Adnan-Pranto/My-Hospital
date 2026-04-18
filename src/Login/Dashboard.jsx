// import Footer from ""
import { Outlet, useLocation } from "react-router-dom";
import Client from "../Clients/Client";
import Footer from "../Footer/Footer";
import General from "../General/General";
function Dashboard() {
  let pathname=useLocation()
  console.log(pathname);
  
  return (
    <>
      <Client></Client>
      <General />
<Outlet/>
   
      <Footer />
    </>
  );
}

export default Dashboard;