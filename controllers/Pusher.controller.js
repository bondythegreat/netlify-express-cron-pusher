var cron = require("node-cron");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1762035",
  key: "b24a038069190c25cd3b",
  secret: "3eceaebec0ccc506c170",
  cluster: "ap1",
  useTLS: true,
});

var task;

async function index(req, res, next) {
  // res.render("index", {
  //   title: "Running pusher+websocket in the background....",
  //   description: "Pusher is running every 1 min.",
  // });

  res.json({
    message: "pusher+websocket is running and push earning data every min",
    author: "bondan@senta.nu",
  });

  // send earning, random 5-20
  const now = Date.now();
  const earning = parseInt(Math.random() * (20 - 5) + 5);

  // pusher send here..
  await pusher.trigger("my-channel", "my-event", {
    datetime: now,
    earning,
  });

  try {
    task = cron.schedule("* * * * *", async () => {
      // send earning, random 5-20
      const now = Date.now();
      const earning = parseInt(Math.random() * (20 - 5) + 5);

      // pusher send here..
      await pusher.trigger("my-channel", "my-event", {
        datetime: now,
        earning,
      });
      console.log("push to pusher.. every 5 minutes", earning);
    });
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

async function stop(req, res, next) {
  res.json({
    message: "pusher+websocket is stop",
    author: "bondan@senta.nu",
  });

  try {
    task.stop();
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}
module.exports = {
  index,
  stop,
};
