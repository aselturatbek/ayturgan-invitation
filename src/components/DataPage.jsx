import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../firebase";

const ITEMS_PER_PAGE = 10;

function DataPage() {
  const [rsvps, setRsvps] = useState([]);
  const [wishes, setWishes] = useState([]);

  const [rsvpPage, setRsvpPage] = useState(1);
  const [wishPage, setWishPage] = useState(1);

  useEffect(() => {
    const rsvpsQuery = query(
      collection(db, "rsvps"),
      orderBy("createdAt", "desc")
    );

    const unsubscribeRsvp = onSnapshot(rsvpsQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRsvps(list);
    });

    const wishesQuery = query(
      collection(db, "wishes"),
      orderBy("createdAt", "desc")
    );

    const unsubscribeWish = onSnapshot(wishesQuery, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWishes(list);
    });

    return () => {
      unsubscribeRsvp();
      unsubscribeWish();
    };
  }, []);

  const stats = useMemo(() => {
    return {
      total: rsvps.length,
      coming: rsvps.filter((item) => item.attendance === "Келемин").length,
      couple: rsvps.filter((item) => item.attendance === "Жубум менен келемин")
        .length,
      notComing: rsvps.filter(
        (item) => item.attendance === "Өкүнүчкө жараша, катыша албайм"
      ).length,
    };
  }, [rsvps]);

  const rsvpTotalPages = Math.ceil(rsvps.length / ITEMS_PER_PAGE);
  const wishTotalPages = Math.ceil(wishes.length / ITEMS_PER_PAGE);

  const visibleRsvps = rsvps.slice(
    (rsvpPage - 1) * ITEMS_PER_PAGE,
    rsvpPage * ITEMS_PER_PAGE
  );

  const visibleWishes = wishes.slice(
    (wishPage - 1) * ITEMS_PER_PAGE,
    wishPage * ITEMS_PER_PAGE
  );

  return (
    <main className="dataPage">
      <section className="dataHeader">
        <p>Aiturgan Qyz Uzatuu</p>
      </section>

      <section className="dataStats">
        <div>
          <span>Жалпы</span>
          <strong>{stats.total}</strong>
        </div>

        <div>
          <span>Келемин</span>
          <strong>{stats.coming}</strong>
        </div>

        <div>
          <span>Жубум менен</span>
          <strong>{stats.couple}</strong>
        </div>

        <div>
          <span>Келбейт</span>
          <strong>{stats.notComing}</strong>
        </div>
      </section>

      <section className="dataBlock">
        <h2>Коноктор</h2>

        {visibleRsvps.map((item) => (
          <div className="simpleRow" key={item.id}>
            <strong>{item.name}</strong>
            <span>{item.attendance}</span>
          </div>
        ))}

        {rsvpTotalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={rsvpPage === 1}
              onClick={() => setRsvpPage((page) => page - 1)}
            >
              Артка
            </button>

            <p>
              {rsvpPage} / {rsvpTotalPages}
            </p>

            <button
              type="button"
              disabled={rsvpPage === rsvpTotalPages}
              onClick={() => setRsvpPage((page) => page + 1)}
            >
              Кийинки
            </button>
          </div>
        )}
      </section>

      <section className="dataBlock">
        <h2>Каалоолор</h2>

        {visibleWishes.map((wish) => (
          <div className="wishRow" key={wish.id}>
            <strong>{wish.name}</strong>
            <p>{wish.message}</p>
          </div>
        ))}

        {wishTotalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={wishPage === 1}
              onClick={() => setWishPage((page) => page - 1)}
            >
              Артка
            </button>

            <p>
              {wishPage} / {wishTotalPages}
            </p>

            <button
              type="button"
              disabled={wishPage === wishTotalPages}
              onClick={() => setWishPage((page) => page + 1)}
            >
              Кийинки
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default DataPage;