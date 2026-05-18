import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
  const wishesQuery = query(
    collection(db, "wishes"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(wishesQuery, (snapshot) => {
    const wishList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setWishes(wishList);
  });

  return () => unsubscribe();
}, []);

 async function handleSubmit(event) {
  event.preventDefault();

  if (!name.trim() || !message.trim()) return;

  try {
    setSending(true);

    await addDoc(collection(db, "wishes"), {
      name: name.trim(),
      message: message.trim(),
      createdAt: serverTimestamp(),
    });

    setName("");
    setMessage("");
  } catch (error) {
    console.error("Wish kaydedilemedi:", error);
    alert("Dilek kaydedilemedi. Firebase rules kontrol et.");
  } finally {
    setSending(false);
  }
}

  return (
    <section className="wishesSection">
      <h2 className="wishesTitle">Каалоолор</h2>

      <div className="wishesSlider">
        {wishes.map((wish) => (
          <article className="wishCard" key={wish.id}>
            <h3>{wish.name}</h3>
            <span>
              {wish.createdAt?.toDate
                ? wish.createdAt.toDate().toLocaleDateString("ru-RU")
                : "Жаңы"}
            </span>
            <p>{wish.message}</p>
          </article>
        ))}
      </div>

      <form className="wishForm" onSubmit={handleSubmit}>
        <h3>Каалоонузду калтырыныз</h3>

        <input
          type="text"
          placeholder="Атыңыз"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <textarea
          placeholder="Каалооңузду жазыңыз..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <button type="submit" disabled={sending}>
          {sending ? "Жөнөтүлүүдө..." : "Жөнөтүү"}
        </button>
      </form>
    </section>
  );
}

export default Wishes;