function Card(props) {
	function handleCardClick() {
		props.onCardClick(props.card);
	}
	return (
		<li className='element'>
			<img
				onClick={handleCardClick}
				src={props.card.link}
				alt={props.card.name}
				className='element__image'
			/>
			<h2 className='element__name'>{props.card.name}</h2>
			<div className='element__like-container'>
				<button type='button' className='button element__button-like'></button>
				<p className='element__like-count'>{props.card.likes.length}</p>
			</div>
			<button
				onClick={props.onDeletePlaceClick}
				type='button'
				className='button element__button-trash'
			></button>
		</li>
	);
}

export default Card;
