import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
// import axios from "axios";
import {toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import { BsCheckCircle } from "react-icons/bs";
import { ExpressAxios } from './baseUrl';

export const Accepter = (props) => {

  const[_id]=useState(props.id);
  const[email]=useState(props.email);

  const onAccepteEtudiant = async () =>{
    confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure to accept ?',
        buttons: [
          {
            label: 'Yes',
            onClick: async() =>{const response = await ExpressAxios.put(`/${_id}`);
            if(response.status === 200){
                toast.success("inscription accepté");
                
            }
            sendEmail();
          } 
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
    message: "Votre inscription a été acceptée. Pour connaitre les evenement vous êtes prier de consulter le site",
    
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
    <button type="button" className="btn d-inline btn-outline-success btn-sm" onClick={()=>onAccepteEtudiant()}><BsCheckCircle></BsCheckCircle> Accepter</button>&ensp;
    
    </>
  );
};
