import { useState } from "react";
import { Link } from 'react-router-dom';


const Templates = () => {
    const [items, setItems] = useState([
        { name: 'bricky', color: 'red' },
        { name: 'landscaper', color: 'green' },
        { name: 'plumber', color: 'blue' },
      ]);
    
      const handleClick = (item) => {
        console.log(`Clicked item: ${item.name}`);
        localStorage.setItem("productId", `${item.name}_id`);
        // Perform any desired action when an item is clicked
      };
    
      return (
        <div>
          <h1>Trades Templates</h1>
          <ul className="item-list">
            {items.map((item, index) => (
                <Link
                    key={index}
                    to={`/templates/${item.name}`}
                    className="item"
                    style={{ backgroundColor: item.color }}
                    onClick={() => handleClick(item)}
                >
                    {item.name}
                </Link>
            ))}
          </ul>
        </div>
      );
};

export default Templates;