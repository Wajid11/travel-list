export default function Stats({ additem }) {

  if (!additem.length)
    return (
      <footer className="stats">
        <h3>
          <em>Start adding items to your packing list🚀</em>
        </h3>
      </footer>
    );

  const numitem = additem.length;
  const numitempacked = additem.filter(items => items.packed).length;
  const percentageotem = Math.round((numitempacked / numitem) * 100);
  console.log(numitempacked);
  return (
    <footer className="stats">
      <h3>
        <em>
          {percentageotem === 100 ? 'You are ready to go ✈' :
            `💼 You have ${numitem} items on your list, you packed ${numitempacked} .  (${percentageotem})% `}
        </em>
      </h3>
    </footer>
  );
}
