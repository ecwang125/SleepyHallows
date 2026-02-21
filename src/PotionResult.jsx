function PotionResult({ potionType, ingredients, scores, onRetake }) {
  const potionData = getPotionData(potionType)
  const sleepPlan = generateSleepPlan(potionType, ingredients, scores)

  function getPotionData(type) {
    const potions = {
      earlyBird: {
        name: "Early Bird Elixir",
        emoji: "🌅",
        description: "You're naturally attuned to the early morning hours. Your body naturally wakes with the sun.",
        color: "#FFD700"
      },
      nightOwl: {
        name: "Night Owl Nectar",
        emoji: "🦉",
        description: "You thrive when the world sleeps. Your peak hours come when the moon is high.",
        color: "#1a1a2e"
      },
      watchfulDolphin: {
        name: "Watchful Dolphin Draught",
        emoji: "🐬",
        description: "Your mind never fully rests. You're a light sleeper who needs extra support.",
        color: "#87CEEB"
      },
      nappingBear: {
        name: "Napping Bear Brew",
        emoji: "🐻",
        description: "You need multiple rest periods throughout the day to feel your best.",
        color: "#8B4513"
      }
    }
    return potions[type] || potions.earlyBird
  }

  function generateSleepPlan(type, ingredients, scores) {
    const plans = {
      earlyBird: {
        bedtime: "9:30 PM - 10:30 PM",
        wakeTime: "6:00 AM - 6:30 AM",
        sleepDuration: "7-8 hours",
        tips: ["Set wake time routine before dawn", "Get sunlight exposure early", "Exercise in morning/afternoon"]
      },
      nightOwl: {
        bedtime: "12:00 AM - 1:00 AM",
        wakeTime: "7:30 AM - 8:30 AM",
        sleepDuration: "7-8 hours",
        tips: ["Gradually shift schedule if needed", "Avoid bright lights in evening gradually", "Exercise earlier in the day"]
      },
      watchfulDolphin: {
        bedtime: "10:00 PM - 11:00 PM",
        wakeTime: "6:00 AM - 7:00 AM",
        sleepDuration: "7-9 hours",
        tips: ["Establish consistent sleep schedule", "Consider gradual wind-down routine", "Monitor caffeine intake"]
      },
      nappingBear: {
        bedtime: "10:00 PM - 11:00 PM",
        wakeTime: "6:30 AM - 7:30 AM",
        sleepDuration: "7-8 hours + 20-30 min naps",
        tips: ["Schedule naps at consistent times", "Keep naps under 30 minutes", "Afternoon nap ideal around 2-3 PM"]
      }
    }
    return plans[type]
  }

  function getSpellIngredients() {
    const ingredients_list = []
    
    if (ingredients.needsStory !== false) {
      ingredients_list.push({
        name: "📖 Bedtime Story",
        detail: "A short tale from the Wizarding World (15-20 minutes)"
      })
    }

    ingredients_list.push({
      name: `🎵 ${ingredients.noiseType === "brown" ? "Brown Noise" : "Ambient Soundscape"}`,
      detail: ingredients.noiseType === "brown" 
        ? "Deep, soothing brown noise (20-60 minutes)" 
        : "Gentle ambient nature sounds (20-60 minutes)"
    })

    if (potionType === "watchfulDolphin") {
      ingredients_list.push({
        name: "🧘 Guided Meditation",
        detail: "Body scan meditation from Eleven Labs (10-15 minutes)"
      })
    }

    ingredients_list.push({
      name: "⏰ REM-Aligned Fade Out",
      detail: potionType === "earlyBird" 
        ? "Story fades at 60-90 min mark" 
        : "Story fades at 90-120 min mark"
    })

    return ingredients_list
  }

  return (
    <div className="potion-result" style={{ backgroundColor: potionData.color + "20" }}>
      <div className="potion-header">
        <h1>{potionData.emoji} {potionData.name}</h1>
        <p className="potion-description">{potionData.description}</p>
      </div>

      <div className="potion-content">
        <div className="sleep-plan">
          <h2>Your Personalized Sleep Plan</h2>
          <div className="plan-grid">
            <div className="plan-item">
              <strong>Recommended Bedtime:</strong>
              <p>{sleepPlan.bedtime}</p>
            </div>
            <div className="plan-item">
              <strong>Wake Time:</strong>
              <p>{sleepPlan.wakeTime}</p>
            </div>
            <div className="plan-item">
              <strong>Sleep Duration:</strong>
              <p>{sleepPlan.sleepDuration}</p>
            </div>
          </div>
        </div>

        <div className="spell-ingredients">
          <h2>✨ Spell Ingredients for Better Sleep</h2>
          <div className="ingredients-list">
            {getSpellIngredients().map((ingredient, index) => (
              <div key={index} className="ingredient-card">
                <h3>{ingredient.name}</h3>
                <p>{ingredient.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sleep-tips">
          <h2>💤 Sleep Optimization Tips</h2>
          <ul>
            {sleepPlan.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <button className="retake-btn" onClick={onRetake}>Retake Quiz</button>
    </div>
  )
}

export default PotionResult
