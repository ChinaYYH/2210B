// 联合类型
export type User = {
  id: string
  token: string
  account: string
  mobile: string
  avatar: string
}

// 匹配出非token字段的类型
type OmitUser = Omit<User, 'token'>

// 用户信息类型 交叉类型
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// 家庭档案列表类型
export type PatientType = {
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: 0 | 1
  // 性别 1男 0女
  gender?: 0 | 1
  // 性别值
  genderValue?: number
  // 年龄
  age?: number
  // id
  id?: string
}

export type PatientList = PatientType[]
