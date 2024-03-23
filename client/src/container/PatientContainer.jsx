import React, { useEffect, useState } from 'react';
import { getPatientOnPatientList } from '../api/patients';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/PatientList';
import SideBar from '../components/SideBar';

function PatientListContainer() {
    const { isAuthenticated } = useAuth(); 
    const [patientsOnList, setPatientsOnList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPatientOnPatientList(currentPage, 'name') // Ordenar por nombre
                
                if (res.data && Array.isArray(res.data.patients)) {
                    console.log('Datos de pacientes recibidos:', res.data);
                    setPatientsOnList(res.data.patients); 
                    setTotalPages(res.data.totalPages);
                    setCurrentPage(res.data.currentPage);
                } else {
                    console.log('Datos de pacientes no válidos:', res.data);
                }
            } catch (error) {
                console.log('Error al obtener la lista de pacientes:', error); 
            }
        };
    
        fetchData();
    }, [isAuthenticated, currentPage]); 
    
    useEffect(() => {
        console.log('Lista de pacientes actualizada:', patientsOnList);
    }, [currentPage]); 

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    console.log('currentPage:', currentPage);
    console.log('totalPages:', totalPages);

    return (
        <div>
            <PatientList patientsOnList={patientsOnList} handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage} currentPage={currentPage} totalPages={totalPages}/>
        </div>
    );
}

export default PatientListContainer;
