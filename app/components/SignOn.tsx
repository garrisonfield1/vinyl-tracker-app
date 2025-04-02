import {Button, ButtonGroup} from "@heroui/button";

export default function Signon (){

  // const user = {
  //   uid: 1, 
  //   firstName: "Sean", 
  //   lastName: "McIntyre", 
  //   role: "user"
  // }
  const user = {
  }

  return (
    <>
      {
        user?.uid ? 
        <div>
          <span>Hello {user.firstName} </span>
          <Button size="sm" color="danger">Sign Out</Button> 
        </div>
        
        : 
        <Button color="primary">Sign In</Button>
      }
      
    
    </> 
  )
}