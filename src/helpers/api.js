const API = 'https://visual-health-node.herokuapp.com';
// const API = 'http://localhost:5000';

export const urls = {
  SIGNUP: `${API}/signup`,
  LOGIN: `${API}/login`,
  LOGIN_WITH_TOKEN: `${API}/token`,
  CYCLING: `${API}/cycling`,
  RUNNING: `${API}/running`
};

export const post = async ({ url, body, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    const data = await res.json();
    dispatch({ type: success, data });
  } catch (e) {
    dispatch({ type: failure });
  }
};

export const get = async ({ url, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) { throw data.error };
    dispatch({ type: success, data });
  } catch (e) {
    dispatch({ type: failure });
  }
};
