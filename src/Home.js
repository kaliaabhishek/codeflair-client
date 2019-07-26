import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from "reactstrap"
import faker from "faker"
import Switch from "react-switch"



function Home(props) {
  const css = `
    .CodeMirror {
      font-family: ${props.font};
      height: 80vh;
    }
  `
  const name = faker.name.findName()
  return (
    <div className="home-layout">
      <style>{css}</style>
      <div className="sidebar">
        <div className="logo">
          <h3 className="sidebar-logo">Snippster <span className="super">BETA</span></h3>
        </div>
        <div className="sidebar-input-group">
          <span className="sidebar-label">Your name</span>
          <Input size="sm" placeholder={name} name="author" onChange={props.onTextChange} />
        </div>
        <div className="sidebar-input-group">
          <span className="sidebar-label">File name with extension</span>
          <Input size="sm" placeholder="helloWorld.js" name="filename" onChange={props.onTextChange} />
        </div>
        <div className="sidebar-input-group">
          <span className="sidebar-label">Description</span>
          <Input size="sm" placeholder="a script to print 'Hello World'" type="textarea" style={{ resize: "none", height: "48px" }} />
        </div>
        <div className="sidebar-input-group">
          <span className="sidebar-label">Theme</span>
          <Dropdown isOpen={props.themeDropDownOpen} toggle={props.toggleThemeDropDown} className="editor-filetype" color="primary">
            <DropdownToggle style={{ width: "100%", border: "1px solid #e4e4e4" }} className="capitalize btn-white" color="default">
              {props.theme}
            </DropdownToggle>
            <DropdownMenu style={{ width: "100%" }}>
              <DropdownItem onClick={(e) => { props.changeValue('theme', e.target.innerText) }}>material</DropdownItem>
              <DropdownItem onClick={(e) => { props.changeValue('theme', e.target.innerText) }}>monokai</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="sidebar-input-group">
          <span className="sidebar-label">Font</span>
          <Dropdown isOpen={props.fileTypeDropDownOpen} toggle={props.toggleFileTypeDropDown} className="editor-filetype" color="primary">
            <DropdownToggle style={{ width: "100%", border: "1px solid #e4e4e4" }} className="capitalize btn-white" color="default">
              {props.font}
            </DropdownToggle>
            <DropdownMenu style={{ width: "100%" }}>
              <DropdownItem onClick={(e) => { props.changeValue('font', e.target.innerText) }} style={{ fontFamily: "Roboto Mono" }}>Roboto Mono</DropdownItem>
              <DropdownItem onClick={(e) => { props.changeValue('font', e.target.innerText) }} style={{ fontFamily: "Menlo" }}>Menlo</DropdownItem>
              <DropdownItem onClick={(e) => { props.changeValue('font', e.target.innerText) }} style={{ fontFamily: "Monaco" }}>Monaco</DropdownItem>
              <DropdownItem onClick={(e) => { props.changeValue('font', e.target.innerText) }} style={{ fontFamily: "Source Code Pro" }}>Source Code Pro</DropdownItem>
              <DropdownItem onClick={(e) => { props.changeValue('font', e.target.innerText) }} style={{ fontFamily: "Fira Code" }}>Fira Code</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="sidebar-input-group">
          <p className="sidebar-label">Line Numbers</p>
          <Switch checked={props.lineNumbers} className="check" onChange={props.toggleLineNumbers} />
        </div>
        <div className="sidebar-input-group">
          <Button disabled={!props.author || !props.filename || !props.code} color="primary" size="lg" style={{ width: "100%" }} onClick={props.onSubmit}>Save Snippet</Button>
        </div>
      </div>
      <div className="code-editor">
        <div className="main-editor">
          <CodeMirror
            options={{
              mode: props.mode,
              theme: props.theme,
              lineNumbers: props.lineNumbers,
              smartIndent: true
            }}
            onChange={props.onEditorChange}
          />
          <div className="editor-header">
            <div className="filename">
              {props.filename || "Your file name"}
            </div>
            <div className="acknowledgement">
              Created by <b>{props.author || name}</b> using <span style={{ fontFamily: "Roboto Mono", fontWeight: "bolder" }}>Snippster</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
