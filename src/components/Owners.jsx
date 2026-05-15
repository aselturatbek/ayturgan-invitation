import momSon from "../assets/images/mom son.jpeg";

function Owners() {
  return (
    <section className="ownersSection">
      <div className="ownersInner">
        <h2 className="ownersTitle">Той ээлери:</h2>

        <p className="ownersNames">
          Алихан <span>&</span> Гулира
        </p>

        <div className="ownersImageWrap">
          <img
            src={momSon}
            alt="Toy ээлери"
            className="ownersImage"
          />
        </div>
      </div>
    </section>
  );
}

export default Owners;