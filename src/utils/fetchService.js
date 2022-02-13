const request = async (url, method, payload = {}, authorization, TenantId) => {
  const params = {
    method: method,
    headers: {
      Authorization:
      authorization,
      'Content-Type': 'application/json',
      tenantId: TenantId,
    },
  };
  if (method === 'POST' && Object.entries(payload).length !== 0) {
    params.body = JSON.stringify(payload);
  }
  return fetch(url, params)
    .then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status >= 200 && response.status < 204) {
          response.json().then((json) => {
            resolve(json);
          });
        } else if (response.status > 204 && response.status < 300) {
          response.json().then((json) => {
            resolve(json);
          });
        } else if (response.status === 204) {
          resolve({error: 'No Data available'});
        } else {
          reject(response);
        }
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
};

export default request;
