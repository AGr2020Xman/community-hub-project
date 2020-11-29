/* eslint-env browser */

// Globals

// Functions
const getSelf = async () => {
  return fetch('/api/user_data')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const checkAuth = async () => {
  const selfUserInfo = await getSelf();
  if (selfUserInfo) {
    return selfUserInfo;
  }
};
