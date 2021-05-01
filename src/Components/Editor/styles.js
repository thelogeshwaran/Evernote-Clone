const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  titleInput: {
    height: '50px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100%)',
    backgroundColor:'inherit',
    color: 'black',
    paddingLeft: '20px'
  },

  editIcon: {
    color: 'black',
    width: '30px',
    height: '30px',
    backgroundColor:'inherit',
    paddingLeft: "10px"
  },
  editorHeading: {
    display:"flex",
    backgroundColor:"#4ADE80",
    alignItems: "center",
  },
  editorFooter: {
    display:"flex",
    border:"1px solid white",
    width:"auto",
    justifyContent:"space-between",
    alignItems: "center",
    overflowX:"hidden",
    overflowY:"hidden"
  },
  editorTitle : {
    display:"flex",
    flexDirection:"row",
    width:"100%",
    alignItems: "center",
    // border:"1px solid blue"
  },
  deleteIcon: {    
    '&:hover': {
      color: 'red'
    }
  }
});

export default styles;