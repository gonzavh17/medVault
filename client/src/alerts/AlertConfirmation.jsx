import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa el estilo por defecto

function showConfirmation() {
  confirmAlert({
    title: 'Confirmar',
    message: '¿Estás seguro de que quieres hacer esto?',
    buttons: [
      {
        label: 'Sí',
        onClick: () => {
          // Acción a realizar si el usuario hace clic en "Sí"
          console.log('Usuario hizo clic en Sí');
        }
      },
      {
        label: 'No',
        onClick: () => {
          // Acción a realizar si el usuario hace clic en "No"
          console.log('Usuario hizo clic en No');
        }
      }
    ]
  });
}

export default showConfirmation;