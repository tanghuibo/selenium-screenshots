const { Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");

let options = new Options();
//设置无界面
options.addArguments("-headless");

function waitTime(time) {
  return new Promise((resolve, reject) => {
    console.log("等待" + time + "ms");
    setTimeout(() => {
      console.log("等待结束");
      resolve(time);
    }, time);
  });
}

async function screenshots(url, outPath) {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  driver.get(url);

  await waitTime(2000);

  driver.takeScreenshot().then(function(image, err) {
    require("fs").writeFile(outPath, image, "base64", function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("截图成功");
      }
    });
  });
}


screenshots("https://www.baidu.com", "out.png");