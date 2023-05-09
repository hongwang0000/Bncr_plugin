/**
 * @author Doraemon
 * @name 常规签到扫描
 * @origin 红灯区
 * @version 1.0.6
 * @description 扫描某文档当天签到token
 * @rule ^(qdscan)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
       常规签到扫描.js 放到自用插件中

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
*/

 const AmTool = require("../红灯区/mod/AmTool");

 // 自定义签到监控别名 （如 1天1豆）
 const globalAlias = '1天1豆'

 // 自定义撤回时间
 const waitObj = { wait: 10 }

 // 文档地址（自己找文档地址）
 const url = '';

 // 如果你要取 2天 3天的数据，则填 2,3
 const regex = [2];

 // 份数，如填50，则只筛选50份以上的数据
 const globalLimit = 0;

 // 支持自定义时间：如4月25 （冗余，默认留空）
 const customDate = '';

 //插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a042039b2b84883e10bd79437f9acf9d4ef272cbebd9c299390ba6d1af805ee5c4142ca2a0ca7599a539c61d4e969192ecaa86b954f87ff5e0a303272da8899f1a9e017a62f71144e37f3d6816769fae089dc06cb84343b52b2eb2d9a2d6c86767aa334bfca599daa0850d8903b31a98f6384a7e646c0d47b248f877109c2f298fdfb5de600cdbb3f7bd0d8b465a47a9ea80f9e7d83edfbe6b1243671b071f87614055d51fad68ce3c42e92326f016741a362e1af458a9fec102dce51b11028f4b73e1ea9d6859bc09f914968965093d23a7acb4e091e7c8a17f7bdcdde2a3356fa299ba3cbf7d7af443085cff8f3f542380608ccafdb1923570d4d7608fbac787fe1a2821f7db354d2e4bb15a54636e6d6c77663666d19520241fefb9b500aaf9226ce34f4d7fc266dda4fed87248cfc08769accea23b4c161da544dc91be7654dda79896e39706be7038d3cf72d900292c2eb17eb8e5fe74f5d4b869e366699b8cfc55532cbe3298f94fb8779a89fe8d9ffe55556647e2321812ffde3bcb7f93068120bbf548fde7242b7fb1622031635c8ee7fabcc9e330da2216d584c154259f026f68bb23b806c7e57fa4594894c9bd27b728a0b86be172bcf8ad82219c650176b39dd21e1a75e9f2be6c4c1229e74c2b24542d59d84d528bf5a661b010ad0a731ff45e5d621a17e179d0dff0f564eb121e65c1f327665a6c086c2efcb1651472d2f84d92122453ff128a3a0f94e911ebb06faf56458286b1f51efcca1002ee98e5eff5e69428a5a5b3e6ce2e9a3a375e39148aea003b9838c240ca91c853e84284e48a8ed36a77d92d283d2ce6a4744c1b48912f85256d6c7ca4fea090f3727bf0582940c6f43c08e1a6dc007b3b7ce4c6b6f1d4bd7a6f23abb2d2178874619bb0e7275fb308ddf7296e7fa753e83a30190093c6b38cfe7267704989dd3c984801fefef31dab9ee6d36ae11af457fb1eda6dfb345256ab64cac7d5801fd21529e3e63847134fc1e2b37c7cf2d9e67a8aa92771b20aaa2fc2785106350d3c5bf3ee5aaea4a361066ed90a3f1f6d51c346ac4b80bfb8659b6970086010e03746a4c6802693300f8ea10fee682ea8b3a22d6676b13c23fbbc2d1bfd12e2475e9efb28be1e3910ec2e461e501a91f7c2b34c0acf1324e9b8aaa280c8fc0ac723cd324ada41381e93f9f902bebc6f1d6043cb8fcf155a843962abf68234087aa6f8a1a7ca61304eae2d31a930c207542d036b4310b817e6598b5e1ac749297b69ab39dbb23d05113a11d2729962ab4ef5018e1fc8c1fc80e8ba041c813067354e89a4e87c6cc155dbcd594fa2ae51e5a96847a3652b281c9384ca6261fd04aaa4b668ee16144003f8cb71b9085ec6d9aa8a2260a2b8ff899df9d57e9554c2c71fcaee539be65b50864a1543f83cd2b9aa16db8830b8aa1ee231220f7e0c3df13e71e342ce121bc562f097bb754d9a5c35ee52de276367bc2308088c83137cc86e2657b21412bfc9800312f8a67c004a12c9bebf79008f9a82393f7656481b6690c41600d32e6c8119a868a5ef77e72ba0415d5cf36625d0bed7be288deeeff22715029979bf349c61193186000c3579fdfa24b749d8760a34ea204d97ad299acedd0baba48308920cf7a2c7b0245b215ad15dca19821d52eaeaf40971db855f766fd8d4bd97c3bcbc71fe413e571990bafa254dfb17dabf2b1314aea27189a5d231d1a6cd5ac6df1119cb71ce4e2101da1291aedb56c86cc9ac7865c148270378b785c3608514ec88c2a050605a317d210e0e79a55cbe04782e4684acef10d4b3458fc9b7794ece5cd1af80c853acafe949459412aa9f9727d30cd493ccd8219d9e6ced58f33b1811c2157a76e84a8c8ae796ec3624a30e04b9dbd9bfcc4bc2edcb3cc0a21e65b86220c366d9e15904698163cbdcde9d6400bd0d354ec34c74a0207a890a947cfa45fdd47d143797c9913fda60d35f3c4281abc1182deb5985b5178c864ea28549b8e44a29161d2faafa94e52a4019ea18cc17dc1976cf233e8d3771cea8a0fbd2adc64435c6e131b6e7966d10381e3e642b9e5d1eb012c23100b0dd57aea5f9c46c1dab460c102baf916071ef04241746e84d799ba0795fe5e07ec74003ef7adb503ccbbea68bc5b5ea1b3409a42d60818a459f2b3741cc1b6a92b954d35cd437136d880a2a98fd1f746c2eec9518681d078ab2838bb0101e4c254ddf422633cc09cdbd39755a3d00ef5965245f9d418896533c52740a215721617766cdb6f85e735b785ebd89dac15f8b787d27bba538bed9d084b412520e32d698df20bc9b37fdea9ceadb22773f620b2a6ccf362c949d104b0f8843258dc79b1b5c14fe7d687aee405816b0bfbd7406aaf4e10396483adea481d3f61ba90660286558e1ac698d184b0263dc68fd371a34648025cb293f1aeeb88803ec1ecf7717ced9be5dbe6f1600fa1c95e61617d2983cc9b3f94ae8405fbdc47607ae8de75307ed3453c27e593fcabdee8e8b0ab520ec61342dcd124af1c9297956f7c59fd811f448492d4331435a1b23b69b974d8083ced47859776a9d3b0a9c0dfc500f7b6aea9debb8801ab88cdea3167f2ec19fbff049fbd21abeee2a7213cf00b96830d633d401b400180cc6f24fe505ed29ec64da159dda2ec0df0945cb7ae2736f3128a1bbbdc01328e08ed3ef593eb600c8db789fdb00b591ddb148d28db13eaaa9279c5d6262111e703238567073e3ff22a4c1201673bb3666e2ccb240229db534077b5f466669374dbc52a55f5cb838b190c484e34e3b37588038417d9e8560c6f5725d124c67fec0f734121ae89195a30b77be14a8f180ce6a9f2ded3db7bc91f6c644e7f4a68176bffa0bf14e94978b4f5f1f48c202b15ebcb5659bf8a3db84cb67b9909d82fb8e5bfc03d4d022386b7b5acc618149009b65ec9c6802279efb7d610877eedea1dfbbc6c23e0f41ce192e43aa08eaa348c4af34fecf39d00cbe16ff28f3ac98e28b9f66ea3bda7e69aa] */

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
 