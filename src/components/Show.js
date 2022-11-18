import React, {useEffect, useState} from "react"
import {Container, Row, Col, Card} from "react-bootstrap"
import {useHistory, useParams} from 'react-router-dom';
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

export default function List() {
    const params = useParams();
    const history = useHistory()

    const [data, setData] = useState([]);
    const [item, setItem] = useState({});
    const [bid, setBid] = useState();

    async function getItem() {
        const items = await JSON.parse(localStorage.getItem('items'));
        setData(items);

        items.find(item => {
            if (item.id == params.id) {
                setItem(item);
            }
        });

    }

    function handleBit(e) {
        e.preventDefault()
        if (bid>0){
            item.bid = bid;
            const index = data.findIndex(item => item.id == params.id);
            if (index > -1) {
                data.splice(index, 1);
                localStorage.setItem("items", JSON.stringify([...data, item]));
            }
        }
        history.push("/");
    }

    useEffect(() => {
        getItem();
    }, []);

    return (
        <>
            <Container className="" style={{minHeight: "100vh"}}>
                <nav className="w-100 navbar navbar-light bg-light">
                    <div className="d-flex align-items-center">
                        <div className="navbar-brand">Artist`s Hat</div>
                        <div className="ml-2">
                            Created by: <span>{item.username}</span>
                        </div>
                    </div>
                    <div className="form-inline">
                        <div>Hi Dilan!</div>
                        <div className={'ml-3'}><a href={'/'}>Home</a></div>
                        <div className={'ml-3'}><a href={'#'}>Logout</a></div>
                    </div>
                </nav>
                <Container className={"mt-5"}>
                    <Card>
                        <Card.Body>
                            <div className="p-2">
                                <h5>Time Remaining: {moment(item.startDate).format("DD-MM-YYYY h:mm:ss")}</h5>
                            </div>
                            <div>
                                <p className="font-weight-bold p-2 pt-3 w-75">
                                    {item.description}
                                </p>
                            </div>
                            <Row className="p-2">
                                <Col md={6}>
                                    <div>
                                        <h5>Current Highest Bid</h5>
                                    </div>
                                    <div>
                                        <h4>$ {item.bid}</h4>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <h4>{item.name}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='offset-md-6' md={6}>
                                    <form>
                                        <div className="form-group">
                                            <input type="number"
                                                   placeholder="your bid goes here"
                                                   className="form-control"
                                                   onChange={(e) => {
                                                       setBid(e.target.value)
                                                   }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" onClick={handleBit}>Bid!!</button>
                                        </div>
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </>
    )
}
