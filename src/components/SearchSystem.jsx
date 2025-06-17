import SearchSystemItem from "./SearchSystemItem";

const SearchSystem = () => {
	// title, url, description, siteName
	const searchResults = [
		{
			title: "MDN Web Docs — Resources for Developers",
			url: "https://developer.mozilla.org/",
			description: "Comprehensive guides and references for HTML, CSS, JavaScript, and other web technologies by Mozilla.",
			siteName: "MDN Web Docs",
			logo: "https://images.seeklogo.com/logo-png/43/1/mdn-logo-png_seeklogo-431703.png" // public domain svg :contentReference[oaicite:2]{index=2}
		},
		{
			title: "W3Schools — Web Development Tutorials",
			url: "https://www.w3schools.com/",
			description: "Beginner-friendly tutorials on HTML, CSS, JavaScript, SQL, and more.",
			siteName: "W3Schools",
			logo: "https://images.seeklogo.com/logo-png/20/1/army-public-school-logo-png_seeklogo-201764.png" // public domain svg :contentReference[oaicite:3]{index=3}
		},
		{
			title: "CSS-Tricks — Tips, Tricks, and Techniques",
			url: "https://css-tricks.com/",
			description: "In-depth articles and examples on CSS, JavaScript, accessibility, layout, and frontend development.",
			siteName: "CSS-Tricks",
			logo: "https://images.seeklogo.com/logo-png/29/1/css-3-logo-png_seeklogo-297888.png"
		},
		{
			title: "Frontend Mentor — Improve Your Frontend Skills",
			url: "https://www.frontendmentor.io/",
			description: "Practice building responsive websites using real-world projects and challenges.",
			siteName: "Frontend Mentor",
			logo: "https://images.seeklogo.com/logo-png/22/1/ace-mentor-program-logo-png_seeklogo-223117.png"
		},
		{
			title: "Stack Overflow — Programming Q&A",
			url: "https://stackoverflow.com/",
			description: "The most active community for developers to ask and answer programming-related questions.",
			siteName: "Stack Overflow",
			logo: "https://images.seeklogo.com/logo-png/43/1/stack-overflow-logo-png_seeklogo-435294.png"
		},
		{
			title: "freeCodeCamp — Learn to Code for Free",
			url: "https://www.freecodecamp.org/",
			description: "Interactive coding lessons and certification paths in web development, data structures, and more.",
			siteName: "freeCodeCamp",
			logo: "https://images.seeklogo.com/logo-png/33/1/bitbucket-logo-png_seeklogo-338594.png"
		},
		{
			title: "CodePen — Social Development Environment",
			url: "https://codepen.io/",
			description: "Create, test, and share HTML, CSS, and JavaScript code snippets in an online playground.",
			siteName: "CodePen",
			logo: "https://images.seeklogo.com/logo-png/32/1/codepen-logo-png_seeklogo-328201.png"
		},
		{
			title: "Dev.to — Where Programmers Share Ideas",
			url: "https://dev.to/",
			description: "A community platform for sharing articles, projects, and discussions around programming.",
			siteName: "Dev.to",
			logo: "https://images.seeklogo.com/logo-png/47/1/dev-to-logo-png_seeklogo-474186.png"
		}
	];

	return (
		<div className="search">
			<div className="search-container">
				<h2 className="search-title title">Search results:</h2>
				<div className="search-results">
					{searchResults.map((site, index) => <SearchSystemItem key={index} {...site} />)}
				</div>
			</div>
		</div>
	)
}

export default SearchSystem