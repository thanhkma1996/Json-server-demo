const faker = require('faker');
const { fake } = require('faker/locale/zh_TW');
const fs = require('fs');
// set location VietNam
faker.locale = "vi";

//Random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());


const randomCategoryList = (n) => {
    if(n <= 0) return [];

    const categoryList = [];
    //loop and push category list
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
         categoryList.push(category);
    });
        return categoryList;
}

const randomProductCategoryList = (categoryList,n) => {
     if(n <= 0) return [];
     const productCategory = [];
     for(category of categoryList) {
        Array.from(new Array(n)).forEach(() => {
            const product = {
                categoryID: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                price: Number.parseFloat(faker.commerce.price()),
                color: faker.commerce.color(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnail: faker.image.imageUrl(400,400)
            }
            productCategory.push(product);
        });
            return productCategory;
     }
    
}


//IFFE

(() => {
    const categoryList = randomCategoryList(5);
    const ProductCategoryList = randomProductCategoryList(categoryList, 6);
    // prepare db object
    const db = {
        categories: categoryList,
        product: ProductCategoryList,
        profile: {
            name: "Thanh"
        }
    }

    // write db object to db.json
    fs.writeFile("db.json",JSON.stringify(db), () => {
        console.log("General data successfully");
    })
})();