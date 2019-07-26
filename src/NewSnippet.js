import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from "reactstrap"

function NewSnippet(props) {
  const css = `
    .CodeMirror {
      font-family: ${props.font}
    }
  `
  return (
    <div>
      <style>{css}</style>
      <h3 style={{ textAlign: "center", padding: "20px 0px" }}>The easiest way to embed code on your blogs, period.</h3>
      <div className="NewSnippet">
        <Input placeholder="👨🏼‍💻 Author" className="editor-author" onChange={props.onTextChange} name="author" />
        <Input placeholder="📃 Title" className="editor-title" onChange={props.onTextChange} name="title" />
        <Dropdown isOpen={props.fileTypeDropDownOpen} toggle={props.toggleFileTypeDropDown} className="editor-filetype" color="primary">
          <DropdownToggle style={{ width: "100%", border: "1px solid #e4e4e4" }} className="capitalize" color="default">
            🛠 {props.mode}
          </DropdownToggle>
          <DropdownMenu style={{ width: "100%" }}>
            <DropdownItem onClick={(e) => { props.changeValue('mode', e.target.innerText) }}>ruby</DropdownItem>
            <DropdownItem onClick={(e) => { props.changeValue('mode', e.target.innerText) }}>python</DropdownItem>
            <DropdownItem onClick={(e) => { props.changeValue('mode', e.target.innerText) }}>javascript</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={props.themeDropDownOpen} toggle={props.toggleThemeDropDown} className="editor-theme" color="primary">
          <DropdownToggle style={{ width: "100%", border: "1px solid #e4e4e4" }} className="capitalize" color="default">
            🖌 {props.theme}
          </DropdownToggle>
          <DropdownMenu style={{ width: "100%" }}>
            <DropdownItem onClick={(e) => { props.changeValue('theme', e.target.innerText) }}>material</DropdownItem>
            <DropdownItem onClick={(e) => { props.changeValue('theme', e.target.innerText) }}>monokai</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <CodeMirror
          options={{
            mode: props.mode,
            theme: props.theme,
            lineNumbers: props.lineNumbers,
            smartIndent: true
          }}
          onChange={props.onEditorChange}
          className="editor"
        />
        <Button onClick={props.onSubmit} className="editor-button" color="primary" disabled={props.author === "" || props.title === "" || props.code === ""}>Save Snippet</Button>
      </div>
    </div>
  )
}

export default NewSnippet
