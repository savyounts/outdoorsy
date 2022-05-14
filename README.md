# Outdoor.sy Client Data Sorting
This is a frontend tool that allows you to upload a csv or txt file with client and vehicle data that will display in a table that can be sorted based on client name or vehicle type.  

## Project Initialization
This is a React (18.1.0) app that uses stitches.dev for styling components. To initialize the project:

1. clone git@github.com:savyounts/outdoorsy.git
2. cd outdoorsy
3. npm start

This should open your browser to localhost:3000, and the app should be displayed.

## Usage
When first coming to the site, there will not be any client data. You will see a `Choose File` button. Click on that to upload a csv or txt file. For ease of testing, I have added our two sample documents under the `/testData` directory. Once a file is chosen, click `Upload` to upload your data or if you want to choose a different file you can click `Clear`.

Once your data is uploaded, a table will display it. You will notice that `Full Name` and `Vehicle Type` have arrows next to them. If you click on either title, it will sort them alphabetically. If you click it again, it will reverse the data. The arrow will turn a light blue color to indicate that is the column that the data is being sorted by.

If you decided you want to clear all of your data, you can hit the `Clear Data` button below the table. Since you cannot undo this action, you will first need to confirm this is what you want to do in the dialog that will pop up.

## Data
When parsing the txt files, I am taking each row and creating a new `Client` object that gets passed into my local state `data` variable. Each object has a `name`, `email`, `vType` (vehicle type), `vName` (vehicle name), and `vLength` (vehicle length). The first two columns in each row are being combined to create one full name to be set as the `name` value. Vehicle type is being downcased for consistentcy and ease of sorting. And we are changing Vehicle length to be consistent by having the length end with "'" to signify feet. This is currently working with the same data given. If users were to enter lengths that were written out (ex: twenty-five feet), then we would need to go about this a different way.

Before being added to the `data` state, we are doing a few validations to make sure all the data is present, the email is valid and that there was a number entered for the vehicle length. This is assuming we are not allowing numbers written out.

We are currently just storing data in local state, if the page is refreshed, it will be lost. If we want, we can store the data in localStorage for longer persistence.

## FullStack
For this project, I chose to just to a frontend application. If I were going to create a backend to go with it I would have created two models, a `Client` model with `name`, `email`, `id`, and `vehicles` properties and a `Vehicle` model with `id`, `category`, `name`, `length`, and `client`. These models would have a one to many relationship where a client could have many vehicles. Once I had this, it would be easier to make sure that we do not have any duplicates on data uploads. For the current project, I did not check against a client's name to check for duplicates because I assumed that there could be several client records with different vehicles. If we wanted to do a more indepth search to check the user name and vehicle name of each object to make sure they were different we could, this just seemed like a better job for a backend to take care of if/when one was implemented.
