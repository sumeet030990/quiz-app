import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from "prop-types";

function Result({ score, setReset, mode }) {
  return (
    <div>
      <h4>Your score is: {score}</h4>
      <div>
        <Button variant={mode} onClick={setReset}>Start Again</Button>
      </div>
    </div>
  )
}

Result.propTypes = {
  score: PropTypes.number,
  mode: PropTypes.string
}

Result.defaultProps = {
  score: 0,
  mode: 'dark'
}

export default Result
