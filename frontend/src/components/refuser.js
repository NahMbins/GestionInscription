import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
// import axios from "axios";
import {toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import { BsXCircle } from "react-icons/bs";
import { ExpressAxios } from './baseUrl';

export const Refuser = (props) => {

  const[_id]=useState(props.id);
  const[email]=useState(props.email);

  const onRefuseEtudiant = async () =>{
    confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure to refuse?.',
        buttons: [
          {
            label: 'Yes',
            onClick: async() =>{ const response = await ExpressAxios.delete(`/${_id}`);
                if(response.status === 200){
                    toast.success("inscription refusé");        
                    sendEmail();
            }} 
          },
          {
            label: 'No',
            onClick: () => {toast.warn("Action annulée");}
          }
        ]
      });

    };
 

    var templateParams={
      to_name: email,
      from_name:'FORMATION ACADEMY',
      message: 'Bonjour, votre inscription à la formation a été refusée. Nous vous prions de reéssayer et de bien verifier les informations saisies',
      
    }
  
    const sendEmail = () => {
      
      emailjs.send('service_ks9bkwk', 'template_02v5zpy' , templateParams , 'zbDb93Qc8XMvASgcU')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

  return (
    <>
    <button type="button" className="btn d-inline btn-outline-danger btn-sm" onClick={()=>onRefuseEtudiant()}><BsXCircle ></BsXCircle> Refuser</button>

    </>
  );
};
