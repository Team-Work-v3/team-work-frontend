import type ICard from "../models/card.interface";

export default function Card({ data }: ICard) {
    return (
        <article className="event-item">
            <div className="event-left">
                <div className="event-left-up">
                    <h3 className="event-name unbounded-bold">{data.name}</h3>
                    <p className="special unbounded-regular">{data.date}</p>
                    <p className="special unbounded-regular">{data.time}</p>
                    <p className="special unbounded-regular">{data.registration === true ? "Идет регистрация" : "Закрыто"}</p>
                </div>
                <div className="event-left-down">
                    <h4 className="event-cost unbounded-regular">{data.price} BYN</h4>
                    <button className="event-btn unbounded-regular">Записаться</button>
                </div>
            </div>
            <div className="event-img">
                <img src="./test.jpg" alt="" srcSet="" className="event-img-img" min-width="236px" height="236px" />
            </div>
        </article>
    );
}