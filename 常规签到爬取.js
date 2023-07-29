/**
 * @author Doraemon
 * @name 常规签到爬取
 * @origin 红灯区
 * @version 1.1.2
 * @description 扫描某文档当天签到token
 * @rule ^(qdscan)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件

       常规签到扫描.js 放到自用插件中

    2、设置一些的变量

      （默认1天1豆）自定义签到监控别名
        set Doraemon regular_sign_scraping_alias xxx  

      （默认10s）自定义撤回时间
        set Doraemon regular_sign_scraping_wait xxx   
          
      （默认0）份数，如填50，则只筛选50份以上的数据 
        set Doraemon regular_sign_scraping_limit xxx 

      必填 文档地址（自己找文档地址）
        set Doraemon regular_sign_scraping_url xxx    

      如果你要取 2天 3天的数据，则填 2,3 （默认 2,3,4,5,6,7,8,9,10,20,30）
        set Doraemon regular_sign_scraping_regex xxx

      支持自定义时间：如4月25 （冗余，默认留空）
        set Doraemon regular_sign_scraping_custom_date xxx

        如果要删除命令： del Doraemon regular_sign_scraping_custom_date

      支持只取扫描结果的指定数量，比如扫到20个，你只想要保留7个（默认1000）
        set Doraemon regular_sign_scraping_result_limit 7

  ----------------------

  注意：
   1、简单测试可用
   2、无界超授可用
   3、自用插件
  ----------------------

  功能：
    1、每日定时扫描某常规签到token文档，自动匹配相关数据，省去人工的操作 （已实现）
    2、自动内联执行命令，触发 红灯区 店铺签到监控.js，执行相关任务 （已实现）
    3、通过自定义正则匹配 xxx份数据（份数太少，签了没意义 ）  （已实现）
    4、通过自定义设置匹配 具体的天数，比如我只要签2天的线报 （已实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
      v1.0.1 支持份数筛选
      2023.4.28 v1.0.2 支持处理未知深度的链接 比如 3天10豆下有多个链接
      2023.4.29 v1.0.3 支持一个线报中，多份数的过滤 如 3天10豆 7天100豆 100+50份，就按照总份数
      2023.5.5 v1.0.4 线报天数（regex） 支持一位或者多位
      2023.5.5 v1.0.5 内联执行 店铺签到清理 命令，具体功能详见 红灯区 - 店铺签到监控
      2023.5.6 v1.0.6 修改加密导致的bug
      2023.5.13 v1.0.7 修复cron 内联执行 店铺签到清理 造成的死循环问题， 改成静默执行
      2023.5.14 v1.0.8 所有参数改为读取内置数据库
      2023.5.15 v1.0.9 本地最新版本
      2023.6.27 v1.1.0 支持只取扫描结果的指定数量，比如扫到20个，你只想要保留7个
      2023.7.8  v1.1.1 regular_sign_scraping_regex 取消必填，有默认值
      2023.7.29 v1.1.2 优化线报无份数时的处理
*/

//插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203e718ff222f9d0ceb298295aedf4e5c07fd2ee38f9e0975c19ad3328f204b4db5d43b681c2cf4271b7c40617e0d98e1de283a31bbad3a5dc7dd9aca0094d6a7fb9bd1c3445e7cb1b757d045820cbdec0f6d824cdb6a916cee7d81996f34be4bf7e18e428c268327ef7fde8f4d4a3a3147c59a47d73845e937105d3ab7be0c7ec0c7136d53805b682421502dda8c403bb669692bf5f298271bcf89f5bfef3d6e4b455856358a891ccf6749bdd34c7019d2816f6d74c03fc2b92606f1772aa9cebd2f7ce1358930ff3ed52ce14df859fae2364105e4955a58acf618744ad1e688bb8d7fcab63269871e36e0a5c44803a5bdaaf61569c23a8f13dc5bd96d290f9c6a6d715b3d1084e832294da81cc0c12b2aa5c42ba0f82b725e8687a84d89c47f0f109d74f75eda4338b2478574a935ea9d962387bc76771907efe2b3feb93b3f32bce06b9f77e8039af6bbbdea97372273789d71e59edb3e221206ab2efe5538e224f87c3296a61fe62f5c516816f712ea61109eae3a30ef0c6b4f7c3cad9ed5c0a3d12e0493cbb1563416f0a191ee847db3c4f1b8c09a20b6afb1718444a7ea28bea74ecd8469ceca0d7f27705ec19993c658085c8744d8b872c6c1f4234d90cb2bda3ab0cd750acb40d7cd0f438dfb8b30877c26e32eb36fdb2935c80e7dae80ac754fecd9dbbe19d618909cf0d2e7cc42b3720a0d82f624ffe16ea2dd74dac3a58ade9afad9a7515b8409d75193c1796a373bbe0544100efe0f189eb71b5b68573a796290823c7e9841f8df393280923d2c2b219a00be34075be5cae16aec9980665b3671c6f11c3f9d26b9de266cf29de5fd1440fc9f5c19061f7f297fe3134e6cae65e8ccfef12bd7953620d1f41946571eaecd8472268d0ceb7b27d4e1e95ab09979e797adbf7dfb56c43d12f06ee80da70221d5a013b6d4c05fca73f6f388defdb0f0d5453fc75249b696d8c56498cdecf6a57ff6ce0de45cc724399acbf0d6c7023b4314d33cee1ffdc23ee0e079059a310e9083b904ecac039e452eadbfaf7c35f6bffd8dfd7848905dbc8ab1799c0b8a7964afc34a391c678fdcc5e2552ce6a42764a3d971211cea01c798a12bdf13895ff229881db31e1902be37de8f42f87c8b8272a3150a22bacfb09f14d17167a23e2a207f84c993f8c51f72a4647d8ea69c68726c627bd7ae46f9839ddcadd6130ba74c545d944ebcf1d5db797e1e4082098dcf683b867fbfac2533e60e792ad4537171aab604adfccfeaa22a07e7a2300bb723018ba356eb11d9ed749c8b2c992bdf8561c3e779782624bae140fcb922be6bc391161b723c433552d7663424823ddac9c3e6e8fa813dcd22f07bb8ec79d439ca2186a8af0510e158672735ca864ccfad12b4ecfb73b574e86d7c0dd33a3d4aa73255f368caf040714a3986edb56ac7bf96565d1c36da6c8b94d65ce9ed53ec1b556a22174f43cbd3f6133b6ef7dfcd8a3656b56cd6596450f7e13da8543b0a10b66d2a842a774464472c80d47fd89bd150bb089a8c679ffb0c33c5d0df666b591f0e3bf9d419eb437315cb65dea5e355c0244b12fcda72e53990d9121d6a8358e68605d09f080aea7ed1717e7aa12494743f7622e7c34f49ec4b8211fe2d67852bc0c78c0173270b135889442501f5894a070ee2fbdbed55c8400a5592c5f38a4c7a4c916a7cd44374251e55302ae4c94006acc579df0fd59b73b90998b10a144467027be193a665f2f50b3a93682eadeec039de799375b7d23d398cff3fb7f54266e63168814d2396b06d55590b21aac4138aa9604a9a072f603113be52e835e2640271a723b8389ca0b8c16c79701b5636be990fa6a3129ddd7b66f37b5956f69a2ba360f35aac0714c8af6158a19702231cd1d69e0dfbafe68ea165046634c325653b51dcbc831fbbd8e2038a9dffbb58efbcecc3c29b2845e7f391a91ea22d5c035182e428743a88a75ee36d83a10f7d7889f8365a743085ab97f33422360c14d353ec9ba17d87182d80c5132e39a7ff68278e1e554f87ee3782f9a365d4be25bb926d8644f72fbfd13a27b8e684974d06b26b0b53b80e1d5c3f94c7b0bdee11978d28352d2864efab8bdc99f2ef0fce330ce706652996ce8a14a9b85a424c20405c2253dcb0b00a44ce0e1fafe811bf41bd1dff64a66e07be16f1cbd9e798318047a155e54e74c56455aab818a1c0d32da61a8534360e04a51dfcda83b28f6061ffaaf3015c59deea2d479708c66b3d95b9b61e317173a64e859490147dee9458367114e67b90143ec8d1bb06239153d05066f36d0e433dc672b435540bbde947c23aaad68bb7667646baeb3e81d3feec5ef6a873a677861143e98045e4a39bcdecd745a61abc2eb2679d0a883d00c652d411cb035c1dc8d9a6660d1ff4c358c92d92a138b7df8dd22b8f3a22f7c72e2b952f4897c979eedf312df4a368ed81100dd61cea0a4ee9969ed6d382d94234393dd778bba27619d051d344bdf4e0a0499f7156e04b78d72e0e2406ccc0151956189e8fa2fd6fae9c6c31369cdef4893c6818b1c40ad4a63a9a68efb4bbf46937953b0ef0f4fb620c87e963ca4d371c910f7f277c5f547eb675c98ab45602c38ef95dc926f732e08ad74ee53daf212b00f4e36529b08722d362e2846f7587de47c019f6eb3a92105b52685a13aa6f1640661046f4571c169acd805efe79ce119392b87df17cac481ebaa9110530e8754459217c6505b69d35de48078a4025c01ae8d160fc6f45e610961cbffc7e1a694bf1bb20f6886b213393f1b8ad4767d420b9625c3e4742dd640db65eb475b773e44fa6bf33db1b210d05a93ce84c5f6c8a9a137e95cb815690393ad8d1b68e56990e1ae79bdeb8723d4c2ae6def3e479697a28f1772948e93acbe1efc823f35321241f1846e5c7ccfef4cb1cdc979cf2cc70df72e24b9def99042280d18b37ff1667ab580e03afb6acf02777687cebef3d956c7ed71261efa0ca546baca321a170d2893bc6d82ec6e238fb9364a3cd8e4dfa666e3ae1a4f7e01d8b6f772bfdbdeec117782a340ad6fb5833e42a0bd15254780ee658ed7961a1afa78445709aef8cdbd33640d87b143c410fa37aa9eb9b609e7d2ed253ca4daba3209e29ebb77f3a2ef0bd7f5822430b5e8567e7a622faa560d1e91e66c7df37adbc3072c062abd2c001f4524f67016c02419c41e3650d43b76f2def26f36a3c5d16185c9c81b12003e60476aca85ddd1ed44057084dec8e1c9c83339814290a04acc7baf267f5cf9f5bba4190aec4efe61bca0e4668a5930b50dd1b46f221f808d85ad20f7a13f9689ca2c8dca275a5ab9ca688b17c6a166b39139185dcfc0489cbfd5bdade3a4b8adeb89a7ab0439a90b302f2516d77437d8d395707f95bd80e7a82a6fb615d3d50e3454b41cfdba266525742387dc5c16ba157c50e0ef67250426652711191bf677f05331fb1f695940317cac44c1d9c9c9c6fdc426fa146d031b2efd425e920cd2a1ae82fa07f3dcfa7061799e6d13476e6ba1d4ff026dc883b7c842c95ce782a53cfd09e619ea22210e70a79016e5285e54dfad6edc20cbed400c8e8d5d3d3b72493534e28f7e717203fa5dbee5d04768ab4abd2f40d8804ea75c30299bf59306835a66643032c6d66c611946dd59aa4b1d60e06ed97996d96507ea98793a00be24b4f474b60819681a63fe630fe293a791d108d2400b82ae1cfaa560de5ac4efeca4e6e47bb19e4342004ffa90ff440c765c1670b3438183380a1be0fae8a9fd68ff8e5ddf07ab49f964a1de483ee5547a19807f72522d9e562778a6ea768a74e78360ede70ebdaf3b2ab130016a819ace85245efff2ee9f8fa0d6cf968d3c40341e6bef38dde44a0bf1af10d6d833ef87dd8ce4379b8de537cba2ee46b130c6903c8076ee06525fffa96c56be3742b627013d9bb689683914dba72744d708b0c47fdadc2e61557eb190d4d68facdde1d2ba5795d6316e4f7ab3e5e74dfd097761586ae1c06439f3cedef7eb68a2035e32122ecca84f36f0920eee1331ec70cbebf9bfa9a4571c45a0e8bd29226c1e1ec8aeee20f0e38000ae28ed111bc0922413258f1ef90751cc5d2c38388c9f9372b9f90f5806443e62b3bac52f7cbbee44467545ec28f0e629c368c1b45dd63ce9b07363f7adeebabf439524cca20bfe3aecf5d6776ae511699708666e1a68e36dc8d9ec07b70fa6e9fa84a576169518011517eafa98c9cc113822934349d22e6306c0df80270d50665efb050b57d338b12291d6e188a45ddf8d03f2bc50c90f3c578d27c031849b34b408a4e0a4951a1ed9c5189da] */

  /**
   * 递归查询
   * @param {*} nextP nextP
   * @param {*} result result
   * @returns 
   */
  function extractLinks(nextP, result) {
    if (nextP.text().match(/https:\/\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\*\+,%;\=]*/)) {
      result.push(nextP.text().trim());
      return extractLinks(nextP.next('p'), result);
    }
    return result;
  }
};
 