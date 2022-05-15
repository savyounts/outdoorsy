import { render, screen } from '@testing-library/react';
import App from './App';
import DataTable from './Components/DataTable';
import { validEmail, isNumber, rowInvalid, createClient, validateFile } from './Utils/validation';

test('renders Client Data header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Client Data/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders No user data uploaded yet if there isnt client data ', () => {
  render(<DataTable data={[]} />);
  const message = screen.getByText(/No user data uploaded yet/i);
  expect(message).toBeInTheDocument();
});



/**
  Validation Tests
**/
const testEmails = [
  ['test@email.com', true],
  ['test@email.org', true],
  ['123@email.com', true],
  ['testemail.com', false],
  ['test@email', false],
  ['@email.com', false],
  ['testemail', false]
];

test.each(testEmails)(
    "validEmail passes for email value %j with result %j",
    (fixture, result) => expect(validEmail(fixture)).toBe(result)
);

const numberStrings = [
  ['32', true],
  ["21'", true],
  ['31 feet', true],
  ['twenty', false],
];

test.each(numberStrings)(
    "isNumber passes for string value %j with result %j",
    (fixture, result) => expect(isNumber(fixture)).toBe(result)
);

const rowData = [
  [['name', 'last', 'test@email.com', 'boat', 'black pearl', '110ft'], false],
  [['name', 'last', 'test@email.com', 'boat', '110ft'], 'Please fill out missing information'],
  [[' ', 'last', 'test@email.com', 'boat', 'black pearl', '110ft'], 'Please fill out missing information'],
  [['', 'last', 'test@email.com', 'boat', 'black pearl', '110ft'], 'Please fill out missing information'],
  [['name', 'last', 'testemail.com', 'boat', 'black pearl', '110ft'], 'Please enter a valid email'],
  [['name', 'last', 'test@email.com', 'boat', 'black pearl', 'zero ft'], 'Please enter a number for vehicle length']
];

test.each(rowData)(
    "rowInvalid passes for client data array %j with result %j",
    (fixture, result) => expect(rowInvalid(fixture)).toBe(result)
);

test('createClient returns correctly formatted clinet object', () => {
  expect(createClient(['Jack', 'Sparrow', 'test@email.com', 'Boat', 'black pearl', '110ft'])).toStrictEqual({
    name: 'Jack Sparrow',
    email: 'test@email.com',
    vType: 'boat',
    vName: 'black pearl',
    vLength: "110'"
  })
})

const fileData = [
  [['Jack,Sparrow,test@email.com,boat,black pearl,110ft'],
    {
      status: 'ok',
      data: [{
        name: 'Jack Sparrow',
        email: 'test@email.com',
        vType: 'boat',
        vName: 'black pearl',
        vLength: "110'"
      }]
    }
  ],
  [['Jack|Sparrow|test@email.com|boat|black pearl|110ft'],
    {
      status: 'ok',
      data: [{
        name: 'Jack Sparrow',
        email: 'test@email.com',
        vType: 'boat',
        vName: 'black pearl',
        vLength: "110'"
      }]
    }
  ],
  [['|last|test@email.com|boat|black pearl|110ft',
    'Jack|Sparrow|testemail.com|boat|black pearl|110ft',
    'Jack|Sparrow|test@email.com|boat|black pearl|zero ft'
    ],
    {
      status: 'error',
      data: [
        'Row 1: Please fill out missing information',
        'Row 2: Please enter a valid email',
        'Row 3: Please enter a number for vehicle length'
      ]
    }
  ],
];

test.each(fileData)(
    "validateFile passes for flie data %j with result %j",
    (fixture, result) => expect(validateFile(fixture)).toStrictEqual(result)
);
