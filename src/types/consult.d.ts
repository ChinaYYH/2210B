import { ConsultType, IllnessTime, IllnessType } from '@/enum'

export type KnowledgeType = 'recommend' | 'fatReduction' | 'food' | 'like'

export type Knowledge = {
  // 文章id
  id: string
  // 文章标题
  title: string
  // 封面地址
  coverUrl: string[]
  // 百科关联的话题
  topics: string[]
  // 收藏数量
  collectionNumber: number
  // 评论数量
  commentNumber: number
  // 创建人姓名
  creatorName: string
  // 创建人头像
  creatorAvatar: string
  // 创建人医院
  creatorHospatalName: string
  // 是否关注0未关注1关注
  likeFlag: 0 | 1
  // 内容详情
  content: string
  // 创建人科室
  creatorDep: string
  // 创建人职称
  creatorTitles: string
  // 创建人id
  creatorId: string
}

export type KnowledgeList = Knowledge[]

export type KnowledgePage = {
  // 总页数
  pageTotal: number
  // 总条数
  total: number
  // 数据
  rows: KnowledgeList
}

export type PageParams = {
  // 页码
  current: number
  // 条数
  pageSize: number
}

export type Doctor = {
  /**
   * 医生头像
   */
  avatar: string
  consultationNum: number
  /**
   * 科室名称
   */
  depName: string
  /**
   * 医院等级-名称简写
   */
  gradeName: string
  /**
   * 医院名称
   */
  hospitalName: string
  /**
   * 医生id
   */
  id: string
  /**
   * 未登录用户默认返回0，登录用户实际判断是否关注的标志1已关注0未关注
   */
  likeFlag: 0 | 1
  major: string
  /**
   * 医生姓名
   */
  name: string
  /**
   * 职称
   */
  positionalTitles: string
  score: number
  /**
   * 接诊费用
   */
  serviceFee: number
}

export type DoctorList = Doctor[]

export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}

export type LikeParams = {
  /**
   * 对应的id
   */
  id: string
  /**
   * topic百科话题,knowledge百科文章,doc医生,disease疾病
   */
  type: string
}
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 图片病例信息
export type Image = {
  id: string
  url: string
}

// 问诊记录
export type Consult = {
  // 问诊记录ID
  id: string
  // 问诊类型
  type: ConsultType
  // 快速问诊类型，0 普通 1 三甲
  illnessType: IllnessType
  // 科室ID
  depId: string
  // 疾病描述
  illnessDesc: string
  // 疾病持续时间
  illnessTime: IllnessTime
  // 是否就诊过，0 未就诊过  1 就诊过
  consultFlag: 0 | 1
  // 患者ID
  patientId: string
  // 优惠券ID
  couponId: string
  // 图片数组
  pictures: Image[]
}

// 问诊记录变成可选 Partial 将定义的必填类型转化为可选类型
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型
export type PartialConsult = Partial<Consult>

export type FormConsult = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 科室
export type SubDep = {
  // 科室ID
  id: string
  // 科室名称
  name: string
}

export type TopDep = SubDep & {
  // 二级科室数组
  child: SubDep[]
}

export type DepList = TopDep[]

// 支付传参类型
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 获取预支付信息返回类型
export type ConsultOrderPreData = {
  /**
   * 实付金额
   */
  actualPayment: number
  /**
   * 优惠券抵扣
   */
  couponDeduction: number
  /**
   * 使用的优惠券id-使用优惠券时，返回
   */
  couponId?: string
  /**
   * 极速问诊类型：0普通1三甲,极速问题必须有值
   */
  illnessType?: number
  /**
   * 应付款/价格-图文或者极速的费用，极速普通10元，三甲39元
   */
  payment: number
  /**
   * 积分可抵扣
   */
  pointDeduction: number
  /**
   * 1问医生2极速问诊2开药问诊--默认是1
   */
  type?: number
}

// 获取订单的入参类型
export type ConsultOrderListParams = PageParams & {
  type: ConsultType.Doctor | ConsultType.Fast | ConsultType.Medication
}

// 获取订单的返回的数据类型
export type ConsultOrderPage = {
  total: number
  pageTotal: number
  rows: ConsultOrderItem[]
}

export type ConsultOrderItem = {
  evaluateId: number
  actualPayment: number
  pointDeduction: number
  // 优惠卷
  couponDeduction: number
  /**
   * 开药门诊必有-过敏史0无1有2不清楚
   */
  allergicHistory?: number
  /**
   * 取消/退款进度
   */
  cancelProcess?: string
  /**
   * 取消订单原因
   */
  cancelReason?: string
  /**
   * 取消订单原因文字
   */
  cancelReasonValue?: string
  /**
   * 找医生/极速问诊必有-是否就诊过0未就诊1就诊过
   */
  consultFlag?: number
  /**
   * 倒计时-1表示计时已过(单位s)
   */
  countdown?: number
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 咨询的医生--找医生
   */
  docInfo?: DocInfo
  /**
   * 是否已经评价1 已评价0 未评价
   */
  evaluateFlag: string
  /**
   * 开药门诊必有-生育状态及计划0无1备孕中2已怀孕3哺乳期
   */
  fertilityStatus?: number
  /**
   * 订单id
   */
  id: string
  /**
   * 病情--症状描述
   */
  illnessDesc: string
  /**
   * 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上
   */
  illnessTime?: number
  /**
   * 开药门诊必有-肝功能0正常1异常2不清楚
   */
  liverFunction?: number
  /**
   * 订单编号
   */
  orderNo?: string
  /**
   * 价格
   */
  payment: number
  /**
   * 患者id,用于关联患者信息
   */
  patientInfo?: PatientInfo
  /**
   * 处方id信息
   */
  prescriptionId?: string
  /**
   * 就诊记录id信息
   */
  recordId: string
  /**
   * 开药门诊必有-肾功能0正常1异常2不清楚
   */
  renalFunction?: number
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  status: Status
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  statusValue?: string
  /**
   * 订单类型1问医生2极速问诊2开药问诊--默认是1
   */
  type?: number
}

/**
 * 咨询的医生--找医生
 */
export type DocInfo = {
  /**
   * 医生头像
   */
  avatar?: string
  /**
   * 接诊数量
   */
  consultationNum?: number
  /**
   * 科室
   */
  depName?: string
  /**
   * 医院等级
   */
  gradeName?: string
  /**
   * 医院名称
   */
  hospitalName?: string
  /**
   * 医生id
   */
  id?: string
  /**
   * 擅长
   */
  major?: string
  /**
   * 医生姓名
   */
  name?: string
  /**
   * 职称
   */
  positionalTitles?: string
  /**
   * 评分
   */
  score?: number
  /**
   * 服务费
   */
  serviceFee?: number
  /**
   * 医生状态0休息中1可以咨询
   */
  status?: number
}

/**
 * 患者id,用于关联患者信息
 */
export type PatientInfo = {
  /**
   * 患者年龄
   */
  age: string
  /**
   * 患者性别
   */
  gender: number
  /**
   * 患者id
   */
  id: string
  /**
   * 患者证件信息
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}
