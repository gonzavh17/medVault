import React, { useEffect, useState } from 'react'
import { getPatientById } from '../api/patients'
import { useParams } from 'react-router-dom'
import PatientDetailCard from '../components/PatientDetailCard'

function PatiendDetailContainer() {
    const { patient_id } = useParams()
    const [patientDetail, setPatientDetail] = useState(null)

    console.log('Params',patient_id)

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await getPatientById(patient_id)
                const data = res
                setPatientDetail(data)
                console.log(res)
            } catch (error) {
                console.log('Error while fetching patient detail', error)
            }
        }

        fetchPatient()

    }, [patient_id])
    
    console.log(patientDetail)

    return (
        <div>
            <PatientDetailCard patient={patientDetail} patient_id={patient_id}/>
        </div>
    )
}

export default PatiendDetailContainer