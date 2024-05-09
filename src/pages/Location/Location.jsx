import {useState} from "react";
import {IconArrowDown} from "@tabler/icons-react";

function Location() {

    return (
        <>
            <h1 className="my-4">Location</h1>
            <hr/>

            <div className="accordion accordion-flush mb-3" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed p-0 m-0" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false"
                                aria-controls="flush-collapseOne">
                            <table className="table table-hover mb-0">
                                <tbody>
                                <tr className="cursor-pointer">
                                    <th scope="row">1</th>
                                    <td>Enigma Camp</td>
                                    <td>Jl Topaz No.7 Malang</td>
                                </tr>
                                </tbody>
                            </table>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse"
                         data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to
                            demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion
                            body.
                        </div>
                    </div>
                </div>

            </div>


            <table className="table table-dark table-striped align-middle">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Location Name</th>
                    <th scope="col">Address</th>
                    <td></td>
                </tr>
                </thead>

                <tbody>
                <tr className="cursor-pointer">
                    <th scope="row">1</th>
                    <td>Enigma Camp</td>
                    <td>Jl Topaz No.7 Malang</td>
                    <td>
                        <button className="btn btn-sm btn-primary text-white" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Detail
                        </button>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td colSpan="4" className="m-0 p-0">

                        <div className="collapse" id="collapseExample">

                            <div className="container-fluid my-3">
                                Some placeholder content for the collapse component. This panel is hidden by default but
                                revealed when the user activates the relevant trigger.
                            </div>
                        </div>

                    </td>
                </tr>
                </tbody>
            </table>


        </>
    );
}

export default Location;