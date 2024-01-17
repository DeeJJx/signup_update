import { useState } from "react";
import { Link } from 'react-router-dom';
import electricianImage from '../images/electrician.png'
import plumberImage from '../images/plumber.png'
import landscaperImage from '../images/landscaper.png'
import brickyImage from '../images/bricky.jpg'

const Templates = () => {
    const [items, setItems] = useState([
        { name: 'bricky', img: brickyImage },
        { name: 'landscaper', img: landscaperImage },
        { name: 'plumber', img: plumberImage },
        { name: 'electrician', img: electricianImage }
      ]);
    
      const handleClick = (item) => {
        console.log(`Clicked item: ${item.name}`);
        // localStorage.setItem("productId", `${item.name}_id`);
        // Perform any desired action when an item is clicked
      };
    
      return (
        <div className="templates-page page">
          <h1>Trades Templates</h1>
          <ul className="item-list">
            {items.map((item, index) => (
                <Link
                    key={index}
                    to={`/templates/${item.name}`}
                    className="item"
                    style={{ backgroundImage: `url(${item.img})` }}
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