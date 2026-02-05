const PBmodel = require("../models/model.js");
const getCurrentTime = require("../currentTime.js");
const create = async (req, res) => {
  const { content, expiredAt, max_views } = req.body;

  if (!content) {
    return res.status(402).json({ msg: "invalid inputs" });
  }

  const paste = new PBmodel({
    content,
    expiredAt: expiredAt ? Date.now() + expiredAt * 1000 : null,
    max_views,
    id: `paste_${Date.now()}`,
  });
  await paste.save();

  res.status(201).json({
    id: paste.id,
    url: `https://paste-bin-b.vercel.app/p/${paste.id}`,
  });
};
const healthz = async (req, res) => {
  res.status(200).json({ ok: true });
};

const view = async (req, res) => {
  const pasteId = req.params.id;
  console.log(pasteId);

  const paste = await PBmodel.findOne({ id: pasteId });

  if (!paste) {
    return res.status(404).json({ msg: "content id not match" });
  }
  if (paste.max_views && (paste.max_views > paste.currentViews)) {
    return res.status(403).json({ msg: "you have reached out maximum views" });
  }
  if (paste.expiredAt !== null) {
    // console.log(paste.expiredAt);

    if (paste.expiredAt < Date.now()) {
      return res.status(403).json({ msg: "content expired" });
    }
  }

  res
    .status(200)
    .json({
      content: paste.content,
      expiredAt: paste.expiredAt ? new Date(paste.expiredAt) : "never expired",
      viewsLeft:
        paste.max_views !== null
          ? paste.max_views - paste.currentViews
          : "unlimitted",
    });
  paste.currentViews = paste.currentViews + 1;
  await paste.save().catch((e) => console.log(e.message));
};

const viewHTML = async (req, res) => {
  const pasteId = req.params.id;
  console.log(pasteId);

  const paste = await PBmodel.findOne({ id: pasteId });

  if (!paste) {
    return res.status(404).header({ "content-type": "HTML" }).send(`<html>
    <title>Paste</title>
    <body>
      <h1 style="color:red">content id not match</h1>
    </body>
  </html>`);
  }

  if (paste.max_views && (paste.max_views > paste.currentViews)) {
    return res.status(404).send(`<html>
    <title>Paste</title>
    <body>
      <h1 style="color:red">you have reached out maximum views</h1>
    </body>
  </html>`);
  }
  if (paste.expiredAt !== null) {
    console.log(paste.expiredAt);
    if (paste.expiredAt < Date.now()) {
      return res.status(404).header({ "content-type": "HTML" }).send(`<html>
    <title>Paste</title>
    <body>
      <h1 style="color:red">content expired ${new Date(paste.expiredAt)}</h1>
    </body>
  </html>`);
    }
  }

  res.status(200).send(`<html>
    <title>Psate</title>
    <body>
      <h1 style="color:green">${paste.content}</h1>
    </body>
  </html>`);
  paste.currentViews = paste.currentViews + 1;
  await paste.save();
};

module.exports = { healthz, create, view, viewHTML };
