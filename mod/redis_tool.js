/**
 * @name redis_tool
 * @version v1.0.1
 * @author Doraemon
 * @origin 红灯区
 * @description 调用redis工具
 * 
 * 
  描述：
     先安装redis依赖 npm i ioredis
  
  更新：
    v1.0.0 插件上线
    2023.11.11 v1.0.1 新增 getAllKeys() 返回当前索引库所有keys 
                      新增 flushdb() 清空当前索引库
 */

/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a042039ef2d2b48b8ec359b301f03baaba15ba6041ecb153a6bdc6874514ef4f3c690dc173b78bf16126dd9d26931416d58f713909d0e9edfd237238bf67d884fcf9086c766a376246bb1a65015811cfb670e91e1b8765be97e3ba61ce555482881ecbd31c3909c75fa94546dc876e729e3874dead0e51270a5d437a3c84f88092e0699ed81d5ce885797e7a5db7a8bc052de1a5368a150c94989573a1657351f3c26fb9265082756a49428653345cce3e590eb78c6d9455b86151790e44e1b924d45d5e38fc548cbc9a32afc292acd8ae8a21d26b9dfb835c88cb9eddcac477955e511ec6f4e8a0b1c06fd867162535d15810c1e225149f97723fe2b92eacc033e7e34f148aaf43d6e559ee2b07a114cb8bc38f82dfd8fa089d905ad92e9e5eab675df65626466c7f31bbbc4e1afd15d63ba57b90ff3e6642de3cda17a5380aea3399d0776ecff85f121728419ef34dc604867e175ffcb8978d73cf6ea7119ca8507afc75f2afd6413866fea94849e1b5f2bfcf9c4350ba8cac5c71d87f8a3fd7e77092117e9625a4cb27aed4100d66260d9dea5d4e70753d18e9e6553cc80049e07c21151004aec1c387e4ace2b8f2b3f8cb18d6fe78dfeef54f48af437c39f03998f7364cad66d67fb5abbc0a4f3cf579be39fceefb3eafa66f35c5946745d1b31ee48257169ae4ab403fbe090a4977d7088f6212ce25e3463c562269d94acf33c44dc9bf165f0e8d5464a13e848b1df78f9038f5de4bd9b5a3b98c46e048a4e85be4a4212d9331ed41d982e92488327996364cb9af8cd64f85e68e7243e86fcf20e75cb6a53253878a3831ca252f5c0e34b5ba36822aa07e3af7c558d563aafafd478c088ee7fba821516989acb36cb7c80f5145b152d71e6ea2821ac180162255178a75d87c10a38ae5e51d9f7b9a48df571209955911ac72e93aff12fe198387bb43fa4650b6cf4ad558098db237dffb0032766095c508a70ad3aa86179e09f01e0bf4d2ebd0b9ca1159044f23e101a1056b58db811a1c92ad638e7f63baf995c73ccc6a3a9ba8e5d56ab63068cd57f5fa8b7bc38bbf065282803eeff1d535481289618f4231a988c50689823888035423851efb4662e1f3dccc5deedf486fa82a1233079c9f384aeeca0011774f4a0596a1b8db7a33f55b756efef4ad0056a1428f613b5a51c988c9dc27d19f52681b56a3567e32b13bb1220e35216d50aa81efd9ae5de9ee8d799ea8bc35154b27161fc66de743f34cceeccc335abfb8cc5b809ee5d038ee8269a7a99fd966fd0eb68815091f4ae67402aa4f7658fc3b3e7a8f17f71161dd2af8abd162c154f8b8581f172c857fd8b1627dc717f526515af0e7a3ab5e0fd8ec083a3827166eccec8401eddab489a18b029e1fe478da71780e4d214f24118922e4fcf2fd97d11e0cb11f70a4745a7356d04316e4b4c61aa3c29da78da3a8d52a70c36a56f00969b78075e109bd0c4003186c32e742e0137bb64b96cd88fadb7f4b1baa5573a7a022d5eeff6c55e35ff8471b7fc2c9320eeaff44deea6499450636f7841c189a8dde26fa1e81332aa084b93d9b721a0078e75531178b3f1538e38503b35dc53a0f34efaf8337f22a5f3a49694b3aa469f0c74fdba1e06d61ada60ccb31305f3bb4243e2c3fc49605ff95d0550df9b95daf0d87e9ef8d7cb921bc67b6521129b8fc6e2486f95d94c8b9aa5d963124a00a74550abedd565bbdb0e9c891ba385b3930d0a932bc13df96dffc5e676462e763d243ecaa55358b370599f68f886e47a0e2af89e4fcec9c43c6fb3fe94346c0f29180c383b941d4c1b26db95e81f040ec42c6a1881195091d8a3c3167776b256dda78b01be186567582a736544412ded20c19a29aa99612a09ce8bb2965a9b936c9faf2c41ef095ea757bb252cad5c49d5ee8b4800d840bdbecb403751687252b159555ec48bef7cb358475869ecf074d9bfd7b1557fa9dcd6334f898c93ccbaa29f036ea578f8c3d82136a7f3b5ff93c5dc6cc5c19dc51230398552c7fe9a55c47fc3fe278fde6d3ca5dee73e0d1d4d4f5362beacdd919e43b80fc1e79e1e35cbc592ded1d824938f84a0e184619c0f3c216b6c7960f1a5017b1c29d4be8a70e9f9bc1f60490c054cbce9a3abc7daeff08a451da422d05b105af78cd2156eabef8731200990be8fe8788c943f5b1d153931afdcd5978d3c63659a7c6190f9cbf6894a3586bdf5fffd8e7d4587d0f03a0123a106c1a42b2465eca62a24f17a8634a814440f42e0bc985592deac476f6d1d3d6df1581787f75392336de7f8ebf52acce3f192b0de417c23c24ae11d9599f9c194e6fe02a4ae574319f65b2a06c7a95c6085c66a59319ce79ef2ec6c8455bed03801a5b7b02c8566aedff70fa20231f0744c021950651bb22b8dfdbf67f20afb245f6564c706ff8c66b8d68403628e22f41149adec7f28de99d37b86cf5ede9bc6a10efc643858d7a068cce5357a736ca1cbdab9a3ff35337bbe14e8b18f5880147a1a4be1d4956b10d3c7e6241ea2ca674751320de9f9cc4f46e620e9eccf447e75a6f30ac2648c4786051214b194f587985583991843e607b174fe4550507a1bc3c8d31f4131e51af358deaa2d5cc0f75007ed2ec69002b46d0986cc88e1912147518e51e99358e67073f7e016723eb82eb30046a99fff6ebd3b486afb4862d76857995a9f45ef545dcc6d9a52ef90b00595bbd2d9e9713623a9b89330be904ce03cc21c1d16d722c84c421efabfbef8879e9471d384d6c826ae0451cb16b164cd1cf3e49d50dbe12b496bcbe5cbb94803f93cfe149f0452ad49c0b9923aee9905f67a9b37b307f867e6f60c493b0a38912d157f42edad881ffcfcf9e4106ebb0b48e17fa8fd439d5ac9254ec942f327ad9139ebe70262729a1e21a713e92013f5dae536708529023e07e41c08efa25ab465701e74227a021e62fab14a511db68e2f10aae3f7ec838b3ce8e84ed0fbc772433d00239f4006c3f7c18ad06e04a8a075bf45ce2bd4cf157d4f847b0eaee9186a4e5f97252b7300505b1f55f71d6ade60a712d0b338203dec4ce9ebf184c80a7443bfbb8712b2e9f4ccb2ea7e6f2e0572b2fa7f9ef8aaae075fbb2d896ab6f14c59e5fa2a0477b20d63bcd39f5c886f7a208ddb24d857c9ab960b9e87e18d3dceee38b27989104a4bc82fad0b9b3b979e7b080a874388abf3e252f15dd39526bff69852f8d6a1d987083482c8cb1173e32a9af3e825ae7db8f93f1fbea32301d4ae2575448045731cc481254e91b164072b42e6e8e6281f02b3f5de1dedea0] */