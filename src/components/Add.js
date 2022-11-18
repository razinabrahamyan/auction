import React, {useEffect, useState} from "react"
import DatePicker from "react-datepicker";
import {Container, Row, Col, Card} from "react-bootstrap"

import {useHistory} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

export default function List() {
    const history = useHistory()
    const [startDate, setStartDate] = useState(new Date());
    const [values, setValue] = React.useState({});
    const [items, setItems] = React.useState([]);

    const submitForm = (event) => {
        event.preventDefault()
        const data = {
            id: Date.now(),
            name: event.target.name.value,
            username: event.target.username.value,
            bid: event.target.bid.value,
            description: event.target.description.value,
            startDate: startDate,
        }

        localStorage.setItem("items", JSON.stringify([...items, data]));

        history.push("/");
    };

    useEffect(() => {
        async function getItems() {
            const response = await JSON.parse(localStorage.getItem('items')) ?? '';
            setItems(response);
        }

        getItems();
    }, []);

    return (
        <>
            <Container>
                <nav className="w-100 navbar navbar-light bg-light">
                    <div className="navbar-brand">New Auction</div>
                    <div className="form-inline">
                        <div>Hi Dilan!</div>
                        <div className={'ml-3'}><a href={'/'}>Home</a></div>
                        <div className={'ml-3'}><a href={'#'}>Logout</a></div>
                    </div>
                </nav>
                <Container className={"mt-5"}>
                    <Card>
                        <Card.Body>
                            <form method="post" onSubmit={submitForm} id="add">
                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="name">Product Name</label>
                                            <input
                                                type="text"
                                                id='name'
                                                name='name'
                                                className="form-control"
                                                onChange={(e) => {
                                                    setValue({[e.target.name]: e.target.value})
                                                }}
                                                value={values?.name}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="name">Username</label>
                                            <input
                                                type="text"
                                                id='username'
                                                name='username'
                                                className="form-control"
                                                onChange={(e) => {
                                                    setValue({[e.target.name]: e.target.value})
                                                }}
                                                value={values?.username}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="name">Starting Bid</label>
                                            <input
                                                type="number"
                                                id='bid'
                                                name='bid'
                                                className="form-control"
                                                onChange={(e) => {
                                                    setValue({[e.target.name]: e.target.value})
                                                }}
                                                value={values?.bid}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="name">Description</label>
                                            <textarea
                                                id='description'
                                                name='description'
                                                className="form-control"
                                                onChange={(e) => {
                                                    setValue({[e.target.name]: e.target.value})
                                                }}
                                                value={values?.description}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="name">End Date</label>
                                            <DatePicker selected={startDate}
                                                        onChange={(date) => setStartDate(date)}> </DatePicker>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={'row'}>
                                    <div className={'col-12 text-center'}>
                                        <button className="btn btn-success" type="submit">Add Auction</button>
                                    </div>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </>
    )
}
