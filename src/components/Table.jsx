import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns }) => {

  return (
    <div className='flex flex-col'>
      <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
        sorting: {
          sortModel: [{ field: 'id', sort: 'asc' }],
        },
      }}
      pageSizeOptions={[10]}
      disableRowSelectionOnClick
      />
    </div>
  )
}

export default Table