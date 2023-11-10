import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
//MUI Dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BasePage = ({ rows, columns, tableName, inputs, handleCreate }) => {  
  const MySwal = withReactContent(Swal);
  const title = tableName.charAt(0).toUpperCase() + tableName.slice(1);
  const modalTitle = title.slice(0, -1)
  const [open, setOpen] = useState(false); // control modal
  const [inputValues, setInputValues] = useState({}); // control inputs

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleCreateAndClose = () => {
    handleCreate(inputValues);
    handleCloseModal();
  };

  //Actualiza el valor de los inputs del modal
  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //HTML MUI Modal
  const HtmlCreateModal = (
    <div>
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>{`Create New ${modalTitle}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Your additional dialog content text goes here */}
          Description
        </DialogContentText>
        
        {inputs.map((input, index) => (
          <TextField
            key={index}
            autoFocus={index === 0}
            margin="dense"
            id={input.name}
            label={input.label}
            type={input.type || 'text'}
            inputProps={
              input.type === 'number' ? { min: input.min, max: input.max } : {maxLength: 55}}
            fullWidth
            value={inputValues[input.name] || ''}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
          />
        ))}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleCreateAndClose}>Create</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
  
  //Abrir Swal Modal
  const handleOpenCreateModal = () => {
    MySwal.fire({
      title: `New ${modalTitle}`,
      html: renderModalContent(),
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      icon: "question"
    }).then((result) => {
      // Handle the result if needed
      console.log('Cancel or Dismiss');
      if (result.isConfirmed) {
        console.log('result confirmed');
        //handleClickCreate();
      }
    });
  }

  return (
    <>
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-medium mb-1'>
            {`${title}`}
          </h2>
          <p className='text-md text-gray-700'>
            Haga doble clic en los campos para modificarlos antes de hacer un <kbd>update</kbd>.
          </p>
        </div>
        <div className='flex my-auto'>
          <button className='py-2 px-12 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600'
          onClick={handleOpenModal}>
            New
          </button>
        </div>
      </div>

      <Table rows={rows} columns={columns} />
      {/* modal */}
      {HtmlCreateModal}
    </div>
    </>
  )
}

export default BasePage