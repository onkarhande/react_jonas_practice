const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  return (
    <div className="App">
      <Logo></Logo>
      <Form></Form>
      <PackingList></PackingList>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form() {
  return (<div className="add-form">
    <h3>What do you need for your 😍 trip</h3>
  </div>)
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map(item => <Item item={item}></Item>)}
      </ul>
    </div>

  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you have already packed X (X%)</em>
    </footer>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button>❌</button>
    </li>
  )
}

export default App;
