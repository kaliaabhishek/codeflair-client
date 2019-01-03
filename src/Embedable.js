import React, { Component } from "react";
import { UnControlled as CodeMirror } from 'react-codemirror2'
import axios from "axios"

class Embedable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: null
    }
  }

  componentDidMount = () => {
    this.props.disableNavBar();
    axios.get(`https://codeflair.herokuapp.com/snippets/${this.props.match.params.id}`)
      .then(res => this.setState({ snippet: res.data }))
      .catch(err => console.log(err))
  }

  getExtension = (mode) => {
    switch (mode) {
      case 'python':
        return ('py')
      case 'ruby':
        return ('rb')
      default:
        return (mode)
    }
  }

  render() {
    return (
      <div>
        {this.state.snippet &&
          <div>
            <CodeMirror
              options={{
                mode: this.state.snippet.mode,
                theme: this.state.snippet.theme,
                lineNumbers: true,
                smartIndent: true,
                readOnly: true
              }}
              value={this.state.snippet.content}
              className="editor"
            />
            <br />
          </div>
        }
      </div>
    );
  }
}

export default Embedable;
