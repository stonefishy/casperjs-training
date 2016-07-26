var BAIDU_URL = "http://www.baidu.com";

casper.test.begin('Senario 1: Search word in baidu homepage', function () {
    casper.start(BAIDU_URL, function() {
        test.echo("Open the baidu home page");
        
        test.assertHttpStatus(200);
        test.assertTitle("百度一下", "baidu homepage title is expected");
        test.assertExists('form[action="/s"]', "Baidu search form is found as expected");
        
        this.captureSelector('baidu-homepage.png', 'html');
    });
    
    casper.then(function () {
        this.echo("type word casperjs in baidu search");
        
        this.fill('form[action="/s"]', {
            wd: "casperjs"
        }, true);
    });
    
    casper.then(function() {
       test.assertTitle("casperjs_百度搜索", "Baidu search title is expected")
       test.assertUrlMatch(/wd=casperjs/, "search term has been submitted as expected");
       
       test.assertEval(function() {
            return __utils__.findAll("div.bdsug ul li").length === 4;
       }, "baidu search for \"casperjs\" get 4 suggest items");
       
       test.assertEval(function() {
            return __utils__.findAll("h3.t").length === 10;
       }, "baidu search for \"casperjs\" retrieves 10 results");
       
       this.captureSelector('baidu-search.png', 'html');
    });
    
    capser.then(function() {
       this.echo("click the first result link");
       this.click("div.result h3.t a"); 
    });
    
    casper.waitForPopup(/casperjs/, function () {
       this.echo("the first link is opened with a new window as expected"); 
    });
    
    casper.run(function () {
        this.echo("Test done");
        test.done();
        test.exit();
    });
})
