import React, { useEffect, useState } from 'react'
import BasePage from './BasePage'
import { getItems, createItem, updateItem, deleteItem } from '../api'
import Layout from '../components/Layout'
import DrawerTab from '../components/DrawerTab'

const Students = () => {
  const [apiData, setApiData] = useState([]) //data {} del api call
  const [rows, setRows] = useState([]) //data filtrada de la api para insertar en la tabla
  const [openSnack, setOpenSnack] = useState(false)

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'name',
      headerName: 'First Name',
      width: 120,
      editable: false,
    },
    {
      field: 'paternalSurname',
      headerName: 'Paternal S.',
      width: 120,
      editable: false,
    },
    {
      field: 'maternalSurname',
      headerName: 'Maternal S.',
      width: 120,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 120,
      editable: true,
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

  const inputsCreateNewStudent = [
    {
      label: 'First Name',
      name: 'name',
    },
    {
      label: 'Paternal Surname',
      name: 'paternalSurname',
    },
    {
      label: 'Maternal Surname',
      name: 'maternalSurname',
    },
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Phone',
      name: 'phone',
    },
  ];

  //1. Llamado a la API
  useEffect(() => {
    fetchAllData();
  }, [])


  //2. Pasar datos (de interés) del API Call (const apiData) al componente Table (const rows).
  useEffect(() => {
    let dataRows = [];

    // Check if apiData is an array before calling map
    if (Array.isArray(apiData)) {
      apiData.map((item) => {
        const { studentId, name, paternalSurname, maternalSurname, email, phone } = item;
        const newItem = { id: studentId, name, paternalSurname, maternalSurname, email, phone };
  
        dataRows.push(newItem);
      });
    }
    
    setRows([...dataRows]);
  }, [apiData])


  //API call (students/all)
  const fetchAllData = async () => {
    try {
      const data = await getItems('students/all');
      setApiData(data);
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }


  //CRUD
  const handleUpdate = async (cellValues) => {
    const { id, email, phone } = cellValues.row;
    const endpoint = `students/update`;
    const dataToUpdate = {email, phone}

    console.log(`update student id: ${id}. Data: (${email}) (${phone})`);

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
    const endpoint = `students/delete`;
    console.log('id to delete: ', id);

    try {
      await deleteItem(endpoint, id);
      
      fetchAllData(); //actualizar la tabla 
      setOpenSnack(true); //snack
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleCreate = async (newStudent) => {
    const endpoint = `students/create`;
    console.log('data to create: ', newStudent);

    try {
      await createItem(endpoint, newStudent);
      
      fetchAllData(); //actualizar la tabla 
      setOpenSnack(true); //snack
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }


  return (
    <>
    <Layout>
      <DrawerTab>
        <BasePage
          rows = {rows}
          columns = {columns}
          tableName = {'students'}
          inputs = {inputsCreateNewStudent}
          handleCreate = {handleCreate}
          openSnack = {openSnack}
          setOpenSnack = {setOpenSnack}
        />
      </DrawerTab>
    </Layout>
    </>
  )
}

export default Students