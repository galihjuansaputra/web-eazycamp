function Home() {
    return (
        <>
            <div
                className="container vh-100">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-5 col-12 d-flex flex-column align-items-center">
                        <img
                            className="img-fluid"
                            style={{width: 500}}
                            src="/src/assets/screen_mockup.png" alt=""/>
                    </div>

                    <div className="col-lg-5 col-12 d-flex flex-column align-items-center ">
                        <div className="text-lg-start text-center">
                            <h1 style={{fontWeight:"500", marginLeft: -6,}} className="display-1">Eazy Camp</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores at consequuntur
                                nostrum odio pariatur quis ratione sint veniam voluptates? Consequuntur, maxime
                                recusandae? Ab ad dicta quia, quos sint veritatis.</p>
                            <div>
                                <img
                                    className="img-fluid"
                                    style={{width: 160}}
                                    src="/src/assets/app_store_badge.svg" alt=""/>
                                <img
                                    className="img-fluid"
                                    style={{width: 180}}
                                    src="/src/assets/play_store_badge.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;