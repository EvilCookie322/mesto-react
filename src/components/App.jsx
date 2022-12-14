import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { Api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
	const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
	const [isAddplaceOpen, setIsAddPlaceOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	//Получение информации о пользователе
	useEffect(() => {
		Api.getUserInformation()
			.then((userInformation) => {
				if (userInformation) setCurrentUser(userInformation);
				else return Promise.reject(new Error("Sorry, we have problems"));
			})
			.catch((error) => console.error(error));
	}, []);
	//Получение карточек
	useEffect(() => {
		Api.getInitialCards()
			.then((cards) => {
				if (cards) setCards(cards);
				else return Promise.reject(new Error("Sorry, we have problems"));
			})
			.catch((error) => console.error(error));
	}, []);

	function handleCardLike(card, isLiked) {
		(isLiked ? Api.removeLike(card._id) : Api.setLike(card._id))
			.then((newCard) => {
				if (newCard)
					setCards((cards) =>
						cards.map((card) => (card._id === newCard._id ? newCard : card))
					);
				else return Promise.reject(new Error("Sorry, we have problems"));
			})
			.catch((error) => console.error(error));
	}

	function handleCardDelete(card, isOwn) {
		if (isOwn) {
			Api.deleteCard(card._id)
				.then((answer) => {
					if (answer)
						setCards((cards) => cards.filter((item) => item._id !== card._id));
					else return Promise.reject(new Error("Sorry, we have problems"));
				})
				.catch((error) => console.error(error));
		}
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleEditProfileClick() {
		setIsEditProfileOpen(true);
	}
	function handleEditAvatarClick() {
		setIsEditAvatarOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfileOpen(false);
		setIsEditAvatarOpen(false);
		setIsAddPlaceOpen(false);
		setIsConfirmDeleteOpen(false);
		setSelectedCard(null);
	}

	function handleAddPlaceClick() {
		setIsAddPlaceOpen(true);
	}

	function handleUpdateUser({ name, description }) {
		return Api.updateUserInformation(name, description)
			.then((userInformation) => {
				if (userInformation) {
					setCurrentUser(userInformation);
					closeAllPopups();
				} else {
					return Promise.reject(new Error("Sorry, we have problems"));
				}
			})
			.catch((error) => console.error(error));
	}

	function handleUpdateAvatar({ avatar }) {
		return Api.updateAvatar(avatar)
			.then((userInformation) => {
				if (userInformation) {
					setCurrentUser(userInformation);
					closeAllPopups();
				} else {
					return Promise.reject(new Error("Sorry, we have problems"));
				}
			})
			.catch((error) => console.error(error));
	}

	function handleAddPlace(placeInfo) {
		return Api.createCard(placeInfo)
			.then((newCard) => {
				if (newCard) {
					setCards([newCard, ...cards]);
					closeAllPopups();
				} else {
					return Promise.reject(new Error("Sorry, we have problems"));
				}
			})
			.catch((error) => console.error(error));
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page__container'>
				<Header />
				<Main
					onEditProfileClick={handleEditProfileClick}
					onEditAvatarClick={handleEditAvatarClick}
					onAddPlaceClick={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer />
			</div>

			<EditProfilePopup
				isOpen={isEditProfileOpen}
				onUpdateUser={handleUpdateUser}
				onClose={closeAllPopups}
			/>

			<EditAvatarPopup
				isOpen={isEditAvatarOpen}
				onUpdateAvatar={handleUpdateAvatar}
				onClose={closeAllPopups}
			/>

			<AddPlacePopup
				isOpen={isAddplaceOpen}
				onAddPlace={handleAddPlace}
				onClose={closeAllPopups}
			/>

			<PopupWithForm
				title='Вы уверены?'
				name='confirm-delete'
				isOpen={isConfirmDeleteOpen}
				onClose={closeAllPopups}
			>
				<button type='submit' className='button form__confirm-button'>
					Да
				</button>
			</PopupWithForm>

			<ImagePopup onClose={closeAllPopups} card={selectedCard} />
		</CurrentUserContext.Provider>
	);
}

export default App;
