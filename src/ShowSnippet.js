import React, { Component } from "react";
import { UnControlled as CodeMirror } from 'react-codemirror2'
import axios from "axios"

class ShowSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: null
    }
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/snippets/${this.props.match.params.id}`)
      .then(res => this.setState({ snippet: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="NewSnippet">
        {this.state.snippet && <CodeMirror
          options={{
            mode: this.state.snippet.mode,
            theme: this.state.snippet.theme,
            lineNumbers: true,
            smartIndent: true,
            readOnly: true
          }}
          value={this.state.snippet.content}
          className="editor"
        />}

      </div>
    );
  }
}

export default ShowSnippet;
