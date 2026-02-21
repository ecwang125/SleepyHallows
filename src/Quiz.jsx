import { useState } from 'react'
import './Quiz.css'

function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({
    earlyBird: 0,
    nightOwl: 0,
    watchfulDolphin: 0,
    nappingBear: 0
  })
  const [ingredients, setIngredients] = useState({
    needsStory: null,
    noiseType: null,
    meditationType: null,
    sleepTime: null
  })

  const questions = [
    {
      question: "When do you usually stop working before going to sleep?",
      answers: [
        { text: "0-1 hours", points: {} },
        { text: "1-3 hours", points: {} },
        { text: "3-5 hours", points: { earlyBird: 1 } }
      ]
    },
    {
      question: "Do you take sleeping pills or melatonin?",
      answers: [
        { text: "Yes", action: { watchfulDolphin: 2 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "How much caffeine do you consume in a day?",
      answers: [
        { text: "0 cups", points: { earlyBird: 2 } },
        { text: "1-2 cups", points: { nappingBear: 1 } },
        { text: "3+ cups", points: { watchfulDolphin: 2 } }
      ]
    },
    {
      question: "How long do you bed rot before sleeping?",
      answers: [
        { text: "0-15 minutes", points: { earlyBird: 1 } },
        { text: "15+ minutes", points: { nightOwl: 1 } }
      ]
    },
    {
      question: "How many hours before bedtime do you have your last meal?",
      answers: [
        { text: "0-1 hours", points: { watchfulDolphin: 1 } },
        { text: "1-3 hours", points: { earlyBird: 1 } },
        { text: "3-5 hours", points: { earlyBird: 1 } }
      ]
    },
    {
      question: "Do you set multiple alarms to wake up in the morning?",
      answers: [
        { text: "0-1 alarms", points: { earlyBird: 2 } },
        { text: "1-3 alarms", points: { nappingBear: 1, watchfulDolphin: 1 } },
        { text: "3-5 alarms", points: { nightOwl: 2 } }
      ]
    },
    {
      question: "Do you eat breakfast every morning?",
      answers: [
        { text: "Yes", points: { earlyBird: 1 } },
        { text: "Sometimes", points: {} },
        { text: "Never", points: { nightOwl: 1 } }
      ]
    },
    {
      question: "Do you need complete silence to sleep?",
      answers: [
        { text: "Yes", ingredient: { needsStory: false, noiseType: "brown" } },
        { text: "No", ingredient: { needsStory: true, noiseType: "ambient" } }
      ]
    },
    {
      question: "How long does it take you to fall asleep?",
      answers: [
        { text: "<15 minutes", points: { earlyBird: 1 } },
        { text: "15-30 minutes", points: { nightOwl: 1 } },
        { text: ">30 minutes", points: { watchfulDolphin: 2 }, ingredient: { sleepTime: "long" } }
      ]
    },
    {
      question: "Do you nap often throughout the day?",
      answers: [
        { text: "Never", points: { earlyBird: 1 } },
        { text: "Occasionally", points: { nightOwl: 1 } },
        { text: "Always", points: { nappingBear: 2 } }
      ]
    }
  ]

  const handleAnswer = (answer) => {
    let newScores = { ...scores }
    let newIngredients = { ...ingredients }

    // Update scores
    if (answer.points) {
      Object.keys(answer.points).forEach(type => {
        newScores[type] += answer.points[type]
      })
    }

    // Update ingredient
    if (answer.ingredient) {
      newIngredients = { ...newIngredients, ...answer.ingredient }
    }

    setScores(newScores)
    setIngredients(newIngredients)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz complete, determine potion type
      const winningPotion = determinePotion(newScores)
      onComplete(winningPotion, newIngredients, newScores)
    }
  }

  const determinePotion = (finalScores) => {
    const max = Math.max(...Object.values(finalScores))
    const potion = Object.keys(finalScores).find(key => finalScores[key] === max)
    return potion
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Sleepy Hallows Potion Quiz</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">Question {currentQuestion + 1} of {questions.length}</p>
      </div>

      <div className="quiz-question">
        <h3>{questions[currentQuestion].question}</h3>
        <div className="quiz-answers">
          {questions[currentQuestion].answers.map((answer, index) => (
            <button key={index} className="answer-btn" onClick={() => handleAnswer(answer)}>
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quiz
