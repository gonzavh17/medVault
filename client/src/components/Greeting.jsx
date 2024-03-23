import React from 'react'
import { useAuth } from '../context/AuthContext';

function Greeting() {

    const {currentUser} = useAuth()
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fecha = new Date();
    const diaSemana = diasSemana[fecha.getDay()];
  

    const greeting = currentUser ? `¡Buen día, ${currentUser.first_name}! Feliz ${diaSemana}.` : '';
  
    return (
      <div>
        <p className="text-2xl">{greeting}</p> 
      </div>
    );
}

export default Greeting;
