import React from 'react';
import Main from './Components/Main.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewPosts from './Components/ViewPosts';
import AddPosts from './Components/AddPosts';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import ValidPosts from './Components/ValidPosts.js';
import RegOTP from './Components/RegOTP';
import Warning from './Components/Warning.js';

const App = () => {
  return (
    <Router>

      <Navbar />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/addpost' component={AddPosts} />
        <Route exact path='/post_requirements' component={ValidPosts} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/verifytoken' component={RegOTP} />
        <Route exact path='/myposts' component={ViewPosts} />
        <Route exact path='/warning' component = {Warning} />
      </Switch>


    </Router>


  )
}

export default App;
