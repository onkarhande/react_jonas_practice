import React, { useState } from 'react';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => cur.id === friend.id ? false : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log(value);

    setFriends((prev) => friends.map(o => o.id === selectedFriend.id ? { ...o, balance: o.balance + value } : o));
    setSelectedFriend(null);
  }

  return <div className='App'>
    <div className='sidebar'>
      <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}></FriendsList>
      {showAddFriend &&
        (<FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>)
      }

      <Button onClick={handleShowAddFriend}>{!showAddFriend ? 'Add friend' : 'Close'}</Button>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}></FormSplitBill>}
    </div>
  </div>
}


function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (<ul>
    {friends.map((friend) => (
      <Friend friend={friend} onSelection={onSelection} selectedFriend={selectedFriend}></Friend>
    ))}
  </ul>)
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  // const isSelected = false;
  return (
    <li key={friend.id}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && (
        <p>You and {friend.name} are even</p>
      )}
      <Button onClick={() => onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
    </li>)
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id
    }

    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>🤼 Friend Name</label>
      <input type='text' value={name} onChange={(e) => { setName(e.target.value) }}></input>

      <label>🌆 Image Url</label>
      <input type='text' value={image} onChange={(e) => setImage(e.target.value)}></input>

      <Button>Add</Button>
    </form>
  )
}

function Button({ children, onClick }) {
  return (<button className='button' onClick={onClick}>{children}</button>)
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  let paidByFriend = bill - paidByUser;

  function setExpenses(userExpense) {
    setPaidByUser(userExpense);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))}></input>

      <label>👩‍🎤 Your Expense</label>
      <input type='text' value={paidByUser} onChange={(e) => setExpenses(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}></input>

      <label>🤷‍♂️ {selectedFriend.name}'s Expense</label>
      <input type='text' disabled value={paidByFriend}></input>

      <label>💵 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}