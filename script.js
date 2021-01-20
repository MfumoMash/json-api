const express = require('express'); //import express
const Joi = require('joi'); //import joi
const app = express(); //creates express application
app.use(express.json()); //uses the json file

//giving data to the server
const customers = [
    {Name: 'Mfumo', id: 1, dob: '1998-07-31', address: 'Pretoria sunnyside'},
    {Name: 'Fumani', id: 2, dob: '2000-01-01', address: 'Johnnesburg soweto'},
    {Name: 'Sibusiso', id: 3, dob: '2001-02-02', address: 'Johnnesburg soweto'},
    {Name: 'Nhlanhla', id: 4, dob: '2000-03-03', address: 'Johnnesburg soweto'}

]

//Read request handlers
//display a message when URL consists of

app.get('/', (req,res) => 
    
    {res.send('mfumo REST API');

});

//display the list of names when url consists of api names
app.get('/api/customers', (req, res) => {

    res.send(customers);
        

});

//Display the specific information of a customer when you mention the id
app.get('/api/customers/:id', (req,res) => {

    const customer = customers.find(c => c.id === parseInt (req.params.id));
    if (!customer) res.status(404).send ('<h2 style="font-family: Malgun Gothic; color: darkred;">NOT FOUND!!');
    res.send(customer);
});

//Create Request Handler
//Create New Customer Information
app.post('/api/customers', (req,res)=> {

    /*const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }*/
    //Increment the customer ID
    const customer = {
        id: customers.length+1,
        Name: req.body.Name
    };

    customers.push(customer);
    res.send(customer);
});
//update Request handler
//Upate Existing Customer Information
app.put('/api/customers/:id', (req,res)=>
{
    const customer = customers.find(c=> c.id === parseInt (req.params.id));
    if (!customer) res.status(404).send ('<h2 style="font-family: Malgun Gothic; color: darkred;">NOT FOUND!!');

    /*const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }*/

    customer.Name = req.body.Name;
    res.send(customer);

    
});

//Delete Request handler
//Delete customer information
app.delete('/api/customers/:id', (req,res)=> {
    
    const customer = customers.find( c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send ('<h2 style="font-family: Malgun Gothic; color: darkred;">NOT FOUND!!');
    const index = customers.indexOf(customer);
    customers.splice(index,1);
    res.send(customer);




});

//validate information
function validateCustomer(customer)
{
    const schema = {
        Name: Joi.string().min(3).required()

    };

    return Joi.validate(customer, schema);
}

//PORT environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port 8080...'));
