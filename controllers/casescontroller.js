const Case = require("../models/Case");
const axios = require("axios");
const cron = require("node-cron");

class CasesController {
  static async fetchCases(req, res, next) {
    try {
      let data;
      cron.schedule("59 23 * * *", async function () {
        data = await axios({
          method: "GET",
          url: "https://data.covid19.go.id/public/api/update.json",
        });
      });
     
      const latest = await Case.findAll();

      if(data){
          const payload = {
            additional: data.data.update.penambahan,
            total: data.data.update.total,
          };
    
          if (
            latest.length < 1 ||
            latest[latest.length - 1].additional.created !==
              data.data.update.penambahan.created
          ) {
            const cases = Case.insertCases(payload);
            const updated = await Case.findAll();
            res.status(201).json(updated);
            console.log(`There's An New Update for Covid Cases`);
          }
      } else {
        console.log(`There's No New Update for Covid Cases`);
        res.status(201).json(latest);
      }

    } catch (err) {
        console.log(err);
      res.status(500).json({ message: `Internal Server Error` });
    }
  }

  static async findAllCases(req, res) {
    try {
      const cases = await Case.findAll();
      res.status(200).json(cases);
    } catch (err) {
      res.status(500).json({ message: `Internal Server Error` });
    }
  }
}

module.exports = CasesController;
