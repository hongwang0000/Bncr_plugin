/**
 * @author Doraemon
 * @name JD_R_WSCK转换
 * @origin 红灯区
 * @version 1.0.1
 * @description JD_R_WSCK 调用nolan pro 转换api接口
 * @rule ^(pro转换)$
 * @admin true
 * @public false
 * @priority 1000
   说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
        JD_R_WSCK转换.js 放到自用插件下

    2、红灯区 dev可用

    3、需要设置 nolan pro的服务地址/botToken，详情参考 红灯区 - 登录.js

    4、panelIndex 对应奶酪棒面板管理 0 就是面板管理中显示的1 以此类推

  注意：

    ---------------------
  功能：
    1、通过奶酪棒面板管理所对应的容器，通过命令主动检索启用的JD_R_WSCK变量 （已实现）

    2、通过nolan pro 转换接口 转换为 appck，并且重新启用变量（已实现）

    3、通过设置表示确认是否执行面板聚合（已实现）

    4、对于失效的JD_R_WSCK 自动禁用（已实现）
    ---------------------

  更新日志：
      v1.0.0 插件上线
      v1.0.1 兼容青龙新旧版本 / 兼容中文pin / 失效的 JD_R_WSCK 自动禁用

 */
const AmTool = require("../红灯区/mod/AmTool")
const QlMod = require("../红灯区/mod/AmQlMod");
const ql = require('./mod/ql');

// 需要运行的面板
const qlNum = 0;
// 消息撤回的时间
const waitObj = { wait: 10 }
// 是否启用面板聚合 true 是，false 否
const globalFlag = true;

//插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203e718ff222f9d0ceb298295aedf4e5c07fd2ee38f9e0975c19ad3328f204b4db5d43b681c2cf4271b7c40617e0d98e1de283a31bbad3a5dc7dd9aca0094d6a7fb9bd1c3445e7cb1b757d045820cbdec0f6d824cdb6a916cee7d81996f34be4bf753b46a589e32fffd0a48e48998363e39455bc9d1300b6ae6eb5ce7178a2bb665677e03b41820e2a24d1de9f947444d815a5ff6160112ab03d0d4d349a248509fa043821df154f3248e19504461188d92fea770bec7030f1df3ecb870497c4223a40522bf44dc5c08d6851e1979d447b4ff87bf83859ccb5712ec590b3206ddb1ab91ceb904b43e515b268680a98b34c1ce4f47853a614f5560790f853a2e48490b5eb0ab884b6ecc1792d2741e10b7767890bceb0fb371ada781e14efb2bd730d2c87df86f3a1f51c40d2989c7764aa8c0487cac3aaa83a5630056588c18083ef0eec41b0bde81b5a765b17064fed3bec950824aefbcd57b6fa9ccaf8227cc5e9503a614aeaec3927be93f0b1cb3e58884be4bac71cf59e15865b613cec2d08a85c3b9a151810314cb90b7f74d2e8fd33d5f0dd1bc9182d585f345c0d2d92a9ad58543fb2c0bd84b8c9ed08e240e5dc1915c477b08133b763ebcb1e974567ccb2b1573b8741d0cac354202bd4554eeb22a4e78fbcb4540467292919e89c5ca5e07be11cd98a03295ff295960af43067d8ce2601431db432bd298fb863924af82de241b3fd370a24423dec661e9998060157bc493d1ffc2453126e4a1d08e52746ce0b59c9bca719696c795f58e8e44002b8a34a24c32eae573c458d469798ec69c3731d73f485841a50ef819d2e925d66baee5969e7d40c1894f06f8ab49c9ee0dc04ac1efd2ae3cc40a8eed9532b4fee538a43c77e61261940caa6ee70438f1f6c4c3684ef0a55b8d28b618a258eb019cdfa9ec7203a44f070406e32c47040e433244015b6f6894ac0b630fe24933e75761d58e45c916eaee1c59dc0779250e0764b22a72d2e63f7d3d51d3440080e3baef34c00db54d34d87c8fc5c3d279d15a66578fca8d44648e427926ba2626e534bc5aef6f7061810280e19f400b5ff139d97f1a4c1fe82640c77123d909a67b3f314caa5587e5300581113173ee1c096031532a7f490ed397403dd6af8bd6374afd008b2325e08fb05396db28d87b16c17b3f7a782f6a030f6fd84678806451b72394c1f6465a586e5abd3bd26ffba01b99b86fe8f2bbfd205c1506c68a52ef7b3beca722364be3e4e1a511f93d9e495b5a8e1f1bf04e9ef0ba118f23cd68346c6d5820f033903a53869de2dd34735e63c853886a93c6a60054263706f937eba4dacc2a0354c75f92335be661f59e5a3d265aceb8fa18e3cdf92a19030681e52b52d0fcd255673d0cc2fb332fa9512daf0101f35a92782e5fdfb4da9128829cf015f211c0130dcd5e01ae010305c17c651441877c371cd5bd1c8289e4207f9b2be2e1f8e08a30f2468b95ab0775f4b0628cba8b381f81812829db875a54b7a461e02a8666457cfcae3bda80f04e764c4fccaf0af1ed3d0746c43952b32ddaaf190d1b5d75bce8ba31eeb869a9459edb982ecabba9b975b11847cd2c05f322bf57ed32afcd568672c5c0a7a96e6bb3bff126c718d2006a0ad535a11cf415fb062bb8bbaf01e67b517e2cb0d75d2290fd2e7813daf4c563fa39d4e7e4838d29de38786b1900e4c389819fc13dd3000d57000e9133df5b31a1500a73decdb57b9df159ea57a7677ba1c9cb9348daf6ce29749424e4296ce1c2ccb4e72554cfdf9380a2806b6ca5e9e18def1d2cb830c355b3044d4f01aef624f499b976e35df498683cc1421ebe92e36dac17590ff1a70cc060fc2f292ce694511664547bdf4f255af7d0aef2b661ffc6472c8f050bd7e6b2c27d4ec4d83fe5c727f1569c48069e2cdaa0c04156e57efb2efaef3b1a03027fb74e061c66f3d413838456980e9ff1cce6847f66e078f6582ee056dddb15a1cc01682df11d87693d286b27f7fff91ee76aa784f1bf776234fc0902825da7fe152ff5e75c40577cde0cfbfb59dfca2ad3ef9091d8ee2285fe4bc67e9e6a3b9ec96b5a80272212d9d9552d2a24522bdb4f5d334e667cbebd90a5f05dad8d4119cbd3f997ef57ea799d08a62f4109f874cba792cf0170131e1063bb77e0e06e2f5b5f2d8f4bcd5218c64cefb1644d0e889a7497a83508cbca15c3c0e2e662b0626d6d91f62386bd5f244aa43728e58d0a68a3b4e3082d5480508b8c5e0a2a2bf432ddaf90d81ee882549a4f7b647d628a28da01abd88f98ebbb73d53c8dd7519f0b262849c5c76b1a898ca6d0b052ad70b1e8c48eae97dfc9449c6d240f729253fb6d8f20f5e822c3a4a640c027fcf7e40c509d2fb88d9f32a8cb7efad0941d39ae62462940a1be02a0aa126506776f1eae4d09ebd80f9c323e77ae1d40bc8f7228fa6709b5ab3fe149d356314ef05e42848455782dd89f878f8f5ac152fb679218215174a0d6233ac61024e0418ed2333936cca9364777cd0aba79d0c70dc258247cec7f6f9973051d99893a4cec331a540610c9c9d0319a944b95bd518b09718c3ff9e3db18e4651db818041efba12affa59f4d04a320f3f5d5f8918465936a6c74d048b785de4b70abae10361b54e8901eba46a8c2021695eb681b379ed36fa2096801bc44580a4e8675a527d0a01f249f231a8cfdc5b9ec94c5838ddf1141c64f9402abd6c9d847950ee466d8e9a122d3b8ef44ff18dd43482dcf4b08005653b0178f6e5c2785251ae4572e361b11a139cbaa065a5cc1718312e352477dad766b8038e1f1c12c35a5a2fe185ef3dda0f4429a231b6c73ace74aeab825f00e9e0eaec97bf7791d5aa17703a570b67b0644d7a78ebdf28307f780a556ec53a221d165abd3b6f49c855748816f90f24eebdfb34090b30002f2e62f205b923f8d49c93b50c0fc2616273aa4e2a2f0edcdbfb6297b3a86b8628fc3e845d6e63b0147ee3091aa34c25fddeceae0d54c24a7283dcb5cca60808bc4142169923db7bbffa7f01e80def88e7382bda88318178406d4a26cdb93205dd1c6c61dcf046e85df62bb7c6c608035808e203f7835b1d26969996c765d5c9950756301f6e8fd2e8bda20882ec2af572b4f45e221d84530f141501498d601c195360bf5482f82dd42ed6d9b19c21f2ed81d69ca394d0c82a882f105f7f00c4323d001c2864afc695f12a08c9381d2c32d87658c259cf1805b8c0610f508a3df57c9aaf998b17433167969bc7a418c5ec8c744a26520942a59d46ee674e024ded70aff92b206fa282f925d4dd855929e36e3982d5619dba10a263a613bd33b87cded112d5f0e2569bad859a0d4bc483ec5c32b5dd4bd0b95e63a32423f8a72828f6ceef343693efe813ef834e04a35d0bc337a81bc9f5c144ff7f540370adde5ca7a39b3aec2ac35cb47b5984301148577d756ac11a8ead461d4d204cdba465f776b4d76d606e2192d380e1dbcf3b6c3a424d51673c15efa5a5740f4b532ba7cdeceaf684bedb693040055bc4fc1c8a5b6950c0fa1c9bd89172f2041c69ea939665fd972fc567e68382af417689de68fd5e0f55de517ffb5fd4357362d2dff3e3ec52c4a9abe3a9496f1bd5382673e18f15ff01bcd3cce4d9e71468e805b95ecace79078b7dc34b7f13fb70ace9f15d724653e7b00dd97e946de326606120391f38641c6400627437ceff39b8815cf1e13ca723260b44f5c117f41b7c44a6605b6c216c09384e0a425d9e360c0ea041a6bed8403fd8eaef4a1d0a766cc152d2a777f946613dc31febf9bd10da7860944fee22229c1bc8eace3ff1372bdfbc1d3addd1984cc0481eece69b5d870e613850274309c9dd8aeb03c42a9e0da52e8c216ad058544357b5c114f55d419aa7914d02fc5c2b8f9597c2ab11106078cd2ec72172838c620b95a86a0e0ca8ee9c31f2352c982afaa5b89278462af60eb1ec056e8b729ae64eabee971b889acdcf74d3199a1424846e420aee80f0b97950cf27fb98f7818a4f669a84ecd65bc715e2b44fb2ae24f8e76de7eb4e0f2356739bd0872ef9e5b4d4facb3c80bd4a4897dd6c69ed2ca88431d44f6c94d3b648cf9e7375d7a9de2a6fa757d57d9f88d0caba84ccf27a404a756c73d2aebe896875e1b6cbfbc17a77dc5bf5ecde1882c6c19686f3b7eaf752bd514374294ecb56b151e61c539c189df37015221ac3206c9118155107e895000762b7e4652ffc577ca7051b64a8cb13bfc9b4628633a6fddeea012c57526223cda92f955ad60b8c50b2188ccd430159ec7daaaecee9ed1ef5c9387e4e1191030a53a23fad7987f6e9486221ba08ab7b98c5cd35716524622a1d85046f7483e7146782d7447d3c06809cba88aae18faccf674981feb30324786968431b34ba79b05b6e3cd25dfe5d579151704014bfc5b0bd80997cc0f61f8a20ee786744c09b4cecfc96b5d52ac4f6623e638f950d299a7a813fc6f7d15a902c317b50eac80f0c8607c5894ede64d6eb508a81a99cdb51a8bdcc579d54f096bf88a56ae2efebc7435a5a0eac83a37050dc9b2c99c4c6f4f245db2ec39ee9dc8b52f15f2b44ba3bc4e4ae7b375038023f0ae9774768af8b1a99a0a067631b4c1943d5ff59aaf1590a1246ba11d3e9c28b900cf791ff6a938f00cad62c2d56e9fe01e97f9a92ce22ad1f6c3001b72efc37fafdae10d05ff72975f8105c149c5d40c5ab5bc0aa4f47ebde5e35166418863a69027b83b9ca84d3ada9360224925cdd017f6f7338fbc093a0f9298b5b7ca05c1e381e32dc26e3da3a0f7d51c97b9db8a094bfabb512c688e8d0c5bc2209a56c10bdcc164202277ff4eaeadc3e4c0a8ed91ec0371f2cc07c3ad85f03007b4e310e3de15147e704f1fdf4438fc0cf67691c536edc0aad9a47b1a1cef57ac678bf7b364915ddedc7f21fab8ad52e447f314b4dfeb26321c845cb965948c5d4d8080dde2beab6cc4ee8a52b6596d8d901702ae22202e89a7bd9139ab4e9aee14a8b8d15ccb11bfe56f0e5803f50a40262649e0fb86de1900591507b5d771601067e30f7b67145f63c451aae1aa94ccafb1de0ffbaeec6d3749c2db0895d0d653227a07f1faddc7620e73054cac82cd5d9d186cc759306f77d9cc1a702e34cff64de1dc14944f1b6468b2e28c9cf27a03f60d4f948b56fabc35c78b6161eab35d2660d31aa08a1fbb574780f581fa6708d439fbfec7e422cb8d79c71d494f73ceb6ff73bbbfbede794344623fec88bc6a4fa219b1cf3b30a82595ff5786c3adcdb28933ae7e8d2385e8ffae1bfeedf28ef9b6b582102074aaccf942b8f5fb89bd3651ca7dcf21977cf20462ba6f1fddc37d6392020b3b7adb92375eb167edd88a82bfe412ba16ff4caabdbaeb9e0c1f472ec52279edb730eba408c1f93da3747a01abbf374b2c9f3f4f13f5de3afb4d124af8a689b3d65a8f3de3a23f0cb810b48a4c00c14cd922cd808a1f250bf1da7ff5f056d8266047e79782e567e7d07f1e514cc90ff38aec4401275ce5228a0778519e550c1a842687d138ad76e1aa1ea31ccfebe4adc44d68ceef1877cc018a3d6474a5c56a18bb39b8fc72d0a9fb255e3d5f8dc0cefec00e9786389aa2441552b6603cbce60c128772c80e86465ed638f977239404ec02d309370a30962bbef581026d13d89e8ce5a2158b069fbbc261b910566482d97437e7f70c27bbea97c47e5f6c92ac0d96c3a8225929a330a73d9472578255e6d24ac05f74b413ed06a6e4b873dcc421a29c8a1134fd94e8d9a80c37c72cbe126ca70e09906c9c486729ad97f48ddbed1a0e45c9ebb29ba2879ce18b78db45ab885ed50b2ca22dc08dcac0cb0935463cfff0e98b940ed226db14d29bf154ee38354bfc037da8eac6bfa7b15980dac19c9126e4e13b266867da58f40f0f813728a436c682b0d698fe45374913adfdd1a7c17bbafab28bace43a90f4eab673cb90f63d6b6e7b80928c67ddb1276c69fe0349db4091067b31082062e1b0b5f765048236ec2067b6d585778ad56f05a68a9281505b2c8b6ba08544bc513f107d796966d995958df7a64b5acd02e9e5dd17c4ac49b98f95bf878420b8f90efcf9efa4a530e6529e966efab8503cb569784ca751b506cd8687051731034fea33fe436b5b5f208a71818226b0d5b4fcaff6d34384b97928b9be154e47fc8f0fd3e6f3c5fc93c3164942680c07bf9048ee89569cb9eb85eb1e9bfcb19f951a1539ba1f53de44afa47a7f948deea1cbeab5d0d6c598497950d8bb71125d9ea29734f992b287231ce17f7d1fd432143c6723cd3b1c2fc09a44bea55fa3b2ccb5b24d5bf42f197fc83d047b6c4b95e8c74a5be00eef368471706596bfe70fb605313efe816e9fc238449b4114c45bbd204a0e8fa0d43e2c1831c3f33982fa0b0980e309f615aa61d2fe0b28feefd764f791ab79393a0e4fae8c02e4e3069ca616ca3a6314aa57ba4dde56e1a35fadaafb2617d446d585bce29f5e54d0af5460fbb7d8728115e97020187bfcecce4dd715470dc08a613fb4e4458873deab947e5214f14bd3cc191b3148be7ca1ca516d0548ca98c8dae3a2fd2786ad378f3bb26ef3987be93d9dead4784820735c8fd47798b294fd3f0e0a21e0667e5d18512ad6bbcf1a4ae6f10910bd5eb71c07f9f441fb303d3fb3c63d66ce1d64b816b56e85ede40fa390c905c4574305d58dbee04bafc9a095c1969054f2d191b51a6bb6f1c9a9ce5eca6c0b6aa1124f6e8ad0f7096c117cbcb06f65315c8f3274ba22d36a7187455cd092a1cdfe3d0e4cb20b17209b7c7c4e87c5686b9d75a7809955a25fbe3f4ae2fc4ab81d0057bd04890c2e4b87e23a36c90012e2388a2d3092ac5a01f214ec5a4a2db050a02f3608874f9c27154458ee7edc9a0ff7b3b33ea5638c731c3d518baad59af3768be90609b8c5eee4c5c6d3cbe25097326ec41e737c2c3b94a59f1386335a8e883dda6b9087b2247f6b716755fcdce56f07cade67639e05151da3b0b46375b030ecee3a3a1aed4ee6b19513080df60d71cdde55c9db38b525a359a9581196e1c7634ef723104c69bb5cbbc9e6d424110642b93c1f67c87095e4095f378bfc9b11930b379b2da13594bcd6227d7ad193bb64492d5a71b03cba4d0857be4d087e677afaf53d0104d5f7085c6dd4795b8d7af3630ce3bce0497254ad8f1820510e8cb8f4db899ad373d2c1a65e38e629707063d94f74addf1873febd9403a3b3fd1ca4213ef42180e6390d6939c65585b2b574cb0eb8c7e433c9dda8d4293adfbcf305d25740ac8bc63dae18ada263bf29ce13aebbddba371562562006ed5058ff338b0402d3ee7e206234b7d3972117ab5a89bfb4903e505873d2b6910f08bc8dcce3dac15b1b61d56e87ef72b01338f3c97d421edecd5331d4e5592f6ceefcfb0fbede20eff45c6ed2c90ba76f3ae7ce44e929cead6028c74c2937d2f6d12ad0a55c05b7fa533e3a7a3d92b10ecfff59226ca7cfa1c7501cbb0c98f9d28493c7f58f646215eb88e10e1eb6444d181cdbf2ce7477eddaca34b42b3a753f6b9289303d779c41760a394b4c79eea828bddfae5c611356f4f1e5e23607b7eb129e056830c76e344712aec68b678361b392acec13832a9db11476551141a217338f9189a1e61cce5da390afea561a372e1886a3981b37a92ca16587071eb4554331e203ef326b961b1a271d01e5f8d52cc86fd652b43f358d0361d8145c946d90e537e5] */
}