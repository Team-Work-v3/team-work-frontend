export default function MainPage() {
    return (
        <main className="main">
            <section className="greeting">
                <div className="wrapper">
                    <img src="./iteen.png" alt="iteen" className="greeting-iteen"/>
                    <div className="greeting-texts">
                        <span className="unbounded-bold greeting-heading">Мероприятия<br />от IT-Academy</span>
                        <span className="unbounded-regular greeting-text">список мероприятий</span>
                    </div>
                </div>
            </section>
        </main>
    );
}