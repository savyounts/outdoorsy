export const validEmail = email => {
  const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailCheck.test(email)
};

export const isNumber = string => {
  const numCheck = /\d+/g;
  return numCheck.test(string);
}

export const rowInvalid = (r) => {
  //check if data is missing or if any field is just a space
  if (r.length !== 6 || r.some(d => !d.trim())) return 'Please fill out missing information';
  if (!validEmail(r[2])) return 'Please enter a valid email';
  if (!isNumber(r[5])) return 'Please enter a number for vehicle length';
  return false;
}

export const createClient = client => {
  return  {
    name: `${client[0]} ${client[1]}`,
    email: client[2],
    vType: client[3].toLowerCase(),
    vName: client[4],
    vLength: `${client[5].replace(/\D/g, "")}'`
  }
}

export const validateFile = (clientData) => {
  const clientObjs = [];
  const errors = [];
  let row = 1;
  clientData.forEach(c => {
    if (!c.length) return; // check for empty rows

    let client = c.split(/[|,]+/);
    const invalid = rowInvalid(client)

    invalid ? errors.push(`Row ${row}: ${invalid}`) : clientObjs.push(createClient(client));
    return row++
  });

  return errors.length ? { status: 'error', data: errors } : { status: 'ok', data: clientObjs }
}
