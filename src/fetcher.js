export const sendMessage = async ({ message }) => {
  const formData = new FormData();
  formData.append('message', message);

  const response = await fetch(
    'https://chatbotgroup1.herokuapp.com/send_message',
    {
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
    },
  );
  return response.json();
};

export const postLogin = async ({ email, name }) => {
  const body = new FormData();
  body.append('e-mail', email);
  body.append('name', name);
  const response = await fetch('https://chatbotgroup1.herokuapp.com/login', {
    body,
    headers: {
      Accept: '*/*',
    },
    method: 'POST',
  });

  return response.json();
};
