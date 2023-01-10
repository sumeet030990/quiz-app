import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import ErrorContainer from '../components/Error';
import Loader from '../components/Loader';
import { sha1 } from 'crypto-hash';
import Result from '../components/Result';
import { Badge, Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import PropTypes from "prop-types";

function Quiz({ mode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [questionBank, setQuestionBank] = useState([]);
  const [answer, setAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [attemptLeft, setAttemptLeft] = useState(3);
  const [reset, setReset] = useState(false);

  const reverseMode = mode === 'dark' ? 'light' : 'dark';

  /**
   * Fetch Questions from the api
   */
  const fetchQuestion = () => {
    setIsLoading(true)

    axios.get("https://eok9ha49itquif.m.pipedream.net").then((data) => {
      setQuestionBank(data?.data?.questions);
      setIsLoading(false)
    }).catch((err) => {
      setError(err.message)
      setIsLoading(false)
    })
  }

  /**
   * Reset the game board
   */
  const handleGameReset = () => {
    setQuestionBank([])
    setCurrentQuestionIndex(0)
    setAttemptedQuestions(0)
    setScore(0)
    setAttemptLeft(3)
    setReset(false)
  }

  useEffect(() => {
    if (reset) {
      handleGameReset()
    }
    fetchQuestion()
  }, [reset])

  /**
   * Check if answer is correct or not
   * and clear the answer field
   */
  const checkAnswer = async () => {
    const result = await sha1(answer.toLowerCase());

    if (result === questionBank[currentQuestionIndex]?.answerSha1) {
      setScore(currentScore => currentScore + 1)
    } else {
      setAttemptLeft(attemptLeft => attemptLeft - 1)
    }

    setAnswer('')
  }

  /**
   * Check if next Questions fetched is already shown/attempted
   */
  const checkIfQuestionIsAlreadyAttempted = () => {
    const nextQuestion = questionBank[currentQuestionIndex + 1]?.question;

    // if question includes in question bank then show next question
    if (attemptedQuestions.includes(nextQuestion)) {
      setCurrentQuestionIndex(currentIndex => currentIndex + 1)
    }

    // add the question in the question bank
    setAttemptedQuestions(alreadyAttemptedQuestions => {
      return [
        ...alreadyAttemptedQuestions,
        questionBank[currentQuestionIndex]?.question
      ]
    })
  }

  /**
   * if next question is not present then fetch new question data set
   */
  const fetchNextQuestionSet = () => {
    if (questionBank[currentQuestionIndex + 1] === undefined) {
      setCurrentQuestionIndex(0)
      fetchQuestion()
    }
  }

  /**
   * Handle Navigation logic
   */
  const handleNavigation = () => {
    checkIfQuestionIsAlreadyAttempted()
    setCurrentQuestionIndex(currentIndex => currentIndex + 1)
    fetchNextQuestionSet()

  }

  /**
   * On next click check if answer submitted is correct or not
   * and navigate accordingly
   */
  const handleNextClick = async () => {
    await checkAnswer()
    handleNavigation()
  }

  /**
   * if no attempt is left then show the result screen
   */
  if (attemptLeft === 0) {
    return <Result score={score} setReset={setReset} mode={mode} />
  }

  return (
    <Container>
      <Loader isLoading={isLoading}>
        <ErrorContainer errorMessage={error}>
          <div>
            <h4>{attemptedQuestions.length + 1 || 1}) {questionBank[currentQuestionIndex]?.question}</h4>
            <FloatingLabel controlId="floatingInputGrid" label="Answer">
              <Form.Control type="text" placeholder="Enter your answer"
                onChange={(event) => setAnswer(event.target.value)}
                value={answer}
              />
            </FloatingLabel>
            <Row className='marginTop'>
              <Col md={3}>
                <Button variant={mode} onClick={handleNextClick}>Next</Button>
              </Col>

              <Col md={9} className='shiftToEnd' >
                <Badge bg={mode} className={`text-${reverseMode}`}>
                  Score: {score}
                </Badge>
                <Badge bg={mode} className={`text-${reverseMode}`}>
                  AttemptLeft: {attemptLeft}
                </Badge>
              </Col>
            </Row>

          </div>

        </ErrorContainer>
      </Loader>
    </Container >
  );
}

Quiz.propTypes = {
  mode: PropTypes.string
}

Quiz.defaultProps = {
  mode: 'dark'
}

export default Quiz;
