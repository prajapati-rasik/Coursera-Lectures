const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Favorites = require("../models/favorite");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .then(
        (favoriteList) => {
          favor = null;
          for (var i = 0; i < favoriteList.length; i++) {
            favo = favoriteList[i];
            if (favo.user.equals(req.user._id)) {
              favor = favo;
              break;
            }
          }
          if (favor == null) {
            err = new Error("favorites for user" + req.user._id + " not found");
            err.status = 404;
            return next(err);
          } else {
            fa = favor;
            Favorites.findById(fa._id)
              .populate("user")
              .populate("dishes")
              .then((favo) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favo);
              });
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .then((favorite) => {
        favor = null;
        for (var i = 0; i < favorite.length; i++) {
          favo = favorite[i];
          if (favo.user.equals(req.user._id)) {
            favor = favo;
            break;
          }
        }
        if (favor == null) {
          favv = {
            user: req.user._id,
            dishes: req.body,
          };
          Favorites.create(favv)
            .then(
              (fav) => {
                Favorites.findById(fav._id)
                  .populate("user")
                  .populate("dishes")
                  .then((favo) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favo);
                  });
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        } else {
          favorite = favor;
          favorite.dishes.push(req.body);
          favorite
            .save()
            .then(
              (fa) => {
                Favorites.findById(fa._id)
                  .populate("user")
                  .populate("dishes")
                  .then((favo) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favo);
                  });
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })

  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .then(
        (favorite) => {
          favor = null;
          for (var i = 0; i < favorite.length; i++) {
            favo = favorite[i];
            if (favo.user.equals(req.user._id)) {
              favor = favo;
              break;
            }
          }
          if (favor == null) {
            err = new Error("favorites for user" + req.user._id + " not found");
            err.status = 404;
            return next(err);
          } else {
            favor.remove();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favor);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorites) => {
          if (!favorites) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.json({ exists: false, favorites: favorites });
          } else {
            if (favorites.dishes.indexOf(req.params.dishId) < 0) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({ exists: false, favorites: favorites });
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({ exists: true, favorites: favorites });
            }
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .then(
        (favorite) => {
          favor = null;
          for (var i = 0; i < favorite.length; i++) {
            favo = favorite[i];
            if (favo.user.equals(req.user._id)) {
              favor = favo;
              break;
            }
          }
          if (favor != null) {
            favorite = favor;
            var flag = false;
            for (var i = favorite.dishes.length - 1; i >= 0; i--) {
              if (favorite.dishes[i].equals(req.params.dishId)) {
                flag = true;
                break;
              }
            }
            if (!flag) favorite.dishes.push(req.params.dishId);
            favorite.save().then(
              (fav) => {
                Favorites.findById(fav._id)
                  .populate("user")
                  .populate("dishes")
                  .then((favo) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favo);
                  });
              },
              (err) => next(err)
            );
          } else {
            favv = {
              user: req.user._id,
              dishes: [{ _id: req.params.dishId }],
            };
            Favorites.create(favv)
              .then(
                (fav) => {
                  Favorites.findById(fav._id)
                    .populate("user")
                    .populate("dishes")
                    .then((favo) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(favo);
                    });
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .then(
        (favorite) => {
          favor = null;
          for (var i = 0; i < favorite.length; i++) {
            favo = favorite[i];
            if (favo.user.equals(req.user._id)) {
              favor = favo;
              break;
            }
          }
          if (favor != null) {
            favorite = favor;
            var flag = false;
            var index = 0;
            for (var i = favorite.dishes.length - 1; i >= 0; i--) {
              if (favorite.dishes[i].equals(req.params.dishId)) {
                flag = true;
                index = i;
                break;
              }
            }
            if (flag) {
              dishList = [];
              for (var i = favorite.dishes.length - 1; i >= 0; i--) {
                if (i != index) {
                  dishList.push(favorite.dishes[i]);
                }
              }
              favorite.dishes = dishList;
              favorite.save().then(
                (fav) => {
                  Favorites.findById(fav._id)
                    .populate("user")
                    .populate("dishes")
                    .then((favo) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(favo);
                    });
                },
                (err) => next(err)
              );
            } else {
              err = new Error("dish " + req.params.dishId + " not found");
              err.status = 404;
              return next(err);
            }
          } else if (favor == null) {
            err = new Error("favorites for user" + req.user + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
