// import { sendEmail } from "@/helper/sendEmail";
// import { EmailTypes } from "@/types";

import { sendEmail } from "@/helper/sendEmail";
import { EmailTypes } from "@/types";
import { Queue, Worker } from "bullmq";


export const emailQueue = new Queue<EmailTypes>("emailQueue", {
  connection: { port: 6379, host: "127.0.0.1" },
}); // Specify Redis connection using object

const redisConfig = {
  host: "127.0.0.1",
  port: 6379,
};

const worker = new Worker(
  "emailQueue",
  async (job) => {
    // console.log(`Processing job: ${job.id}`, job.data);
    await sendEmail(job.data);
    // Your processing logic here
  },
  { connection: redisConfig }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
