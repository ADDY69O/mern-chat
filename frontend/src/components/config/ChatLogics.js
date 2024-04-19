export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[0].name : users[1].name;
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
