const Notification = ({ notificationMessage }) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return notificationMessage === null
  ? null
  : <div style={style}>
      {notificationMessage} 
    </div>
}

export default Notification