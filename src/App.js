import "./styles.css";
import { useReducer } from 'react'
export default function App() {
  const intial = { balance: 0, loan: 0, status: 'NOACCOUNT' }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'OPENACCOUNT':
        return { ...state, balance: 50, status: "HASACCOUNT" }
      case 'Deposite':
        return { ...state, balance: state.balance + 150 }
      case "WithDraw":
        if (state.balance >= 50)
          return { ...state, balance: state.balance - 50 }
      case "RequestLoan":
        return { ...state, balance: state.balance + 5000, loan: state.loan + 5000 }
      case "PayLoan":
        if (state.loan > 0 && state.balance >= 5000)
          return { ...state, balance: state.balance - 5000, loan: state.loan - 5000 }
      case "CloseAccount":
        if (state.loan == 0 && state.balance == 0)
          return intial

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, intial)
  return (
    <div className="App">
      <h1>User Reduce Bank Account </h1>
      <h2>Balance  : {state.balance} </h2>
      <h2>loan  : {state.loan} </h2>
      <button onClick={() => dispatch({ type: "OPENACCOUNT" })}
        disabled={state.status == 'HASACCOUNT'}>open account</button>
      <button onClick={() => dispatch({ type: 'Deposite' })}
        disabled={state.status != 'HASACCOUNT'}>Deposit 150</button>
      <button onClick={() => dispatch({ type: 'WithDraw' })}
        disabled={state.status != 'HASACCOUNT'}>withDraw 50</button>
      <button onClick={() => dispatch({ type: 'RequestLoan' })}
        disabled={state.status != 'HASACCOUNT'}>Request aloan 5000</button>
      <button onClick={() => dispatch({ type: 'PayLoan' })}
        disabled={state.status != 'HASACCOUNT' && state.loan == 0}>pay loan </button>

      <button onClick={() => dispatch({ type: 'CloseAccount' })}
        disabled={state.status !== 'HASACCOUNT' && state.loan !== 0 && state.balance !== 0}>close account</button>
    </div >
  );
}
