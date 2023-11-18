import Link from "next/link";

const Viewer = () => {
  return (
    <div>
      <div className="header">
        <Link className="button" href="/">
          Back
        </Link>
        <div className="filters">
          <button>recip 1</button>
          <button>bourrito</button>
          <button>rice</button>
          <button>bean</button>
        </div>
        <div></div>
      </div>
      <div id="viewer">
        <div id="ingredients">
          <div className="card">
            <h1>ingredients</h1>
            <ul>
              <li>1 egg</li>
              <li>3 Tbsp sugar</li>
              <li>salt pinch</li>
              <li>1/2 cup milk</li>
              <li>1/2 Tsp vanilla essence</li>
              <li>1/2 cup flour</li>
              <li>1 Tsp Baking powder</li>
            </ul>
          </div>
          <div className="card">
            <h1>Tools</h1>
            <ul>
              <li>1 egg</li>
              <li>3 Tbsp sugar</li>
              <li>salt pinch</li>
              <li>1/2 cup milk</li>
              <li>1/2 Tsp vanilla essence</li>
              <li>1/2 cup flour</li>
              <li>1 Tsp Baking powder</li>
            </ul>
          </div>
        </div>
        <div id="instructions">
          <div className="card">
            <h1>Instructions</h1>
            <ul>
              <li>1 egg</li>
              <li>3 Tbsp sugar</li>
              <li>salt pinch</li>
              <li>1/2 cup milk</li>
              <li>1/2 Tsp vanilla essence</li>
              <li>1/2 cup flour</li>
              <li>1 Tsp Baking powder</li>
              <li>1 egg</li>
              <li>3 Tbsp sugar</li>
              <li>salt pinch</li>
              <li>1/2 cup milk</li>
              <li>1/2 Tsp vanilla essence</li>
              <li>1/2 cup flour</li>
              <li>1 Tsp Baking powder</li>
              <li>1 egg</li>
              <li>3 Tbsp sugar</li>
              <li>salt pinch</li>
              <li>1/2 cup milk</li>
              <li>1/2 Tsp vanilla essence</li>
              <li>1/2 cup flour</li>
              <li>1 Tsp Baking powder</li>
              <li>1 egg</li>
              <li>3 Tbsp sugar</li>
              <li>salt pinch</li>
              <li>1/2 cup milk</li>
              <li>1/2 Tsp vanilla essence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
