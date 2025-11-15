import type IEvent from "../models/event.interface";
import Card from "../components/Card";

export default function MainPage() {
    const data: IEvent = {
        name: "123",
        date: "01.01.2025",
        time: "01:01",
        registration: true,
        price: 100
    }

    return (
        <main className="main">
            <section className="greeting">
                <div className="wrapper">
                    <img src="./iteen.png" alt="iteen" className="greeting-iteen" />
                    <div className="greeting-texts">
                        <span className="unbounded-bold greeting-heading">Мероприятия<br />от IT-Academy</span>
                        <span className="unbounded-regular greeting-text">список мероприятий</span>
                    </div>
                </div>
            </section>
            <section className="main-head-name">
                <div className="main-text">
                    <p className="main-text-event unbounded-bold">Мероприятия</p>
                    <div className="search-block">
                        <div className="fix-div">
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                viewBox="0 0 17 17" fill="none">
                                <path
                                    d="M16 16L11 11M1 6.83333C1 7.59938 1.15088 8.35792 1.44404 9.06565C1.73719 9.77339 2.16687 10.4164 2.70854 10.9581C3.25022 11.4998 3.89328 11.9295 4.60101 12.2226C5.30875 12.5158 6.06729 12.6667 6.83333 12.6667C7.59938 12.6667 8.35792 12.5158 9.06565 12.2226C9.77339 11.9295 10.4164 11.4998 10.9581 10.9581C11.4998 10.4164 11.9295 9.77339 12.2226 9.06565C12.5158 8.35792 12.6667 7.59938 12.6667 6.83333C12.6667 6.06729 12.5158 5.30875 12.2226 4.60101C11.9295 3.89328 11.4998 3.25022 10.9581 2.70854C10.4164 2.16687 9.77339 1.73719 9.06565 1.44404C8.35792 1.15088 7.59938 1 6.83333 1C6.06729 1 5.30875 1.15088 4.60101 1.44404C3.89328 1.73719 3.25022 2.16687 2.70854 2.70854C2.16687 3.25022 1.73719 3.89328 1.44404 4.60101C1.15088 5.30875 1 6.06729 1 6.83333Z"
                                    stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input type="text" id="search" className="search unbounded-light" placeholder="Поиск" />
                        </div>
                    </div>
                </div>
                <div className="buttons-block">
                    <div className="fix-div">
                        <button className="main-filter unbounded-regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M1 1H14.3333V2.81C14.3332 3.25199 14.1576 3.67585 13.845 3.98833L10.1667 7.66667V13.5L5.16667 15.1667V8.08333L1.43333 3.97667C1.15454 3.66994 1.00004 3.27033 1 2.85583V1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Фильтр
                        </button>
                    </div>
                    <button className="main-sorting unbounded-regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M3.49992 16L3.49992 1M3.49992 16L0.999918 13.5M3.49992 16L5.99992 13.5M9.33325 3.5L11.8333 1M11.8333 1L14.3333 3.5M11.8333 1L11.8333 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Сортировка
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                            <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>
            <section className="main-events">
                <Card data={data} />
            </section>
        </main >
    );
}