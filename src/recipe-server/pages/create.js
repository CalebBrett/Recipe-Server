import Link from "next/link";

const Create = () => {
  return (
    <div>
      <div className="header">
        <Link className="button" href="/">
          Back
        </Link>
        <h1>New/Edit</h1>
        <div></div>
      </div>
      <div id="create">
        <div className="card">
          <h1>Creating new recipe</h1>
          <h1>Editing _____ recipe</h1>
          {/* <form action="/action_page.php"> */}
          <form>
            <label for="name">Name:</label>
            <input type="text" name="name" />
            <br />
            <label for="portion size">Portion size:</label>
            <input type="text" name="portion size" />
            <br />
            <br />
            <label for="ingredients">Ingredients:</label>
            <input type="text" name="ingredients" />
            <br />
            <br />
            <label for="instructions">Instructions:</label>
            <input type="text" name="instructions" />
            <br />
            <br />
            <label for="tools">Tools:</label>
            <input type="text" name="tools" />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
