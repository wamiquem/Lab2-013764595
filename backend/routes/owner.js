var express = require('express');
var router = express.Router();
const queries = require('../queries');
const encrypt = require('../encrypt');
const path = require('path');

router.post('/signup',function(req,res){
    console.log("Inside Owner signup Post Request");
    console.log("Req Body : ",req.body);
    const owner = req.body;

    encrypt.generateHash(owner.password, hash => {
        queries.createOwner(owner, hash, result => {
            console.log("Number of records inserted: " + result.affectedRows);
            res.status(200).send({success: true, id: result.insertId, message:'Owner created'});
        }, err => {
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({success: false, message: `Email already exists. Plz sign up with a different email id. ${err.message}` });
            }else{
                res.status(500).send({success: false, message: `Something failed when inserting record. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({success: false, message: 'Something failed when gnerating hash' });
    });
});

router.post('/login',function(req,res){
    console.log("Inside Owner Login Post Request");
    console.log("Req Body : ",req.body);

    const email = req.body.email;
    const password = req.body.password;

    queries.getOwnerPasswordByEmail(email, row => {
        if(row){
            encrypt.confirmPassword(password,row.password, result => {
                if (result){
                    res.cookie('cookie',{id: row.id},{maxAge: 3600000, httpOnly: false, path : '/'});
                    req.session.user = email;
                    res.status(200).json({success: true, message: "Owner Login successful", id: row.id, firstName: row.fname});
                }else{
                    res.status(401).json({success: false, message: "Incorrect Password. Please try again"});
                }
            }, err => {
                res.status(500).json({success: false, message: "Something wrong with bcrypt"});
            });
        }else{
            res.status(401).json({success: false, message: "Email does not exists. Please try again"});
        }
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when reading the record. ${err}`});
    });
});

router.post('/updateName',function(req,res){
    console.log("Inside Update Name Post Request");
    console.log("Req Body : ",req.body);
    const owner = req.body;
    
    queries.getOwnerPasswordById(owner.id, row => {
        encrypt.confirmPassword(owner.password,row.password, result => {
            if (result){
                queries.updateOwnerName(owner, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Owner name updated successfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating owner name. ${err}`);
                })
            }else{
                res.status(401).json('Incorrect Password. Please try again');
            }
        }, err => {
            res.status(500).json(`Something wrong with bcrypt compare. ${err.message}`);
        });     
    },err => {
        res.status(500).json(`Something wrong when reading password by id. ${err.message}`);
    });
});

router.post('/updateEmail',function(req,res){
    console.log("Inside Update Email Post Request");
    console.log("Req Body : ",req.body);
    const owner = req.body;
    
    queries.getOwnerPasswordById(owner.id, row => {
        encrypt.confirmPassword(owner.password,row.password, result => {
            if (result){
                queries.updateOwnerEmail(owner, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Owner email updated succesfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating buyer email. ${err}`);
                })
            }else{
                res.status(401).json('Incorrect Password. Please try again');
            }
        }, err => {
            res.status(500).json(`Something wrong with bcrypt compare. ${err.message}`);
        });     
    },err => {
        res.status(500).json(`Something wrong when reading password by id. ${err.message}`);
    });
});

router.post('/updatePassword',function(req,res){
    console.log("Inside Update Password Post Request");
    console.log("Req Body : ",req.body);
    const owner = req.body;
    
    queries.getOwnerPasswordById(owner.id, row => {
        encrypt.confirmPassword(owner.oldPassword,row.password, result => {
            if (result){
                encrypt.generateHash(owner.newPassword, hash => {
                    queries.updateOwnerPassword({id: owner.id, password: hash}, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Owner password updated succesfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating owner password. ${err}`);
                })
                }, err => {
                    res.status(500).json(`Something wrong while bcrypt hashing. ${err}`);
                });    
            }else{
                res.status(401).json('Incorrect Old Password. Please try again');
            }
        }, err => {
            res.status(500).json(`Something wrong with bcrypt compare. ${err.message}`);
        });     
    },err => {
        res.status(500).json(`Something wrong when reading password by id. ${err.message}`);
    });
});

router.get('/firstName',function(req,res){
    console.log("Inside Owner First Name Get Request");
    console.log("Req Body : ",req.body);

    queries.getOwnerFirstNameById(req.cookies.cookie.id, row => {
        res.status(200).json({success: true, firstName: row.fname});
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when reading buyer first name. ${err}`});
    })
});

router.post('/updateProfile',function(req,res){
    console.log("Inside Owner Update Profile Post Request");
    console.log("Req Body : ",req.body);

    queries.updateOwnerProfile(req.cookies.cookie.id, req.body, sqlresult => {
        console.log("Number of records updated: " + sqlresult.affectedRows);
        res.status(200).send({message:'Owner profile updated succesfully.'});    
    }, err => {
        res.status(500).json(`Something wrong when updating owner profile. ${err}`);
    });
});

router.get('/details',function(req,res){
    console.log("Inside Owner Details Get Request");
    console.log("Req Body : ",req.body);
 
    queries.getOwnerDetailsById(req.cookies.cookie.id, row => {
        res.status(200).json({success: true, firstName: row.fname, lastName: row.lname, phone: row.phone,
            restName: row.rest_name, restZip: row.rest_zip});
    }, err => {
        res.status(200).json({success: false, message: `Something wrong when reading buyer first name. ${err}`});
    })
});

router.get('/profilePic',function(req,res){
    console.log("Inside Owner profile pic Get Request");
    console.log("Req Body : ",req.body);
 
    queries.getOwnerImageNameById(req.cookies.cookie.id, row => {
        res.sendFile(path.join(__dirname, `../uploads/${row.image}`));
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when reading owner image. ${err}`});
    })
});

router.post('/addRestaurant',function(req,res){
    console.log("Inside add Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    queries.createRestaurant(restaurant, result => {
        console.log("Number of records inserted: " + result.affectedRows);
        res.status(200).send({success: true, message:'Restaurant added successfully'});
    }, err => {
        res.status(500).send({success: false, message: `Something failed when inserting record. ${err.message}`});
    });
});

module.exports = router;