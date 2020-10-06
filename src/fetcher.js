export const sendMessage = async () => {
  const response = await fetch(
    'http://chatbotgroup1.herokuapp.com/send_message',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
      },
      referrer: 'http://chatbotgroup1.herokuapp.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: 'message=day+1',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    },
  );
  return response.json();
};
