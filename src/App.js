import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

// const [description,setDescription] = useState();
//   const [quantity,setQuantity] = useState(1);
//   const [additem,setAdditem] = useState([]);



export default function App() {
  const [additem,setAdditem] = useState(initialItems);
  

  function addhandleitem(newItem){
    setAdditem((additem )=> [...additem,newItem]);
    }

    function handleDelete(id){
      setAdditem(item=>item.filter(item=>item.id !== id));
      // console.log(additem);
    }
    function handleupdate(id){
      setAdditem(item=>item.map(item=>item.id === id ? {...item, packed:!item.packed} : item));
      // console.log(additem);
    }

  return (
  <div className="app"> 
        <Logo/>
        <Form  onadditem={addhandleitem}/>
        <Packing onhandleupdate={handleupdate} onhandleDelete={handleDelete} newitem={additem}/>
        <Stats additem={additem}/>
  </div>
  )
}

 function Logo() {
  return <h1>✨ Far Away 🎑</h1>
 }

 function Form({onadditem}) {
  const [description,setDescription] = useState();
  const [quantity,setQuantity] = useState(1);


function handleSubmit(e){
e.preventDefault();
if (!description) return;

const newItem = {description,quantity,packed:false , id: Date.now()};
setDescription('');
setQuantity(1);
onadditem(newItem)
// console.log(newItem);
// console.log(additem);
// [...initialItems , newItem];
}


  return (
  <form className="add-form" onSubmit={handleSubmit}> 
    <h3>What do you need for your 😍 trip?</h3> 
    <select value={quantity} onChange={(e)=>{setQuantity(Number(e.target.value))}}>
      {Array.from({length : 20}, (_,i)=> i + 1).map(num=><option value={num} key={num}>{num}</option>)}
    {
    /* <option value={1}>1</option>  
    <option value={2}>2</option>  
    <option value={3}>3</option>   */
    }
    </select> 
    <input type="text" placeholder="Item..." value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
    <button>ADD</button>
</form>
)
 }

 function Packing({newitem,onhandleDelete,onhandleupdate}) {
  return (
    <div className="list"> 
      <ul>
        {newitem.map(item=><Item onhandleupdate={onhandleupdate} onhandleDelete={onhandleDelete} item={item} key={item.id}/> )}
        
      </ul>  
  </div>
  )
 }

 function Item({item,onhandleDelete,onhandleupdate}) {
return <li>
  <input type="checkbox" onChange={()=>onhandleupdate(item.id)}/>
  <span style={item.packed ? {textDecoration:'line-through'} : {}}>
  {item.quantity} {item.description}
  </span>
  <button onClick={()=>onhandleDelete(item.id)}>❌</button>
  </li> 
 }


 function Stats({additem}) {
  const numitem = additem.length;
  const numitempacked = additem.filter(items=>items.packed).length;
  console.log(numitempacked);
  return (
    <footer className="stats"> 
      <h3><em>💼 You have {numitem} items on your list, and you already packed {numitempacked} </em></h3>  
  </footer>
  )
 }