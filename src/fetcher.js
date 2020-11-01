const CHATBOT_URL = 'https://chatbotgroup1.herokuapp.com';

export const sendMessage = async ({ message, email }) => {
  const formData = new FormData();
  formData.append('message', message);
  if (email) {
    formData.append('e-mail', email);
  }

  const response = await fetch(`${CHATBOT_URL}/send_message`, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,id;q=0.8',
      'x-requested-with': 'XMLHttpRequest',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: formData,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });
  return response.json();
};

export const postLogin = async ({ email, name }) => {
  const body = new FormData();
  body.append('e-mail', email);
  body.append('name', name);
  const response = await fetch(`${CHATBOT_URL}/login`, {
    body,
    headers: {
      Accept: '*/*',
    },
    method: 'POST',
  });

  return response.json();
};

export const setColorState = async ({ email, color_state }) => {
  const body = new FormData();
  body.append('e-mail', email);
  body.append('color_state', color_state);
  const response = await fetch(`${CHATBOT_URL}/set-state`, {
    body,
    method: 'POST',
  });

  return response.json();
};

export const getColorState = async ({ email }) => {
  const body = new FormData();
  body.append('e-mail', email);

  const response = await fetch(`${CHATBOT_URL}/get-state`, {
    body,
    method: 'POST',
  });

  return response.json();
};
