import React, { useContext, useEffect } from "react";
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
 } from '@mui/material';

 import { AppContext } from "../context"


export const LinkViews = () => {

  const {state: [state, setState]} = useContext(AppContext)

  const handleShortUrlClick = (e) => {
    fetch(`/${e.target.value}`)
    .then(res => res.json())
    .then(data =>  (window.open(data.url, "_blank")))
  } 

  const handleDelete = (e) => {

    const delForm = {
      "id": e.target.value
    }

    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(delForm)
    }
      fetch("/delUrl", requestOptions)
      .then(res => res.json())
      .then(data => setState({
        ...state,
        data: data.urls
      }))
      .catch((err) => {
        console.log(err)
      })
  }



    return(
      <div style={{"margin": "1.5rem"}}>
        <TableContainer 
          component={Paper}
          sx={{ 
            display: "flex",
            flexDirection: "row",
            }}
          >
          <Table style={{tableLayout: "auto"}} aria-label="custom table">
            <TableHead>
              <TableRow style={{backgroundColor:"#434343"}}>
                <TableCell align="left" style={{color:"#f5f5f5"}}>Original Link (Full Url)</TableCell>
                <TableCell align="center" style={{color:"#f5f5f5"}}>Shortened Url</TableCell>
                <TableCell align="center" style={{color:"#f5f5f5"}}>Shortened Url Clicks</TableCell>
                <TableCell align="center" style={{color:"#f5f5f5"}}>Date Created (UTC)</TableCell>
                <TableCell align="center" style={{color:"#f5f5f5"}}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.data.map((u) => (
                <TableRow
                  key={u._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Button href={u.full} target="_blank">
                      {u.full}
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button onClick={(e) => handleShortUrlClick(e)} variant="text" value={u.short}>
                      https://{u.short}.shorty
                    </Button>
                  </TableCell>

                  <TableCell align="center">{u.clicks}</TableCell>

                  <TableCell align="center" >
                    {u.created.slice(0,10)}
                  </TableCell>

                  <TableCell align="center" >
                    <Button onClick={(e) => handleDelete(e)} value={u._id}>🗑️</Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </div>
    )
}