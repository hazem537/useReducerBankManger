import "./styles.css";
import { useReducer } from "react";
export default function App() {
  const intial = { balance: 0, loan: 0, isActive: false };

  const reducer = (state, action) => {
    switch (action.type) {
      case "OPENACCOUNT":
        return { ...state, balance: 50, isActive: true };
      case "Deposite":
        return { ...state, balance: state.balance + 150 };
      case "WithDraw":
        if (state.balance >= 50)
          return { ...state, balance: state.balance - 50 };
      case "RequestLoan":
        return {
          ...state,
          balance: state.balance + 5000,
          loan: state.loan + 5000,
        };
      case "PayLoan":
        if (state.loan > 0 && state.balance >= 5000)
          return {
            ...state,
            balance: state.balance - 5000,
            loan: state.loan - 5000,
          };
      case "CloseAccount":
        if (state.loan == 0 && state.balance == 0) return intial;

      default:
        return state;
    }
  };
  const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, intial);
  return (
    <div className="App">
      <h1>User Reduce Bank Account </h1>
      <h2>Balance : {balance} </h2>
      <h2>loan : {loan} </h2>
      <button
        onClick={() => dispatch({ type: "OPENACCOUNT" })}
        disabled={isActive}
      >
        open account
      </button>
      <button
        onClick={() => dispatch({ type: "Deposite" })}
        disabled={!isActive}
      >
        Deposit 150
      </button>
      <button
        onClick={() => dispatch({ type: "WithDraw" })}
        disabled={!isActive}
      >
        withDraw 50
      </button>
      <button
        onClick={() => dispatch({ type: "RequestLoan" })}
        disabled={!isActive}
      >
        Request aloan 5000
      </button>
      <button
        onClick={() => dispatch({ type: "PayLoan" })}
        disabled={!isActive || loan == 0}
      >
        pay loan{" "}
      </button>

      <button
        onClick={() => dispatch({ type: "CloseAccount" })}
        disabled={!isActive || loan !== 0 || balance !== 0}
      >
        close account
      </button>
    </div>
  );
}
