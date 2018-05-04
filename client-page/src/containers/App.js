import React, { Component } from 'react';
import Sidebar from './Sidebar';
import NoteGrid from '../components/NoteGrid';
import NewNote from '../components/NewNote.js';
import NoteFull from '../components/NoteFull.js';
import EditNote from '../components/EditNote.js';
import LoginRegister from '../components/LoginRegister.js';
import Search from '../components/Search.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container flex-column flex-md-row d-flex">
          {['/notes', '/new-note', '/view-note/:id', '/edit/:id'].map(
            (path, index) => (
              <Route path={path} exact component={Sidebar} key={index} />
            )
          )}
          <div className="col-md-9 col-sm-12 main-content container-fluid align-items-center">
            <Route path="/" exact component={LoginRegister} />
            <Route path="/notes" exact component={Search} />
            <Route path="/notes" exact component={NoteGrid} />
            <Route path="/new-note" exact component={NewNote} />
            <Route path="/view-note/:id" component={NoteFull} />
            <Route path="/edit/:id" component={EditNote} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
