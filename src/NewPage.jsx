import { useState } from 'react'
import Quiz from './Quiz'
import PotionResult from './PotionResult'
import './NewPage.css'

function NewPage({ onBack }) {
  const [quizState, setQuizState] = useState('quiz') // intro, quiz, result
  const [potionResult, setPotionResult] = useState(null)
  const [ingredients, setIngredients] = useState(null)
  const [scores, setScores] = useState(null)

  const handleStartQuiz = () => {
    setQuizState('quiz')
  }

  const handleQuizComplete = (potion, ing, scr) => {
    setPotionResult(potion)
    setIngredients(ing)
    setScores(scr)
    setQuizState('result')
  }

  const handleRetake = () => {
    setPotionResult(null)
    setIngredients(null)
    setScores(null)
    setQuizState('quiz')
  }

  return (
    <div className="new-page">
      {quizState === 'quiz' && (
        <div className="quiz-page">
          <Quiz onComplete={handleQuizComplete} />
          <button className="back-btn" onClick={onBack}>Back</button>
        </div>
      )}

      {quizState === 'result' && (
        <div className="result-page">
          <PotionResult 
            potionType={potionResult} 
            ingredients={ingredients}
            scores={scores}
            onRetake={handleRetake}
          />
          <button className="back-btn" onClick={onBack}>Back to Home</button>
        </div>
      )}
    </div>
  )
}

export default NewPage
