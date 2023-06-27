import Container from '@material-ui/core/Container';
import React from 'react';
import MaterialTable from 'material-table';
import { occurrences_type } from '../globals';




const Posts = (props) => {
  const { posts } = props;
  

  // if (!posts || posts.length === 0) {
  //   return <p>Cannot find any occurrences, sorry</p>;
  // }
  
 
 const columns = [
  { field: "registered_at", title: "Registered At",  type: "datetime"},
  { field: "local", title: "Local", type: "string" },
  { field: "km", title: "KM", type: "numeric"},
  { field: "occurrence_type", title: "Ocurrence Type",  lookup:occurrences_type},
  ];

  

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
      <MaterialTable columns={columns} data={posts} title=""
        options={{
            sorting: true}}/>
      </Container>
     
    </React.Fragment>
  );
};

export default Posts;