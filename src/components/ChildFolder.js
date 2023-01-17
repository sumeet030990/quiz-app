import React from 'react'
import { Accordion } from 'react-bootstrap'

function ChildFolder({ folderName, childJsonData }) {
  // const renderData = childJsonData.map((childData, index) => {
  //   if (childData["type"] === "folder" && childData["children"].length > 0) {
  //     return <>
  //       <ul> <li>{childData["name"]}</li>
  //         <ChildFolder key={index} folderName={childData["name"]} childJsonData={childData["children"]} />
  //       </ul>
  //     </>
  //   } else {
  //     return (
  //       <ul><li>{childData["name"]}</li></ul>
  //     )
  //   }
  // })

  const renderAccordionData = childJsonData.map((childData, index) => {
    if (childData["type"] === "folder" && childData["children"].length > 0) {
      return <Accordion key={`${index}`}>
        <Accordion.Item>
          <Accordion.Header>{childData["name"]}</Accordion.Header>
          <Accordion.Body>
            <ChildFolder folderName={childData["name"]} childJsonData={childData["children"]} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    } else {
      return (
        <Accordion key={index}>
          <Accordion.Item>
            <Accordion.Header>{childData["name"]}</Accordion.Header>
          </Accordion.Item>
        </Accordion>
      )
    }
  })

  return <>
    {/* {renderData} */}
    {renderAccordionData}
  </>
}


export default ChildFolder
