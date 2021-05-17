import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LogIn from './components/auth/LogIn';
import { Auth } from 'aws-amplify';
import Header from './components/Haeder'
import AddUser from './components/auth/Bucket';
import Detail from './components/Detail';






class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
         <Header/>
        <Router>
          <div>
            
           
            <Switch>
              <Route exact path="/" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/Bucket" render={(props) => <AddUser {...props} auth={authProps} />} />
              <Route exact path="/Detail" render={(props) => <Detail {...props} auth={authProps} />} />

            </Switch>
        
          </div>
        </Router>
      </div>
    );
  }
}

export default App;