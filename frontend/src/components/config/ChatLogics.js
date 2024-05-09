export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name;
};
export const lastMessage = (Messages, id, index) => {
  if (index < Messages.length - 1) {
    if (id === Messages[index + 1].sender._id) {
      return false;
    }

    return true;
  }
  return true;
};
