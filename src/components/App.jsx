import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
	const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
	const [isAddplaceOpen, setIsAddPlaceOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState("");

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleCloseImagePreview() {
		setSelectedCard("");
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
	}

	function handleAddPlaceClick() {
		setIsAddPlaceOpen(true);
	}

	function handleDeletePlaceClick() {
		setIsConfirmDeleteOpen(true);
	}

	return (
		<>
			<div className='page__container'>
				<Header />
				<Main
					onEditProfileClick={handleEditProfileClick}
					onEditAvatarClick={handleEditAvatarClick}
					onAddPlaceClick={handleAddPlaceClick}
					onDeletePlaceClick={handleDeletePlaceClick}
					onCardClick={handleCardClick}
					onDeleteClick={handleDeletePlaceClick}
				/>
				<Footer />
			</div>

			<PopupWithForm
				title='Редактировать профиль'
				name='edit-profile'
				isOpen={isEditProfileOpen}
				onClose={closeAllPopups}
				children={
					<>
						<label className='form__field'>
							<input
								type='text'
								className='form__input'
								id='name-input'
								name='name'
								defaultValue={"Жак-Ив Кусто"}
								minLength='2'
								maxLength='40'
								required
							/>
							<span className='form__error name-input-error'></span>
						</label>
						<label className='form__field'>
							<input
								type='text'
								className='form__input'
								id='description-input'
								name='description'
								defaultValue={"Исследователь океана"}
								minLength='2'
								maxLength='200'
								required
							/>
							<span className='form__error description-input-error'></span>
						</label>
						<button type='submit' className='button form__submit-button'>
							Сохранить
						</button>
					</>
				}
			/>

			<PopupWithForm
				title='Обновить аватар'
				name='edit-avatar'
				isOpen={isEditAvatarOpen}
				onClose={closeAllPopups}
				children={
					<>
						<label className='form__field'>
							<input
								type='url'
								className='form__input'
								id='link-input-avatar'
								name='link'
								placeholder='Ссылка на картинку'
								required
							/>
							<span className='form__error link-input-avatar-error'></span>
						</label>
						<button type='submit' className='button form__submit-button'>
							Сохранить
						</button>
					</>
				}
			/>

			<PopupWithForm
				title='Новое место'
				name='add-card'
				isOpen={isAddplaceOpen}
				onClose={closeAllPopups}
				children={
					<>
						<label className='form__field'>
							<input
								type='text'
								className='form__input'
								id='place-name-input'
								name='name'
								placeholder='Название'
								minLength='2'
								maxLength='30'
								required
							/>
							<span className='form__error place-name-input-error'></span>
						</label>
						<label className='form__field'>
							<input
								type='url'
								className='form__input'
								id='link-input'
								name='link'
								placeholder='Ссылка на картинку'
								required
							/>
							<span className='form__error link-input-error'></span>
						</label>
						<button type='submit' className='button form__submit-button'>
							Создать
						</button>
					</>
				}
			/>

			<PopupWithForm
				title='Вы уверены?'
				name='confirm-delete'
				isOpen={isConfirmDeleteOpen}
				onClose={closeAllPopups}
				children={
					<button type='submit' className='button form__confirm-button'>
						Да
					</button>
				}
			/>

			<ImagePopup onClose={handleCloseImagePreview} card={selectedCard} />
		</>
	);
}

export default App;
