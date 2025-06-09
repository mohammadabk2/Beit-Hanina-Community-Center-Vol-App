export const sortFavorites = (data) => {
  //TODO add to database fav for all users
  return [...data].sort((a, b) => b.isFavorite - a.isFavorite);
};

export const sortMyEvents = (data, currentUserId) => {
  return [...data].filter((item) => item.organizerId === currentUserId);
};

export const sortClosedEvents = (data) => {
  console.log(data);
  
  // return [...data].filter((item) => item.active === false);
};

export const sortOpenEvents = (data) => {
  return [...data].filter((item) => item.active === true);
};

export const sortByTime = (data) => {
  return [...data].sort((a, b) => new Date(a.time) - new Date(b.time));
};

export const sortUnapprovedEvents = (data) => {
  return [...data].filter((item) => !item.approved);
};

export const sortApprovedEvents = (data) => {
  return [...data].filter((item) => item.approved);
};

export const sortUnapprovedUsers = (data) => {
  return [...data].filter((user) => !user.approved);
};

export const sortApprovedUsers = (data) => {
  return [...data].filter((user) => user.approved);
};
