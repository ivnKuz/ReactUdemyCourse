import { useEffect, useState } from "react";




export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item){
    setItems(items => [...items, item])
  }

  function handleDeleteItems(id) {
    //every item that has different id than we pass in will remain in the itmes array, the one with id that mathces will be gone
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem}/>
    <Stats items={items}/>
  </div>
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(5);
 


  function handleSumbit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() }
  

    onAddItems(newItem)
    setDescription('')
    setQuantity('')

  }
  return <form className="add-form" onSubmit={handleSumbit}>
    <h3>What do you need for your trip? 😍</h3>
    <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1)
        .map(num => <option value={num} key={num}>
          {num}
        </option>)}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
    <button>Add</button>
  </form>
}

function PackingList({items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if(sortBy === 'input') sortedItems = items;
  if(sortBy === 'description') sortedItems = items.slice().sort((a,b)=> a.description.localeCompare(b.description));
  if(sortBy === 'packed') sortedItems = items.slice().sort((a,b)=> Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul >
        {sortedItems.map(item => <Item onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} item={item} key={item.id} />)}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e=> setSortBy(e.target.value)}>
          <option value='input'>Sort by the input order</option>
          <option value='description'>Sort by the description</option>
          <option value='packed'>Sort by the packed status</option>
          
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem}) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
    <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
      {item.description} {item.quantity}
    </span>
    {/* we need a callback function here so that react call the function only when the event happens, without it react will just send the event into that funciton */}
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}

function Stats({items}) {
  if(!items.length) return <p className="stats"><em>start adding some items to your packing list.</em></p>
  
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100)
  return <footer className="stats">
    <em> {percentage === 100 ? 'You got everything ready to go!' : `👜 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`} </em>
  </footer>
}