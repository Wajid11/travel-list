import { useState } from "react";
import Logo from './Logo';
import Form from './Form';
import  Packing  from "./Packing";
import Stats from "./Stats";

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

