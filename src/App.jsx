import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getItems, createItem, updateItem, deleteItem } from './api'
import Assignments from './pages/Assignments'
import Students from './pages/Students'
import Courses from './pages/Courses'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (students.length > 0) {
      console.log(students);
    }

  }, [students])


  //FN BUTTONS
  const handleAddProduct = async () => {
    const newProduct = {
      name: "Agua mineral cara",
      categoryId: 5,
      price: 11500.0,
      stock: 175,
      active: true,
    }

    try {
      const responseData = await addProduct(newProduct)
      console.log('Product added:', responseData);
    } catch (error) {
      console.error('Error adding a product:', error);
    }
  }

  const handleDeleteProduct = async (idProduct) => {
    try {
      const responseData = await deleteProduct(idProduct)
    } catch (error) {
      console.error('Error adding a product:', error);
    }
  }

  const handleGetStudent = async () => {
    try {
      const studentsData = await getItems('students/all');
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetch: ', error);
    }
  }

  const handleTest = () => {
    console.log('test button');
  }

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/assignments' element={<Home/>} />
      <Route path='/students' element={<Students/>} />
      <Route path='/courses' element={<Courses/>} />
    </Routes>
    </>
  )
}

export default App
