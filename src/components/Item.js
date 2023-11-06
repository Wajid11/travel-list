export default function Item({ item, onhandleDelete, onhandleupdate }) {
  return <li>
    <input type="checkbox" onChange={() => onhandleupdate(item.id)} />
    <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
      {item.quantity} {item.description}
    </span>
    <button onClick={() => onhandleDelete(item.id)}>❌</button>
  </li>;
}
