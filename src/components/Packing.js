import { useState } from "react";
import Item  from "./Item";

export default function Packing({ newitem, onhandleDelete, onhandleupdate, onhandleclearitem }) {
  const [orderby, setOrderby] = useState('input');
  let itemorder;
  if (orderby === 'input') itemorder = newitem;
  if (orderby === 'description') itemorder = newitem.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (orderby === 'packed') itemorder = newitem.slice().sort((a, b) => Number(a.packed) - Number(b.packed));



  return (
    <div className="list">
      <ul>
        {itemorder.map(item => <Item onhandleupdate={onhandleupdate} onhandleDelete={onhandleDelete} item={item} key={item.id} />)}

      </ul>
      <select onChange={(e) => setOrderby(e.target.value)} className="actions" value={orderby}>
        <option value='input'>select item order by input</option>
        <option value='description'>select item order by description</option>
        <option value='packed'>select item order by packed</option>
      </select>
      <button onClick={onhandleclearitem}>Clear</button>
    </div>
  );
}
