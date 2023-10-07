import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => { return item.id !== id }))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  return (
    <div className="App">
      <Logo></Logo>
      <Form onAddItem={handleAddItems}></Form>
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem}></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    let newItem = { id: Date.now(), description, quantity, packed: false };

    onAddItem(newItem);
    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num} >
              {num}
            </option>
          );
        })}
      </select>
      <input type="text" placeholder="item..." value={description} onInput={(e) => setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handleDeleteItem, handleToggleItem }) {
  const [sortBy, setSortBy] = useState('packed');

  let sortedItems;

  if (sortBy === 'input') {
    sortedItems = items;
  }
  else if (sortBy === 'description') {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }
  else if (sortBy === 'packed') {
    sortedItems = items.slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  else {
    sortedItems = items;
  }

  console.log(sortBy);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}></Item>
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Stats({ items }) {

  if (!items.length) {
    return (
      <footer className="stats">
        <em>
          Start adding some items in your packing list ✈
        </em>
      </footer>
    );
  }

  const totalItems = items.length;
  const packedItems = items.filter(o => o.packed).length;
  let percentage = Math.round(packedItems / totalItems * 100);
  console.log(packedItems, totalItems, percentage);
  return (
    <footer className="stats">
      <em>{percentage === 100 ? 'You got everything... Ready to go 🚀' : `👜 You have ${totalItems} items on your list, and you have
        already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => { onDeleteItem(item.id) }}>❌</button>
    </li>
  );
}

export default App;
