function CalendarSection() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <section className="calendarSection">
      <div className="calendarInner">
        <h2 className="calendarTitle">Июнь, 2026</h2>

        <div className="calendarGrid">
          <div className="weekDay">ДШ</div>
          <div className="weekDay">ШШ</div>
          <div className="weekDay">ШР</div>
          <div className="weekDay">БШ</div>
          <div className="weekDay">ЖМ</div>
          <div className="weekDay">ИШ</div>
          <div className="weekDay">ЖШ</div>

          {days.map((day) => (
            <div
              key={day}
              className={`day ${day === 16 ? "selectedDay" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>

        <p className="calendarTime">Саат: 17:00</p>
      </div>
    </section>
  );
}

export default CalendarSection;