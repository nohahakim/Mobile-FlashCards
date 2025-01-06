const dummyData = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer:
          "React is a JavaScript library for building user interfaces, enabling the creation of reusable UI components.",
      },
      {
        question: "What are React Hooks?",
        answer:
          "Hooks are functions that let you use state and other React features in functional components, such as useState and useEffect.",
      },
      {
        question: "What is the Virtual DOM?",
        answer:
          "The Virtual DOM is an in-memory representation of the real DOM used by React to optimize and efficiently update the UI.",
      },
      {
        question: "Explain the useEffect hook.",
        answer:
          "useEffect allows you to perform side effects in functional components, like data fetching or subscriptions, after rendering.",
      },
      {
        question: "What is JSX?",
        answer:
          "JSX is a syntax extension that allows you to write HTML-like code within JavaScript, which gets transformed into React elements.",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "A closure is a function that retains access to its lexical scope, allowing it to remember variables from its creation context.",
      },
      {
        question: "Explain the event loop.",
        answer:
          "The event loop manages asynchronous operations by handling the call stack and task queue, ensuring non-blocking execution.",
      },
      {
        question: "Difference between var, let, and const?",
        answer:
          "var is function-scoped and can be redeclared. let and const are block-scoped, with const being immutable after declaration.",
      },
      {
        question: "What are Promises?",
        answer:
          "Promises represent the eventual completion or failure of an asynchronous operation, providing methods like then and catch for handling outcomes.",
      },
      {
        question: "What is prototypal inheritance?",
        answer:
          "Prototypal inheritance allows objects to inherit properties and methods from a prototype object, facilitating code reuse.",
      },
    ],
  },
};

export default dummyData;
