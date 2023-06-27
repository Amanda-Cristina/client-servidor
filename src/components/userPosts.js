import Container from '@material-ui/core/Container';
import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { occurrences_type } from '../globals';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import axiosInstance from '../axios';





const UserPosts = (props) => {
  const { posts } = props;
  const [tableData, setTableData] = useState(posts);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [error, setError] = useState('');
  

  useEffect(() => {
    setTableData(posts);
  }, [posts]);

  // if (!tableData || tableData.length === 0) {
  //   return <p>Cannot find any occurrences, sorry</p>;
  // }
  
 
 const columns = [
    { field: "id", title: "User",hidden: true},
    { field: "registered_at", title: "Registered At",  type: "datetime"},
    { field: "local", title: "Local", type: "string" },
    { field: "km", title: "KM", type: "numeric"},
    { field: "occurrence_type", title: "Ocurrence Type",  lookup:occurrences_type},
  ];

  
  const validateForm = (data) => {
    
    if (!data.local) {
        
        throw new Error('Local is required');
    }
  
  };



  const handleAdd = async (newRow) => {
    try {
        validateForm(newRow);
        axiosInstance
        .post(`/occurrences`, {
            registered_at: newRow.registered_at.toISOString(),
            local: newRow.local,
            km: Number(newRow.km),
            occurrence_type: Number(newRow.occurrence_type),
            user_id: Number(localStorage.getItem('id'))
        }).then((res) => {
            setTableData([...tableData, res.data]);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message);
                setErrorDialogOpen(true);
            } });
       
    } catch (error) {
      console.log("deu ruim");
      console.log(error);
      setError(error.message);
      setErrorDialogOpen(true);
    }
  };

  const handleUpdate = async (newRow,oldRow) => {
    try {
        const updatedData = [...tableData]
        updatedData[oldRow.tableData.id] = newRow
        console.log(newRow);
        axiosInstance
        .put(`/occurrences/${Number(newRow.id)}`, {
            registered_at: newRow.registered_at,
            local: newRow.local,
            km: Number(newRow.km),
            occurrence_type: Number(newRow.occurrence_type),
            user_id: Number(localStorage.getItem('id'))
        }).then((res) => {
            console.log('deu boa')
            setTableData(updatedData)
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message);
                setErrorDialogOpen(true);
            } });
       
    } catch (error) {
      console.log("deu ruim");
      console.log(error);
      setError(error.message);
      setErrorDialogOpen(true);
    }
  };

  const handleDelete = async (selectedRow) => {
    try {
             
        axiosInstance
        .delete(`/occurrences/${Number(selectedRow.id)}`)
        .then((res) => {
            console.log(res)
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message);
                setErrorDialogOpen(true);
            } });
       
    } catch (error) {
      console.log("deu ruim");
      console.log(error);
      setError(error.message);
      setErrorDialogOpen(true);
    }
  };

    const handleErrorClose = () => {
        setError('');
        setErrorDialogOpen(false);
    };

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
      <MaterialTable columns={columns} data={tableData} title=""
        editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => {
                handleAdd(newRow);
                setTimeout(() => resolve(), 500)
            }),
            onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
              handleUpdate(newRow, oldRow);
              setTimeout(() => resolve(), 500)
            }),
            onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              handleDelete(selectedRow);
              setTimeout(() => resolve(), 1000)
  
            })
        }}
        options={{
            sorting: true,addRowPosition: "first",actionsColumnIndex: -1}}/>
      </Container>
      <Dialog open={errorDialogOpen} onClose={handleErrorClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <p>{error}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UserPosts;