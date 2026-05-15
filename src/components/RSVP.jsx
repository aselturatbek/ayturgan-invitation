import { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import main2 from "../assets/images/main2.jpeg";
import family from "../assets/images/family.jpeg";
import family2 from "../assets/images/family2.jpeg";
import momDaughter from "../assets/images/mom daughter.jpeg";

function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [sending, setSending] = useState(false);
  const photos = [main2, family, family2, momDaughter];

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !attendance) return;

    try {
      setSending(true);

      await addDoc(collection(db, "rsvps"), {
        name: name.trim(),
        attendance,
        createdAt: serverTimestamp(),
      });

      setName("");
      setAttendance("");

      alert("Жооп жөнөтүлдү 💌");
   } catch (error) {
  console.error("RSVP gönderilemedi:", error);
  alert(error.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="rsvpSection">
      <div className="rsvpInner">
        <h2 className="rsvpTitle">
          Тойго катышарыңызды
          <br />
          билдирүүңүздү суранабыз!
        </h2>

        <p className="rsvpDescription">
          Атыңызды жана, жубуңуз менен келсеңиз,
          <br />
          экөөңүздүн тең аттарыңызды кошуп жазыңыз
        </p>

        <form className="rsvpForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Атыңыз"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <div className="radioGroup">
            <label className="radioItem">
              <input
                type="radio"
                name="attendance"
                value="Келемин"
                checked={attendance === "Келемин"}
                onChange={(event) =>
                  setAttendance(event.target.value)
                }
              />

              <span>Келемин</span>
            </label>

            <label className="radioItem">
              <input
                type="radio"
                name="attendance"
                value="Жубум менен келемин"
                checked={attendance === "Жубум менен келемин"}
                onChange={(event) =>
                  setAttendance(event.target.value)
                }
              />

              <span>Жубум менен келемин</span>
            </label>

            <label className="radioItem">
              <input
                type="radio"
                name="attendance"
                value="Өкүнүчкө жараша, катыша албайм"
                checked={
                  attendance ===
                  "Өкүнүчкө жараша, катыша албайм"
                }
                onChange={(event) =>
                  setAttendance(event.target.value)
                }
              />

              <span>
                Өкүнүчкө жараша, катыша албайм
              </span>
            </label>
          </div>

          <button type="submit" disabled={sending}>
            {sending ? "Жөнөтүлүүдө..." : "Жиберүү"}
          </button>
        </form>
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

export default RSVP;