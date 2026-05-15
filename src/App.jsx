import "./App.css";

import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import CalendarSection from "./components/CalendarSection";
import Venue from "./components/Venue";
import Owners from "./components/Owners";
import Countdown from "./components/Countdown";
import Wishes from "./components/Wishes";
import RSVP from "./components/RSVP";

function App() {
  return (
    <main>
      <Hero />
      <Invitation />
      <CalendarSection />
      <Venue />
      <Owners />
      <Countdown />
      <Wishes />
      <RSVP />
    </main>
  );
}

export default App;