import Express from "express";
import Tags from "../../../models/tags";
import { responseClient } from "../../util";

const router = Express.Router();

router.get("/delTag", (req, res) => {
  let { name } = req.query;
  Tags.deleteOne({ name })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, 0, "删除成功！");
      } else {
        responseClient(res, 200, 1, "标签不存在");
      }
    })
    .catch(err => {
      responseClient(res);
    });
});

router.post("/addTag", (req, res) => {
  let { name } = req.body;
  Tags.findOne({ name })
    .then(result => {
      if (!result) {
        let tag = new Tags({
          name
        });
        tag
          .save()
          .then(data => {
            responseClient(res, 200, 0, "添加成功", data);
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      responseClient(err);
    });
});

module.exports = router;
