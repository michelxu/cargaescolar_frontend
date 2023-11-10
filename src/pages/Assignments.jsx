import React, { useEffect, useState } from 'react'
import BasePage from './BasePage'
import { getItems, createItem, updateItem, deleteItem } from '../api'

const Assignments = () => {
  const [apiData, setApiData] = useState([]) //data {} del API call
  const [rows, setRows] = useState([]) //data filtrada de la API para insertar en la tabla
  const [openSnack, setOpenSnack] = useState(false)

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'courseId',
      headerName: 'Course ID',
      type: 'number',
      width: 80,
      editable: true,
    },
    {
      field: 'studentId',
      headerName: 'Student ID',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'courseName',
      headerName: 'Course Name',
      width: 200,
      editable: false,
    },

    {
      field: 'name',
      headerName: 'First Name',
      width: 120,
      editable: false,
    },
    {
      field: 'paternalSurname',
      headerName: 'Last Name',
      width: 120,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
    },
    {
      field: "Update",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <button
            className='p-1.5 bg-blue-400 text-white text-md rounded hover:bg-blue-500'
            onClick={() => handleUpdate(cellValues)}
          >
            Update
          </button>
        );
      }
    },
    {
      field: "Delete",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <button
            className='p-1.5 bg-red-400 text-white text-md rounded hover:bg-red-500'
            onClick={() => handleDelete(cellValues)}
          >
            Delete
          </button>
        );
      }
    },
  ];

  const inputsCreateNewAssignment = [
    {
      label: 'Course ID',
      name: 'courseId',
    },
    {
      label: 'Student ID',
      name: 'studentId',
    },
  ];

  //1. Llamado a la API
  useEffect(() => {
    fetchAllData();
  }, [])

  //2. Pasar datos (de interés) del API Call (a las rows) al componente Table.
  useEffect(() => {
    let dataRows = [];

    if (Array.isArray(apiData)) {
      // Check if apiData is an array before calling map
      apiData.map((item) => {
        const { assignmentId, courseId, studentId, student: { name, paternalSurname, email }, course: { courseName } } = item;
        const newItem = { id: assignmentId, courseId, courseName, studentId, name, paternalSurname, email };
  
        dataRows.push(newItem);
      });
    }
    setRows([...dataRows]);
  }, [apiData])

  //API call
  const fetchAllData = async () => {
    try {
      const assignmentData = await getItems('assignments/all');
      setApiData(assignmentData);
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleUpdate = async (cellValues) => {
    const { id, courseId, studentId } = cellValues.row;
    const endpoint = `assignments/update`;
    const dataToUpdate = {courseId, studentId}

    console.log(`update assignment id: ${id}. Data: course(${courseId}), (${studentId})`);

    try {
      await updateItem(endpoint, id, dataToUpdate);
      
      fetchAllData(); //actualizar la tabla 
      setOpenSnack(true); //snack
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleDelete = async (cellValues) => {
    const { id } = cellValues.row;
    const endpoint = `assignments/delete`;
    console.log('id to delete: ', id);

    try {
      await deleteItem(endpoint, id);
      
      fetchAllData(); //actualizar la tabla 
      setOpenSnack(true); //snack
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleCreate = async (newAssignment) => {
    const endpoint = `assignments/create`;
    console.log('data to create: ', newAssignment);

    try {
      await createItem(endpoint, newAssignment);
      
      fetchAllData(); //actualizar la tabla 
      setOpenSnack(true); //snack
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  return (
    <>
    <BasePage
      rows = {rows}
      columns = {columns}
      tableName = {'assignments'}
      inputs = {inputsCreateNewAssignment}
      handleCreate = {handleCreate}
      openSnack = {openSnack}
      setOpenSnack = {setOpenSnack}
    />
    </>
  )
}

export default Assignments