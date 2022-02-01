const request = async (url, method, payload = {}) => {
  const params = {
    method: method,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJVc2VySWQiOjkwLCJ0ZW1wUGFzc3dvcmQiOiJOIiwiVGVuYW50SUQiOjQsIkVtYWlsIjoidGFAYWVpLmNvbSIsInVzZXJuYW1lIjoidGFAYWVpLmNvbSIsIkZpcnN0TmFtZSI6IlRlbmFudCIsIkxhc3ROYW1lIjoiQWRtaW4iLCJUZW5hbnROYW1lIjoiUmVtYnJhbmR0Iiwicm9sZXMiOlsiVGVuYW50QWRtaW4iXSwic2l0ZSI6NTgsImlhdCI6MTY0MzYxMzI0NCwiZXhwIjoxNjQzNjUyNzE5LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMiLCJqdGkiOiI4YWU2YWEwZi01YWNjLTRkODctOGI3Ni1hNWVlZDM1NjRmNDMifQ.PGfEIBF1FuqQpe52oZEHE8HEW1zMBwBnZ6UuMiraPr0',
      'Content-Type': 'application/json',
      tenantId: 4,
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
