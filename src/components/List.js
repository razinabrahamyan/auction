import React, {useEffect, useState} from "react"
import Table from 'react-bootstrap/Table';
import {Card, Container} from "react-bootstrap"
import moment from "moment/moment";

export default function List() {
    const [data, setData] = useState([]);

    async function getItems() {
        const response = await JSON.parse(localStorage.getItem('items'));
        setData(response);
    }

    function removeItem(id) {
        let items = data;

        const index = items.findIndex(item => item.id == id);

        if (index > -1) {
            items.splice(index, 1);
        }

        localStorage.setItem("items", JSON.stringify(items));
        getItems()
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <>
            <Container>
                <nav className="w-100 navbar navbar-light bg-light">
                    <div className="navbar-brand">Current Auctions</div>
                    <div className="form-inline">
                        <div>Hi Dilan!</div>
                        <div className={'ml-3'}><a href={'#'}>Logout</a></div>
                    </div>
                </nav>
                <Container className={"mt-5"}>
                    <Card>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Top Bid</th>
                                <th>Description</th>
                                <th>Time Remaining</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(data)
                                ? data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.bid}</td>
                                        <td>{item.description}</td>
                                        <td>{moment(item.startDate).format("DD-MM-YYYY h:mm:ss")}</td>
                                        <td>
                                            <a href={"/show/" + item.id} type="button"
                                               className="btn btn-primary mr-1">View</a>
                                            <button type="button" className="btn btn-danger"
                                                    onClick={() => {
                                                        removeItem(item.id)
                                                    }}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                }) : <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>No data to show add item!</td>
                                    <td></td>
                                    <td></td>
                                </tr>}
                            </tbody>
                        </Table>
                        <div className={'row'}>
                            <div className={'col-12 text-center mt-5 mb-4'}>
                                <a href="/add" className="btn btn-success">New Auction</a>
                            </div>
                        </div>
                    </Card>
                </Container>
            </Container>
        </>
    )
}
