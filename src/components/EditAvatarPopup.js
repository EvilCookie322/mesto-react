import PopupWithForm from "./PopupWithForm";
import { useRef, useState } from "react";

function EditAvatarPopup(props) {
	const avatar = useRef();
	const [isLoading, setIsLoading] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		props
			.onUpdateAvatar({ avatar: avatar.current.value })
			.then(() => setIsLoading(false));
		avatar.current.value = "";
	}

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='edit-avatar'
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			onClose={props.onClose}
		>
			<label className='form__field'>
				<input
					type='url'
					className='form__input'
					id='link-input-avatar'
					name='link'
					ref={avatar}
					placeholder='Ссылка на картинку'
					required
				/>
				<span className='form__error link-input-avatar-error'></span>
			</label>
			<button type='submit' className='button form__submit-button'>
				{isLoading ? "Сохранение..." : "Сохранить"}
			</button>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
