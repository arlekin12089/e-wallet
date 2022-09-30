import { useDispatch,useSelector } from "react-redux";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {addCard} from "../redux/cardSlice";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const AddCard = () => {
 	//const {user, cards} = useSelector((state) => state.cardsInfo);

	const user = useSelector((state) => state.cardsInfo.user);
	const cards = useSelector((state) => state.cardsInfo.cards);


	const dispatch = useDispatch();
	const navigate = useNavigate();

const [cardInfo, setCard] = useState({
			cardNumber:'XXXX XXXX XXXX XXXX',
			vendor:'MasterCard',
			month: "MM",
			year:'YY',
			ccv: '',
			isActive: false
}
)
const handleChange = (e) => {
	setCard({...cardInfo, [e.target.id]: e.target.value})	
}

 const handleSubmit = (e) => {
    e.preventDefault();
	if(cards.length<=3){
	    dispatch(addCard(cardInfo));
		navigate("/");
	}else {
	 alert("Max limit");
	}
  };


  function splitNum (text, num){
    let splitString = []
    for(let i = 0; i < text.length; i+=num){
      splitString.push(text.substring(i, i+num))
    }
    return splitString.join(" ");
}


  const inputCardChangeHandler = (e) => {
    const propsName = e.target.name;
    let propsValue = e.target.value.split(" ").join("");
    const splitString = splitNum(propsValue, 4);
    e.target.value = splitString;
    setCard(propsName, propsValue);
  };


return(
<div>
<header id="header">
	<h1>Add a new card</h1>
	<h2>Bank card</h2>
</header>
<main id="main">
<h2 className="active-heading">New card</h2>
<div className="defaultCard"><Card card = {cardInfo} user={user}/></div>
<form onSubmit={handleSubmit} className="formWrap">
		<div className="form__field">
			<label htmlFor="cardNumber">Card number</label>
			<input 
				type="text"  
				id="cardNumber" 
				name="cardNumber"
				onChange={handleChange}
            	maxLength="19"
				placeholder="XXXX XXXX XXXX XXXX"
            	// pattern="[0-9]{19}"
				required
				onInput={inputCardChangeHandler}
			/>
		</div>
		<div className="form__field">
			<label htmlFor="cardName">Cardholder name</label>
			<input 
				disabled 
				type="text" 
				id="cardName" 
				value={`${user?.first} ${user?.last}`}
				readOnly
				/>
		</div>
		<div className="form__field">
			<label>Valid thru</label>
			<div className="cardTime">
				<input 
					type="text" 
					id="month" 
					value= {cardInfo.month} 
					onChange={handleChange}
					pattern="[0-9]{2}"
					placeholder="MM"
					maxLength="2"
					max="2"
					required
					/>
				<input 
					type="text" 
					id="year" 
					value= {cardInfo.year} 
					onChange={handleChange}
					pattern="[0-9]{2}"
					maxLength="2"
					placeholder="YY"
					required
				/>
			</div>
		</div>
		<div className="form__field">
			<label htmlFor="ccv">CCV</label>
			<input 
				type="text" 
				id="ccv" 
				value={cardInfo.ccv} 
				onChange={handleChange}
            	placeholder="000"
				pattern="[0-9]{3}"
				maxLength="3"
				required
			/>
		</div>
		<div className="form__field">
			<label htmlFor="vendor">Vendor</label>
			<select name="" id="vendor" value={cardInfo.vendor} onChange={handleChange}>
				<option value="Mastercard">Mastercard</option>
				<option value="Visa"> Visa </option>
            	<option value="American Express"> American Express </option>
			</select>
		</div>
		 <button className="btn">Add card</button>
		
	</form>

		<Link to="/">
			<p>Return to wallet</p>
		</Link>
</main>

</div>
	
)
}

export default AddCard;