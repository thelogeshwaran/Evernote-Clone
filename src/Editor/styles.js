const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
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
    backgroundColor: '#1FD41F',
    color: 'white',
    paddingLeft: '20px'
  },
  editIcon: {
    // position: 'absolute',
    // left: '580px',
    // top: '12px',
    color: 'black',
    width: '30px',
    height: '30px',
    backgroundColor:'#1FD41F',
    paddingLeft: "10px"
  },
  editorContainer: {
    height: '85%',
    boxSizing: 'border-box'
  }
});

export default styles;