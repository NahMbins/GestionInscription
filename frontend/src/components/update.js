import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/esm/Col';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { BsPencilSquare } from "react-icons/bs";
import { ExpressAxios } from './baseUrl';


const Update = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);toast.warn("Acunne modification a été faite");};
    const handleShow = () => setShow(true);


    const[nom, setnom]=useState(props.nom);
    const[prenom, setprenom]=useState(props.prenom);
    const[niveau, setniveau]=useState(props.niveau);
    const[email, setemail]=useState(props.email);
    const[tel, settel]=useState(props.tel);
    const[formation, setformation]=useState(props.formation);
    const[_id]=useState(props.id);


    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await ExpressAxios.put(`/inscrit/${_id}`,
        {
          nom: nom,
          prenom: prenom,
          niveau: niveau,
          email: email,
          tel: tel,
          formation: formation,
        }
        
      );
      
      if(response.status === 200){
        setShow(false);
        toast.success("Modifier avec succés"); 
      }
      else toast.error("Une erreu s'est introduite");

    }
    


  return (
    <>
    
    <button type="button" className="btn btn-outline-success btn-sm" onClick={handleShow}><BsPencilSquare></BsPencilSquare></button>


    <Modal show={show} onHide={handleClose}>
          
            <Modal.Header closeButton className='bg-primary text-bg-success'>
              <Modal.Title>Modification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <Form method="POST">
                        <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Nom:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Nom"
                            name="nom"
                            value={nom}
                            onChange={(event) => {setnom(event.target.value.toUpperCase())}}
                           
                            
                        />
                        <Form.Control.Feedback type="invalid">Please put your last name</Form.Control.Feedback>
                        
                        </Form.Group>
                        <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label>Prenom:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Prénom" 
                            name="prenom"  
                            value={prenom}
                            onChange={(event) => {setprenom(event.target.value)}}              
                            
                        />
                        <Form.Control.Feedback type="invalid">Please put your first name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}  controlId="validationCustomUsername">
                        <Form.Label>Niveau:</Form.Label>
                        <Form.Select aria-label="Niveau" name='niveau' value={niveau} onChange={(event) => {setniveau(event.target.value)}}>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                        </Form.Select>
                        </Form.Group>
                    
                        <Form.Group as={Col}  controlId="validationCustom03">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="email" name='email'  value={email} onChange={(event) => {setemail(event.target.value)}} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group as={Col}  controlId="validationCustom05">
                        <Form.Label>Télephonne:</Form.Label>
                        <Form.Control type="number" placeholder="Tel" name="tel" value={tel} onChange={(event) => {settel(event.target.value)}} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number.
                        </Form.Control.Feedback>
                        </Form.Group>
                    
                    
                        <Form.Group as={Col}  controlId="validationCustom06">
                        <Form.Label>Choisissez le formation que vous voulez suivre:</Form.Label>
                        <Form.Select aria-label="Formation disponible" name="formation" value={formation} onChange={(event) => {setformation(event.target.value)}}>
                            <option value="DevOps">DevOps</option>
                            <option value="Cyber-Security">Cyber-Security</option>
                            <option value="Machine learning">Machine learning</option>
                            <option value="Admin Linux">Admin Linux</option>
                        </Form.Select>
                        </Form.Group>

                    </Form>
           
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={handleSubmit}>
                Modifier
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Annuler
              </Button>
              
            </Modal.Footer>
            
        </Modal>

    </>
    
  );
};

export default Update;