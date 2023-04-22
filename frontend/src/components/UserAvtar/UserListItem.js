import { Avatar, Box, color, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user,handleFunction}) => {
  return (
    <Box display="flex" w="100%"
    alignItems="center" color="black" bg="#E8E8E8" cursor="pointer" borderRadius="lg" px={2} py={2} mb={2}   onClick={handleFunction}
    _hover={{
      background:"#38b28c",
      color:"white"
    }}
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />
      <Box display="flex" flexDirection="column" >
      <Text>{user.name}</Text>
      <Text fontSize="xs" ><b>Email : </b> {user.email}</Text>
      </Box>
    </Box>
  )
}

export default UserListItem