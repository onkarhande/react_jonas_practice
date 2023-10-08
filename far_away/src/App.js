import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
    setItems((items) =>
      items.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearPackingList() {
    let confirmed = window.confirm(
      "Are you sure you want to delete all the items in the list?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="App">
      <Logo></Logo>
      <Form onAddItem={handleAddItems}></Form>
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
        clearPackingList={handleClearPackingList}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

export default App;
