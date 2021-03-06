import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./components/Top bar/Topbar";
import Home from "./Pages/Home page/Home"
import Single from "./Pages/Singlepag/Single";
import Write from "./Pages/Write/Write"
import Setting from "./Pages/Setting/Setting";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import About from "./Pages/About/About";
import { useContext } from "react";
import { Context } from "./Context/Context";
import PasswordReset from "./Pages/Password-reset/PasswordReset";
import PasswortCreate from "./Pages/Password-reset/PasswortCreate";


function App() {
  const { user } = useContext(Context);
  console.log("jenkins file added");

  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post/:postId" component={user ? Single : Login} />
        <Route path="/about" component={user ? About : Login} />
        <Route path="/write" component={user ? Write : Login} />
        <Route path="/setting" component={user ? Setting : Login} />
        <Route path="/login" component={user ? Home : Login} />
        <Route path="/register" component={user ? Home : Register} />
        <Route path="/newpassword/:link" component={PasswortCreate} />
        <Route path="/PasswordReset" component={PasswordReset} />
      </Switch>
    </Router>
  );
}

export default App;
