const menuList = [
  {
    title: '首页',
    key: '/manage'
  },
  {
    title: '栏目管理',
    key: '/manage/column',
    children: [
      {
        title: '新闻中心',
        key: '/manage/column/news',
      },
    ]
  },
  {
    title: '内容管理',
    key: '/manage/context',
  },
  {
    title: '区块管理',
    key: '/manage/block',
  },
  {
    title: '文件管理',
    key: '/manage/directory',
    children: [
      {
        title: '图片管理',
        key: '/manage/directory/image',
      },
      {
        title: '文档管理',
        key: '/manage/directory/file'
      }
    ]
  },
  {
    title: '消息通知',
    key: '/manage/message'
  },
  {
    title: '帐号权限',
    key: '/manage/account'
  },
  {
    title: '操作日志',
    key: '/manage/log'
  },
  {
    title: '个人信息',
    key: '/manage/user'
  },
];
export default menuList;
