import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import NavBar from './NavBar';
import NewSnippet from './NewSnippet';
import { Switch, Route, Redirect } from "react-router-dom"
import ShowSnippet from './ShowSnippet';
import Embedable from './Embedable';
import { ToastContainer, toast } from "react-toastify"
import Home from './Home';
import faker from "faker"
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/python/python');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/xml/xml');
require('codemirror/mode/clike/clike');

const map = require('lang-map')

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      code: "",
      author: null,
      title: "",
      theme: "material",
      mode: "Text",
      lineNumbers: true,
      ext: ".txt",
      themeDropDownOpen: false,
      fileTypeDropDownOpen: false,
      navbarVisible: false,
      redirect: false,
      lineNumbers: true,
      font: "inconsolata",
      filename: null
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

  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === "filename") {
      const ext = e.target.value.split(".")[1]
      if (ext === "html") {
        this.setState({ mode: 'xml' })
      } else if (ext === "java") {
        this.setState({ mode: 'clike' })
      } else {
        let mode = map.languages(String(ext))[0]
        this.setState({ mode: mode })
      }
    }
  }

  toggleLineNumbers = () => { this.setState({ lineNumbers: !this.state.lineNumbers }) }

  onSubmit = () => {
    this.setState({ saving: true })
    axios.post('https://codeflair.herokuapp.com/snippets', {
      "snippet": {
        "title": this.state.filename,
        "author": this.state.author,
        "content": this.state.code,
        "theme": this.state.theme,
        "mode": this.state.mode,
        "font": this.state.font
      }
    })
      .then(res => {
        toast.success("🙌 Snippet Saved!", { autoClose: 1500 })
        this.setState({ redirect: true, id: res.data.id, saving: false })
      })
      .catch(err => {
        toast.error("🤒" + err.message)
      })
    localStorage.setItem('author', this.state.author)
  }

  disableNavBar = () => {
    this.setState({ navbarVisible: false })
  }


  render() {
    return (
      <div className="App">
        <ToastContainer />
        {this.state.navbarVisible && <NavBar />}
        <Switch>
          <Route path="/" exact render={(p) => <Home {...p} theme={this.state.theme}
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
            onSubmit={this.onSubmit}
            font={this.state.font}
            toggleLineNumbers={this.toggleLineNumbers}
            filename={this.state.filename}
          />}
          />
          <Route path="/snippets/:id" exact component={ShowSnippet} />
          <Route path="/embed/:id" exact render={(p) => <Embedable {...p} disableNavBar={this.disableNavBar} />} />
        </Switch>
        {this.state.redirect && this.state.id && <Redirect to={`/snippets/${this.state.id}`} />}
      </div>
    );
  }
}

export default App;
