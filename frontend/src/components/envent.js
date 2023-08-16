import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsXCircle,BsPlus} from "react-icons/bs";
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { ExpressAxios } from './baseUrl';
import Navigation from './nav';
import Modal from 'react-bootstrap/Modal';


const Event = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([]);
    const [title, settitle] = useState([]);
    const [color, setcolor] = useState([]);
    const [start, setstart] = useState(new Date());
    const [end, setend] = useState(new Date());

    useEffect(() => {
        getEvent();
    });


    const getEvent = async () => {

        const response = await ExpressAxios.get("/findEvent");
        if (response.status === 200) {
            setData(response.data);
        }
    }

    const handleSubmit = async () => {

        if (title !== '' & start !== '' & end !== '') {
            try {

                const response = await ExpressAxios.post("/createEvent", {
                    title: title,
                    start: start,
                    end: end,
                    color: color,

                });
                if (response.status === 200) {
                   
                    toast.success("Evenement crée")

                };
            }
            catch (error) { toast.error("Une erreur est survenu lors de l'enregistrement") }

        };

    }
    const onDeleteEtudiant = async (_id) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure to delete?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const response = await ExpressAxios.delete(`/deleteEvent/${_id}`);
                        if (response.status === 200) {
                            toast.success("Evenement supprimer");

                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { toast.warn("Action annulée"); }
                }
            ]
        });

    };

    return (
        <>
            <Navigation />
            <div className='container'>
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton className=''>
                        <Modal.Title>Créer évènement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit} method="POST" >
                            
                                <Form.Group  md="6">
                                    <Form.Label>Type:</Form.Label>
                                    <Form.Select aria-label="Formation disponible" name="formation" onChange={(event) => { setcolor(event.target.value) }} style={{ width: "300px", paddingTop: '2px' }}>
                                        <option value="green">Cours</option>
                                        <option value="DevOps">Meeting</option>
                                        <option value="purple">Conférence</option>
                                        <option value="red">Examen</option>
                                        <option value="grey">Autre</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group md="6" controlId="validationCustom01">
                                    <Form.Label>Titre evenement:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Cours"
                                        name="title"
                                        onChange={(e) => { settitle(e.target.value) }}
                                    />
                                </Form.Group>
                            
                            
                            <Row className="mt-2">

                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>Début:</Form.Label>

                                    <Form.Control
                                        required
                                        type="datetime-local"
                                        name="time_start"
                                        onChange={(e) => { setstart(e.target.value) }}
                                    />

                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>fin:</Form.Label>
                                    <Form.Control
                                        required
                                        type="datetime-local"
                                        name="end"
                                        onChange={(e) => { setend(e.target.value) }}

                                    />

                                </Form.Group>

                            </Row>
                            
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-primary btn-lg" onClick={handleSubmit}>
                            Ajouter
                        </Button>
                    </Modal.Footer>

                </Modal>

                <div className='p-2 text-center' >
                    <Button onClick={handleShow} variant="outline-primary" type="submit" size='sm'><BsPlus></BsPlus>créer</Button>
                </div>

                <Table responsive="sm" className='shadow table table-striped table'>
                    <thead className=''>
                        <tr>
                            <th>Nom event</th>
                            <th>début</th>
                            <th>fin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data
                                .map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.title}</td>
                                            <td>{item.start}</td>
                                            <td>{item.end}</td>


                                            <td>


                                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDeleteEtudiant(item._id)}><BsXCircle></BsXCircle></button>

                                            </td>

                                        </tr>
                                    );
                                })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Event