import ArticleController from "../../../../back-end/controllers/articles";
import Database from "../../../../back-end/infra/db";
import { adminAccessApi } from "../../../../back-end/security/admin.acess";

export default async function createArticle(req, res) {
  Database.dbConnect();
  const query = req.query.params;
  const article = {
    title: query[0],
    resume: query[1],
    content: req.body,
  };
  (await adminAccessApi(req.headers["x-admin-access"])) &&
  req.method === "POST" &&
  query.length === 2
    ? await ArticleController.createArticle(article, res)
    : res.status(500).end("Need all correct informations!");
}
