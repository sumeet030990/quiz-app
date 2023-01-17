import React from 'react'
import { Accordion, Container } from 'react-bootstrap'
import ChildFolder from '../components/ChildFolder'

function Folder() {
  const dirStructureData = { "type": "folder", "name": "animals", "path": "/animals", "children": [{ "type": "folder", "name": "cat", "path": "/animals/cat", "children": [{ "type": "folder", "name": "data", "path": "/animals/cat/data", "children": [{ "type": "file", "name": "cat001", "path": "/animals/cat/data/cat001", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }, { "type": "file", "name": "cat002", "path": "/animals/cat/data/cat002", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }, { "type": "folder", "name": "American_Bobtail ", "path": "/animals/cat/data/American_Bobtail", "children": [{ "type": "file", "name": "cat003", "path": "/animals/cat/data/American_Bobtail/cat003", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }, { "type": "file", "name": "cat004", "path": "/animals/cat/data/American_Bobtail/cat004", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }] }] }] }, { "type": "folder", "name": "dog", "path": "/animals/dog", "children": [{ "type": "folder", "name": "data", "path": "/animals/dog/data", "children": [{ "type": "file", "name": "dog001", "path": "/animals/dog/data/dog001", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }, { "type": "file", "name": "dog002", "path": "/animals/dog/data/dog002", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }] }] }, { "type": "file", "name": "info", "path": "/animals/info", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }, { "type": "file", "name": "README", "path": "/animals/README", "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }] }

  return <Container>
    {/* <ul>
      <li>{dirStructureData["name"]}
      </li>
      <ChildFolder folderName={dirStructureData["name"]} childJsonData={dirStructureData["children"]} />
    </ul> */}
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>{dirStructureData["name"]}</Accordion.Header>
        <Accordion.Body>
          <ChildFolder folderName={dirStructureData["name"]} childJsonData={dirStructureData["children"]} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </Container>
}


export default Folder
