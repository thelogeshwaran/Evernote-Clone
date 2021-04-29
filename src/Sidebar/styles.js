const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '400px',
      boxShadow: '0px 0px 2px black'
    },
    newChatBtn: {
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    newNoteBtn: {
      width: '100%',
      height: '30px',
      // borderBottom: '1px solid black',
      borderRadius: '0px',
      backgroundColor: '#16A34A',
      color: 'white',
      '&:hover': {
        backgroundColor: 'green'
      }
    },
    sidebarContainer: {
      marginTop: '0px',
      width: '30%',
      height: '100vh',
      boxSizing: 'border-box',
      float: 'left',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom:"3%",
      borderRight:"1px solid grey"
      // border:"2px solid black"
    },
    newNoteInput: {
      width: '100%',
      margin: '0px',
      height: '35px',
      outline: 'none',
      border: 'none',
      paddingLeft: '5px',
      '&:focus': {
        border: '2px solid rgba(81, 203, 238, 1)'
      }
    },
    newNoteSubmitBtn: {
      width: '100%',
      backgroundColor: '#28787c',
      borderRadius: '0px',
      color: 'white',
      height:"30px",
      '&:hover': {
        backgroundColor: '#28787C'
      }
    },
    sidebarHeading:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      margin: "2%",
      padding:"0 5%",
      paddingBottom: "2%",
      border:"1px solid #6B7280"
    },
    sidebarContent:{
      display:"flex",
      alignItems: "center",
      justifyContent:"space-between",
      color:"#6B7280",
      fontWeight:"bold",
      padding: "2% 10%",
      borderBottom:"1px solid black"
    },
    filter:{
      cursor:"pointer",
    }
  });
  
  export default styles;