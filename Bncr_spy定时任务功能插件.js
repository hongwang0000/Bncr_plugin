/**
 * @author Doraemon
 * @name Bncr_spy定时任务功能插件
 * @origin 红灯区
 * @version 1.1.7
 * @description Bncr_spy定时任务相关功能插件
 * @rule ^(定时) (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (https:\/\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\*\+,%;\=]*)
 * @rule ^(定时) (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (export[ ]{1}[^ ]+[ ]*=[ ]*"{1}([^ "]+)"{1})
 * @rule ^(定时) ([0-9]+ [0-9]+ [0-9]+ [0-9]+ [0-9]+ \*{1}) (https:\/\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\*\+,%;\=]*)
 * @rule ^(定时) ([0-9]+ [0-9]+ [0-9]+ [0-9]+ [0-9]+ \*{1}) (export[ ]{1}[^ ]+[ ]*=[ ]*"{1}([^ "]+)"{1})
 * @rule ^(清空过期定时任务|扫描重复定时任务|定时任务数量|Bncr_spy定时任务导入)$
 * @rule ^(检索定时任务|最近定时任务) ([\s\S]+)$
 * @rule ^(fuckcron)([\s\S]+)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件 和 public
        添加定时任务.js 放到自用插件下
        创建 Bncr_spy定时任务备份.txt 到 public中

    2、触发示例
          定时 2023-05-09 11:42:00 export a="b"
        或
          定时 2023-05-09 11:42:00 https://www.baidu.com
        或
          定时 57 41 11 9 5 * https://www.baidu.com
        
        检索定时任务 M_WX_LUCK_DRAW_URL
        检索定时任务 all

        最近定时任务 M_WX_LUCK_DRAW_URL
        最近定时任务 all

        最近定时任务 组队
          别名：
            组队 -》 M_WX_TEAM_URL

    3、设置一些变量
      （必填）需要接收通知的用户id 多个用,连接
      set Doraemon bncr_spyNotifyAPI_recipientUserIds xxxxx

      设置需要发送通知的平台（默认tgBot）
      set Doraemon bncr_spyNotifyAPI_notificationPlatform xxxxx

      设置最近定时任务 时间阈值 默认12小时
      set Doraemon bncr_spyNotifyAPI_nearbyScheduleThreshold xxx

  ----------------------

  注意：
   1、简单测试可用
   2、无界超授可用
   3、自用插件
  ----------------------

  功能：
   1、通过把 2023-05-09 11:42:00 格式的时间转换为cron，再通过bncr_spy添加定时任务（已实现）
   2、时间支持cron 格式 57 41 11 9 5 * （已实现）
   3、支持判断链接或export 变量判断定时任务是否存在（已实现）
   4、如果传入的时间小于等于现在，则不进行处理 （已实现）
   5、支持清空过期定时任务，如果清空过期的定时任务成功，则会执行重启命令（已实现）
   6、支持添加定时的时候自动判断是否有相同时间相同变量的定时，如果有，则顺延1分钟 （已实现）
   7、支持 检索定时任务 轮询导出相关的定时，方便别人添加（已实现）
   8、可以通过fuckcron 针对别人导出的定时任务，添加到自己这里（已实现）
   9、支持针对本插件备份出来的数据，识别并自动添加进spy定时任务中（已实现）
   10、支持导出最近12小时内的所有定时任务 或者是指定key的定时任务（已实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.5.9 v1.0.1 新增 时间支持cron 格式 57 41 11 9 5 *
                      更新 功能注释
      2023.5.9 v1.0.2 新增 支持判断cron是否过期，如果过期则不添加定时任务
      2023.5.9 v1.0.3 新增 支持清空过期定时任务，并备份数据
      2023.5.14 v1.0.4 优化 日志写入位置更改
      2023.5.16 v1.0.5
      2023.5.17 v1.0.6 支持 扫描重复定时任务 相同变量相同时间的定时任务（export形式的），会随机将相同的定时延后一分钟，如果有多个重复的，请多执行几次。
      2023.5.21 v1.0.7 支持 成功添加定时任务后，通过机器人发送消息提醒，需要设置新的参数
      2023.5.22 v1.0.8 新增 定时任务数量 命令
      2023.5.23 v1.0.9 新增 判断当前是否存在相同变量，相同时间的定时，如果有，则延迟一分钟
      2023.5.23 v1.1.0 新增 检索定时任务 轮询导出相关的定时，方便别人添加
      2023.5.24 v1.1.1 新增 可以通过fuckcron 针对别人导出的定时任务，添加到自己这里
      2023.5.24 v1.1.2 优化添加定时任务时的重复变量处理
      2023.5.25 v1.1.3 新增 Bncr_spy定时任务导入 针对v1.0.3功能导出的数据进行导入
      2023.5.25 v1.1.4 优化导入和fuckcron定时任务会重复bug，增加了同步等待与延迟
      2023.5.25 v1.1.5 新增 命令 临近定时任务
      2023.5.25 v1.1.6 优化fuckcron
      2023.5.25 v1.1.7 优化添加定时的判断，通过schedule 和 strMsg 判断是否存在相同定时任务
      2023.5.26 v1.1.8 临近定时任务 => 改为最近定时任务， 优化一些其他bug
*/
const Doraemon_tool = require('./mod/Doraemon_tool');
const secondValueRegex = /https:\/\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\*\+,%;\=]*|export[ ]{1}[^ ]+[ ]*=[ ]*"{1}([^ "]+)"{1}/g;

// 最近定时任务定义别名
const customKeyMap = {
  '组队': 'M_WX_TEAM_URL',
  '加购': 'M_WX_ADD_CART_URL'
};

//插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203239aca94c6c66c31402c284dcdb6d205dcb49c1baf67fb90a37a43c03adcae0696b87660b27f45fe8026add8bc54224ce00fdd7392e7cb1fcf8865539b3188f37259a9a304108d32dd76d797a6688e5854d178ed0baf37b79b0bbb0896ba5c5605738a3c7d5dcff28fa77605131f00cdd3ca1d7ad52dc72049a98c631d8238e0424102ac231f486b22abd49a5cfc24890596fd70ce69beb99a3b4a40d3ca4a28a23541fe0975d2753a6108dd99011dcf5a9c5054cd49896d077621bfdad8e6120f21234022e406934fb2f0a49a14f36948c56c13722de38261f1435f5ba028b90c32d2eabed285831268d39675def3517ad97e240391a652ff7b8c18acb092500ac8ab4b8703b74512b946bfe4518a14d43852ba8cf769f99ae0de40e9d1d361bba03f10c58733ba2f152bc72850716cf627f38231d3c7c6f000d0ca94b9658b99be0b65106d7fc6b061edf2698d9e857d690c547751ffd602dd2e5c75ff34d7412ca541f1f0dd6e4406a0458a468ae41eb7ea3e51543fec4ca5b2f14dd02b6c622c55b129c2f59274162e3a2273a1385a0b0225691b1e39305efa59e1406acb0855d0dc5017b0a7b84b06de126634cbc150197809ccdadb6b7f29ad2ea1551423bda3426b2b82177497f003b755c5546809c14e249e6f12cd03acd19f1304fab32aafb865e57bdfa1d9605bf231100379bc9a0d342d53e643572cfed8e7613823ae873cc1bd24c64614f9594f3ec708ac4b1ac3da74189857971cfa004c6d720878a4bedb21962c4e5e2491226413c67ebd5a3078249eab0a21a749220d973bc82f7abfdce2ed126dfaad78acaed4bfd17200225f5b02445d7204df3e065b83a595caedc56e1d796b9f5c54de942b047b662ea950b5e4ce49d781f1102fe326b87438d690e77c813e80d75bb3ab1954492211d00415d10815bd1ead5c0c50c8427c0d3451464d870ca734da497c88a4132963348a4371c46af1d5a2bb93cda3876987d1393578a95493b5bc08479ab162163c428465ad72f9d25fc2d9f504a6592de2d2322441f61facbcc73871111084f5c9542b823355c66343560b6c0e76335dca4e6d55d700ea07b93085b3235dc34ca664b6e11470d44d734ed6bad8c44aac1f3a476ca8fd36957d29c101d00552ef8ff7d3ff28ac13d54a959816bf144d8b68e1eaf7498930e7e09837bca2cd03e9f6bdcf42a0070c2bde662267bcedc13f9a6ba311c4c12afd50246c7f1e51f37347e97841313fbfd4fc19508b9d53617589f1a54ff8947fa9783cb09b6e4a3c6b5ec94130e16a386510f500a8d67cc1c763b8d8ae46220b60b5a5ae5caffccb653d7040fe2de0d29c578a73b728f26d9bffbd2b22614216a7dde73c4a19b6d3f95ef5ee02d4334c1d2e4d9290db980206a77832c98146da7421ee826124ffc41a6a0e703928fe665a0ae69d0b448f3eded815d713ca552766d9997e04a74561346efd38146c2a122ab3089c9fe9473a0c6060a442d3d95162c331d3e02d45789a51e2bf871c78e7ec32be0bfea4f2a5d34fdbb64aca47461b33c229e9de6985b8a4ce42aebbf611219d85b089947946879cc192cc33534e95be1f7bbf24d0951717ca3750ebb0dc0681927bb30abfc1ce8ab9fa776b332c484540be9b17f10810ef7845f852238f56eec187df07a4e395f6a7b1d6a96e3a38d0494c3582c81d99274209a7fb4535fbba210661bf8a74a0397d2987e207f51b70ae3dc47a2673621a8c361df52d1f98b64b7a80fed7ae8a2acdcb27dae63c1fae275f5543fffe8ab5c6b3cba2530afa455eeba22fc9d90be17bc380799a7d5ee4db89e88e178abc812a337a9d5c47f7ecd614ac6b57218cf6dd83fdb72681cba46cd59356d7785f6acc1c550ff70d6c9d9d1b1a7a90b582453d324a2caa5df5468dca73896643ea65d5db6f88ca8b5d65d5536cbdf8fa4c17d5ccd1aa80cd0cf963faa9c88c392cc1203ec45eaef6c99990ad7b8b93d949b75907046e976fd8c777f96b04523a1c1c984ed3ed8642c410b5b642e0c166349c83f96188ab005614019d0de5a4ac11eb6e3e78f31286406bb3a19255589116bc7234aebfa559818e7bc8cefe146821791c6403fc54cdc033b26725c0507a05d88f0ed3ddb08a5527afeb8d438c1da13ce8101ba770fd4a5a4df01d0ba06a1778873da3527514ba1d232bd38dd646a8a89ebb4a7d590a618d8ed60be1c73e7e62f0f10eddf7a0a58b8a9d243ea036078668db29d61b4efaf4d0e8c72fe9355ca1a81414259024d3d7f25d83a2ff415365f382726b20564fde5bdf7a7c9dd94e2a7a1ebe10d51d0c19c17a464d19c4ac049b3df6614d7c0cc029d29808c7ecfaf2cc83f49ad7534382e6db74ae42af6bd5b38809e87d029d2ba7c16f4467fb688207c00539470cdf04d019bedc7edf852aead6042ff01d02ef9f6d5633f38a55d2ed0e4bd6c6481b2aee0fcce8ec2720af34a1442fcfc312752476a93d3ab94f5f8a4edbdc95df64b6c94baa6407ae83703198b4d532eaecf65791b170c96d897b3bde6bedaa0fbf4f2865e42810fc24334b5672a19f34334a527453ccbf6ac69c132ce414f5e8c2f4c8179826ff53681370cad12dc9dd2e4aca3f7c2c21fa33a4cc16200a512f2f187f60afde347d10b8ce280f202e8542a318e7ec99b25f650d1b6db9ca576a4cd3a576a1922bfae8e698aed2fda17ed46293a9b76a407ff286aa4eb2c742be76e4acf8408d2f6108ed0a69cc17338aaae18e592f0b5e684cb66c22390902ef5c94ce8c4466ac98a6ec570533e136f33d63982bd09c38ce853a5bcaa45acf3a0456562c35de91edcf501077b84b594ca5f3fb5d0f040654534adf7454bb12cbf5eb3bb1d2ef8ed3515691dc34f12ed6fffd8e9294b08e3f1212dd7c92839c3a7bfe8a7284612c83a0e43c6f0d1babcfdf61926859f94714b881a8a1541f48bbd730e79dde2cd5527ae9d6c638789d0d6a85db3130a4596c01fe1ac57bf1461c35f1d1dad5285f09e78239d4d27534dccaf3b1da07599c6ffb80c20fc3e5dfe465b4643f5eb27775f654305e1a88d10cb3250eb613e5e3dc32340eb8982501f65a24338ad4f59ef16611d6594ad6109319d428c7b8f9e45f132e606a2369c05cd6e11599573ffd3a763875c0498252dbe2b2d05503951b3570114429c9b29aac87488e04ba522f1045fcf9af4d498df72c5af03d569b9b9fa5827108bf67f6a2597d5b8a18512eb8760fd2ee70657ddbf396babfb9588e1d37be8e443e5d6982907ec61caebf7441a29b955d6700baf1399eda1773a3bd3f0e21b2d5cdae5a7299af22b1f03ee955d17be9cf581837d1375aa8209f20afcb3f51ec3960a9feb7698c132ad0c9e3cd42f941f7df029db68fc68320b45dd844990aa4e6caf35a676a5831c4f407b899f9f6ed44382dcaf9e270090f24f7b7d1e2bf7d5afd40dd423632724f0a3ea0f877bda872d28f6a2f27996fd82a789ff7027e9a6350c303eb51f6e523bc2470ab3243357c6441f9aea8f8a5df507087ea62f4abc0343f9b5599c1be443ef6eaa3abd53fd307e62acf60b14f0f8f86ebc9f528ce50994807201f1f87e0d7d55eddc2a2fc5fdd0e436448bd75af4264908f89f31a40267d672c664e1ab886adcf19476d4def61d50a107c472a16b9c28332e57dc7f20e1a0945cab5466fe905a193a7b5c1d58da1b5d11b4961b09428db3d090b0d149e8e39db752996e576c1f24fe90ff7d080d6fd6b1299c2c13b45ec24736d4d65fa259d6e9062393c83fec6a0375ccc9ff998241c58b91fca493a99bfc4b954c3cdea178d284a178265f4501c577dc6c5035915c92a5951036290c02f8559c03cda934c1dcf12787aa1673faabca26017c4e0c7b12058911dea4bdcb4af104d34cae22c0ab2abfa15f19233b09742904d776dea02fa2559c53607b2f74321309f0e71893d277ece756c51dc7e94d38103f0a5888c07163cf1fd32bbc6f78c71c7e1afbddb46b66ef8db852ae67420c5de0adba3ddab75fde169b0f5ec319c9d1188793b1ff2c2e8c01ec45e74516957b5d5736d148e94db9e6c8049ee3df0b2e294cd7868085907737ab5db23469a8d56e5a4b51f08793818b887237be2776b2e8530c8068aef8e3ecaf983a43ce9d556f00c8f2bd19317218d0509bcacdd0a5ad8f8d9693632cd35ae57ae26d91a2d14b1a56e9d6b10eedf581480d1506de5d739ded4f814074f5528955626b3f6caecc840989f6a927649e9663843f6b54bab9931efa9a7def2b95575eef68c9ab1cbc728f85351a92a0765e8aa0ca33badaaa5f452bc41d28e88c67184b1c4a3bb6ccdc1bd89a9af4da4ce82c835d658c228b867ec4d7aa53347c7cea4a56c6bd09cf7452c88f1f40642ba17de73c24c566cda9c384cc6a122c848750fd829efcc4fd4c480c8734a0536f89f4da490b870cffe774ba8215e37010f80c00be18ec0534c8c528dbdf4eba0718162f95ff4b524a3a2d9eb7b8d3dd28cfc0e0ff175c5152df236558c7df5e56ca701a6ac1960931955e34a254904cae6dfa82d786840e9aa5d2c738f510134440c00e2b8e508ab6f47b6d770070f16e123c00856b30f8a57242f48cd4825c7379a16d76e3210ce766c4947d6932e57a7169cd1b16a3b8c9321d551b872466ac933e0c0b0bb52819489dabd382aacdba521f513d8381aee041be2cc46f1f1310a12a0f4ee24601688651cc13cfdcbc0f763bcf476b5b7ddac95af4e07c0a2b0420bc5acb948d91485bd546f7da158e90455b2ebba4e622259c6ab52dc0680de13ba5e6ab610a596f9f14f64e55048a38df694eecdfab1f03ac17b2e0c73cd5708923b480d5dfb45d191e62b517ebdc83686691f5ff81f9f3a0e1d987d86c784090fa5b157d85136d22abf86775548f2aac3ecddd4bcbc2021ea92d6eff461e0482c58777527a0be3e313fa064c23b826ea73059e448d3b7c31f3a0b9aa62605c638a0bec831ce89b02b261da4fba5d7f758e84f4f74a3017c036d04145fb2499fd4ea3c05063fa25211edc2e86cb9c127a35d991ce1f71be7637531f759c3c149796add94bd3c91604b62754f22985a8b96a96d1026c0f5b491625c07999c4a9ac7485e51ff6a3ebf109cceb2cabd134fa6199744e80049fbcd516b089ead9775d502cab59030e88d79ff6f3bccbe9aec960549b8240e721611363c38659a67cd5cd80d57a1cd1d6f6313ef27d10c45b2d73c3883920aee58f93625a2c5e5b01fe2f52bce77c9b708d325997236460ad44af3aef8ad18b86aceff1f718457b601947c72589592745d00f4954085c7e88d1aa8cd5f15c2e12ad8a9365fe9a28166c38f18c035d6e6427088cd2c7cadac14cd6ee32a622d6f25adde03c19a1548a2f48416b96681d82de21662215858cfd294ab8beee96100802d442307f2f3fa632671fe4faf097f8958a686dd2390b30d49cae9c49174360cdee883300f55b0fefa78c860e71f79adea43cc0f6d1708fab375ee64381d5f88ddbcdb358d0cc87154eb9585e2eb3af55743c31baeb081ab7774d96e6e7e3fe5945313b4b361b6e48f43e9f5736c01dd588fc2d0a56de48259694c4d5d56b3efddeda6519fb0fa218acc391d84ca5e6649c0de01a8e39661f68a67115f4b269f68aaafcbb2cecc15502872b99905e1067d58251984cf3ee90cc39076b4cb4fded9dbaf9f1680bb20e98db0983f7cf0ee1224fadf72a58de34948fddd6203d863412e44412a6063d94295c217d046ad721852642ee6c25b432d0d13b6213adccfbc86b0959262266b6e0147ccff3aee8c80140cb085678cfb26cb98569e4c78a656e659c14fd5e0c708d957d3274ce63ca82bc87dd12038a9693bca5799dd2d52dbc1d974ae68b01a3f54834f4964a379914a47e46bb840e949329aec0bed8e3b022863ca9cbd81037f765e6dc015bf4606f2e2545190d279ebfb7ed4aca7bbccd220d8079bc59433905bcab859171a78769ea0c177b72bdfbdca6bb375f3a2809717d670a9be59fb05c9a95379037043f859ed46ed7aa61fd4471bf901092ddad626b6933210d5e05e282598447c88f1af6c22aa7ea9f4838193a41e2a2489d30ab42bd3b313e80757ceac9a73916fa63401140c6dae9f984afefc2333dd891d6eca58034bdf1722975bb06bdc924ef97079fce9fbb1f77f68733bf8d90a06adb910494876777152acabf934660a48681f67107b40fd9495c7403ae9455302977d6cd004edb1b1a8dfa86b0c594471c21a759f34c902aac6058a39012b7616f52b1ae70d2fdaae39533f6b013caceae1bfd218019bc4aaa347e8c2933917880b3fcce733e066e1ab6f88412d83265569b545fabec19c45b4370b7ec999668f5a02e75fe47f09b216519073561e6932c6a83bec3a9d244e7bd2103358d39fe6fe826aeaf81e0794d127e70cbeaa686c9769ca7261485fda2855a51d673a481965366d0834ac6418bca8753270310f5fe9a6c5c172532749123fdd166ccae38ec655cb446afb84c8ed2b6454bca61813573508b0e5bf2072f79106d3b4319809117ce9993a7ada0a57031fae90d0ecfd708a576cbed1524245baeb161a0a95b94c851899c766b9c5b15549a14324836cbad09a896aa5dd399184b9fb22cf4372f8739d4d76b32a14be5b46cf71b9d8befdecfef52f9952c1704af0a9485b4dae494f0ccc0ed172623e61067d500701b45d86eeb5ebdf44bae47424a7b24e54760ce4db8ee13768f37b8bc5c6d0d8053b0b89959c694f81e3cf7f7814cb859cf9676a95b6809682c18ab0c0c18167509c4d45d1d0f885848f4ffba6fe8d715ba460f2ee7404673cf3b05da93dd56f2c13eef7c4c60914ff16d2168b509b52267207825779ce54244bbe57f2528c5aca2835646c180b5f0a73aada2c0558740fa86ec619312591306bb2746fd77f6366561f2b070bec2387311d2d33a05e87448b93aa4a84e81fa2631cdfa22569c472bdc37184477b8b5fc077fe81bfb65d3455d50b898ffb4b860183392acc4ea7b63dc4903acc5269104381e955562302eb0027cc3fdfdc6155c80c4678be0aa1ed4626472454c2f8cd6bdff6d0bfff50584d805f93ba5672d620fca448160bcf156be163e77c6b1f631293335dff22c3bfb6a00a24da72769831bc692793b32e2efdacf8bccefb97635b71cfec206fafb469e5c77d1b29852df23b1926e985517497b81d82279b69de867c9a37ea0b8058aaeaafacc3ae1bb901e4416420209bfad0954e421b0f709a99a5a4354b0a373a4569487abbba0b2cd01a2407057796b73515e6def8aa714b1c3d0dce628f1774efc8f0e709de91993b03beeed688c5b167e66b46cf160a3886e6c86151038a96fef794f38e1a65329a7722b325a1719267d551e8bd4ca646b698623608ae10b13eba28532ea2b25da26d31431a082f2c520cceca2c809e7a021729b581f550f893337188520197c57ee03cd94d95df89feea77acda8543b70fec650f496be07fe830d5754cbd71dfb1267ff611c953bfac5272e9bf869621fad260c322c283ce90269a58578e8419a3c307236d9d3ffef29bd99c1d610ca2385df228241c5271a0bb0a43128df3c632390b4d20315d58b3516f5931b68f8aee298857d9377b0a5f0e5d12086da697163fd9f4043167ee2440fcf3aefb18e095f5af6e3ffec3c57a81ab4dfca5d81c7cbf4310c7e97d71ad3b8b1f8d7c109adffe98b8198583824fc7d6951c4d337e6db5961134641c2fde48640099ab86e2b22e09afb74aa280fae516dca9f6f52cf7348a0dfc26d052e48b83656490c72bba4c6eab89a2336fb993cae1db6381b64573d4649c9d3203dcae23c16afb57019c832ec284b2b8f6eecfb3a5f17666986ea38b73c77d9de89979aa59e27092f0dc1255fc2f98aa5b722cbcdcff3303b042a59ba4d975512dc19c1a8d0c4527505c4f7827f260e4ce626bbeab17c636b0e01102659620ef5cb3ad6d74601e5a46585018efbb03e06a80b7ac57255e2fcc0c921d7482264e0cb4b865b60cf1719da5a861bf13a8fc22b1bdee23b71edfd65c9569c0cc3300a7c24f8580d2a6e3945236851ada5f1cd5408ce81d83274c3c1a7c123f8b915465b26cbfc7eff20c040ec517f8c662dded9e0230f70e5ebb4137c98d39c16b8c9025f2529a5d1521eb9a1d024ee78655581a4137b05e7c17ce9149b92c8b07a2c5acf0369c781c60db3d9289823c87b372d368493a0446d58308931ce84b5b96eb087477d90dd920033e65f8c2fdd31361ed6158381e56cec557eaf56198bc01efc4c89b39e578e1090588e336edbd8f818b3aca2a0bf6329fa7bbb4966566f9a4d2f547b2b9fd121da5b184396e1e30d027322240f60b4aff4ca529a78ddc74e7629bf27042e7464ccdeba7bb2818924869d20065295591721429ae97c902858ea3eb2ae6e0c646a0324e2d3c0310c1138da76ba1f2669cbeeaa62c433d94bce736f9123affb48d08ca44407ec1fe3c9b7692a5e40d0e836989263793ebdcbe65ebf36e0bfb90386e01121be27d83561625a08ea1ec54e6c2989d43ee78ac6593f52c9f17a3ebcd28bb2c6a2ffa84523cec116ce2e5f8c55ecbe492629ce6db625a5e27567135657047cb59b8c0a5dd74efa80f7f12b712e14098419e52471ca8fdb3f34f8db8e07162fbeea5cfbea6cbd36fcc61d66f3d4a3781e408a0acb5d28d4e4620b8f7ab260abb6d6edc921512aa7d06ea6647f24d197515f7034e4c26b9afb34ec9ada9167b85d57c4330899aa14a5b0886f21ee3601ecfbe52482a3e53fc4de64f4f89e59f69d156962b5722dccde3e186bf736587284957a26b5b14a7aa5fa08be0be2246d7f3cf30b0b9260c516708ef912dbb9814bda006c6efd4071fd3f2ba3c871621cd0740a4a57352b243f304d749a718cc524bb2c1425c609b00eba4f9679e10833d0c27df015ec9f468b905cb4470d161dd78b600afa594ac87e2228b908b34beac505e0bc1711e39facab6ca5c0ccef6e33f4ebe692c493fab7b2f17f1734e95a506b6dc1f66d6a2ba6559e888882409651a71c976e0b905916df00aec989b178e6e78ee65d2c6ffa41be725ed8cc9c37b71c9e7cae366069641f5e51b789d9f0257825390fa2abb2ba7d8266847bd293fd5094b67e032c0ea026783399c3b3df2cf08a2b7dd41291733d0bdf8663110bba2f4b83be3319e2422b90b74cbab15cd0f99e0abac4a149f62fe5d112ddf4726c16e5f715ef66459798b8d369b71cd7c56d5f49e60835392543528d8865137eef7d48994ed5f035bd99ceb4fe406c098966082f24dc6f54a057d350a0e49bbb951289c3177d01f7c5d9d98f2b10badcc764b40f3b97df473019229af54a885e649daf3d5b82135916a6fa32514a0d141ca222bcdeaaebd538349b76ba2c5ac141faebcce20c63e0f16b48a3c8fd5a0e0b5d3f2d59df77b217272439be6eb40907976569d2913eb8ad5137306869fd2065f2234fd8b3dd0f320502f8cd5dc482201b8d70685ad781d607485429c90ea2997680c3a7a908968add8d9a89379f41db7c9a7a76188409bdcb60d1fe5a33d649637360522d4151f8a1413d1683b43dd3be1a56f109361a409b53d3c08003116301f9441b3ec7647b11a04efc25fd8a51ae91df8b0770f30b9175eb669d526cc76e6cd565b8ca4986704a0be878ebd45638f618a4ffe053a75b2d5d3d8d6d4a8c82e3309ee5b24456fde59fc513bb34372ec81432518257de0b0dc7933a7273be3205885ea12279aacc95b7156cbe2f441ed03f4bd3b75074f9fbfddb5592beb540caa88ae377661e2d4998afe3ffe48e6d8b204c72d404bbd08be137e0318abb1847164e47a19d349059d378c550cfc0be7b60c6ca0649539986f1fa67e719a60c3aedc2bb3c8ec1bc5791c44f358813844020cfa661edb538c59a47ef017d730afbae517e47a60a9525b92c2c6a916d2da7576c15c7ace9ac52d843ebc5cd2a3fc5f6dca4a22506a9fe74490dd2e90e0cc0d4c985f831525d99e575f004ef0f164d6a56d1b679f9011eaefc62a3e9cde1d9062f26f9a035eb32cfac83fd6c125fecc4d821054838d604f23795cd3baa5f4d1b7efea3809cf3b97bcb1d19c90fcceca7c8276ba835ab0d8f9a3ba18a92d2f109768151ce1ac0c8e50859114996b55e5003d5daab991970626fe8b2fc53db5c20a6132411899ccfb2d4f849a54baf586135174c104a10acd5a1a98b948be6ea305db9613495745e51a0dd9d124ba86e5d5567233cfc2e4774d07e413c4db7fc581cabae8e1de6d7e47dc03297c97a58b0e878c634ccdcf4433154586e32894efa4549c604c7243eb3df7d35cd18c7832be4fdc5b094556e199cb15bbea2e43c4f5cb386515733088afc73456bc6a407d19e571870bc84a8a78a611c913c669a26d6509d7c999f416e88038d7462920a152db04a19dc34edfd234daf33b7b89e84e12281c6046a77266e8aba2f9f758a5d51f896c5cacf636eb4c81eaf66ef233c13b4dda79cb605928825a8ecffc4c74b24f223700f69a8c6320eaff835793c6df2e19c085ea5cf86892159504b008786095314c5e0cdf2bd590bfcab9b9d7f22999311119be84c9adbc6dfb98878a1c343b3b8d9bbe2d1d9e8ecc9b35c6db497b5001d41e20b453ac397d39e343bd99b94c3f46c09a0eeae8225620fd8780a9a602c893c6f5d04c0198fcb792607c90ecd45525d2b6c89b25dd685a493f10c30c0ab38d249f5644fa654446618d1a810bd95936b67dfe9b407486d52e350235c0aeb2f274fd30eaa8553992f35dbf668117bf750ad3c26df378452f9f482b997be776873c41735fef548077b66064657a3d750e8955e3504a07737c7dc39ee14beabd7fa0d45f7d6b0ab58fac2b381819c4202607050b8e8fa0ea0c5f7b09c6efbe0e4069a2e11e908100a845ec32462147973cffcdbe07f6311b5c8d62fb3ab9c4dd9f7bbf94b8e65f01b5ae94bcab576d9bbb01dde2d0bfeeb922f0c86f2431e620ffb54dcdfae29b31056fc9050aa9017011a2a73ed399a713459834a3fb0014de628faee55eaa651e57fb4272f20f0b0c4db373533ebe0656695f86526dc8b6df198684e3a785ae4fd968fefc0e66cf044b07158047f7900dd252069fecd23b3f0926d1ef736e0d4a6bdf8be2c2b5177417d59a0420cc346b4aa3358c7b838cf9f3f1433b84d65acc288234c6ee4a736cf6f9e0c0842e2672687cff3af826126e54e3f698bfbcb881924c162c7a5a61ce3c06a853dd16b32d90744bf5717196e3f37d2f5144ee929e586776f1e8fd532b36420b7e1d1d64d8913331eb4cdfb78e861885a7318f25b9dfd5c31c7deb61f259b537027558de48a64f746fc5b44ff5cef18848e425e7865e38b54157768d5e3bc1cdcdc2aa18122da9f6a14964b5b851ef45502d65848b82568203d3268153263f61f48c786a7e06ec52dc07f0a55dd5b7621754792ea1713908b284713eb597f31802e59629352366d9262eae6710c3f4673139e2f7c243a896567bfaa5f60f2a8b9dcc0afbea8f772374c3f105d48f07819726bcd61c0433426ad89f9c94154e79056e8dc142f677ec1a1115c34049424f5b39efef2ebee1efdbf208e76fcfe2ba40b613be1a195cecdcaeaaa9e9f3d4639ad5188bdaa8bb937925fdd889ed245fbb8ac11fd5285a8acd8a8f77a368aa450af8e4bf53c0f2fcafc0de56668387008cf8c6bd5c8506ef40503d3e7bed4da50ed68cf19280b9c2928d5add1ec9bfcfc38a56e3c83cbcd764e174466eba76334192a2fd99b2d8ed6e986dbee967a3f3aa908ccec2c7dcb40f3f5ab2c37b04987f3c9ff9d4694297034ee6bb99ebe37da9515b9a175f5e35cbfc63a10cdbb9a5da01b6d24b655f67ae5ca393c70559525a90432ac3bb98e784c186f6cb7ea6efaa90c699fd7e32f9235bfe699c6d108b5557bab45975c544cff39e0d553d9ac6e79516f2753fec659a3eafb2a269f968633cfd9139d5a4c220122000b92f4abe4e89aa589498133a0d38f11bbb196f985cb896b6c57f274622876bb68b6dabfaa66a745881b5a5d2a3f59345cb162d955e600c834bdb227a9c7521fe5335c3a90ae47dbad089c91116ca687ee578640f26c74eb9354654e1e599d8eb70af588b64264b4f996a9c69e025e530c10f86060c17d2861297bc7e0d87dd7b8493484257df37ccdedeb7c00d8c50ab5eac093077368d28dd2a2e90cea30c337b502c4d80e3d95a8b18e985e7060d2ac94d65990177f14327db48fcbe5b725246aa2be716528c89e7cf2c0b256bc1fbd2bc1354cba90e04fbb77d26daa1e290b0616cba3b30b260987c2c380404980f2dc380d9578b03d43762f192faffe2b2694dee277f676c13b9d657ee81fbf9835e077120de687e25fa0d6b323d5241b9692f00b011ae24f23db32dcfdd169dad4dc16630cc5670d31a82ad007ef048577cda001b2a57b06f082f417d3202e2d07d0aafc615ee193b88d51e6857ff531e1b39ce69e9f1634d4781d216cfed997af6a611ae526c8e0e932ab4a6d9572f6549b81ade7a84bc241ba0e8cde17f35a6c997728c70a02dc252198b905e6756ce040797d446c0388f0d1890568feb207dde0b49aa99e79c89fc619a2ffdb6a9f6f82d752070e579430760abff26b242f23fdbab1716668941a854ca9dbe67cc00d6e0914276a77dd47bd465075c08c65748e90c234eca465eff430bf74e0b5980444f74e85a607849475f3d5da292e9323987eb96cd7449ce9fc24f2e283c369505c5ee6733ca82e29c0ae30ffb446e4ab0059a105267620c9cf2922acdd3fb9f659cb2c48ba3b88acac9a5d2db9079087db40242d93a75c32e58cec5f887f557810da1648f21fbcd458c01852efbc17daac05912cc168901b32356e8a0dca3d24a3bcf77d38006bd03ea686b13a412fe35e829fbd865ff19ef2dc53871c1d918aeec5d882c778c39589010f75c9ef50782994ba8b82d98acfbc55acb0f51cc44d91171d5efff7829765f331aaf48c39f244bf277d9a1e23bfe3f488adf8059d00167987770a8ebbf52c6f841fa63ebe7e78e9bb5b4bd8d06fa28f9910aeb8facbe9d9a130f47d633746a1f7bb79dac31d6fc54cdb2a0c45493e6470c1ee6fcc47f3cb59b48f89228c54fa10acd24eef5242378fd2be04c619c8762211f33fe09599765017f4a16db84d83a828cfc4b8fda91d920a1cb661b44499eb25d8ecf0d4ec15a234e05b1bfef378f76588a36fda26000f38c45f50e08da6ad298752a8a56ae7273ee06f1dd2abdebd10c998170c049ff9a0a4aa1c1402c300e19d875c553190baec3fbf375633d976b784b8b2ef042b9601f3fe5aea9bd1132e620dd691b747908d7715701b1755624c59dcc1b60f8e700ceffcadf979397d3f85ffd07e322de982d266ff7f4e2c33848f7cb536c0d88fcad7ce335ea27f3bdfe6b76bb076f6fd9660522b52bc3aac7c54cd3313378a62c7df0fb524f1d7f78ed0bfc092fa11a8c904a0c1657d9b42286da2612d9000f862200dec0b21b2ae103923c239bd8f00fafc889c557b65b601898576fdf4aa6d6631a86cce9eed46ef4a2b153b4c9ed367d7816e1a179bd28e912f82b274660f144d19a8813da62734481e9974590df8b09c8b161e6d74604d9a26d0ecd73ee5bf916afc23b8cae3d4c75ea4162f72906874f162d99ff355983220f5effa2d6e6acfd8ace488a48d471f618fe5d0abb386cba17aff4a8277c8452ff35d241645c6f96b82a8a731ef0922c0090c2f1e8c6d78bca730dfd24cf641fb9030e6b689c1415d2ef59b4f02a62ed3f2b167bdd757348065179983be4b3c3471788502f69d0bae3792ce40c6ac9d35e591cf52ca56d432fda51615157adda56aa911c0fb0f42ec7600da03d9c2e160e0d89c3af5e02333ddd67267ffdca12353eac24a9fa4fd22225d6ad2158ae6e9b2fcc5b622e19df123a2e48c93aaf8078bd696198f43bee14acd82c926a074ffa330635ad2a5a11034f5c9bd22e797b33391a3290a36280353e97467c4db4376856e516292d9d3b0b758c55595d83845e1bf4904fb57edf7480d89eb63ecbdbd45bd94b93c5840bd7d99f946b01cc75efc83d71d55448cde29b0ebd187cef224e3e34b791f9851394044308d9e8d858dd14394e70730ad9349adaebbfa2ba669cae7b8ba7e5b2809e45951de182c887f2aa0418cbef28708678dee01772f6afdd6e831f13709b4aad1ca95d23acfa6ed1a31a921481d8ff813d7119417d4cae75f1ed9418406faf2f73ee96743231b63464abe101ca4b7f7a6e1ef55155217a1b74db7edc06de06b4572b92b69c092e987cb7ed249794cd3ab7b55786f236735fa32ff0a5162c9def39938a8413b04b557b2bbd81080b3a7ce0a9b0a59b7437676a735d2f5976fc8b5725d640a9611be69af157254796f5b6c6cac8c7aafb840b4474f6e7722ddca958adec08a87d9017d42a0a51587aae2365d7de78ea7d321224437949b2863ac430cca6e158f0b6742a2e15c099b67ecb3e0383b1b3a100d2d0c43f5f8b6c3a2e509dd2c737379bf414bca7c3610ef328e3e5454f564fe5bcb1487a43065bdbaa2e7d9aaa5d16aeb2a6cb2f20c31c109ea3a0c97da9b14c3d62d37ec4785ea207778a58cd9e06cee3dfde8706be5c6c0876949b926e3963f3f8dca0db65e7bef851259f42b533d6c3a97706bdff1d7132436ad2ecc60ba81e82cd9ccb44bd5a4315eedea4f89f239142afe65cc81c3376457b6157e20bc0152cc5c44e63a368bf8ffdb8499da7151b2c41eecca80bb34a94cb33a34612671598c95d46c5e9fe923e1756a9de8658fee851b1e4d629bdc4fc947f377fd399e1dee909ebf13d01159099a06ad9d5054999b11da3a9386d6122497ecf49d3045b0f2601e58dfc647561850265e0d7768c54892ab22746d3e4b694bf45ef73deb119f42a9c0d07772d8a4d9794b681ad9b418d528fef9929d939a23bf0f9a6d930a8d0fbd2dd0a38344c7243732d5ce5cc2e65ec89e479568b28af025591528a7dfe22c8fc91b6dd061331a631289008f76bc6d30ad7d41989da49d1a5bde50b35f95d01e3b37010986859f0b125bc6c254d73e54e3785a594340889a59d5c9cfad85da738641f5b28d65422b2a266d549f70873ec7f0dac17f35fbe4b258b315c3984299a8e278bbe0de74847f560366b20b92478e6d9f5a8bbcc9a80806339ed851d3ec0e449c09a2eff92a2c3022bd58f001d1cd69192722d30ca7c469c6fe8b51160c9ece233ef9134188ea39e7cdf109425bd569d481c873e27935dca537d867bda5da9105d0fa58144489368d97362500e18f5ba4c43632f00bcd819475884e6ed8caa54f1161f14909c20af754318f8fc3aff7e150d48cae045532349155517354becf487cab439ffdc175c0cb15873ccad24e8bd4ca5768e9ce09266859c161bb1e19497ee3845de4256c149d65487de29c00997839f365e25a3b70ed3eac55f9b090cb86f23a0f216d48ab4253d029b6fa0bfb76a568ab1ae2e1e0d693433b04fcd40af027b83fa9ad6dadcd650b752b71e0cff5560fb71334e9272896693e25164d2cbcb7a8c628ce3d4e40e264d9e6db8e1047881757a828f959d2dc517cce3441e81302a689f8bdc0680664a9af806114812301d4d62afb6fdd67f7e19423ffd163409b690f083a60a0e0b29d6e4ccb865390ed576c92bd5b92fc99936726690ca85052167dd2fb093795c3b55b3023cee72ae4f12bf91bc4dc177a1574db716e3f126a97d71a5684505072a99206bbe33e5c6b3a87e325e8fbc9df0d7d52fb776dbce31d7a7763b2c66691739840697989f55e0df856c42de76f6ac0376a7294498d150c63e5582f927f1aa619887d8fd5659913e51d0fb06c28a3287cabd67067db2a713a9a5956b053e46b35469fb65d55b394b4c02f978bde2600e7a9816ed10501856ccf95a1551bf2554bd8bb08ad801641348614fa22ec01f38c4bcd01fe4b79867030edcca987000282d2334d47953a4cb965b4efb9dfac732cef074e6c9e03097bf3418dc96fb5eac28c1b829bf7d7a74ebf62efbe8b7e73b38facf2262618305babea76b6e4b2a5545f804b6425b9855c081fc3f6f039d01fc9b91358e9d6c34f0c2bb93bcb40ad50c9dcce3b66563740d0cdefd00a76a5c67583c75689b14bdcfd446d3bb33c4f75313eb1c30b1e833b818c116954f8a3c51fb4cdda24a898f666cf3ba096ad718adcc2f5bb48168c991e377de63f51f72d56ac898481ebe55f0d4e4e98f39707373051869b8442c03508e1f23402c6e17c95f2bd926d1703529fbb0ef51051c048232a93c1ff98b70e323e59eb269172ef1179ff81844c8a54a485f2751984e4af40c2c60b742c16dbe640711d999f0fe3cc5cd018271cc3c1de0d35bd4f8cd19ec07b07c132398097dd752919add0757a410a777113657e918c4dc31b3b517ee70b481fe7b1f696a6381d1885730b41b02f4a4c887d8b7bc182e80e2ca97b745e9b2ee52feaa742665564bed63b4e865ccbf8f88e3949194c97293201f6cedc0ebbee3b681ae75f1af40d715c0560e29306480aba2fd43f1389bf7380504dcc095a27acafc10e0e16ec0904de0dcbe5093d76af101d3d566f7eba9e836c7c93402cc99c6a02a621735225eb49de94668a0ed1065f59fd9df38d7350290852314d15e96ee8ceaa4149ad454bf648a3183c73ed1765a935e0d6bdff88dfa158d7758ed4320f509e2b0a93ca5140f344bdc4f02a889a6050c4733a6755a1698505125ef2a8790180e303edbe8ead4ecd4dce6573efd5f0ea32964b44e6d9cfdf7286f2e2b8148af4db15370672b10086af11d2d09af6a4d290e7de2e544b99a2c89eed78ffe578fa84beb39df440d8cd18aabd1a6dbcaa319bfc2b39b6513345227f6c0760bc9d56d370fd14a945fa37b0854291addba910f6d8c465e0ef39dd3e15d75e339780ff7df16870245500bfa6e8dd96b66092479967019ed4a01564fbd83291ee0ef5476a6447533bb5aee02bfdf4dce8948857ff409652ba72050182f219f708aaed6597a4394cab61c77a977e8639c774626d073dcea9b55cc8b1b5fb0b2c5d8d4e83ae4ee390ef47d0349adf35ef8a85912ac877a27ca686a2e54202cf43bf87608f137c6ca909e4ae074ff7d703890059575505b4d82261300aceeac2bae19c4fb834616088a5be6af0920bb480a4b7acd053ed956ef764de4ed5d37d056b5d50927105a70f57e8357d5e8fd80924dc55cfc2c44290e8b49182a7086853b9e364fed2d1d097b283fe86b2f8dcb24957ecf025a798ad539515fef034cfede23f6b5a1e9c37c0170585f49999652d72c4c0fbeefb5974c95327fddc2035160a9291e489250df3d030bc5dc549f08ea07e8598122a7199b3dc91f84bd8531797688eaaf00150ac079edf3e14b5631573103480fc0adca694fa47e49620265be4c6e996ce3e60b478d53047c4d266c095e8f873e48c075d54e76b640374463ad57235b04627ce258f53ab49264f8de2ef4a5c7fe80308920b1f228dfafbf256b95f3403b982186d753e5264269aade803794575be0a2fd57b5360f49394e54ce2a736e232e6541055eca1e0cebfa1ec3b40fed083bf28bad7cb5e68d0de5e758a1e6934236e03afa87f4aba9c098acc251286cbd0689868c70379ad52f462ce593f4237a5fe75b0913bc2ab708a1da48016921ce8ab14526140a54d5ab72288b138daee5b13f637f7d5724b10cbd9674aef64a946011485c1c34f57aff9d968c7f42c5fa202839dc30da8b9b85af080388bce0d1248f44bfefc42097ef63b2fc4aca7d0f8a16bc77686e3957b3701a071ab1a9665052dc62fc0040fea5ff2d549a73fd3131cb9026c3dbfd416451d7e8977130af96c3a4598ff72e7abff8060f46e5de0ff2af56cdd5f276dceef48cc713ceddcc34f5be857821725d8a81fd23fb063fe61f85f448ebc4c849dc603526a42d1f17e43e9cd1a3342835de260b4f56019069122b36a6bcd72b52eb04239db757889db35be6a989e609d8abacb755bcbb2b259c95e3e0f77f2b4d481fd9e1f18b584d4ae7d6dec08aee54c39645418c2f03de698ff9649cad5c876e36b60c1307309c2a21e66d9f3b289781e1616238b3a118d9a9a0ac75038eabdcfa7f818c007df5f9678e7204487efd9f60e48c4b7ae3e293c685c24458ead99300e9f648f1fe45e9d80b5095a6d86965340e027a631db1988ce59ba8a179878c5a28e5cb536ef95a1b55acf07e21766cde0d8f49200c660b1bf7204dfed0d00f0d325d7cc2d263677b7d3a07a408ed2951a09e0d4e9728da28ce6e0cdb565030630e5f90d1d8df1ab949b480c0f27ba59a872f3bcbc7f967c8b84f5d0e7efa3ac3fef6d76a2151f26b274fa024a5ca8e95913981aebb03e9c79fcee8970e9083c669237994dfa240fc87e30dcf85b1087b71fe93a829ec278b1950de61f19374e66a9c6e14c706be1a93da7f38dbe156ecbb4814d03e77bb0039dbdb3aa6874bf729151b12f75656e156e5b090b27e2d82b98b6471a67ec8624faed8ec59cf3066c29f798b37b449217d165ec2a6be9bb9f421e5e6b68a0bca91d3a7bb2754e9d521f199a396685253253865f86b2b908de38f7a567a78ee8d6197c4bda92807164f96d82a235f17d939893c4742f9ea77eaf44525e72788e10e7a0fb7ffa305351970b5b80e7c033e0afc90783d5012933620c8a2f6e8b103045eb4552768d86eb4df43ffdb823ad996d5a5e813465cd7ce761a10e6c932c8e8e5a7d303209d1791bec098d392e03c83839d50a8371281e9fad3e03abd75f23223928a0f54cfa632403a5e0fd0976607e0e08d2742065625c75e1261eff14c467925ea66e8e627fec9726c2205e24d2c112244cea40cf21aafeb1983fb6932a2ef2f68eef6fe4fbfaaf20292fbd421be9633c4c5471d4790b3a66fec49187bc4b9ffde2c26a5c70e938ad5818ae59d4885339380db3e3f51ae2851e02c93bd97d60bad9193590d464cc396f559c19ae8ba585e7b10049e74c97738bc7f2a783e3fe6c0b6241880de1d5aaaa5d1a2877cff45697c155789aab64741150fb3340d517aab2a27ea3406380cbb80fd76817f7a3a39360a907e5ecab1f98ffd2d1e51c491875ce430e2c4ad1277f90576765bd86e51e7c9bb7a852828ed78a5861066fb22385b9cfd71b9c9525ea354787a7f01f0d3ab7fdd40678c8617e131878df342f372f3252777fd7622195395ad72cd23b1baece58ae638723e3475e96ece0050cfaa8e8e6f4808bd826ad16b9b3b57a66fd39c6f5f3c8823542252c85e6b8573cc97b35b93d62cebfb3f9c04aff5bb7c0fad0b133233c29418e846b5f028180c53abba4d7cdff7d1b47ea58e15399d560d7eb5a966b96992074452d58581db2cbd56b392e58506ba6dafba35561c33f72bcc42c46839d0aef62b4bf0aa9e0e2d3a8ab83da0f29d829add86a9ba38c52fde57ea37e2ca7f7ba324dc857fb7f7a557f43898a65ca507ebeb00b52a79faafe10ebcd612cc362bdb936d5a983e4f73ed0e1f55ef0873cfd526f4db74902186484f56a17cc18466030271538a62aeb0bb6a8a95b74e785b3592bd05cd460819b91bc2acf4224b8d4e20bea4cec5b392bf28cb89fa69759eabe7b6fe9d34c2c8bee49dffa659fa0126f7d435e40fc7d6fb15d7a5f5077804da6d46d25e727c417b6123c4e570dddfb37830936a7792f8541fd146da385dc3e6cb9b9fda308adae4bc39a1ff3e9b7aab5ab91e7f99e2e4d8cb71395082f8ab9b1ebeec43eb7df0136e94ec8feeaeb5a6198720122638b5e39620c11f309801ee73965873ef1d8840a853725d17c255e8075146554d7e7b65990f54b119dec505680220dafbe95c926b2fc2b851f7efcbcb3d2cc04e17b81325ef3afbf204e8e1d140158419381c76c059119dbf2e25ff1c08764d61724326083adfb5c8dae7346c8ba0aebbc7d685839ba49a0c5b256e4e725dafde070d3c0285ce129ccc580701973be25bdcf46228f6ab6bdde2f87e75360a3cd5bed52c59b379433da16c8ea87410274205a4416918228ef2ae3457f45fd841eb75e783ab7e64e503433aec18e59a98806877463f013871f8be87e99943cc1f2a5fbfe10ec8132ae657ebc2fa8d7f781b3c13bf26bdffbd60bd3b6e4617e9e4bf7c01fa5d870b9fbfe41e2c194160df28765b65a3f0e68475ca03973ecc6bf7e6042170ee3fe5cb3cd82518959b651ca58c85d97e44347778539e7594dfe95ab893f71324fe421cd730afe118694fe54adc640df64730c708c8fd76216c9e042251fa1ccd2261a8dd09cc333eea6e0e50ead2e99aef91e3aa8175fd4c5b33573317a7c259d922a5d61b5abd70afc9837730bfbd40a1cf1d393a8e4e228433305856d168ea74ed2d158416c6a088f5dc48061e58d18f7707f3005051ff182659b102b3294238a4282afdcc1ffaed4bfe97c50920ffe0ddee033d14d97296e90fcddedda13c6d353fdc196f5f37e7a5ec1c506d91469dfbfcd34b60934caf7616f5951ccad60adc1a7e1cf7772ed22d8701bbf6138b1d25a368600bbbbef5b6738294de476dcb96542afea416ac97bd4657ff7148faeeb742d000a52c6137fb37f36b57c38c0c755155513b59f0b3b24dafd18b53d2c19e541fd1062e80b341c31052562e30e985002048402824ac8898a0175f69372aba5fad43d5a54a69327d0753f6e700fbaf6e8d4843d7a902c7a7314e0eff940ec9bda5b824f745537e9358241a67a1838c6e3ff722551a9a0666fb81a52d2892f762dfd067dc8069ea4b7d60a4f5159614fa81e2768181c2377d6fb464348c719b5dde35a10593e2670560fd44a525f809945bbfc109e5ee26408c9e3ab68ec2612eb3f1f994c9e3587f402022df4cad4548c595703a1819a5c251ce4508a366c684531fa2c1164af25b1851ad67bc469b0891a87f609d530570222bc61dde93c7fc139e9e326f1b23b36f5a2678ed2c05e5cf0b9f79dda07705d9f5404e6bf102c76dae899ba8396415f6c26895a0e87cbd03ff5f8cd6a24a570d1f687ac6bf876e5f7d8be02d98a11ca73d3d94bfff278109bd39802ffa254acd6274ac32c14aa7c313598c33c5f758dca09a7d7c673a3266674bf4d7374819e6d4ee26bc1880a6677d3a2468fa0befc2a78d080556579ce0e8096549b40fefa081bae7e80094a996f7d8c108c7aae6e60c1e0811cf876041684c9895cb3f07124ca65a68ea755e5e20f36749a88ec5469d9c5c9206c0963704b16ca7bb69bfa90b5d2552e4865183646584e0884f9e330fde5c2202529daf6ffb170f45d40e67163dab0e16fa8eb1f6fe3b9dc02f9d9f3eb5b5a52aaa1f08da5eb5a6241e45d51cc3ba57181097514454bfacae633f14ec9dc8ded5921dc0501be9c40b2040af6e0930a8653827574b2a03068b40adb33121739b117225fd7a2785caa82937a9956c4532a74f991c702f025bc2b3ca55c70d1b36fcfa247c345d2429d1de6b0f4ac02979b3a1c8162a308f5b220487e1ab1827f1f7da69ce871456c8a596d7fbd65cc6071d21259a9f2c56f5bdd3dcc7fd9aed8bfea85675e42fcaa848c7fbb54599d05909b0f522d0f5b4fe8fe19a02e73bc802426344a23b4dde0827ac586d7dc73edbc847fa8f6ee0dac0ec66da5f10dc446ebbc77b45a815ae875d1c522259c1a8418ec03360109ec2efd48a839ebeb754af8629ee63b906d892749b8774e8fae3f1905d11afaff5d60d4d0cfe4526b3d6186a57ade67ca6474f2ade430317e3f804ad17bfad82a07aed3b51ce7e342aed7bd89ac2b3e7d7cdc103a11ea5a66c730ab99a53872a730bb99cba1c1ee4703fd600e197aad075474d71bfd41a949c6e1e01256729a4cab0d9b6a9775254f0f1873081756adcce18594ad038fa45141e9ee380807c3129df14cb8213e233c4e04e03b95f87a18633d49ae6211d159ff4530f04562ee54393df2f990acc174cbdddddbf81264a6da71ec3617d099bfc83d2e85eeebf14185632e46b7d16a6573db51f603097c8a57cc5badea9c62ef708d27472cb2b707b72c44953e7f2bad57fa82f24c9ae97c90c45420daff73a45c8a696c7570da19a5370ace893acac6af4713968d4a5bc0e8b968c5cfd62cdb793a29832fe4a705e415d807459c4b1150f9b56c10793d257a783c8606031a3221ca3356fe26975482c1db3b389251f7b3f60806f7d4451c0c601010dfe17253024eb9dee9856114e9ed135782554a5f03ce08d0ef23891695f841af0f8a5eb2e53f4591e3d8e7a276fd730639500fa192d8da6ba211eb42a5bc7cc130c76c8108688198eb872ac717d35c56e91da43cb0da0fd56e23302d57b603c6951a2513054ff21e7e226a49b835e35b99ea3e9a6251b0a68678b569fb4b607224c02305f665f7d61621bd1728c4e7b7953e560990273cb7c894256cec44a501f35a202efdf34870031c453f9527872432ed4a5399d096ee804d93758906c8a860c0efe61418989a022995871afebb015533704899c817f26b37b57a4ca6356f031f17e215ca6f8779c0a6657728ad40373649d2523bcf6859bcb6778a80e732d267a3cae22fb9de1a2ba66ff6f871a3037068bd556d42a6840f85e0794ddc9cc7423af5cbe3213bfe024d42f21adb95bde28cb97aa758807ac29b5c46332ba40576ac3bc9c0cf0d108d5c6b73fe4db1cb6d37dd565c48b80a4a19771e8af1dc1ed0134e1b64993f3429460cfad68bcef5760e4b9f4428d3750fca371d4c880abcbb1c330718d7e17df186ab08a2e6b474106b9a3552072b4b2e64948d03abdc3e7934a6547b5937f7e6ae0f750d92eab03cf298d43c2e1af3e7c202942a4c70f1f2da02e5db02b8aa3490a7325a2414d48473cbbfdcded3c1b319cbd5cbe19c6f05929007a1e5f0fd79da4ddc2c08aa206d7e059635c791d906e1760bde35043f2aa6da525ed9e2a6cb8858d1150934e2c7a1be7ce39a8ae1e7fa32225f20fdd139dde8238966a5456621457a031f6f2626d9bcacbc0c78f20993d1ab5045e98da7eea46242c86b2ffc407fbb1fb18182f6e44977352f728307ab7c8463e9d8b9bb1f0c17df9d169e99078a3d1833019e68ef5f6852c7f7785a0f734f6ecab57b7c1e59ff18778825a2ed22a495e81281191cbcdf5ba398acc0f97238193e1268b8971300cac44efe335028a59c4112e26fad727fccc4332412dc16156d07a73069874ca1d5dcdbab3d052b489a4e715b2a8f912555ddf3dc38e040555e1f950f42a2acf43ca461eef0f856577a8e8da716ecc724cb0b74824c4092d062c7756f24c470e05c1c1b6c36d17dab22077428d9be179e5cf5a0a3c5040b271e3ea9fd4f5806380d77ee5d85470887af74c69913f59245e46a6d4402fb2404a3b06eb27a090050ba4f2b6dc271aac283661039dbec7ef60f931365b08de47fae82a4a861264195475d3617a8919fd45ae5e0924e652cb0cfa07b5f1d6eb307a5f14157812068a47e0b5d85321509b3ad092683f013b477db55f6eacca0dfea8f6dad415601cd7911c2da8877723f64f67110f468e5fa2690dbeca458fb5466889739914e3e80e2dd505149a6e7f1195acc15a089242042f97fb10cb7943a372cde1b14f04f90efd7ab6987d32eefa262e7c642737eae773ffce3571d57ecd11156fd66570a378637fa3753df52e9a2d795a54f3630294444df2cf4aa5d92760400a7a5be5533675f90dc48b008e6c931f197c9a30445b820f9779141f0f4e40b07c1a17acbd0f2e6c74466b8153e6a6ab4c749061bbc6197fdd91ca50c24d7383bbe3d5f44e194ec08049371825114d5f3f0f02cd131ab18b771c32cfaad1a54431df5639ac93fa945d2464ab51b73c78c2e004ec119efced20bd716cf89701ad9e70b5b6b2938e4d374df2dbc33e5baed5174c7c416f33f8f8f59254729ca9ec325f754fda754124f3d4e4afff48f58dbea10b73ca53947bb6aff8ce47c802bab0f4af69c2ea4230ee8927487ebb23d8a748c6b9b54bcab45efdc1b31b57ba6ac928ec03f3631073fee817fdd9f0964507001d7ae6fcfa93ab7337fe595ba237151a4cc349e76f671d2e2bea6aa0dc19c5d900b2fc3bd8579fdcafebfb95f00136a491db5206900870604ea751bb6dbe15ecdc1feeae62bed0675ae7f84e08bfb0b67bbaf4fcf8fe6fa514fda16194ec97063288d1ecc1bbf23d22c7e2825995be5e99e5fd77be625a4ad94da4d0cc9afed7bf24615a7d8554d270f87633f7f47a5521ee5431fa7454d3c1d07ac851980f19542fe10e813789de6e9c8a8c62001b7285b065014b4758e37bb022e64b78cddf563001e0f4193cd192c3dd8b6ed1e6556fe5bbb51cfe8e1a388b10c276c4f149b7bf2d90864eb95afcd7a8a0aaffd798f0c4c58f105990d06177e86c40b3a6110398cb9da1bd9f9d96933837f3cfee9f33444eb39481b2d833e94c8be7c91fd6ca0d0d5ec972db859e7a2b919c8ea00f7dfe912aad4f93c3830ca3d9d5f5a90b6b6a6acacec0e841cc89e788dfc5a5aac921b9f8f4e464a77271409a68dcd89a415994b416cc58d064e51613005bf09cf98488c35b2ef27882bc24ef229f922ef406704d5ebd10f94ffa3890961b35b5df0cf1742c8a20f0991abd411c2ddcfee1b106cafcfe16c24abffc116356b277ad05d096a2297b15480fda454293f757200e61938ad39ac1a59a18305b18eb1d5646d209ef6c59ccde9f05ae73b2cb48b622f0ef328ae0aecf3027f31f4928ac432bbdd1b7714d59a7db43c881179e795fcbd1851264b770b0ad85d171fd8ea59d68fd14075bf511e0cc2ee5c71be0d5073e0f5048761ab29ec4df76c3c47b1685b85c0cc6a431ab792c14d4941cc54c0782ae7afcc688274f43fa25dbe47da06c385947acc2b76c30fdf4fff1ed9682a657e8eb0b4f17f6b737e2d4bb6b300224f72f07b2a25a5028cc02bb008b0edc94db4fa8ec23e71e9f08bcb9f0e41fb5d280c0e48fbce8ac8551f06940eee4a59cab04f68586982cd32202b63626fd11603956e407f58aaaba31b76d04311dc86b76988608612558e927747976754d7cf5cc8df670d9eb7409775dcfd665a92e5f72dd426612a162faea02c9a76efeb34f469d16e2cc96be449cdb82158dee8c54f73abef4] */
};
