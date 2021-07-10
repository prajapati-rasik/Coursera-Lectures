const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end("will send all the promotions to you");
  })

  .post((req, res, next) => {
    res.end(
      "will add the promotion: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put not supported");
  })

  .delete((req, res, next) => {
    res.end("Deleting all the promotions!");
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    res.end(
      "will send details of the promotion: " + req.params.promoId + " to you!"
    );
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("post not supported");
  })

  .put((req, res, next) => {
    res.write(
      "updating details of the promotion: " + req.params.promoId + "\n"
    );
    res.end(
      "will update the promotion: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting promotion: " + req.params.promoId);
  });

module.exports = promoRouter;
