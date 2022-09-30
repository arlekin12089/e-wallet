import { useDispatch } from "react-redux";
import { activateCard, deleteCard } from "../redux/cardSlice";
import contactless from "../assets/img/contactless.png";
import chip from "../assets/img/chip.png";
import visa from "../assets/img/visa-logo.png";
import mastercard from "../assets/img/mastercard-logo.png";
import americanexpress from "../assets/img/american-express-logo.png";

const Card = ({ card, user }) => {
  const dispatch = useDispatch();

  const handleDeleteCard = () => {
    dispatch(deleteCard(card));
  };

  const handleActivateCard = () => {
    dispatch(activateCard(card));
  };
  return (
    <section className="cardWrapper">
      <div className="card">
        <img src={contactless} className="contactlessImg" alt="contactless" />
		<div className="cardDetailsRight">
            <div>
              {card?.vendor === "Mastercard" ? (
                <img src={mastercard} alt={`${card?.vendor} logo`} className="vendor-logo" />
              ) : card?.vendor === "visa" ? (
                <img src={visa} alt={`${card?.vendor} logo`} className="vendor-logo" />
              ) : card?.vendor === "American Express" ? (
                <img src={americanexpress} alt={`${card?.vendor} logo`} className="vendor-logo" />
              ) : null}
            </div>
          </div>
		<img src={chip} className="chipImg" alt="chip" />
		
        <div className="cardNum">{card?.cardNumber}</div>
        <div className="cardDetails">
          <div className="cardDetailsLeft">
		              <div className="cardHolderWrap">
              <p className="cardHolderDesc">Cardholder Name</p>
              <p className="cardNameInfo">
                {" "}
                {user?.first} {user?.last}
              </p>
            </div>
            <div className="cardTopBlock">
              <p className="cardHolderDesc">Valid thru:</p>
              <div className="cardDates">
                {" "}
                {card?.month} / {card?.year}
              </div>
            </div>

          </div>

        </div>
      </div>
      {card.isActive === false && (
        <div className="cardsAction">
          <button className="deleteBtn btn" onClick={handleDeleteCard}>
            Delete button
          </button>
          <button className="activateBtn btn" onClick={handleActivateCard}>
            Activate card
          </button>
        </div>
      )}
    </section>
  );
};

export default Card;
