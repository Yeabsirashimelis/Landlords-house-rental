import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "How to Save on Rent",
    summary:
      "Learn the best tips for saving on rent and finding affordable housing options.",
    link: "https://www.example.com/how-to-save-on-rent",
  },
  {
    id: 2,
    title: "Understanding Your Lease Agreement",
    summary:
      "A comprehensive guide to understanding the key terms and clauses in your lease agreement.",
    link: "https://www.example.com/understanding-lease-agreement",
  },
  {
    id: 3,
    title: "Tips for First-Time Renters",
    summary: "Essential tips and advice for those renting for the first time.",
    link: "https://www.example.com/tips-for-first-time-renters",
  },
  {
    id: 4,
    title: "Managing Rental Payments",
    summary:
      "Discover effective ways to manage and keep track of your rental payments.",
    link: "https://www.example.com/managing-rental-payments",
  },
  {
    id: 5,
    title: "Dealing with Maintenance Issues",
    summary:
      "What to do when maintenance issues arise in your rental property.",
    link: "https://www.example.com/dealing-with-maintenance-issues",
  },
  // Add more articles here
];

function Articles() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <button onClick={() => navigate(-1)} className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        back
      </button>
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          OUR ARTICLES
        </h1>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {articles.map((article) => (
          <div key={article.id} className="mb-6 border-b border-gray-200 pb-4">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:underline text-gray-800"
            >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-700 mb-2">{article.summary}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
