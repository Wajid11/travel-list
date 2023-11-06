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

// hadle clear item//
function handleclearitem(){
  const confrim = window.confirm('Deleting all items');
  if (confrim) setAdditem([]);
}




  return (
  <div className="app"> 
        <Logo/>
        <Form  onadditem={addhandleitem}/>
        <Packing onhandleclearitem={handleclearitem}  onhandleupdate={handleupdate} onhandleDelete={handleDelete} newitem={additem}/>
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

 function Packing({newitem,onhandleDelete,onhandleupdate,onhandleclearitem}) {
const [orderby,setOrderby] = useState('input');
let itemorder;
if(orderby === 'input') itemorder = newitem ;
if(orderby === 'description') itemorder = newitem.slice().sort((a,b)=>a.description.localeCompare(b.description)) ;
if(orderby === 'packed') itemorder = newitem.slice().sort((a,b)=>Number(a.packed)- Number(b.packed)) ;



  return (
    <div className="list"> 
      <ul>
        {itemorder.map(item=><Item onhandleupdate={onhandleupdate} onhandleDelete={onhandleDelete} item={item} key={item.id}/> )}
        
      </ul>  
      <select onChange={(e)=> setOrderby(e.target.value)} className="actions" value={orderby}>
        <option value='input'>select item order by input</option>
        <option value='description'>select item order by description</option>
        <option value='packed'>select item order by packed</option>
      </select>
      <button onClick={onhandleclearitem} >Clear</button>
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

if(!additem.length)
return(
  <footer className="stats"> 
  <h3>
      <em>Start adding items to your packing list🚀</em>
      </h3>
  </footer>
);

  const numitem = additem.length;
  const numitempacked = additem.filter(items=>items.packed).length;
  const percentageotem = Math.round((numitempacked/numitem)*100);
  console.log(numitempacked);
  return (
    <footer className="stats"> 
      <h3>
      <em>
        {percentageotem === 100 ? 'You are ready to go ✈' :
        `💼 You have ${numitem} items on your list, you packed ${numitempacked} .  (${percentageotem})% `
      }   
      </em>
        </h3>  
  </footer>
  )
 }