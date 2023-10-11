import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <TipCalculator></TipCalculator>
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [percent1, setPercent1] = useState('');
  const [percent2, setPercent2] = useState('');

  let tip = bill * (percent1 + percent2) / 2 / 100;

  function handleReset() {
    setBill('');
    setPercent1('');
    setPercent2('');
  }

  return (<div>
    <BillInput bill={bill} onSetBill={setBill}></BillInput>
    <SelectPercentage percentage={percent1} onSetPercentage={setPercent1}>How did you like the service?</SelectPercentage>
    <SelectPercentage percentage={percent2} onSetPercentage={setPercent2}>How did your friend like the service?</SelectPercentage>

    {bill > 0 && (<><Output bill={bill} tip={tip}></Output>
      <Reset onReset={handleReset}></Reset></>)}

  </div>)
}

function BillInput({ bill, onSetBill }) {
  return (<div>
    <label>How much was the bill?</label>
    <input type='text' placeholder='Bill value' value={bill} onInput={(e) => onSetBill(Number(e.target.value))}></input>
  </div>)
}

function SelectPercentage({ percentage, onSetPercentage, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={(e) => { onSetPercentage(Number(e.target.value)) }}>
        <option value='0'>Dissatisfied (0%)</option>
        <option value='5'>It was okay (5%)</option>
        <option value='10'>It was good (10%)</option>
        <option value='15'>Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

function Output({ bill, tip }) {
  console.log(bill, tip);
  return (<h3>You pay ${bill + tip} (${bill} + ${tip} tip)</h3>)
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>
}

export default App;
