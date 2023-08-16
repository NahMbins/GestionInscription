
import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from 'react';
// import axios from "axios";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './nav';
import { Accepter } from './accepter';
import { Refuser } from './refuser';
import { ExpressAxios } from './baseUrl';



function Liste(){
    
    
    const [data, setData] = useState([]);
   

    useEffect(()=>{
        getEtudiant();
    });

    const getEtudiant = async () =>{
        const response = await ExpressAxios.get("/");
        if (response.status === 200){
            setData(response.data);
          
            
        }
    };
    
    
    const navigate = useNavigate()
    const signOut = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }
  
    return (
        <>
        <Navigation />     
        
        <div className='container pt-3'>
        
        <div className='pb-3 btn-group me-2 float-end' role="group">
        <Link className='btn btn-outline-primary btn-sm ' to={'/event'}>Gérer Evenement</Link> 
        <Link className="btn btn-primary btn-sm" to={'/inscrit'}>
            Liste inscrit

        </Link>
            <button type="button" className="btn btn-dark btn-sm" onClick={signOut}>Logout</button>
        </div>

        <div className=''>
        <Table responsive="sm" className='shadow table table-striped table' id='Table' striped >
        <thead>
        <tr>
            
            <th>Nom</th>
            <th>Prenom</th>
            <th>Niveau</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Référence</th>
            <th>Formation</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            {data && 
            data.map((item,index)=>{
                return(
        <tr key={index}>
            
            <td>{item.nom}</td>
            <td>{item.prenom}</td>
            <td>{item.niveau}</td>
            <td>{item.tel}</td>
            <td>{item.email}</td>
            <td>{item.ref}</td>
            <td>{item.formation}</td>
            <td>
       
                <Accepter id={item._id} email={item.email} ></Accepter>
              
                <Refuser id={item._id} email={item.email} ></Refuser>
             
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
export default Liste;
