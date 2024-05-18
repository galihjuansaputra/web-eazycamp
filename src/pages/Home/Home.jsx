import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="container vh-100">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-lg-5 col-12 my-4 d-flex flex-column align-items-center">
                        <img
                            onClick={()=> {
                                navigate('/login')
                            }}
                            className="cursor-pointer img-fluid"
                            style={{width: 300}}
                            src="/src/assets/screen_mockup.svg" alt=""/>
                    </div>

                    <div className="col-lg-5 col-12 d-flex flex-column align-items-center ">
                        <div className="text-lg-start text-center">
                            <h1 style={{fontWeight: "500", marginLeft: -6,}} className="display-1">Eazy Camp</h1>
                            <p>your premier destination for top-quality hiking equipment rentals. Whether you're an
                                experienced hiker or a first-time adventurer, we offer a wide range of gear to suit all
                                your needs. From sturdy backpacks and reliable tents to durable trekking poles and
                                comfortable hiking boots, our equipment ensures you can explore the great outdoors with
                                confidence. </p>
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