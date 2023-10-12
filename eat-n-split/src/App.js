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

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  return <div className='App'>
    <div className='sidebar'>
      <FriendsList></FriendsList>
      {showAddFriend && (<FormAddFriend></FormAddFriend>)}

      <Button onClick={handleShowAddFriend}>{!showAddFriend ? 'Add friend' : 'Close'}</Button>
      <FormSplitBill></FormSplitBill>
    </div>
  </div>
}


function FriendsList() {
  const friends = initialFriends;
  return (<ul>
    {friends.map((friend) => (
      <Friend friend={friend}></Friend>
    ))}
  </ul>)
}

function Friend({ friend }) {
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
      <Button>Select</Button>
    </li>)
}

function FormAddFriend() {
  return (
    <form className='form-add-friend'>
      <label>🤼 Friend Name</label>
      <input type='text'></input>

      <label>🌆 Image Url</label>
      <input type='text'></input>

      <Button>Add</Button>
    </form>
  )
}

function Button({ children, onClick }) {
  return (<button className='button' onClick={onClick}>{children}</button>)
}

function FormSplitBill() {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with x</h2>

      <label>💰 Bill value</label>
      <input type='text'></input>

      <label>👩‍🎤 Your Expense</label>
      <input type='text'></input>

      <label>🤷‍♂️ X's Expense</label>
      <input type='text' disabled></input>

      <label>💵 Who is paying the bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}