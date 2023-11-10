import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { getItems, createItem, updateItem, deleteItem } from '../api'

const Assignments = () => {
  const [assignments, setAssignments] = useState([]) //{} del api call
  const [rows, setRows] = useState([]) //Insertar en la tabla

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

  //1. Llamado a la API
  useEffect(() => {
    getAssignments();
  }, [])

  //2. Pasar datos (de interés) del API Call (a las rows) al componente Table.
  useEffect(() => {
    let dataRows = [];
    console.log('data from api call');
    console.log(assignments);

    if (Array.isArray(assignments)) {
      // Check if assignments is an array before calling map
      assignments.map((item) => {
        const { assignmentId, courseId, studentId, student: { name, paternalSurname, email }, course: { courseName } } = item;
  
        const newItem = { id: assignmentId, courseId, courseName, studentId, name, paternalSurname, email };
  
        dataRows.push(newItem);
      });
    }

    console.log('data to send to rows');
    console.log(dataRows);
    setRows([...dataRows]);
  }, [assignments])

  const handleUpdate = async (cellValues) => {
    const { id, courseId, studentId } = cellValues.row;
    const endpoint = `assignments/update`;
    const dataToUpdate = {courseId, studentId}

    console.log(`update assignment id: ${id}. Data: course(${courseId}), (${studentId})`);

    try {
      await updateItem(endpoint, id, dataToUpdate);
      
      //Actualizar la tabla 
      getAssignments();
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
      
      //Actualizar la tabla 
      getAssignments();
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleCreate = async (newAssignment) => {
    const endpoint = `courses/create`;
    console.log('data to create: ', newAssignment);

    try {
      await createItem(endpoint, newAssignment);
      
      //Actualizar la tabla 
      fetchData();
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  //API call
  const getAssignments = async () => {
    try {
      const assignmentData = await getItems('assignments/all');
      setAssignments(assignmentData);
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  return (
    <>
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-medium mb-1'>
            Assignments
          </h2>
          <p className='text-md text-gray-700'>
            Haga doble clic en los campos para modificarlos antes de hacer un update.
          </p>
        </div>

        <div className='flex my-auto'>
          <button className='py-2 px-12 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600'>
            New
          </button>
        </div>
      </div>

      <Table rows={rows} columns={columns} />
    </div>
    </>
  )
}

export default Assignments