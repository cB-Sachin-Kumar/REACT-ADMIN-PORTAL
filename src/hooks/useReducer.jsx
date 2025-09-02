import { useReducer } from "react";

// main reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

//jab state zyada complex ho jaye, ya ek state update pe multiple conditions apply karni ho… tab useReducer kaam aata hai.

function Counter() {
  const [state, Dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count:{state.count}</p>

      <button
        onClick={() => {
          Dispatch({ type: "increment" });
        }}
      >
        Increase +
      </button>

      <button
        onClick={() => {
          Dispatch({ type: "decrement" });
        }}
      >
        {" "}
        Decrease -
      </button>

      <button
        onClick={() => {
          Dispatch({ type: "reset" });
        }}
      >
        {" "}
        Reset Counter
      </button>
    </div>
  );
}
