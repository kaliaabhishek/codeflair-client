import React, { Component } from 'react';
import GitHubLogin from 'react-github-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onSuccess = response => console.log(response);
  onFailure = response => console.error(response);

  render() {
    return (
      <GitHubLogin clientId="Iv1.fe98a2bb0310c859"
        onSuccess={this.onSuccess}
        onFailure={this.onFailure} />
    );
  }
}

export default Login;