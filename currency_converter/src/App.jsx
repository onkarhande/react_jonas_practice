import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [input, setInput] = useState(100);
  const [from, setFrom] = useState('EUR');
  const [to, setTo] = useState('INR');
  const [converted, setConverted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(input) {
    setInput(input);
  }

  function handleFrom(from) {
    setFrom(from);
  }

  function handleTo(to) {
    setTo(to);
  }

  useEffect(function () {
    const controller = new AbortController();

    if (from === to) {
      setConverted(input);
      return
    }
    getConvertedData();

    async function getConvertedData() {
      setIsLoading(true);
      let data = await fetch(`https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`, { signal: controller.signal });
      let a = await (data.json());
      setConverted(a.rates[to]);
      setIsLoading(false);
    }

    return function () {
      controller.abort();
    }

  }, [input, from, to]);

  return (
    <div>
      <input type="text" value={input} onChange={(e) => { handleInputChange(e.target.value) }} disabled={isLoading} />
      <select onChange={(e) => { handleFrom(e.target.value) }} value={from} disabled={isLoading} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => { handleTo(e.target.value) }} value={to} disabled={isLoading} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{converted} {to}</p>
    </div>
  );
}
