// Funktion som hämtar ett råd från API:t baserat på ett specifikt id.
const fetchAdviceById = async (id) => {
   try {
      const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      //console.log(response);
      const data = await response.json();
      //console.log(data);
      const advice = data.slip.advice;
      console.log(`Advice (ID:${id}): ${advice}`);
   } catch (error) {
      console.log("Error fetching advice", error);
   }
};

// Funktion som hämtar en slumpmässig Chuck Norris-vits från API:t
const randomChuckJoke = async () => {
   try {
      const response = await fetch(`https://api.chucknorris.io/jokes/random`);
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      //console.log(response);
      const data = await response.json();
      console.log(data);
      const joke = data.value;
      console.log(`Chuck Norris Joke: ${joke}`);
   } catch (error) {
      console.log("Error fetchin joke;", error);
   }
};

// En asynkron funktion som returnerar en promise
function coinFlip(fetchAdviceById) {
   return new Promise((resolve, reject) => {
      let result = Math.random();

      // Om resultatet är större än 0.5, anse att det är vinst
      if (result > 0.5) {
         resolve("You win!");
         const randomId = Math.floor(Math.random() * 200) + 1;
         fetchAdviceById(randomId);
      } else {
         randomChuckJoke(); // Hämta en Chuck Norris-joke
         reject("You lose, but here is a Chuck Norris joke!");
      }
   });
}

const result = async () => {
   try {
      const value = await coinFlip(fetchAdviceById);
      console.log(value);
   } catch (error) {
      console.log("reason of rejection: " + error);
   }
};

result();
