import React, { useEffect, useState } from 'react'
import BasePage from './BasePage'
import { getItems, createItem, updateItem, deleteItem } from '../api'
import Layout from '../components/Layout'
import DrawerTab from '../components/DrawerTab'

const Courses = () => {
  const [apiData, setApiData] = useState([]) //data {} del API call
  const [rows, setRows] = useState([]) //data filtrada de la API para insertar en la tabla

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'courseName',
      headerName: 'Course',
      width: 250,
      editable: false,
    },
    {
      field: 'professor',
      headerName: 'Professor',
      width: 200,
      editable: true,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'classroom',
      headerName: 'Classroom',
      width: 100,
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

  const inputsCreateNewCourse = [
    {
      label: 'Course Name',
      name: 'courseName',
    },
    {
      label: 'Professor',
      name: 'professor',
    },
    {
      label: 'Start Time (8-19)',
      name: 'startTime',
      type: 'number',
      min: 8,
      max: 19,
    },
    {
      label: 'Classroom',
      name: 'classroom',
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
        const { courseId, courseName, professor, startTime, classroom } = item;
        const newItem = { id: courseId, courseName, professor, startTime, classroom };
  
        dataRows.push(newItem);
      });
    }

    setRows([...dataRows]);
  }, [apiData])


  //API call (courses/all)
  const fetchAllData = async () => {
    try {
      const data = await getItems('courses/all');
      setApiData(data);
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  //CRUD
  const handleUpdate = async (cellValues) => {
    const { id, professor, startTime, classroom } = cellValues.row;
    const endpoint = `courses/update`;
    const dataToUpdate = { professor, startTime, classroom }

    console.log(`update course id: ${id}. Data: (${professor}) (${startTime}) (${classroom})`);

    try {
      await updateItem(endpoint, id, dataToUpdate);
      
      //Actualizar la tabla 
      fetchAllData();
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleDelete = async (cellValues) => {
    const { id } = cellValues.row;
    const endpoint = `courses/delete`;
    console.log('id to delete: ', id);

    try {
      await deleteItem(endpoint, id);
      
      //Actualizar la tabla 
      fetchAllData();
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleCreate = async (newCourse) => {
    const endpoint = `courses/create`;
    console.log('data to create: ', newCourse);

    try {
      await createItem(endpoint, newCourse);
      
      console.log(true);
      //Actualizar la tabla
      fetchAllData();
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
            tableName = {'courses'}
            inputs = {inputsCreateNewCourse}
            handleCreate = {handleCreate}
          />
      </DrawerTab>
    </Layout>
    </>
  )
}

export default Courses