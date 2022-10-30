
 import { Add } from "@mui/icons-material";
 import { Box, Button, Card, styled } from "@mui/material";
 import { useEffect, useState } from "react";
 import { useSelector, useDispatch } from "react-redux";
 import {getContacts} from "../redux/features/contact/contactSlice";
  
 const Test = () => {
   
   const tableData=useSelector(state=>state.contacts);
   
   const dispatch = useDispatch();
   
 
   const handleClearFilter = () => {
     console.log("clear filter");
   };
 
   useEffect(() => {
     dispatch(getContacts());
    
   }, [dispatch]); 
   
   
 
    return < >
        <Box maxWidth={350}>
          <img src="/static/illustration/error-page.svg" width="100%" alt="Error 404" />
        </Box>
         
        
  
        
        
      </>;
  };
  
  export default Test;