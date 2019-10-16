var express = require('express');
var router = express.Router();
const queries = require('../queries');
const path = require('path');

router.post('/create',function(req,res){
    console.log("Inside Create Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    queries.createRestaurant(restaurant, result => {
        console.log("Number of records inserted: " + result.affectedRows);
        res.status(200).send({message:'Restaurant created'});
    }, err => {
        if(err.code === 'ER_DUP_ENTRY'){
            res.status(401).send({ message: 'A restaurant with this name already exists.' });
        }else{
            res.status(500).send({ message: `Something failed when inserting record. ${err.message}`});
        }
    });
});

router.post('/update',function(req,res){
    console.log("Inside Update Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    queries.updateRestaurant(restaurant, result => {
        console.log("Number of records updated: " + result.affectedRows);
        res.status(200).send({message:'Restaurant updated'});
    }, err => {
       res.status(500).send({ message: `Something failed when updating record. ${err.message}`});
        
    });
});

router.post('/addSection',function(req,res){
    console.log("Inside Restaurant Add Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    queries.getRestaurantIdByOwnerId(req.cookies.cookie.id, result=> {
        queries.addSection({restId: result.id, name: section.name}, row => {
            console.log("Number of records added: " + row.affectedRows);
            res.status(200).send({message:'Section added', id: row.insertId, restId: result.id});
        }, err=>{
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ success: false, message: 'Section with the same name already exists' });
            }else{
                res.status(500).send({ message: `Something failed when adding section in the table. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
    });
});

router.get('/sections',function(req,res){
    console.log("Inside Restaurant Sections Get Request");
    console.log("Req Query : ",req.query);

    if(req.query.restId){
        queries.getSectionByRestaurantId(req.query.restId, row => {
            res.status(200).json({success: true, sections: row});
        }, err=>{
            res.status(500).send({ message: `Something failed when getting sections from the table. ${err.message}`});
        });
    } else {
        queries.getRestaurantIdByOwnerId(req.cookies.cookie.id, result=> {
            queries.getSectionByRestaurantId(result.id, row => {
                res.status(200).json({success: true, sections: row});
            }, err=>{
                res.status(500).send({ message: `Something failed when getting sections from the table. ${err.message}`});
            });
        }, err => {
            res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
        });
    }
    
});

// router.get('/sections/:restId',function(req,res){
//     console.log("Inside Restaurant Sections Get Request");
//     console.log("Req Params : ",req.params);

//     let restId = req.params.restId;
//     queries.getRestaurantIdByOwnerId(restId, result=> {
//         queries.getSectionByRestaurantId(result.id, row => {
//             res.status(200).json({success: true, sections: row});
//         }, err=>{
//             res.status(500).send({ message: `Something failed when getting sections from the table. ${err.message}`});
//         });
//     }, err => {
//         res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
//     });
// });

router.post('/deleteSection',function(req,res){
    console.log("Inside Restaurant Delete Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    queries.deleteMenuBySectionId(section.id, result => {
        console.log("Number of menus deleted: " + result.affectedRows);
        queries.deleteSection(section.id, row => {
            console.log("Number of section deleted: " + row.affectedRows);
            res.status(200).send({message:'Section deleted'});
        }, err => {
            res.status(500).send({ message: `Something failed when deleting section from the table. ${err.message}`});
        });
    }, err => {
        res.status(500).send({ message: `Something failed when deleting menu from the table. ${err.message}`});
    });
});

router.post('/updateSection',function(req,res){
    console.log("Inside Restaurant Update Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    queries.updateSection(section, result => {
        console.log("Number of section updates: " + result.affectedRows);
        res.status(200).send({message:'Section updated'});
    }, err => {
        if(err.code === 'ER_DUP_ENTRY'){
            res.status(401).send({ message: 'A section with this name already exists.' });
        } else {
            res.status(500).send({ message: `Something failed when updating section in the table. ${err.message}`});
        }
    })
});

router.post('/addMenu',function(req,res){
    console.log("Inside Restaurant Add Section Post Request");
    console.log("Req Body : ",req.body);
    const menu = req.body;

    queries.getRestaurantIdByOwnerId(req.cookies.cookie.id, result=> {
        queries.addMenu({restId: result.id, sectionId: menu.sectionId, name: menu.name, 
        description: menu.description, price: menu.price}, row => {
            console.log("Number of records added: " + row.affectedRows);
            res.status(200).send({message:'Menu added', menuId: row.insertId, restId: result.id});
        }, err=>{
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ success: false, message: 'Menu with the same name already exists' });
            }else{
                res.status(500).send({ message: `Something failed when adding menu in the table. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
    });
});

router.get('/menus',function(req,res){
    console.log("Inside Restaurant Menus Get Request");
    console.log("Req Body : ",req.body);

    queries.getRestaurantIdByOwnerId(req.cookies.cookie.id, result=> {
        queries.getMenuByRestaurantId(result.id, row => {
            res.status(200).json({success: true, menus: row});
        }, err=>{
            res.status(500).send({ message: `Something failed when getting menus from the table. ${err.message}`});
        });
    }, err => {
        res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
    });
});

router.get('/menuItems/:restId',function(req,res){
    console.log("Inside Restaurant Menu Items Get Request");
    console.log("Req Params : ",req.params);

    let restId = req.params.restId;

    queries.getMenuByRestaurantId(restId, row => {
        console.log(row);
        res.status(200).json({success: true, items: row});
    }, err=>{
        res.status(500).send({ message: `Something failed when getting menu items from the table. ${err.message}`});
    });
});

router.get('/menuImage/:id',function(req,res){
    console.log("Inside Restaurant Menus pic Get Request");
    console.log("Req Body : ",req.body);

    let id = req.params.id;

    queries.getMenuImageNameById(id, row => {
        res.sendFile(path.join(__dirname, `../uploads/${row.image}`));
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when reading menu image from the table. ${err}`});
    })
});

router.post('/deleteMenu',function(req,res){
    console.log("Inside Restaurant Delete Menu Post Request");
    console.log("Req Body : ",req.body);
    const menu = req.body;

    queries.deleteMenuByMenuId(menu.id, result => {
        console.log("Number of menus deleted: " + result.affectedRows);
        res.status(200).send({message:'Menu deleted'});
    }, err => {
        res.status(500).send({ message: `Something failed when deleting menu from the table. ${err.message}`});
    });
});

router.post('/updateMenu',function(req,res){
    console.log("Inside Restaurant Update Section Post Request");
    console.log("Req Body : ",req.body);
    const menu = req.body;

    queries.updateMenu(menu, result => {
        console.log("Number of section updates: " + result.affectedRows);
        res.status(200).send({message:'Menu updated'});
    }, err => {
        if(err.code === 'ER_DUP_ENTRY'){
            res.status(401).send({ message: 'A menu with this name already exists.' });
        } else {
            res.status(500).send({ message: `Something failed when updating menu in the table. ${err.message}`});
        }
    })
});

router.get('/allOrders',function(req,res){
    console.log("Inside Restaurant All Orders Get Request");
    console.log("Req Body : ",req.body);
    
    queries.getAllOrders(req.cookies.cookie.id, row => {
        const orders = row.map(order => {
            return {
                orderId: order.order_id, buyerName: `${order.fname} ${order.lname}`, 
                buyerAddress: order.buyer_address,
                orderPrice: order.price, orderStatus: order.status
            }
        });
        res.status(200).json({success: true, orders: orders});
    }, err=> {
        res.status(500).send({ message: `Something failed when getting order details from the table. ${err.message}`});
    });
});

router.get('/orderedItems/:orderId',function(req,res){
    console.log("Inside Restaurant Ordered Items Get Request");
    console.log("Req Body : ",req.body);
    
    let orderId = req.params.orderId;
    queries.getMenuItemsByOrderId(orderId, row => {
        res.status(200).json({success: true, menuItems: row});
    }, err=> {
        res.status(500).send({ message: `Something failed when getting menu items from the table. ${err.message}`});
    });
});

router.post('/updateOrder',function(req,res){
    console.log("Inside Restaurant Update Order Post Request");
    console.log("Req Body : ",req.body);
    const order = req.body;

    queries.updateOrderStatus(order, result => {
        console.log("Number of order updated: " + result.affectedRows);
        res.status(200).send({message:'Order updated'});
    }, err => {
        res.status(500).send({ message: `Something failed when updating order status in the table. ${err.message}`});
    })
});

router.get('/details',function(req,res){
    console.log("Inside Restaurant Details Get Request");
 
    queries.getRestaurantDetailsByOwnerId(req.cookies.cookie.id, row => {
        console.log("row= ", row);
        res.status(200).json({success: true, name: row.name, phone: row.phone, street: row.street, 
            city: row.city, state: row.state, zip: row.zip, cuisine: row.cuisine});
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when getting restaurant details. ${err}`});
    })
});

router.get('/profilePic',function(req,res){
    console.log("Inside restaurant profile pic Get Request");
 
    queries.getRestaurantImageNameByOwnerId(req.cookies.cookie.id, row => {
        res.sendFile(path.join(__dirname, `../uploads/${row.image}`));
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when reading restaurant image. ${err}`});
    })
});

router.post('/updateProfile',function(req,res){
    console.log("Inside restaurant Update Profile Post Request");
    console.log("Req Body : ",req.body);

    queries.updateBuyerProfile(req.cookies.cookie.id, req.body, sqlresult => {
        console.log("Number of records updated: " + sqlresult.affectedRows);
        res.status(200).send({message:'Restaurant profile updated succesfully.'});    
    }, err => {
        res.status(500).json(`Something wrong when updating restaurant profile. ${err}`);
    });
});

module.exports = router;