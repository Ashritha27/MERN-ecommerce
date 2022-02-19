import bcrypt from 'bcryptjs';

const data = {
    users : [
        {
            name:"Tom",
            email:"Tom@gmail.com",
            password:bcrypt.hashSync("Tom"),
            isAdmin:true

        },
        {
            name:"Jerry",
            email:"Jerry@gmail.com",
            password:bcrypt.hashSync("Jerry"),
            isAdmin:false

        }
    ],
    products : [
        {
            name : 'Nike Shoes',
            slug: 'nike-shoes',
            category:'Shoes',
            images:'/logo512.png',
            price:1200,
            countInStock : 10,
            brand:'Nike',
            rating: 4.5,
            numReviews: 120,
            description :'high qul;aity shoes'
        },
        {
         
            name : 'Adidas Tshirts',
            slug: 'Adidas-Tshirts',
            category:'Tshirts',
            images:'/logo512.png',
            price:1200,
            countInStock : 0,
            brand:'Adidas',
            rating: 4.5,
            numReviews: 120,
            description :'high qul;aity Tshirts'
        },
        {
     
            name : 'Reebok Tshirts',
            slug: 'Reebok-Tshirts',
            category:'Tshirts',
            images:'/logo512.png',
            price:1200,
            countInStock : 10,
            brand:'Reebok',
            rating: 4.5,
            numReviews: 120,
            description :'high qul;aity Tshirts'
        },
        {
       
            name : 'Puma Tshirts',
            slug: 'Puma-Tshirts',
            category:'Tshirts',
            images:'/logo512.png',
            price:1200,
            countInStock : 10,
            brand:'Puma',
            rating: 4.5,
            numReviews: 120,
            description :'high qul;aity Tshirts'
        },
        {
         
            name : 'Puma Tshirts',
            slug: 'Pa-Tshirts',
            category:'Tshirts',
            images:'/logo512.png',
            price:1200,
            countInStock : 10,
            brand:'Puma',
            rating: 4.5,
            numReviews: 120,
            description :'high qul;aity Tshirts'
        },
        {
     
            name : 'Puma Tshirts',
            slug: 'Pu-Tshirts',
            category:'Tshirts',
            images:'/logo512.png',
            price:1200,
            countInStock : 10,
            brand:'Puma',
            rating: 4.5,
            numReviews: 120,
            description :'high qul;aity Tshirts'
        }
    ]
}

export default data;