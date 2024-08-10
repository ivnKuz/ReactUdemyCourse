export default function Item({ item, onDeleteItem, onToggleItem }) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
    <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
      {item.description} {item.quantity}
    </span>
    {/* we need a callback function here so that react call the function only when the event happens, without it react will just send the event into that funciton */}
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>;
}
