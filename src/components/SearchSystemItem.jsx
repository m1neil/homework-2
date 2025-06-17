// title, url, description, siteName

const SearchSystemItem = ({ title, url, description, siteName, logo }) => {

	return (
		<div className="search-item item-search">
			<a href={url} target="_blank" className="item-search-top top-search">
				<div className="top-search-logo">
					<img src={logo} alt={siteName} />
				</div>
				<div className="top-search-body">
					<h3 className="top-search-title">{siteName}</h3>
					<div className="top-search-url">{url}</div>
				</div>
			</a>
			<h3 className="item-search-title title title-fz-18">
				<a href={url} target="_blank">{title}</a>
			</h3>
			<div className="item-search-text">{description.length > 120 ? `${description.substring(0, 121)}...` : description}</div>
		</div>
	)
}

export default SearchSystemItem