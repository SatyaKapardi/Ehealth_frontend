import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import LogIn from "./logIn.js";
import CreateAccount from "./CreateAccount.js";
import SchedulingAppt from "./schedulingAppt.js";
import ViewMedHist from "./ViewMedHist.js";
import DocHome from "./DocHome.js";
import ViewOneHistory from "./ViewOneHistory.js";
import Settings from "./Settings.js";
import DocSettings from "./DocSettings.js";
import PatientsViewAppt from "./PatientsViewAppt.js";
import NoMedHistFound from "./NoMedHistFound.js";
import DocViewAppt from "./DocViewAppt.js";
import MakeDoc from "./MakeDoc.js";
import Diagnose from "./Diagnose.js";
import ShowDiagnoses from "./ShowDiagnoses.js";

// Backend URL for API requests (production Railway URL)
const API_BASE_URL = "https://ehealthbackend-production.up.railway.app";

export default function App() {
  let [component, setComponent] = useState(<LogIn />);

  useEffect(() => {
    // Fetch session details from backend
    fetch(`${API_BASE_URL}/session`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        const { email, who } = data;
        if (email === "") {
          setComponent(<LogIn />);
        } else {
          if (who === "pat") {
            setComponent(<Home />);
          } else {
            setComponent(<DocHome />);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching user session:", err);
      });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/NoMedHistFound" component={NoMedHistFound} />
          <Route path="/MakeDoc" component={MakeDoc} />
          <Route path="/Settings" component={Settings} />
          <Route path="/MedHistView" component={ViewMedHist} />
          <Route path="/scheduleAppt" component={SchedulingAppt} />
          <Route path="/showDiagnoses/:id" render={props => <ShowDiagnoses {...props} />} />
          <Route path="/Diagnose/:id" render={props => <Diagnose {...props} />} />
          <Route path="/ViewOneHistory/:email" render={props => <ViewOneHistory {...props} />} />
          <Route path="/Home" component={Home} />
          <Route path="/createAcc" component={CreateAccount} />
          <Route path="/DocHome" component={DocHome} />
          <Route path="/PatientsViewAppt" component={PatientsViewAppt} />
          <Route path="/DocSettings" component={DocSettings} />
          <Route path="/ApptList" component={DocViewAppt} />
          <Route path="/" render={() => component} />
        </Switch>
      </div>
    </Router>
  );
}
