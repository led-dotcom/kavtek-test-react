import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import User from './components/Home/Users/User/User';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-sidebar">
          <Sidebar />
        </div>
        <Switch className="app-cards">
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/about" >
            <About />
          </Route>
          <Route exact path="/contact" >
            <Contact />
          </Route>
          <Route exact path="/users/:id" >
            <User />
          </Route>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
