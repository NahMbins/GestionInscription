
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect, useRef } from 'react';
// import axios from "axios";
import { Link } from 'react-router-dom';
import Update from './update';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Navigation from './nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ExpressAxios } from './baseUrl';


const Inscrit = () => {
    const TableInscrit = useRef(null);
    // afficher inscrit
    const [data, setData] = useState([]);
    const [search, setsearch] = useState([]);
    const [nombreNonInscrit, setnombreNonInscrit] = useState([])
    const [formation, setformation] = useState('');
    const [niveau, setniveau] = useState('');
    

    useEffect(() => {
        getEtudiant();
        getnombreNonInscrit();
    });

    const getEtudiant =  async () => {

        const response = await ExpressAxios.get("/inscrit");
        if (response.status === 200) {
            setData(response.data);
        }

    }

   
    const getnombreNonInscrit = async () => {
        const response = await ExpressAxios.get("/nombreNonInscrit");
        if (response.status === 200) {
            setnombreNonInscrit(response.data);
        }
    };

    // delete inscrit 

    const onDeleteEtudiant = async (_id) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure to delete?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const response = await ExpressAxios.delete(`/${_id}`);
                        if (response.status === 200) {
                            toast.success("Etudiant supprimer");
                            
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


    const navigate = useNavigate()
    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    

    return (
        <>
        <Navigation /> 
            <div className='container pt-3'>
                   
                <div className='pb-3 d-inline btn-group me-2 float-end' role="group">
                    <Link className='btn btn-outline-primary btn-sm ' to={'/event'}>GérerEvenement</Link>  
                    <Link className='btn btn-primary btn-sm ' to={'/inscrit/chart'}>Statistiques</Link>
                    <Link className='btn btn-primary btn-sm ' to={'/liste'}>
                        Liste non inscrit
                        <span className="position-absolute top-0 start-40 translate-middle badge rounded-pill bg-danger">
                            {nombreNonInscrit}
                        </span>

                    </Link>
                    <button type="button" className="btn btn-dark btn-sm" onClick={signOut}>Logout</button>

                </div>
                
                <div className='position-absolute top-20 end-50'>
                        
                </div>
                

                <div className=''>
                    <div className='pb-2'>
                    <DownloadTableExcel

                        filename="Liste des etudiants"
                        sheet="inscrit"
                        currentTableRef={TableInscrit.current}
                    >
                        
                            <button className="btn btn-outline-primary btn-sm ">Export to .xsl</button>
                        
                    </DownloadTableExcel>

                    </div>

                    
                    
                    <div className=' pt-4 pb-2'>
                        <Row className="mb-2">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Filtre par formation:</Form.Label>
                            <Form.Select aria-label="Formation disponible" name="formation" onChange={(event) => { setformation(event.target.value) }} style={{ width: "300px", paddingTop: '2px' }}>
                                <option value="All">Tout</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Cyber-Security">Cyber-Security</option>
                                <option value="Machine learning">Machine learning</option>
                                <option value="Admin Linux">Admin Linux</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Filtre par niveau:</Form.Label>
                            <Form.Select aria-label="Formation disponible" name="formation" onChange={(event) => { setniveau(event.target.value) }} style={{ width: "300px", paddingTop: '2px' }}>
                                <option value="All">Tout</option>
                                <option value="L1">L1</option>
                                <option value="L2">L2</option>
                                <option value="L3">L3</option>
                                <option value="M1">M1</option>
                                <option value="M2">M2</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Rechercher un nom:</Form.Label>
                            <Form.Control 
                            placeholder='Rechercher nom'
                            style={{height:'30px', width: "250px",borderLeft:'none',borderTop:'none',borderRight:'none'
                            ,borderBlockWidth:'1px',borderBlockColor:'blue',textAlign:'center'}}
                           
                            onChange={(event) => { setsearch(event.target.value.toUpperCase()) }}
                            />
                        </Form.Group>
                       </Row>

                    </div>
                    
                    

                    <Table responsive="sm" className='shadow table table-striped table' ref={TableInscrit} >
                        <thead className=''>
                            <tr>

                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Niveau</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                <th>Formation</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.filter((item)=>{
                                    return search === '' ? item : item.nom.includes(search)
                                     
                                }).filter((item)=>{
                                    return formation === 'All' ? item: item.formation.includes(formation)
                                }).filter((item)=>{
                                    return niveau === 'All' ? item: item.niveau.includes(niveau)
                                })
                                .map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom}</td>
                                            <td>{item.niveau}</td>
                                            <td>{item.email}</td>
                                            <td>{item.tel}</td>
                                            <td>{item.formation}</td>
                                            <td>

                                                <Update id={item._id} nom={item.nom} prenom={item.prenom} email={item.email} tel={item.tel} niveau={item.niveau} formation={item.formation}></Update>&ensp;
                                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDeleteEtudiant(item._id)}><BsFillTrashFill></BsFillTrashFill></button>

                                            </td>

                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                     
                </div>
            </div>



        </>

    )


}
export default Inscrit;
