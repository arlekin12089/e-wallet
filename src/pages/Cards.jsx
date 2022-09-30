import { Link } from "react-router-dom";
import {cardSlice} from '../redux/cardSlice';
import Card from "../components/Card";
import { useSelector } from "react-redux";
const Cards = () => {
const {user}  = useSelector((state) => state.cardsInfo);
const {cards}  = useSelector((state) => state.cardsInfo);
	const limitCards = cards?.length > 3;
 const [isActiveCard] = cards?.filter(card => card.isActive);
 console.log(isActiveCard)
 if(!user) return <div>No user exists</div>

return (
	<div>
	<header id="header">
		<h1>E-Wallet</h1>
	</header>
	<main id="main">
		<h2 className="active-heading">Active card</h2>
		<Card card={isActiveCard} user={user}/>
		{cards.map((card, index)=>{
			if(!card.isActive){
			 return <div className="inactiveCard" key={index}><Card card={card} user={user}/></div>
			}
		})}
		<br/>
		<div className="homeAddcard">
			<Link to="/addcard">
        <button disabled={limitCards} className="btn">Add card</button>
      </Link>
      {limitCards && <p style={{fontStyle:"italic"}} className="error-text">You have reached the cards' limit. To add a new card, please delete the one.</p>}
		
		</div>

	</main>
	</div>
)
}

export default Cards;