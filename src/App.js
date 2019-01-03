import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import NavBar from './NavBar';
import NewSnippet from './NewSnippet';
import { Switch, Route } from "react-router-dom"
import ShowSnippet from './ShowSnippet';
import Embedable from './Embedable';
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/python/python');
require('codemirror/mode/javascript/javascript');

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      code: "",
      author: "",
      title: "",
      theme: "material",
      mode: "Text",
      lineNumbers: true,
      ext: ".txt",
      themeDropDownOpen: false,
      fileTypeDropDownOpen: false,
      navbarVisible: true
    }
  }

  toggleThemeDropDown = () => {
    this.setState({ themeDropDownOpen: !this.state.themeDropDownOpen })
  }

  toggleFileTypeDropDown = () => {
    this.setState({ fileTypeDropDownOpen: !this.state.fileTypeDropDownOpen })
  }

  changeValue = (property, value) => {
    this.setState({ [property]: value })
  }

  componentDidMount = () => {
    if (!!localStorage.getItem('token')) {
      this.setState({ loggedIn: true })
      console.log('loggedIn')
    }
  }

  onEditorChange = (editor, data, value) => {
    this.setState({ code: value })
  }

  onTextChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

  onSubmit = () => {
    axios.post('https://codeflair.herokuapp.com/snippets', {
      "snippet": {
        "title": this.state.title,
        "author": this.state.author,
        "content": this.state.code,
        "theme": this.state.theme,
        "mode": this.state.mode
      }
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    localStorage.setItem('author', this.state.author)
  }

  disableNavBar = () => {
    this.setState({ navbarVisible: false })
  }

  render() {
    return (
      <div className="App">
        {this.state.navbarVisible && <NavBar />}
        <Switch>
          <Route path="/" exact render={(p) => <NewSnippet {...p} theme={this.state.theme}
            lineNumbers={this.state.lineNumbers}
            ext={this.state.ext}
            onEditorChange={this.onEditorChange}
            toggleFileTypeDropDown={this.toggleFileTypeDropDown}
            toggleThemeDropDown={this.toggleThemeDropDown}
            fileTypeDropDownOpen={this.state.fileTypeDropDownOpen}
            themeDropDownOpen={this.state.themeDropDownOpen}
            mode={this.state.mode}
            changeValue={this.changeValue}
            onTextChange={this.onTextChange}
            code={this.state.code}
            title={this.state.title}
            author={this.state.author}
            onSubmit={this.onSubmit} />} />
          <Route path="/snippets/:id" exact component={ShowSnippet} />
          <Route path="/embed/:id" exact render={(p) => <Embedable {...p} disableNavBar={this.disableNavBar} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
