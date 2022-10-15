import React, { useEffect, useState } from "react";
import { Box, TextField, Checkbox, Button, List, ListItem, ListItemAvatar, Avatar } from '@mui/material'

import api from './Api/api'

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const json = await api.getData()
      const jsonNew = json.data.map(item => ({...item, checked: false}))
      setData(jsonNew.sort(function (a, b) {
        if (a.last_name > b.last_name) {
            return 1;
        }
        if (b.last_name > a.last_name) {
            return -1;
        }
        return 0;
    }))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtertedLogs = data.filter(item => item.checked === true)
    console.log(filtertedLogs)
  }, [data])

  const filterItem = (item, search) => {
    if (!search) {
      return true;
    }
    let searchString = '';
    Object.keys(item).forEach((value) => {
      searchString +=
        ' ' + (typeof item[value] === 'string' ? item[value].toLowerCase() : '');
    });
    return searchString.indexOf(search.toLowerCase()) !== -1;
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleOnChange = (inf,pos) => {
    const filteredCheckedState = data.filter((item) => item.id = inf.id);
    const updatedCheckedState = filteredCheckedState.map((item , index) => {
      if (index === pos) {
        return {...item, checked: !item.checked}
      } else {
        return item
      }
    })
    setData(updatedCheckedState)
  }

  return (
    <Box>
      <TextField sx={{ml: 3, mt: 1}} placeholder="search" onChange={handleSearch} />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {!!data && data
        .filter((item) => filterItem(item, search))
        .map((item, i) => {
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img
                    src={item.avatar}
                    alt={"Logo"}
                  />
                </Avatar>
              </ListItemAvatar>
              <Button onClick={() => handleOnChange(item, i)}>{item.first_name} {item.last_name}</Button>
              <Checkbox checked={item.checked} onChange={() => handleOnChange(item, i)} />
            </ListItem>
          );
          })}
      </List>
    </Box>
  );
}

export default React.memo(App);
