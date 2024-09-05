 // eslint-disable-next-line 
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { BsThreeDotsVertical } from 'react-icons/bs'; // Importing react-icons

function CustomToolbar({ apiRef, handleThreeDotsClick, handleModal }) {
  const handleGoToPage1 = () => {
    if (apiRef.current) {
      apiRef.current.setPage(1);
    }
  };

  return (
    <GridToolbarContainer>
      <Button onClick={handleGoToPage1}>Go to page 1</Button>
      <Button onClick={handleModal}>+</Button> 
    </GridToolbarContainer>
  );
}

function MenuAccessControl() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [newMenuItem, setNewMenuItem] = useState({
  //   No: '',
  //   menuItemname: '',
  //   view: '',
  //   create: '',
  //   edit: '',
  //   delete: '',
  //   query: '',
  //   export: [],
  // });
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        
        // Set unique IDs for each menu item
        const menuItemsWithIds = data.map((menuItem, index) => ({ ...menuItem, id: index + 1 }));
        setMenuItems(menuItemsWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleThreeDotsClick = (menuItemId) => {
    setSelectedMenuItem(menuItemId === selectedMenuItem ? null : menuItemId);
  };

  const handleDelete = (menuItemId) => {
    // Implement delete logic here
    console.log('Delete menu item with ID:', menuItemId);
  };

  const handleUpdate = (menuItem) => {
    // Implement update logic here
    console.log('Update menu item:', menuItem);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  // const handleModalSave = () => {
  //   // Implement save logic for adding a new menu item here
  //   setIsModalOpen(false);
  // };

  // const handleUpdateSave = () => {
  //   // Implement save logic for updating a menu item here
  //   setIsUpdateModalOpen(false);
  // };

  const columns = [
    { field: 'No', headerName: 'No', width: 100,headerClassName: 'custom-header', cellClassName: 'custom-cell' },
    { field: 'menuItemname', headerName: 'Menu Item Name', width: 200,headerClassName: 'custom-header', cellClassName: 'custom-cell' },
    { field: 'view', headerName: 'View', width: 100,headerClassName: 'custom-header', cellClassName: 'custom-cell' },
    { field: 'create', headerName: 'Create', width: 100,headerClassName: 'custom-header', cellClassName: 'custom-cell' },
    { field: 'edit', headerName: 'Edit', width: 100 ,headerClassName: 'custom-header', cellClassName: 'custom-cell'},
    { field: 'delete', headerName: 'Delete', width: 100 ,headerClassName: 'custom-header', cellClassName: 'custom-cell'},
    { field: 'query', headerName: 'Query', width: 100 ,headerClassName: 'custom-header', cellClassName: 'custom-cell'},
    { field: 'export', headerName: 'Export', width: 100 ,headerClassName: 'custom-header', cellClassName: 'custom-cell'},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: ({ row }) => (
        <div>
          <div className="three-dots" onClick={() => handleThreeDotsClick(row.menuItemId)}>
            <BsThreeDotsVertical /> {/* Using react-icons */}
          </div>
          {selectedMenuItem === row.menuItemId && (
            <div className="popover">
              <button onClick={() => handleDelete(row.menuItemId)}>Delete</button>
              <button onClick={() => handleUpdate(row)}>Update</button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full mb-3 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className='text-center text-3xl text-white bg-gray-400 p-2 rounded-lg'>Menu Access Control</div>
      </div>
      <Box className="w-full p-4 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white border border-gray-200 shadow-lg rounded-lg" sx={{ height: 500, width: '100%' }} >
        <DataGrid
          rows={menuItems}
          columns={columns}
          components={{
            Toolbar: () => (
              <CustomToolbar
                apiRef={apiRef}
                handleThreeDotsClick={handleThreeDotsClick}
                handleModal={handleModal}
              />
            ),
          }}
          pageSize={10}
          onGridReady={(gridApi) => {
            apiRef.current = gridApi;
          }}
          className="bg-gray-400"
        />
      </Box>
      {/* Your modals and other components */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
            {/* Modal content here */}
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Update Menu Item</h2>
            {/* Modal content here */}
            <Button onClick={() => setIsUpdateModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuAccessControl;
