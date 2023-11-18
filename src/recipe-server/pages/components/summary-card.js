const SummaryCard = ({ name, desc }) => {
  return (
    <div className="card">
      <img src="https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg"></img>
      <h1>{name}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default SummaryCard;
