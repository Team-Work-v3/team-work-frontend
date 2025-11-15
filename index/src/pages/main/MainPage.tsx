// import ICard from "../../models/event.interface";

export default function MainPage() {
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
        </main>
    );
}

// function Card(data: ICard) {
//     return (
//         <article className="event-item">
//             <div className="event-left">
//                 <div className="event-left-up">
//                     <h3 className="event-name">{data.name}</h3>
//                     <p className="special">{data.date}</p>
//                     <p className="special">{data.time}</p>
//                     <p className="special">{data.registration === true ? "Идет регистрация" : "Закрыто"}</p>
//                 </div>
//                 <div className="event-left-down">
//                     <h4 className="event-cost">{data.price}</h4>
//                     <button className="event-btn">Записаться</button>

//                 </div>
//             </div>
//             <div className="event-img">
//                 <img src="src/img/test.jpg" alt="" srcSet="" className="event-img-img" min-width="236px" height="236px" />
//             </div>
//         </article>
//     );
// }