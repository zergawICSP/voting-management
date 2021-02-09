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
import Store from "./store/index_";

// IMAGE IMPORTS
toast.configure();

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="App font-Montserrat">
          <Switch>
            <Route path="/" component={AppLandingPage} exact />
            <Route path="/count_vote" component={VoteIndex} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/vote" component={VotePage} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/init_vote" component={InitalizeVote} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
