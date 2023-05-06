# to update/delete/patch/put the book 
# send the token in headers for example

const getBooks = () => {
    try{
        let res = fetch(api_url,{
            headers:{
                "Authorization": ${token}
            }
        })
    }
    catch(err){
        console.log(err);
    }
}

# ----------------------------------------------------




//users
{
    "name": "alex",
    "email": "alex@gmail.com",
    "password": "123alex",
    "isAdmin": false
}

//admin
{
    "name": "x",
    "email": "x@gmail.com",
    "password": "123x",
    "isAdmin": true
}

//book
{
   "title": "horror movie book yoo",
   "author": "corey",
   "category": "fiction",
   "price": 200,
   "quantity": 1
}
