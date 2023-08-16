
import Accordion from 'react-bootstrap/Accordion';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import axios from 'axios';
import { toast } from 'react-toastify';
import Navigation from './nav';
import { ExpressAxios } from './baseUrl';

const Inscription = (e) => {


    const [nom, setnom] = useState("");
    const [prenom, setprenom] = useState("");
    const [niveau, setniveau] = useState("L1");
    const [email, setemail] = useState("");
    const [tel, settel] = useState(0);
    const [formation, setformation] = useState("DevOps");
    const [ref, setref] = useState(0);

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else setValidated(true);
        if (nom !== '' & prenom !== '' & tel !== 0 & ref !== 0 & email !== '') {
            try {

                const response = await ExpressAxios.post("/", {
                    nom: nom,
                    prenom: prenom,
                    niveau: niveau,
                    email: email,
                    tel: tel,
                    formation: formation,
                    ref: ref,
                });
                if (response.status === 200) {
                    // alert("Votre demande d'inscription est bien envoyé");
                    // window.location.reload();
                    toast.success("Demande d'inscription bien envoyée",{position:'top-center'})

                };
            }
            catch (error) { toast.error("Une erreur est survenu lors de l'enregistrement. Veuillez reverifier les informations!",{position:'top-center'});}

        };


    }
    return (
        <>
        <Navigation /> 
            <div className='container p-5'>
                <div>
                    <h1>FORMULAIRE D'INSCRIPTION</h1>
                </div>
                <div className="d-grid gap-2">
                <Accordion defaultActiveKey={['0','1']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='bg-info'>A LIRE ATTENTIVEMENT</Accordion.Header>
                        <Accordion.Body>
                            Veuiller bien verifier les informations avant de soumettre surtout le référence de paiement
                            par Mvola sur le numéro 0347285844.
                            Une fois les informations soumis, veuillez attendre la confirmation par mail. {''}
                            En cas de refus vous pouvez nous contacter et essayer de refaire l'inscription. <br></br>
                            Le refus peut être causé par une information non valide.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>FORMULAIRE</Accordion.Header>
                        <Accordion.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit} method="POST" name='f'>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label>Nom:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Nom"
                                            name="nom"
                                            onChange={(e) => { setnom(e.target.value.toUpperCase()) }}
                                        />
                                        <Form.Control.Feedback type="invalid">Please put your last name</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Prenom:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Prénom"
                                            name="prenom"
                                            onChange={(e) => { setprenom(e.target.value) }}

                                        />
                                        <Form.Control.Feedback type="invalid">Please put your first name</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                                        <Form.Label>Niveau:</Form.Label>
                                        <Form.Select aria-label="Niveau" name='niveau' onChange={(e) => { setniveau(e.target.value) }}>
                                            <option value="L1">L1</option>
                                            <option value="L2">L2</option>
                                            <option value="L3">L3</option>
                                            <option value="M1">M1</option>
                                            <option value="M2">M2</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" placeholder="email" name='email' onChange={(e) => { setemail(e.target.value) }} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                                        <Form.Label>Télephonne:</Form.Label>
                                        <Form.Control type="number" placeholder="Tel" name="tel" onChange={(e) => { settel(e.target.value) }} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                                        <Form.Label>Choisissez le formation que vous voulez suivre:</Form.Label>
                                        <Form.Select aria-label="Formation disponible" name="formation" onChange={(e) => { setformation(e.target.value) }}>
                                            <option value="DevOps">DevOps</option>
                                            <option value="Cyber-Security">Cyber-Security</option>
                                            <option value="Machine Learning">Machine learning</option>
                                            <option value="Admin Linux">Admin Linux</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom07">
                                        <Form.Label>Ref paiement Mvola(0347285844):</Form.Label>
                                        <Form.Control type="text" placeholder="234489" name="ref" onChange={(e) => { setref(e.target.value) }} required />

                                    </Form.Group>

                                </Row>

                            </Form>


                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </div>
                <div className='pt-2' >
                    <Button onClick={handleSubmit} type="submit">Soumettre</Button>
                </div>

            </div>

        </>
    )
}
export default Inscription;