function extractSummary(str) {
  const rx = /500 - (.*)\n/g;
  const arr = rx.exec(str);
  if (arr != null && arr.length < 2) {
    console.log("couldnt get error: ", str);
    return 'Error';
  }
  return arr[1];
}

export default function getMessageFromError(error, summary) {
  // Handle fetch Response objects
  if (error && error.response) {
    return getMessageFromError(error.response, summary);
  }

  // Handle Response objects
  if (error && typeof error.text === 'function') {
    return error.text().then(text => parseErrorText(text));
  }

  // Handle plain text responses
  if (typeof error === 'string') {
    return parseErrorText(error);
  }

  // Handle Error objects
  if (error && error.message) {
    return error.message;
  }

  return 'Unknown error';
}

function parseErrorText(txt) {
  console.log("error text: ", txt);
  try {
    const start = txt.indexOf('<b>Message</b>');
    const end = txt.indexOf('<b>Description</b>');
    const prts = txt.split('ORA-');
    if (prts && prts.length > 1) {
      return "ERROR: ORA-" + prts[1];
    } else {
      return "ERROR: " + txt.substring(start + 10, end - 5);
    }
  } catch (er) {
    console.error(er);
    return txt || 'Error';
  }
}
