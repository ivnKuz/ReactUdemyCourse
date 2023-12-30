import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return <div className='container'>
    <h1>Hello ruct!!!!</h1>
    <Header />
    <Menu />
    <Footer />
  </div>
}
function Header() {
  // const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' }
  return <header className='header'><h1>Fast React Pizza Co.</h1></header>
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length // creating this because empty arr is still a truthy value, so conditional rendering will still render it below
  return <main className='menu'>
    <h2>Our Menu:</h2>

    {/* always need a boolean value, so it wont be rendered in DOM */}
    {numPizzas > 0 ? (<ul className='pizzas'>
      {pizzas.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name} />)}
    </ul>) : <p>We're still working on our menu. Please come back later :)</p>}

    {/* <Pizza name='Pizza spinaci' ingredients='Tomato, mozarella, ham, aragula, and burrata cheese' photoName='pizzas/spinaci.jpg' price={10} />
    <Pizza name='Pizza Funghi' ingredients='Tomato, mushrooms' photoName='pizzas/funghi.jpg' price={12} /> */}
  </main>
}
function Pizza(props) {
  console.log(props);
  return (
    <li className='pizza'>
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name}></img>
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>);
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // hour >= openHour && hour <= closeHour ? alert("WE're currently open") : alert('Sorry we are closed.');

  return (

    <footer className='footer'>
      {isOpen ? (
        <div className='order'>
          <p>We're open untill {closeHour}:00. Come visit us or order online.</p>
          <button className='btn'>Order</button>
        </div>) : <p>Currently closed. We're happy to welcome you between {openHour}:00 and {closeHour}:00.</p>}
    </footer>)
  // return React.createElement('footer', null, 'we\'re currently working');
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// testerino