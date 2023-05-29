import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import FilterableTable from "./filterableTable";




const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Posts = (props) => {
  const { posts } = props;
  const [filter, setFilter] = useState("");

  if (!posts || posts.length === 0) {
    return <p>Can not find any occurrences, sorry</p>;
  }

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "registered_at", label: "Registered At", minWidth: 150 },
    { id: "local", label: "Local", minWidth: 150 },
    { id: "km", label: "KM", minWidth: 50 },
    { id: "ocurrence_type", label: "Ocurrence Type", minWidth: 150 },
    { id: "user_id", label: "User ID", minWidth: 50 },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <FilterableTable
          data={posts}
          columns={columns}
          filter={filter}
          onFilterChange={setFilter}
        />
      </Container>
    </React.Fragment>
  );
};

export default Posts;