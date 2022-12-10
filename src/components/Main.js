import { Api } from "../utils/Api";
import { useState, useEffect } from "react";
import Card from "./Card";

function Main(props) {
	const [userName, setUserName] = useState("");
	const [userDescription, setUserDescription] = useState("");
	const [userAvatar, setUserAvatar] = useState("");
	const [cards, setCards] = useState([]);

	useEffect(() => {
		Promise.all([Api.getUserInformation(), Api.getInitialCards()])
			.then(([userInfo, cards]) => {
				if (userInfo) {
					setUserName(userInfo.name);
					setUserDescription(userInfo.about);
					setUserAvatar(userInfo.avatar);
				}

				cards && setCards(cards);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<main className='content'>
			<section className='profile'>
				<div className='profile__photo-container'>
					<button
						onClick={props.onEditAvatarClick}
						type='button'
						className='profile__edit-avatar-button'
					></button>
					<img src={userAvatar} alt='Аватар' className='profile__photo' />
				</div>
				<div className='profile__info'>
					<h1 className='profile__name'>{userName}</h1>
					<button
						onClick={props.onEditProfileClick}
						type='button'
						className='button profile__edit-button'
					></button>
					<p className='profile__description'>{userDescription}</p>
				</div>
				<button
					onClick={props.onAddPlaceClick}
					type='submit'
					className='button profile__add-button'
				></button>
			</section>

			<ul className='elements'>
				{cards.map((card) => (
					<Card
						card={card}
						onCardClick={props.onCardClick}
						onDeleteClick={props.onDeleteClick}
					/>
				))}
			</ul>
		</main>
	);
}

export default Main;
