import React from "react";
import Footer from "./Footer";
import Header, {firstButton, secondtButton}  from "./Header";
import Info from "./Information";
import CallHomePage from "./CallHomePage"
import Login from "./Login"
import Signup from "./Signup";
import Success from "./Success";
import Logout from "./Logout";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from "./Dashboard";
import NewActivity from "./NewActivity";
import Contacts from "./Contacts";
import NewContact from "./NewContact";
import EditContact from "./EditContact";
//import AddCard from "./AddCard";


export const EndPointContext = React.createContext()

function App() {

    //const URLEnd = "http://unisoft-test.herokuapp.com/"
    const URLEnd = "http://localhost:5000"
    return (
        <div className="App">
            <BrowserRouter>
                <EndPointContext.Provider value={URLEnd}>
                    <Switch>

                        <Route exact path="/">
                            <CallHomePage/>
                        </Route>

                        <Route exact path="/signup">
                            <Signup/>
                        </Route>

                        <Route exact path="/login">
                            <Login/>
                        </Route>

                        <Route exact path="/success">
                            <Success/>
                        </Route>

                        <Route exact path={"/logout"}>
                            <Logout/>
                        </Route>

                        <Route exact path={"/dashboard"}>
                            <Dashboard/>
                        </Route>

                        <Route exact path={"/dashboard/new"}>
                            <NewActivity/>
                        </Route>

                        <Route exact path={"/contacts"}>
                            <Contacts/>
                        </Route>

                        <Route exact path={"/contacts/new"}>
                            <NewContact/>
                        </Route>

                        <Route exact path={"/contacts/edit"}>
                            <EditContact/>
                        </Route>

                    </Switch>
                </EndPointContext.Provider>
            </BrowserRouter>
        </div>
        
  );
}
export default App;
