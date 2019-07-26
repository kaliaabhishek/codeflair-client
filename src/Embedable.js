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

  style = `
  .CodeMirror{
    height:auto;
    width:100%;
  }
`

  render() {
    return (
      <div>
        <style>{this.style}</style>
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
            <div className="editor-header" style={{ position: "fixed", display: "absolute" }}>
              <div className="filename">
                {this.state.snippet.title}
              </div>
              <div className="acknowledgement">
                Created by <b>{this.state.snippet.author}</b> using <span style={{ fontFamily: "Roboto Mono", fontWeight: "bolder" }}>Snippster</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Embedable;
