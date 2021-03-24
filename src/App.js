import "./App.css";

// EXTERNAL IMPORTS
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-tippy/dist/tippy.css";

// COMPONENT IMPORTS
import AppLandingPage from "./components/layouts/landing/index_";
import LoginPage from "./components/layouts/Login/Root";
import HomePage from "./components/layouts/home/Root";
import VotePage from "./components/layouts/vote/Root";
import RegistrationPage from "./components/layouts/shareholderRegistration/Root";
import VoteIndex from "./components/layouts/landing/voteIndex";
import InitalizeVote from "./components/layouts/agenda/Root";
import CandidateVote from "./components/layouts/vote/CandidateVoteRoot";
import RegisterShareholder from "./components/layouts/shareholderRegistration/RegisterShareholderForm";
import DelegateHome from "./components/layouts/home/OnlyDelegatesHome";
import ManageDelegate from "./components/layouts/delegate/Root";
import RegisterDelegate from "./components/layouts/delegate/RegisterDelegateForm";
import ExportImport from "./components/layouts/exportImport/Root";
import Store from "./store/index_";

// IMAGE IMPORTS
toast.configure();

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="App font-Montserrat">
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/count_vote" component={VoteIndex} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/delegate_home" component={DelegateHome} />
            <Route path="/vote" component={VotePage} />
            <Route path="/admin" exact component={RegistrationPage} />
            <Route path="/init_vote" component={InitalizeVote} />
            <Route path="/candidate_form" component={CandidateVote} />
            <Route path="/register_sharerecord" component={RegisterShareholder} />
            <Route path="/delegate" component={ManageDelegate} />
            <Route path="/export_import" component={ExportImport} />
            <Route path="/register_delegate" component={RegisterDelegate} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
