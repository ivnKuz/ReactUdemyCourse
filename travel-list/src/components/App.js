import { useEffect, useState } from "react";
import Logo from "./Logo";
import Form from "./Form"
import PackingList  from "./PackingList";
import  Stats  from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item){
    setItems(items => [...items, item])
  }

  function handleDeleteItems(id) {
    //every item that has different id than we pass in will remain in the itmes array, the one with id that mathces will be gone
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleClearList(){
    const confirmed = window.confirm("are you sure you want to delete all items?")
    if(confirmed) setItems([]);
  }

  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
    <Stats items={items} />
  </div>
}





