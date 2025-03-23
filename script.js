/***************************************************
 * script.js
 * 
 * 1) Captures user preferences on index.html
 * 2) Stores them (localStorage)
 * 3) Uses them on recommendation.html
 ****************************************************/

// A small “database” of coffee recipes
const coffeeRecipes = [
  {
    name: "Classic Espresso",
    ideal: {
      mood: ["energetic", "focused"],
      taste: ["bold", "balanced"],
      timeOfDay: ["morning", "afternoon"],
      decaf: false,
      extraShot: false
    },
    description: "A strong and bold espresso shot that jumpstarts your day.",
    ingredients: ["Fresh coffee beans - 18g", "Water - 30ml"],
    equipment: ["Gaggia Classic GT", "Tamper", "Measuring Scoop"],
    steps: [
      "Preheat the filter holder by running hot water.",
      "Grind coffee beans to a fine espresso grind.",
      "Tamp the coffee into the portafilter.",
      "Brew until you reach ~30ml of espresso."
    ],
    serving: "Serve as-is or pair with a sweet pastry."
  },
  {
    name: "Sweet Latte",
    ideal: {
      mood: ["relaxed"],
      taste: ["sweet"],
      timeOfDay: ["morning", "afternoon"],
      decaf: false,
      extraShot: false
    },
    description: "A mellow, sweet latte perfect for a relaxed mood.",
    ingredients: [
      "Fresh coffee beans - 18g",
      "Water - 30ml",
      "Cold milk - 100ml"
    ],
    equipment: ["Gaggia Classic GT", "Milk jug", "Tamper"],
    steps: [
      "Brew a standard espresso shot.",
      "Froth cold milk using the steam wand.",
      "Gently pour the frothed milk over the espresso."
    ],
    serving: "Pair with a light snack or enjoy solo."
  },
  {
    name: "Decaf Cappuccino",
    ideal: {
      mood: ["relaxed", "focused"],
      taste: ["balanced"],
      timeOfDay: ["evening"],
      decaf: true,
      extraShot: false
    },
    description: "A balanced cappuccino made with decaffeinated beans.",
    ingredients: [
      "Decaf coffee beans - 18g",
      "Water - 30ml",
      "Cold milk - 100ml"
    ],
    equipment: ["Gaggia Classic GT", "Milk jug", "Tamper"],
    steps: [
      "Brew a decaf espresso shot.",
      "Froth milk with the steam wand until velvety.",
      "Combine espresso and frothed milk in your cup."
    ],
    serving: "Sprinkle cocoa on top for an extra treat."
  },
  {
    name: "Extra Shot Mocha",
    ideal: {
      mood: ["energetic", "focused"],
      taste: ["sweet", "bold"],
      timeOfDay: ["morning", "afternoon"],
      decaf: false,
      extraShot: true
    },
    description: "A rich mocha with an extra shot for that intense caffeine kick.",
    ingredients: [
      "Coffee beans - 18g + 9g extra shot",
      "Water - 45ml total",
      "Chocolate syrup - 10ml",
      "Cold milk - 100ml"
    ],
    equipment: ["Gaggia Classic GT", "Milk jug", "Tamper", "Chocolate syrup"],
    steps: [
      "Brew a double espresso (two shots).",
      "Mix chocolate syrup into the espresso.",
      "Froth milk and pour it over the chocolate-espresso base."
    ],
    serving: "Top with whipped cream and chocolate shavings."
  }
];

/***********************************************************
 * 1) Handle Form Submission on index.html
 ***********************************************************/
window.addEventListener("DOMContentLoaded", () => {
  const coffeeForm = document.getElementById("coffeeForm");
  if (coffeeForm) {
    coffeeForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page refresh

      // Gather user inputs
      const mood = document.getElementById("mood").value;
      const taste = document.getElementById("taste").value;
      const timeOfDay = document.getElementById("timeOfDay").value;
      const decaf = document.getElementById("decaf").checked;
      const extraShot = document.getElementById("extraShot").checked;

      // Save preferences to localStorage
      const userPreferences = { mood, taste, timeOfDay, decaf, extraShot };
      localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

      // Redirect to recommendation page
      window.location.href = "recommendation.html";
    });
  }

  /***********************************************************
   * 2) Generate Recommendation on recommendation.html
   ***********************************************************/
  if (window.location.pathname.includes("recommendation.html")) {
    // Retrieve preferences from localStorage
    const storedPrefs = localStorage.getItem("userPreferences");
    if (!storedPrefs) return; // If no prefs, do nothing

    const { mood, taste, timeOfDay, decaf, extraShot } = JSON.parse(storedPrefs);

    // Simple scoring to find best match
    let bestMatch = null;
    let bestScore = -1;

    coffeeRecipes.forEach((recipe) => {
      let score = 0;
      if (recipe.ideal.mood.includes(mood)) score++;
      if (recipe.ideal.taste.includes(taste)) score++;
      if (recipe.ideal.timeOfDay.includes(timeOfDay)) score++;
      if (recipe.ideal.decaf === decaf) score++;
      if (recipe.ideal.extraShot === extraShot) score++;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = recipe;
      }
    });

    // Populate the page with the best match
    if (bestMatch) {
      document.getElementById("coffee-title").textContent = bestMatch.name;
      document.getElementById("coffee-description").textContent =
        bestMatch.description;

      // Ingredients
      const ingredientsList = document.getElementById("ingredients-list");
      ingredientsList.innerHTML = "";
      bestMatch.ingredients.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ingredientsList.appendChild(li);
      });

      // Equipment
      const equipmentList = document.getElementById("equipment-list");
      equipmentList.innerHTML = "";
      bestMatch.equipment.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        equipmentList.appendChild(li);
      });

      // Steps
      const stepsList = document.getElementById("steps-list");
      stepsList.innerHTML = "";
      bestMatch.steps.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        stepsList.appendChild(li);
      });

      // Serving Suggestions
      document.getElementById("serving-suggestions").textContent =
        bestMatch.serving;
    }
  }
});
