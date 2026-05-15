import main2 from "../assets/images/main2.jpeg";
import family from "../assets/images/family.jpeg";
import family2 from "../assets/images/family2.jpeg";
import momDaughter from "../assets/images/mom daughter.jpeg";

function Invitation() {
  const photos = [main2, family, family2, momDaughter];

  return (
    <section id="invitation" className="invitationSection">
      <div className="invitationInner">
        <h2 className="invitationTitle">
          Урматтуу <br />
          коноктор,
        </h2>

        <p className="invitationText">
          Сиздерди ажарлуу кызыбыз
          <br />
          <span>Айтургандын</span>
          <br />
          Кыз узатуу тоюна арналган салтанаттуу кечеге келип, ак дасторкондун
          үстүндө бата берип, кадырлуу конок болуп кетүүгө чакырабыз!
        </p>
      </div>

      <div className="invitationSlider" aria-label="Invitation photo slider">
        {photos.map((photo, index) => (
          <div className="invitationSlide" key={index}>
            <img src={photo} alt={`Aiturgan ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Invitation;