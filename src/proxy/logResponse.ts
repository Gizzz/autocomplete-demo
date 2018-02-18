type responseTypeValues = `success` | `error`;

function logResponse(responseType: responseTypeValues, data: any, url: string): void {
  let title;
  let status;
  let statusText;

  if (responseType === `success`) {
    title = `Request succeeded.`;
    status = data.status;
    statusText = data.statusText;
  } else {
    title = `Request failed.`;
    status = data.response.status;
    statusText = data.response.statusText;
  }

  console.log(title);
  console.log(`Status: ${status} - ${statusText}`);
  console.log(`Url: ${url}`);
  // Long version:
  // console.log(`Data: ${result.data}`);
  // or
  // console.log(error);
  console.log(`/**************************/\n`);
}

export default logResponse;
